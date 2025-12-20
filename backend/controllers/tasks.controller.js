import * as tasksService from '../services/task.service.js'

export const getAllTasks = async (req,res) => {
    try{
        const tasks = await tasksService.getAllTasksService()
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).send({ message: 'Error interno' });
    }
};

export const getTaskById = async (req,res) => {

try{
    const id = req.params.id;
    const task = await tasksService.getTaskByIdService(id);

    if(id){
        if (task) {
            res.status(200).json(task);
        }else {
            res.status(404).json({ message: 'Task no encontrada' });
        }
    }else{
        res.status(400).json(task);
    }

}catch(error){
    res.status(500).send({ message: 'Error interno' });
}
}

export const createTask = async (req,res) => {
    try{
        const task = req.body;
        const newTask = await tasksService.createTaskService(task);
        res.status(200).json(newTask);
    }catch(error){
        res.status(500).send({ message: 'Error interno' });
    }

};

export const deleteTask = async (req,res) => {
    try{
    const id = req.params.id;
    if(id){
        await tasksService.deleteTaskService(id) 
        res.status(200).send();
    }else{
        res.status(404).json({ message: 'Task no encontrada' });
    }

    }catch(error){
         res.status(500).send({ message: 'Error interno' });
    }
}

export const editTask = async (req,res) => {
    try{
        const id = req.params.id;
        const task = req.body;
        if(id && task){
            const newTask = await tasksService.updateTaskService(id,task);
            res.status(200).json(newTask);
        }else{
            res.status(404).json({ message: 'Task no encontrada' });
        }

    }catch(error){
        res.status(500).send({ message: 'Error interno' });
    }
}