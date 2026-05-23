import { user } from "@/models/user.models"
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import { connectKaro } from '@/lib/db_connect';
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req) {
  try {
    const {payload} = await getCurrentUser(req);
    
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to DB and search for the User and delete the refreshToken from user's document
    await connectKaro();
    const isUserExists = await user.findById({ _id: payload._id });

    if (!isUserExists)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

   
   

    const cookieStore = await cookies();

    const options = {
      httpOnly: true,
      secure: false,
    };

    cookieStore.set("accessToken", "", options);
    // cookieStore.set("next-auth.session-token", "", { ...options, maxAge: 0 });
    // cookieStore.set("__Secure-next-auth.session-token", "", {
    //   ...options,
    //   maxAge: 0,
    // });

    return NextResponse.json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
