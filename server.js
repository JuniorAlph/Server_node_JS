import express from "express";

const app = express();
const PORT = 3000;

//Middlewaare crucial: permet à Express de lire et comprendre les "payloads" au format JSON
app.use(express.json());

//Notre Base de données temporaires
let membres =[
    {id: 1, nom: "Kamga", prenom: "Samuel", ville: "Rabat", statut: "Actif" },
    {id: 1, nom: "Menga", prenom: "Grace", ville: "Casablanca", statut: "En attente"}
];

// --- LES ROUTES DE NOTRE API ---

//1. GET /: Message  de bienvenue
app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API de l'Association des Etudaints Camerounais au Maroc");
});

//2. GET /api/membres : Récupérer tous les membres
app.get('/api/membres', (req, res) =>{
    // On renvoie le tableau complet dans le payload de la réponse
    res.status(200).json(membres)
});

// 3. GET /api/membres:id : Récupérer un membre précis grace à son ID
app.get('/api/membres:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const membre = membres.find(m => m.id === id);

    if(!membre){
        return res.status(404).json({message: "Membre non trouvé"});
    }
    res.status(200).json(membre);
});

// 4. POST /api/membres : Ajouter un nouveau membre(Inscription)
app.post('api/membres', (req, res) =>{
    const {nom, prenom, ville, statut} = req.body;

    //Validation
    if(!nom || !prenom, !ville){
        return res.status(400).json({message: "veuillez remplir tous les champs obligatoires (nom, prenom, ville)"});
    }
    const nouveauMembre ={
        id: membres.length + 1,
        nom,
        prenom,
        ville,
        statut: statut || "En attente"
    };

    membres.push(nouveauMembre);

    res.status(201).json({
        message: "Membre inscrit avec succès !",
        données : nouveauMembre
    });
});

app.listen(PORT, () => {
    console.log("Serveur démarré sur : http://locahost :${PORT}")
})