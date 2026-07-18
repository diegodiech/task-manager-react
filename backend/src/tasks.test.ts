import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./app";

describe("API de tareas", () => {
  it("rechaza crear una tarea con texto vacío o solo espacios", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ text: "   " });

    expect(res.status).toBe(400);
  });
});
