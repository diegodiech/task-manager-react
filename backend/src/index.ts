require("dotenv").config();

import express = require("express");
import nodeHttp2 = require("node:http2");
const cors = require("cors");


const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req: any, res: any) => {
    res.send("Backend is working!");
});

// Obtener todas las tareas
app.get("/tasks", async (req: any, res: any) => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {
                id: 'asc' 
            }
        });
        res.json(tasks);
    }   catch (error){
        console.error("Eror en GET /tasks:", error);
        res.status(500).json({ message: "Error al obtener tareas"});
    }
});

// Crear una nueva tarea

app.post("/tasks", async (req: any, res: any) =>{
    try{
        const newTask = await prisma.task.create({
            data: {
                text: req.body.text,
                completed: false,
            },
        });

        res.json(newTask);
    }   catch (error){
        console.error("Eror en POST /tasks:", error);
        res.status(500).json({ message: "Error al crear tarea"});
    }
});

// Ruta Delete: Eliminar una tarea

app.delete("/tasks/:id", async (req: any, res: any) =>{
    try {
        const taskId = Number(req.params.id);

        await prisma.task.delete({
            where: { id: taskId },
        });

        res.json({ message: "Deleted" });
    }   catch (error){
        console.error("Eror en DELETE /tasks:id", error);
        res.status(500).json({ message: "Error al eliminar tarea"});
    }
});

// Ruta Put: Cambiar el estado 

app.put("/tasks/:id", async (req: any, res: any) => { 
    try {
        const taskId = Number(req.params.id);

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                completed: req.body.completed,
            },
        });
        res.json(updatedTask);
    }   catch (error){
        console.error("Eror en PUT /tasks:id", error);
        res.status(500).json({ message: "Error al actualizar tarea"});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
