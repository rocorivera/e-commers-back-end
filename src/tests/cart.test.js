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

test('GET /cart llama a todos los productos del carrito', async () => {
    const res = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
   
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart agregar producto ', async () => {
    const car={
        quantity:5
    }
    const res = await request(app).post('/cart').send(car).set("Authorization", `Bearer ${token}`);
    id =res.body.id;
    expect(res.status).toBe(201);   
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(car.quantity);
});

test('PUT /cart/:id  ', async () => {
    const car = {
        quantity: 2
    }
    const res = await request(app)
    .put('/cart/'+id)
    .send(car)
    .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(car.quantity);
});

test('DELETE /cart/:id elimina productos del carrito ', async () => {
    const res= await request(app).delete('/cart/'+id).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});
