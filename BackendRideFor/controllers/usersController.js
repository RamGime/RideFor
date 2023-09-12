const { error } = require('console');
const User=require('../model/user');
const Rol=require('../model/rol')
const bcrypt=require('bcryptjs');
const keys=require('../config/keys')
const jwt = require('jsonwebtoken');
const storage=require('../utils/cloud_storage')


// voy a exportar un objeto completo y va a tener metodos

module.exports={
   
 //    voy a crear un metodo para buscar por id
    login(req,res){
        // lo primero que necesito ees el email y el password

        const email=req.body.email;
        const password=req.body.password;

        // voy a llamar al modelo User con el metodo findbyEmail para buscar por email
        User.findByEmail(email,async(err,myUser)=>{

            console.log("Error",err)
            console.log("usuario",myUser)

            if(err){
                return res.status(501).json({
                        success:false,    //tipo de repuesta porque es una respuesta no exitosa
                        message:'Hubo un error con el registro del usuario ',
                        error:err
                })
            }


            // validacion en caso de que no venga informacion
            //  si no viene la data retornamos el error
            if(!myUser){
                return res.status(401).json({      //el cliente no tiene autorizacion para realizar esta peticion (401)
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'El Email no fue encontrado ',
                    error:err
            })

        }
        
        
        // voy a comparar las contraseñas incriptadas 
        // esta comparando el password del login con el pasword incriptado, cuando me registre
        
        
        //   si es password valido voy a ccrear el token de notificaciones
        const isPasswordValid=await bcrypt.compare(password,myUser.password);
        
            if(isPasswordValid){

                const token=jwt.sign({id:myUser.id,email:myUser.email},keys.secretOrKey,{});

                const data={
                    id:myUser.id,
                    name:myUser.name,
                    lastname:myUser.lastname,
                    email:myUser.email,
                    phone:myUser.phone,
                    image:myUser.image,
                    sesion_token:`JWT ${token}`,
                    roles: myUser.roles
                }



                //si no hubol un error vamos a retornar una respuesta faborable
                
                            return res.status(201).json({
                                success:true,    //tipo de repuesta porque es una respuesta exitosa
                                message:'El usuario fue autenticado',
                                data:data  //aca viene toda la informacio del usuario "en data"       *** tedata es el id del nuevo usuario que se registro 
                            })
            }
            else{
                return res.status(401).json({      //el cliente no tiene autorizacion para realizar esta peticion (401)
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'El password es incorrecto ',
                    error:err
            })
                
            }






         })



    },
   
   
   
   
   
    // es para registrar nuevo usuario

    register(req,res){
            const user=req.body  // de esta manera capturo los datos que me envie el cliente
             User.create(user,(err,data)=>{
                if(err){
                    return res.status(501).json({
                            success:false,    //tipo de repuesta porque es una respuesta no exitosa
                            message:'Hubo un error con el registro del usuario ',
                            error:err
                    })
                }

                //si no hubol un error vamos a retornar una respuesta faborable

                return res.status(201).json({
                    success:true,    //tipo de repuesta porque es una respuesta exitosa
                    message:'El registro del usuario se realizo correctamente',
                    data:data  //data es el id del nuevo usuario que se registro
                })


             })
    },

     // metodo para almacenar los datos del usuario y imagen
     async registerWithImage(req,res){
        const user=JSON.parse(req.body.user)  // de esta manera capturo los datos que me envie el cliente




        // para almacenar la imagen 
        // esto son los archivos que me va a enviar los usuarios 
        const files=req.files
        if(files.length>0){
            const path=`image_${Date.now()}`  //nombre con el cual se va a crear el archivoen firebase el cual no se va a repetir 
            const url =await storage(files[0],path)  //le vamos a enviar la imagen del usuario que esta en la poscion cero que es la unica

            if(url !=undefined && url != null){
                // si se cumple la condicion al modelo user le vamos a agrtegar el campo image 

                user.image=url


            }
        }



         User.create(user,(err,data)=>{
      


            if(err){
                return res.status(501).json({
                        success:false,    //tipo de repuesta porque es una respuesta no exitosa
                        message:'Hubo un error con el registro del usuario ',
                        error:err
                })
            }

                  // en vez de retornar la data que era el id del nuevo usuario  que se registro voy 
            // a agregarle el id diciendole que es igual a la data 
            user.id=`${data}`
            const token=jwt.sign({id:user.id,email:user.email},keys.secretOrKey,{});
            
            // al usuario le asignamos el token 
            user.session_token=`JWT ${token}`

                // voy a asignarle el rol 3 que es el de cliente o pasajero a todos los usuarios que se registren
            Rol.create(user.id,3,(err,data)=>{
                if(err){
                    return res.status(501).json({
                            success:false,    //tipo de repuesta porque es una respuesta no exitosa
                            message:'Hubo un error con el registro del rol de usuario ',
                            error:err
                    })
                }

                //si no hubol un error vamos a retornar una respuesta faborable
                return res.status(201).json({
                    success:true,    //tipo de repuesta porque es una respuesta exitosa
                    message:'El registro del usuario se realizo correctamente',
                    data:user //no voy a retornar el id sino que retornare el user completo 
                })
            });





    


         })
},




async updateWithImage(req,res){
    const user=JSON.parse(req.body.user)  // de esta manera capturo los datos que me envie el cliente




    // para almacenar la imagen 
    // esto son los archivos que me va a enviar los usuarios 
    const files=req.files
    if(files.length>0){
        const path=`image_${Date.now()}`  //nombre con el cual se va a crear el archivoen firebase el cual no se va a repetir 
        const url =await storage(files[0],path)  //le vamos a enviar la imagen del usuario que esta en la poscion cero que es la unica

        if(url !=undefined && url != null){
            // si se cumple la condicion al modelo user le vamos a agrtegar el campo image 

            user.image=url


        }
    }



     User.update(user,(err,data)=>{
  


        if(err){
            return res.status(501).json({
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'Hubo un error con el registro del usuario ',
                    error:err
            })
        }

 
            //si no hubol un error vamos a retornar una respuesta faborable
            return res.status(201).json({
                success:true,    //tipo de repuesta porque es una respuesta exitosa
                message:'El Usuario se actualizo correctamente',
                data:user //no voy a retornar el id sino que retornare el user completo 
            })
    








     })
},


// ES PARA ACTUALIZAR SIN LA IMAGEN 


async updateWithoutImage(req,res){
    const user=req.body // de esta manera capturo los datos que me envie el cliente




     User.updateWithoutImage(user,(err,data)=>{
  


        if(err){
            return res.status(501).json({
                    success:false,    //tipo de repuesta porque es una respuesta no exitosa
                    message:'Hubo un error con el registro del usuario ',
                    error:err
            })
        }

 
            //si no hubol un error vamos a retornar una respuesta faborable
            return res.status(201).json({
                success:true,    //tipo de repuesta porque es una respuesta exitosa
                message:'El Usuario se actualizo correctamente',
                data:user //no voy a retornar el id sino que retornare el user completo 
            })
    








     })
},






}