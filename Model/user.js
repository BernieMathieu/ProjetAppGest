class User {
    constructor (id, noms, prenoms, sexe, téléphone, adressemail, datedenaissance, niveau, activiteextrascolaire){
        this.id = id;
        this.noms = noms;
        this.prenoms = prenoms;
        this.sexe = sexe;
        this.téléphone = téléphone;
        this.adressemail = adressemail;
        this.datedenaissance = datedenaissance;
        this.niveau = niveau;
        this.activiteextrascolaire = activiteextrascolaire;
    }
}

module.exports = {User};