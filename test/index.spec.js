import request from "supertest";
import app  from "../src/index";


describe("GET /", () => {
  test("should redirect to /list if user is in session", async () => {
    
    const authenticatedUserResponse = await request(app)
      .get("/")
      .set("Cookie", ["usuarioId=1"]) 

    expect(authenticatedUserResponse.statusCode).toBe(302); // 302 es el código de redirección
    expect(authenticatedUserResponse.header.location).toBe("/list");
  });

  test("should redirect to /login if no user is in session", async () => {
    // Simulamos una solicitud de un usuario no autenticado (sin usuario en sesión)
    const unauthenticatedUserResponse = await request(app).get("/").send();

    expect(unauthenticatedUserResponse.statusCode).toBe(302);
    expect(unauthenticatedUserResponse.header.location).toBe("/login");
  });
});