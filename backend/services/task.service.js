
import{addTask, deleteTask, getTask, getTasks, updateTask} from "../models/task.model.js"


export const getAllTasksService = async () =>{     
    try{
        const tasks = await getTasks();
        return tasks;
    }catch(error){
        console.log(error);
        throw error;
    }  
}


export const getTaskByIdService = async (id) => {
    try{
        const task = await getTask(id);
        return task;
    }catch(error){
        console.log(error);
        throw error;
    } 
};

export const createTaskService = async (taskData) => {
    try{
        const newTask = await addTask(taskData);
        return newTask;
    }catch(error){
        console.log(error);
        throw error;
    }
};


export const deleteTaskService = async (id) => {
    try{
        const result = await deleteTask(id);
        return result;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const updateTaskService = async (id,task) => {
    try{
        const newTask = await updateTask(id,task);
        return newTask;
    }catch(error){
        console.log(error);
        throw error;
    }
}


