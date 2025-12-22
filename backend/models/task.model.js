import { db } from "../data/data.js"

import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function getTask(id){
 
    try{
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {id: docSnap.id, ...docSnap.data()};
    } else {
        console.log("No such document!");
        return null;
    }
    }catch(error){
      console.log(error);
      throw error;
    }
}

//getTask(id)

 export async function getTasks(){
    
      try{
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasks = [];
        querySnapshot.forEach((doc) => {
        tasks.push({...doc.data(), id: doc.id}); 
      });
        return tasks;
      }catch(error){
          console.log(error);
          throw error;
      }
}


export async function addTask(task){
  try{
        const docRef = await addDoc(collection(db,"tasks"),task)
        return {...task,id:docRef.id};
  }catch(error){
        console.log(error);
        throw error;
      }
  }
    

//addTask({name:"yerba", categoria: "infusion", precio: 200});


export async function updateTask(id,task){
  
    try{
      await updateDoc(doc(db,"tasks",id),{...task});
      // console.log("Task updated");
      return {success:true};
    }catch(error){
      console.log(error);
      throw error;
    }
    
}

//updateTask({id: "p13Bgi9p8iRCp7aEhEo6", precio: 220});

export async function deleteTask(id){
  
  try{
        await deleteDoc(doc(db,"tasks",id));
        console.log("Task deleted");
  }catch(error){
        console.log(error);
        throw error;
      }
  
}

//deleteTask("p13Bgi9p8iRCp7aEhEo6");