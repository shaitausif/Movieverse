import mongoose from "mongoose";


const TrendingSchema = new mongoose.Schema({
    movie_id : {
        type : String,
        required : true
    },
    movie : {
        type : Object,
        required : true
    },
    userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    
    
}, {
    timestamps : true
})


export const Trending = mongoose.models.Trending || mongoose.model("Trending",TrendingSchema)