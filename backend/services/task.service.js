
import{addTask, deleteTask, getTask, getTasks, updateTask} from "../models/task.model.js"


export const getAllTasksService = async () =>{
    return(
        new Promise(async (res,rej) =>{
            try{
                const tasks = await getTasks();
                res(tasks);
            }catch(error){
                rej(error);
            }
            })
        )
}


export const getTaskByIdService = async (id) => {
    return(
        new Promise(async (res,rej) => {
            try{
                const tasks = await getTask(id);
                res(tasks);
            }catch(error){
                rej(error);
            }
        })
    )
};

export const createTaskService = async (taskData) => {
    return(
        new Promise(async (res,rej) => {
            try{
                const newTask = await addTask(taskData);
                res(newTask);
            }catch(error){
                rej(error);
            }
        })
    )
};


export const deleteTaskService = async (id) => {
    return(
        new Promise(async (res,rej) => {
            try{
                await deleteTask(id);
                res();
            }catch(error){
                rej(error);
            }
        })
    )
}

export const updateTaskService = async (id,task) => {
 return(
        new Promise(async (res,rej) => {
            try{
                const newTask = await updateTask(id,task);
                res(newTask);
            }catch(error){
                rej(error);
            }
        })
    )
}


