import type { Request, Response, NextFunction } from "express"; 
import Project, { IProtect } from "../models/Project"; 

declare global{
  namespace Express{
    interface Request{
      project:IProtect
    }
  }
}


export async function validateProjectExists(req: Request, res: Response, next: NextFunction) {
  const { projectId } = req.params;
  
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ error: error.message });
    }
    req.project=project
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
