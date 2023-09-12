const db=require('../config/config')

const Category={}



// metodo para mostrar las empresas 

Category.getAll=(result)=>{
    const sql=`
SELECT
    id,
    name,
    description,
    image
FROM
    categories
ORDER BY
    name
`;
  db.query(
    sql,
    (err,data) => {
        if(err){
            console.log('Error: ', err)
            result(err,null)
        }
        else{
            console.log('id de la nueva categoria: ', data);
            result(null, data); // se utiliza para pasar el resultado de la operación ;  data=las filas que me reotna la consulta , nombre imagen y description
        }
    }
    )
}

Category.create=(category,result)=>{
    const sql= `
    INSERT INTO
        categories(
            name,
            description,
            image,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?)
    `;

    // voy a realizar la consulta 
    db.query(
        sql,
        [
            category.name,
            category.description,
            category.image,
            new Date(),
            new Date()
        ],
        (err,res) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                console.log('id de la nueva categoria: ', res.insertId);
                result(null, res.insertId); // se utiliza para pasar el resultado de la operación 

            }


        }
    )

}



Category.update=(category,result)=>{
    const sql=`
    UPDATE
        categories
    SET
        name = ?,
        description= ?,
        image= ?,
        updated_at= ?
    WHERE
        id=?
    `;

    db.query(
        sql,[
            category.name,
            category.description,
            category.image,
            new Date(),
            category.id
        ],
        (err,res) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                console.log('id de la Empresa actualizada: ', category.id);
                result(null, category.id); // se utiliza para pasar el resultado de la operación 
            }
        }
    )
}








Category.delete=(id,result)=>{
    const sql=`
    DELETE FROM
        categories 
    WHERE 
        id=?
    `;
    db.query(
        sql, 
        id,
        (err,res) => {
            if(err){
                console.log('Error: ', err)
                result(err,null)
            }
            else{
                console.log('id de la empresa eliminada: ', id);
                result(null, id); // se utiliza para pasar el resultado de la operación 

            }


        }
    )
}

module.exports = Category
