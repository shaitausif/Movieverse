import mongoose from "mongoose";

const favMovieSchema = new mongoose.Schema(
    {
        movID:{
            type:Number,
            required:true,
        },
        movTitle:{
            type:String,
            required:true,
        },
        movDesc:{
            type:String,
            required:true,
        },
        movRating:{
            type:Number,
            required:true,
        },
        movUrl:{
            type:URL,
            required:true,
        },
        movAdult:{
            type:Boolean,
            required:true,
        },
        
    },
    {timestamps:true}
)

export const FavMovies = 
mongoose.models.FavMovies || mongoose.model('FavMovies', favMovieSchema) 