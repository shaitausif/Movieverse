import { connectKaro } from "@/lib/db_connect"
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
    const hashedPassword = await bcrypt.hash(trimmedPassword, 12)
    console.log('meow');
    
    await user.create({
        name: trimmedUsername,
        email: trimmedEmail,
        age: numericAge,
        password: hashedPassword,
    })
    
    console.log('kaka mala zau deya');
    return NextResponse.json({ message: 'Data inserted successfully', success: true }, { status: 201 })
  } catch (error) {
    console.error('Error occurred while inserting user data:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
