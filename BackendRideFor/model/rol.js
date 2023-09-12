const db =require('../config/config')
const Rol={};

// creo un metodo 
Rol.create=(id_user,id_rol,result)=>{

    const sql=`
    INSERT INTO
        user_has_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?)
    `;

    db.query(
        sql,
        [id_user,id_rol,new Date(),new Date()],
        (err,res) => {
            if(err){
                console.log('Error: ' ,err)
                result(err,null)
            }
            else{
                console.log('Usuario obtenido: ', res.insertId);
                result(null, res.insertId); // se utiliza para pasar el resultado de la operación 

            }


        }
         



    )
}

module.exports=Rol