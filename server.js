//création du serveur
const express = require ('express')
const app = express()
const mysql = require ('mysql2')
const bodyParser = require ('body-parser')
//Authentification et session
const session = require ('express-session')

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

  app.use (bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false}))

  // Définir des routes pour récupérer des données de la base de données
  app.get('/api/apprenants', (req, res) => {
    db.query('SELECT * FROM apprenants', (err, rows, field) => {
      if (err) {
        console.error('Erreur de requête :', err);
        return res.status(500).send({ erreur: 'Erreur lors de la requête à la base de données' });
      }
       res.send(rows);
      
    });
  });

  app.post('/api/apprenants', (req, res)=>{
    const {idapprenant, nomapprenant, prenomapprenant,email, photo} = req.body;
    db.query ('INSERT INTO apprenants (idapprenant, nomapprenant, prenomapprenant, photo, email) values (?, ?, ?, ?, ?)', [idapprenant, nomapprenant, prenomapprenant, photo, email], (error) =>{
      if (error) {
        console.error (error);
        res.status(500).send ('Erreur de création de l\'apprenant');
        console.log('echec');
      } else {
        res.send ('apprenant créé avec succès')
        console.log('succès');
      }
    });
  });

  app.put('/apprenant/:id', (req, res)=>{
    const {idapprenant}= req.params.id
    const {nomapprenant, prenomapprenant, photo, email}= req.body;
    db.query('update apprenants set nomapprenant=?, prenomapprenant=?, photo=?, email=? where idapprenant=? ', [nomapprenant, prenomapprenant, photo, email, req.params.id], (error,data) =>{
    if (error) {
      console.error (error);
      res.status(500).send ('erreur de mise à jour');
    }else {
      res.send('mise à jour réussie avec succès');
    }
    });
  });

  app.delete('/apprenant/:id', (req, res)=>{
    const {idapprenant} = req.params.id;
    db.query('delete from apprenants where idapprenant=?', [req.params.id], (error,data) =>{
    if (error) {
      console.error (error);
      res.status(500).send ('erreur de suppression');
    }else {
      res.send('suppression avec succès');
    }
    });
  });

const port = process.env.PORT || 3002 //création du port

app.get ('/',(req, res)=>{
    res.send ('Félicitation');
});



//pour écouter le port
app.listen (port, ()=>{
    console.log(`Notre application est démarré sur le port ${port}`);
})