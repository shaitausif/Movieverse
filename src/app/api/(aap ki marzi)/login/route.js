import { connectKaro } from "@/lib/db_connect";
import { NextResponse } from "next/server";
import { user } from "@/models/user.models";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshTokens } from "@/lib/server/generateKaro";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const taklaEmail = email.trim();
    const taklaPassword = password.trim();

    if (!taklaEmail || !taklaPassword) {
      return NextResponse.json(
        { message: "Sharam karo yaar" },
        { status: 400 },
      );
    }

    await connectKaro();

    const userFound = await user.findOne({
      email: taklaEmail,
    });
    if (!userFound) {
      return NextResponse.json(
        { message: "User nhi mila bhai" },
        { status: 404 },
      );
    }
    const hashedTaklaPassword = await bcrypt.compare(
      taklaPassword,
      userFound.password,
    );
    if (!hashedTaklaPassword) {
      return NextResponse.json(
        { message: "password meh raaz hai" },
        { status: 400 },
      );
    }

    const { accessToken } = generateAccessAndRefreshTokens(userFound);

    // return

    const response = NextResponse.json(
      { message: "Login sucessful :)", success : true },
      { status: 200 },
    );
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 24 * 60 * 60, // 1 day
    });


    return response 

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server ka matter hai yaar" },
      { status: 500 },
    );
  }
}
