import express from 'express';
import cors from 'cors';
import routerTask from './backend/routes/tasks.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// const corsConfig = {
//     origin: ['http://localhost:3000', 'http://127.0.0.1:5500','https://taskmanager-abpl.onrender.com','https://task-manager-swart-iota.vercel.app'], // dominios permitidos
//     methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],                  // métodos permitidos
//     allowedHeaders: ['Content-Type', 'Authorization'],          // cabeceras permitidas
//     exposedHeaders: ['Content-Length'],                         // cabeceras visibles al cliente
//     credentials: false,                                          // habilitar credenciales
//     maxAge: 600,                                                // cache preflight
//     optionsSuccessStatus: 204                                   // respuesta preflight exitosa
// }


// app.use(cors(corsConfig));
app.use(cors());
app.use(express.json()); 

app.use("/api",routerTask);

app.use((req,res,next) => {
    res.status(404).send('Recurso no encontrado o ruta invalida');
})

 app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
 });