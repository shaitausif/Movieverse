import jwt from 'jsonwebtoken'

export const generateAccessAndRefreshTokens = (user) => {
    try {

        
        const accessToken = jwt.sign(
    {
      // this object contains the payload
      _id: user._id,
      email: user.email,
      name: user.name,
      age : user.age
    },
    // It ensures that the environment variable is set and not undefined
    // this is the secret key that we will use to sign the token
    process.env.ACCESS_TOKEN_SECRET,
    // the below object contains the expiry information of this token
    {
      // Typecastting the expiresIn to string because it can be undefined
      expiresIn: "1d",
    }
  );
        // const refreshToken =  user.generateRefreshToken()

        // Here we've successfully generated both access and refresh tokens and now we'll give the access token to the user and also store the refresh token in the database
        // user.refreshToken = refreshToken; 
        // here we don't want any further mongoose validation like password is required so we'll save it like this
        // await user.save({validateBeforeSave: false})

        // now return the access token and refresh token
        const tokens = {accessToken}  
        return tokens

    } catch (error) {
        NextResponse.json({success : false, message : "Something went wrong while generating access and refresh tokens"},{status : 500})
    }
}


