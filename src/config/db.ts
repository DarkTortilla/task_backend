import mongoose from "mongoose";
import  colors  from "colors";



export const connectDB= async ()=>{
    try {
        const uri= process.env.QUERY_CONNECTION;
        const connection =await mongoose.connect(uri)

        const url= `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.magenta.bold(url))
    } catch (error) {
        console.log(colors.red("Error in database connection"))
        process.exit(1)
    }
}

