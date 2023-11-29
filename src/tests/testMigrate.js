const app = require('../app');
const sequelize = require('../utils/connection');
const request = require("supertest")

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        const user={
            email:"test@gmail.com",
            password:"1234",
            firstName:'test',
            lastName:'test',
            phone:'1222222222'
        }
        await request(app).post('/users').send(user)

        sequelize.sync();
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();