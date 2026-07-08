# 📝 Full-Stack Task Manager

A robust task management application built with a modern web stack. This project implements a complete CRUD (Create, Read, Update, Delete) system, featuring a responsive React frontend and a persistent PostgreSQL database managed via Prisma ORM.


## 🚀 Instalación local
 
```bash
git clone https://github.com/diegodiech/task-manager-react
cd task-manager-react
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
```
DATABASE_URL= 
JWT_SECRET=
PORT=
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).


## 🚀 Technologies

### Frontend
- **React + Vite**: High-performance UI framework.
- **TypeScript**: Ensuring type safety and better developer experience.
- **CSS3**: Custom styling for a clean, user-centric interface.

### Backend
- **Node.js & Express**: Scalable API server.
- **Prisma ORM**: Modern database toolkit for type-safe database access.
- **PostgreSQL**: Reliable relational database (configured on port 5433).

- ## Usuario: user
- ## Contraseña: 9876