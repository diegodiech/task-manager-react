require("dotenv").config();

import express = require("express");
import nodeHttp2 = require("node:http2");
const cors = require("cors");


const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

// agregamos jwt
const jwt = require('jsonwebtoken');
const SECRET_KEY = "tareitas3000"

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


// JWT, acá entran todos los cambios agregados al backend para el uso de la validacion
// 5. RUTA LOGIN
app.post("/login", (req: any, res: any) => {
    const { username, password } = req.body;
    if (username === "diego" && password === "1234") {
        // 6. GENERAR TOKEN
        const token = jwt.sign(
            { username: username }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
});

// 7. MIDDLEWARE DE VERIFICACIÓN
const verifyToken = (req: any, res: any, next: any) => {
    // Leemos el encabezado 'authorization'
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        // El formato suele ser "Bearer <token>", así que lo separamos
        const token = bearerHeader.split(' ')[1];

        // Verificamos el token con nuestra SECRET_KEY
        jwt.verify(token, SECRET_KEY, (err: any, authData: any) => {
            if (err) {
                res.status(403).json({ message: "Token no válido o expirado" });
            } else {
                // Si todo está bien, guardamos los datos y continuamos
                req.user = authData;
                next();
            }
        });
    } else {
        // Si no hay token en el header
        res.status(403).json({ message: "Acceso denegado: se requiere token" });
    }
};

// 8. RUTA PROTEGIDA
app.get("/private", verifyToken, (req: any, res: any) => {
    res.json({
        message: "Acceso permitido",
        userData: req.user // Aquí verás el username que guardaste en el token
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
