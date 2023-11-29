const request=require('supertest')
const app = require('../app')
require('../models')
let token;
let id;

beforeAll(async()=>{
const user={
    email:"test@gmail.com",
    password:"1234"
}
 const res= await request(app).post('/users/login').send(user);
 token=res.body.token;
})

test('GET /categories llamar a todas las categorias', async () => {
    const res= await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test('POST /categories crear categorias', async () => {
    const category={
        name:"procesadores"
    }
    const res=await request(app).post('/categories').send(category).set('Authorization', `Bearer ${token}`);
    id=res.body.id;
    console.log(res.status)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(category.name);
});

test('PUT /categories/:id actualizar categorias', async () => {
    const category= {
        name:"Procesadores"
    }
    const res= await request(app).put('/categories/'+id).send(category).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name);
});

test('DELETE /categories/:id elimina categorias', async () => {
    const res=await request(app).delete('/categories/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});