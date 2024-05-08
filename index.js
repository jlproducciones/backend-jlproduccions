const express = require("express")
const app = express()
const mysql = require("mysql")
const port = 4000
const cors = require("cors")
const corsOptions = {
    origin: 'https://jlproducciones.github.io',
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





app.post('/postResena', (req, res) => {
    const { name, resena } = req.body;
    
    // Insertar la reseña en la base de datos
    const sql = `INSERT INTO resenas (name, resena) VALUES (?, ?)`;
 connection.query(sql, [name, resena], (err, result) => {
      if (err) {
        console.error('Error al insertar la reseña:', err);
        res.status(500).send('Error al insertar la reseña');
      } else {
        console.log('Reseña añadida con éxito');
        res.status(200).send('Reseña añadida con éxito');
      }
    });
  });
  
 