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

test('GET /produts llamar todos los productos', async () => {
    const res= await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products crear productos', async () => {
    const product={
        title:"ultima generacion",
        description:"producto de ultima generacion que ayuda en el mundo laboral",
        brand:"LG",
        price:200
    }
    const res=await request(app).post('/products').send(product).set('Authorization', `Bearer ${token}`)
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

test('PUT /products/:id modifica los productos', async () => {
    const  product={
        title:"generacion ultimate",
        description:"producto de ultima generacion que ayuda en el mundo laboral",
        brand:"LG",
        price:200
    }
    const res = await request(app).put('/products/'+id).send(product).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(product.title);
});

test('DELETE /products/:id elimina un producto ', async () => {
    const res= await request(app).delete('/products/'+id).set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(204);
});