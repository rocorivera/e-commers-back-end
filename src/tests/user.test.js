const request=require('supertest')
const app = require('../app')
require('../models')
let id;
let token;



test('POST /users crear usuarios', async () => {
    const user={
        firstName:"pedro",
        lastName:"fuentes",
        email:"pedro@gmail.com",
        password:"12345",
        phone:"1234567891"
    }
    const res= await request(app).post('/users').send(user);
    id=res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});
test('POST /users/login ', async () => {
    const log={
        email:"pedro@gmail.com",
        password:"12345",
    }
    const res=await request(app).post('/users/login').send(log);
    token=res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('POST /users/login debe retornar credenciales incorrectas', async () => {
    const log={
        email:"error@gmail.com",
        password:"12345",
    }
    const res=await request(app)
    .post('/users/login').send(log);
    expect(res.status).toBe(401);
});

test('GET /users llamando todos los users', async () => {
    const res=await request(app)
    .get('/users')
    .set('Authorization' , `Bearer ${token}`);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id modificar usuarios', async () => {
    const user={
        firstName:"pedro"}
    const res=await request(app).put(`/users/${id}`).send(user).set('Authorization' , `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});
test('DELETE /users/:id eliminar usuario ', async () => {
    const res= await request(app)
    .delete(`/users/${id}`)
    .set('Authorization' , `Bearer ${token}`);
    expect(res.status).toBe(204);
});