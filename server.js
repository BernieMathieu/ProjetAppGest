//création du serveur
const express = require ('express')
const app = express ()
const mysql = require ('mysql2')

// Configurer la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'APP_GEST'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connecté à la base de données MySQL');
  });
  
  // Définir des routes pour récupérer des données de la base de données
  app.get('/api/apprenants', (req, res) => {
    db.query('SELECT * FROM apprenants', (err, rows, field) => {
      if (err) {
        console.error('Erreur de requête :', err);
        return res.status(500).json({ erreur: 'Erreur lors de la requête à la base de données' });
      }
       res.json(rows);
      
    });
  });

  app.post('/api/apprenants', (req, res)=>{
    const {id, noms, prenoms, sexe, téléphone, adressemail, datedenaissance, niveau, activiteextrascolaire} = req.body;
    connection.query ('insert into apprenants (id, noms, prenoms, sexe, téléphone, adressemail, datedenaissance, niveau, activiteextrascolaire) values (?, ?)', [id, noms, prenoms, sexe, téléphone, adressemail, datedenaissance, niveau, activiteextrascolaire], (error) =>{
      if (error) {
        console.error (error);
        res.status (500).send ('Erreur de création de l\apprenant');
      } else {
        res.send ('apprenant créé avec succès')
      }
    });
  });

  app.put ('/apprenant/:id', (req, res)=>{
    const {id} = req.params;
    const {id, noms, prenoms, sexe, téléphone, adressemail, datedenaissance, niveau, activiteextrascolaire}
  }
  )

const port = process.env.PORT || 3002 //création du port

app.get ('/',(req, res)=>{
    res.send ('validé');
});



//pour écouter le port
app.listen (port, ()=>{
    console.log(`Notre application est démarré sur le port ${port}`);
})