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

    if(!task){
        return res.status(404).json({message: 'Task no encontrada'});
    }
        return res.status(200).json(task);

}catch(error){
    return res.status(500).send({ message: 'Error interno' });
}
}

export const createTask = async (req,res) => {
    try{
        const task = req.body;
        const newTask = await tasksService.createTaskService(task);
        return res.status(201).json(newTask);
    }catch(error){
        res.status(500).send({ message: 'Error interno' });
    }

};

export const deleteTask = async (req,res) => {
    try{
        const id = req.params.id;
    if(id){
        await tasksService.deleteTaskService(id) 
        return res.sendStatus(204);
    }else{
        return res.status(404).json({ message: 'Task no encontrada' });
    }

    }catch(error){
         return res.status(500).send({ message: 'Error interno' });
    }
}

export const editTask = async (req,res) => {

    try{
        const id = req.params.id;
        const task = req.body;

        if(!id || !task){
            return res.status(400).json({ message: 'Faltan datos' });
        }
        const result = await tasksService.updateTaskService(id,task);
            return res.status(200).json(result);
    
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Error interno' });
    }
}