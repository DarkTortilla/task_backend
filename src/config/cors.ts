import { CorsOptions } from "cors";

export const corsConfig:CorsOptions={
    origin:function (origin, callback) {
        const whiteList = [process.env.FRONTEND_URL]
        console.log(origin)
        if (whiteList.includes(origin)) {
            callback(null, true)
        }
        else{
            callback(new Error('CORS Error'))
        }
    }
}