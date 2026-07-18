# 📝 Full-Stack Task Manager

A robust task management application built with a modern web stack. This project implements a complete CRUD (Create, Read, Update, Delete) system, featuring a responsive React frontend and a persistent PostgreSQL database managed via Prisma ORM.

<!-- BADGE_CI -->

## 🚀 Instalación local

El proyecto es un monorepo con `/frontend` (React + Vite + TS) y `/backend` (Node + Express + Prisma). Cada carpeta tiene sus propias dependencias.

```bash
git clone https://github.com/diegodiech/task-manager-react
cd task-manager-react

cd backend
npm install

cd ../frontend
npm install
```

También podés levantar todo (Postgres + backend + frontend) con Docker:

```bash
docker compose up --build
```

### Variables de entorno

Cada carpeta tiene su propio `.env` (ver `backend/.env.example` y `frontend/.env.example`):

```
# backend/.env
DATABASE_URL=
PORT=
```

```
# frontend/.env
VITE_API_URL=
```

## 📜 Comandos disponibles

| Comando          | Carpeta     | Descripción                                             |
|-------------------|-------------|----------------------------------------------------------|
| `npm run dev`     | frontend/backend | Levanta el entorno de desarrollo                    |
| `npm run build`   | frontend/backend | Genera el build de producción                       |
| `npm test`        | frontend    | Corre las pruebas automatizadas (pendiente — Sesión 3)    |

## 🗄️ Base de datos

PostgreSQL con migraciones gestionadas con Prisma (`backend/prisma`).

## 🚀 Technologies

### Frontend
- **React + Vite**: High-performance UI framework.
- **TypeScript**: Ensuring type safety and better developer experience.
- **CSS3**: Custom styling for a clean, user-centric interface.

### Backend
- **Node.js & Express**: Scalable API server.
- **Prisma ORM**: Modern database toolkit for type-safe database access.
- **PostgreSQL**: Reliable relational database.

### Infraestructura
- **Docker / docker-compose**: `postgres`, `backend` y `frontend` orquestados para desarrollo local.
# prueba de protección
