import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";


const jsonSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

async function verifyCustomJWT(token) {
  try {
    const { payload } = await jwtVerify(token, jsonSecret);
    if (!payload) return null;
    return payload;
  } catch (error) {
    return null;
  }
}



export async function proxy(req){
    const pathname = req.nextUrl.pathname
    console.log("Pathname",pathname)

    const accessToken = req.cookies.get('accessToken')?.value
    const customJWT = accessToken ? await verifyCustomJWT(accessToken) : null
    const publicRoutes = [
    "/sign-in",
    "/signup",
    "/login",
    "/register",
    "/api/login",
    "/api/signup",
    "/images"
  ];

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (!customJWT && !isPublic && !pathname.startsWith('/api')) {
    console.log("redirecting to sign-in page")
    return NextResponse.redirect(new URL("/login", req.url));
  }
  


  // If authenticated and accessing login or signup page 
  if (customJWT && isPublic && !pathname.startsWith('/api')) {
    console.log("Redirecting to home page")
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();


}

export const config = {
  // "These are exception routes it also includes "/" or homepage of the application"
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|/|$).*)"],
}