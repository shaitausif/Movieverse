import { connectKaro } from "@/lib/db_connect"
import { generateAccessAndRefreshTokens } from "@/lib/server/generateKaro"
import { user } from "@/models/user.models"
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { username, email, password, age } = body

    if (!username || !email || !password || age == null) {
      return NextResponse.json({ message: 'mehnat toh kar yaar' }, { status: 400 })
    }

    const trimmedUsername = String(username).trim()
    const trimmedEmail = String(email).trim()
    const trimmedPassword = String(password).trim()
    const numericAge = Number(age)

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword || Number.isNaN(numericAge)) {
      return NextResponse.json({ message: 'mehnat toh kar yaar' }, { status: 400 })
    }

    await connectKaro()
    const isUserExists = await user.findOne({
      email : trimmedEmail
    })

    if(isUserExists){
      return NextResponse.json({message : "Tu dobara aa gya", success : false},{status : 400})
    }
    const hashedPassword = await bcrypt.hash(trimmedPassword, 12)
    // console.log('meow');
    
    const userCreated = await user.create({
        name: trimmedUsername,
        email: trimmedEmail,
        age: numericAge,
        password: hashedPassword,
    })
    console.log(userCreated);
    
    
    // console.log('kaka mala zau deya');

    const { accessToken } = await generateAccessAndRefreshTokens(userCreated)
    const response =  NextResponse.json({ message: 'Data inserted successfully', success: true }, { status: 201 })
    response.cookies.set('accessToken',accessToken,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 24 * 60 * 60, // 1 day
    })

    return response
  } catch (error) {
    console.error('Error occurred while inserting user data:', error)
    return NextResponse.json({ message: 'Internal Server Error' , success : false}, { status: 500 })
  }
}
