const express = require("express")
const app = express()
const mysql = require("mysql")
const port = 4000
const cors = require("cors")
const corsOptions = {
    origin: ['https://jlproducciones.github.io', 'https://jlproducciones.github.io/administrador'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());

app.listen(port, () => {
    console.log("base de datos jlproduccions conected")
})


app.get("/", (req, res) => {
    res.send("Servidor jlProduccions funcionando")
})


const connection = mysql.createConnection({
    host: "brbepiladuxmexzmujyr-mysql.services.clever-cloud.com",
    user: "uc3svp3nb0xpwk2q",
    password: "iqdscD6gQeGu8OgHueme",
    database: "brbepiladuxmexzmujyr",
    port: 3306
  });



// Establecer la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});




app.get("/", (req, res) => {
    res.send("Servidor jlProduccions funcionando");
});





// Enviar reseñas al frontend
app.get("/getResena", (req, res) => {
    const sql = "SELECT * FROM resenas";

    // Ejecutar la consulta SQL
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error al obtener las reseñas' });
            return;
        }
        res.json(results); // Enviar los resultados como respuesta en formato JSON
    });
});



// TRAER RESEÑAS DEL FRONTEND Y ENVIAR A LA BASE DE DATOS

app.post('/postResena', (req, res) => {
    const { name, resena, likes } = req.body;
    
    // Insertar la reseña en la base de datos
    const sql = `INSERT INTO resenas (name, resena, likes) VALUES (?, ?, ?)`;
 connection.query(sql, [name, resena, likes], (err, result) => {
      if (err) {
        console.error('Error al insertar la reseña:', err);
        res.status(500).send('Error al insertar la reseña');
      } else {
        console.log('Reseña añadida con éxito');
        res.status(200).send('Reseña añadida con éxito');
      }
    });
  });
  
 

  // TRAER LIKES DEL FRONTEND Y ENVIAR A LA BASE DE DATOS

  app.post('/postLikeResena', (req, res) => {
    // Incrementar el número de likes en 1 para todas las reseñas (o para una reseña específica si es necesario)
    const sql = `UPDATE resenas SET likes = likes + 1`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error al incrementar el número de likes:', err);
            res.status(500).send('Error al incrementar el número de likes');
        } else {
            console.log('Número de likes incrementado con éxito');
            res.status(200).send('Número de likes incrementado con éxito');
        }
    });
});


  // ENVIAR BANDAS A LA BASE DE DATOS

  app.post('/sendBands', (req, res) => {
   const {name, gender, leach, number, email} = req.body
   const sql = "INSERT INTO bands (name, gender, leach, number, email)  VALUES( ?, ?, ?, ?, ?)"
  connection.query(sql, [name, gender, leach, number, email], (err, result) => {
if(err){
    console.log("Erro al enviar la banda")
    res.status(500).send("Error al enviar nueva banda")
}
else{
    console.log("Nueva banda añadida con exito")
    res.status(200).send("nueva banda añadida con exito")
}
  })  


})


// ENVIAR BANDAS AL FRONTEND

app.get("/getBands", (req, res) => {
sql = "SELECT * FROM bands"
connection.query(sql, (err, result) => {
    if(err){
        console.log("Error al traer las bandas ", err),
        res.status(500).json({error: "Error al traer las bandas del backend "})
    }else {
        console.log("Bandas traidas con exito")
        res.status(200).json(result)
    }
})

})


// REGISTRO DE BANDAS
app.post("/sendRegisterBand", (req, res) => {
    const { id, date, time } = req.body;
    const sqlSelect = "SELECT * FROM bands WHERE id = ?";
    const sqlInsert = "INSERT INTO bands (id, date, time) VALUES (?, ?, ?)";
  
    connection.query(sqlSelect, [id], (error, rows) => {
      if (error) {
        console.log("Error al buscar la banda: " + error);
        res.status(500).send("Hubo un problema al buscar la banda.");
        return;
      }
  
      if (rows.length === 0) {
        console.log("No se encontró la banda con ID: " + id);
        res.status(404).send("No se encontró la banda con el ID proporcionado.");
        return;
      }
  
      // Si se encuentra la banda, insertar el registro
      connection.query(sqlInsert, [id, date, time], (error, result) => {
        if (error) {
          console.log("Error al insertar el registro: " + error);
          res.status(500).send("Hubo un problema al insertar el registro.");
          return;
        }
  
        console.log("Registro insertado correctamente.");
        res.status(200).send("Registro insertado correctamente.");
      });
    });
  });

app.get("/getRegisters", (req, res) => {
    
const sql = "SELECT date, time FROM bands";
    connection.query(sql, (err, result) => {
        if(err){
            console.log("Error al traer registros " + err)
            res.status(500).json({error: "Error al traer los registros"})
        } else{
            console.log("Registros traidos con exito " + result)
            res.status(200).json({result})
        }
    })
})
