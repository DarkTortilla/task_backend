import { Router } from "express";
import { ProjectController } from "../controllers/Project.controller";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/Task.controller";
import {validateProjectExists} from "../middleware/project";
import Task from "../models/Task";
import { taskBelongsToProject, validateTaskExists } from "../middleware/task";

const router = Router();

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").notEmpty().withMessage("El id del proyacto es obligartorio"),
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.getProjectByID
);

router.put(
  "/:id",
  param("id").notEmpty().withMessage("El id del proyacto es obligartorio"),
  param("id").isMongoId().withMessage("ID no valido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete('/:id',
    param("id").notEmpty().withMessage("El id del proyacto es obligartorio"),
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.deleteProject

)

router.param('projectId',validateProjectExists)

router.post('/:projectId/tasks',
    
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion de la tarea es obligatorio'),
    handleInputErrors,
    TaskController.createTask)


router.get('/:projectId/tasks',
  TaskController.getProjectTask
)

router.param('taskId', validateTaskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no valido'),
  handleInputErrors,
  TaskController.getTaksByID
)
router.put('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no valido'),
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description').notEmpty().withMessage('La descripcion de la tarea es obligatorio'),
  handleInputErrors,
  TaskController.updateTask
)
router.put('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no valido'),
  body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
  body('description').notEmpty().withMessage('La descripcion de la tarea es obligatorio'),
  handleInputErrors,
  TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no valido'),
  handleInputErrors,
  TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
  param('taskId').isMongoId().withMessage('ID no valido'),
  body('status').notEmpty().withMessage('Status is required'),
  handleInputErrors,
  TaskController.updateStatus
)

export default router;
