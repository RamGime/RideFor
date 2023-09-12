const userController=require('../controllers/usersController.js')

// const passport=require('passport')

// la ruta recibe un parametro que s la aplicacion oo server

// upload nos va a permitir recibir en la ruta un archivo 

module.exports=(app,upload)=>{
    app.post('/api/users/create',userController.register);
    app.post('/api/users/createWithImage',upload.array('image',1) ,userController.registerWithImage);
    app.post('/api/users/login',userController.login);


    // rutas restrinjidas 

    app.put('/api/users/update',upload.array('image',1),userController.updateWithImage);
    app.put('/api/users/updateWithoutImage',userController.updateWithoutImage);

}