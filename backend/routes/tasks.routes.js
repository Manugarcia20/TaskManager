import express from 'express';
const router = express.Router();

import{
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    editTask
} from '../controllers/tasks.controller.js';

router.get("/tasks", getAllTasks);

router.get('/tasks/:id',getTaskById);

router.post('/tasks', createTask);

router.put("/tasks/:id", editTask);

router.delete('/tasks/:id', deleteTask);


export default router;