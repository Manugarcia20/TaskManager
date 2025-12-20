import { db } from "../data/data.js"

import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export function getTask(id){
  return new Promise(async (res,rej) => {
    try{
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Snap data: ", docSnap)
        console.log("Document ID:", docSnap.id);
        console.log("Document data:", docSnap.data());
        res(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
        console.log("No such document!");
        res();
    }
  }catch(error){
    console.log(error);
    rej(error);
  }

})
 
}

//getTask(id)

 export function getTasks(){
  return(
    new Promise(async (res,rej) => {
      try{
        const querySnapshot = await getDocs(collection(db, "tasks"));
        //console.log("Snap completa: ", querySnapshot)
        const tasks = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        tasks.push({...doc.data(), id: doc.id}); 
      });
      //console.log(tasks);
      res(tasks);
      }catch(error){
          console.log(error);
          rej(error);
      }
    })

  )
}
//getTasks() 

export function addTask(task){
  return(
    new Promise(async (res, rej) => {
      try{
        const docRef = await addDoc(collection(db,"tasks"),task)
        console.log("Doc ID:", docRef.id, "Task: ")
        res({...task,id:docRef.id})
      }catch(err){
        console.log(err);
        rej(error);
      }
    })
  )
}

//addTask({name:"yerba", categoria: "infusion", precio: 200});


export function updateTask(id,task){
  return(
    new Promise(async (res,rej) => {
    try{
      await updateDoc(doc(db,"tasks",id),{...task});
      console.log("Task updated");
      res();
    }catch(error){
      console.log(error);
      rej(error);
    }
    })
  )

}

//updateTask({id: "p13Bgi9p8iRCp7aEhEo6", precio: 220});

export function deleteTask(id){
  return(
    new Promise(async (res,rej) => {
      try{
        await deleteDoc(doc(db,"tasks",id));
        console.log("Task deleted");
        res();
      }catch(error){
        console.log(error);
        rej(error);
      }


    })


  )
  
}

//deleteTask("p13Bgi9p8iRCp7aEhEo6");