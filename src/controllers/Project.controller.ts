import type { Request,Response } from "express"
import Project from "../models/Project"

export class ProjectController{
    static createProject= async (req:Request, res:Response) =>{
        const project= new Project(req.body);
        try {
            await project.save()
            res.status(201).json(project)
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProjects= async (req:Request, res:Response) =>{
        try {
            const projects= await Project.find({})
            res.status(200).json(projects)
        } catch (error) {
            console.log(error)
        }
    }


    static getProjectByID = async (req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const project = (await Project.findById(id)).populated('tasks');

            if (!project) {
                res.status(404).json({msg:'Proyecto no existente'});
            }
            res.status(200).json(project)

        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req:Request, res:Response)=>{
        const {id} = req.params
        try {
            const project = await Project.findById(id);

            if (!project) {
                res.status(404).json({msg:'Proyecto no existente'});
            }

            project.clientName= req.body.clientName;
            project.projectName= req.body.projectName;
            project.description= req.body.description

            await project.save()
            res.send('Updated project')
        } catch (error) {
            
        }

    }
    static deleteProject= async (req:Request, res:Response)=>{
        const {id} = req.params
        try {
            const project= Project.findById(id);
            if (!project) {
                res.status(404).json({msg:'Proyecto no existente'});
            }
            await project.deleteOne()
            res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}

