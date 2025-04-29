import mongoose, {Schema, Document, PopulatedDoc,Types} from "mongoose";
import Task, { ITask } from "./Task";

export interface IProtect extends Document  {
    projectName:string,
    clientName:string,
    description:string,
    tasks: PopulatedDoc<ITask & Document>[]
}


const ProjectSchema: Schema = new Schema({
    projectName:{
        type:String,
        required:true,
        trim:true
    },
    clientName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }
    ]
},{timestamps:true})

const Project = mongoose.model<IProtect>('Project', ProjectSchema)

export default Project;