import { connectKaro } from "@/lib/db_connect";
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import { FavMovies } from "@/models/favMov.models";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const body = await request.json()
        const {movID,user,movTitle,movDesc,movRating,movURL,movAdult} = body 
        const { payload } = await getCurrentUser(request)
        await connectKaro()

        const userKiMovie = await FavMovies.findOne({
            movID:movID,
            _id : payload._id
        })
        if(!userKiMovie){
            await FavMovies.create({
                user:payload._id,
                movID,
                movTitle,
                movDesc,
                movRating,
                movURL,
                movAdult
            })
            return NextResponse.json({message:"Movie ko karo add",success:true},{status:200})
        }
        await FavMovies.findByIdAndDelete({
            _id:userKiMovie._id
        })
        return NextResponse.json({message:"movie sayyara level",success:false},{status:200})


        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal server ka lafda"},{status:500})

        
    }
}

