import { connectKaro } from "@/lib/db_connect"
import { getCurrentUser } from "@/lib/server/getCurrentUser"
import { Trending } from "@/models/trending.models"
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        const { payload } = await getCurrentUser(req)
        const body = await req.json()
        console.log("Body",body)
        // does this movie exists in the database

        await connectKaro()
        const doesMovieExist = await Trending.findOne({
            movie_id : body.id,
            userId : payload._id
        })

        console.log(doesMovieExist)

        if(doesMovieExist){
            return NextResponse.json({
                success : true,
                message : "Already clicked"
            },{
                status : 200
            })
        }

        await Trending.create({
            movie_id : body.id,
            userId : payload._id,
            movie : body
        })

        return NextResponse.json({
            success : true,
            message : "Movie added"
        }, {
            status : 201
        })

    } catch (error) {
        console.error(error)
    }
}



export async function GET() {
    try {

        await connectKaro()

        // Aggregate trending movies
        const trendingMovies = await Trending.aggregate([
            {
                $group: {
                    _id: "$movie_id", // group by movie id
                    count: { $sum: 1 }, // count occurrences
                    movie: { $first: "$movie" } // keep one movie object
                }
            },
            {
                $sort: {
                    count: -1 // highest count first
                }
            },
            {
                $limit: 7 // only top 7 movies
            },
            {
                $project: {
                    _id: 0,
                    movie_id: "$_id",
                    count: 1,
                    movie: 1
                }
            }
        ])

        return NextResponse.json(
            {
                success: true,
                movies: trendingMovies
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.error(error)

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong"
            },
            {
                status: 500
            }
        )
    }
}