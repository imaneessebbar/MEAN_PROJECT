const express = require('express');
const app     = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectId;
const url         = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true }, (err, client) => {
    let db = client.db("SUPERVENTES");
    
    /* Liste des produits */
    app.get("/produits", (req,res) => {
        console.log("/produits");
        try {
            db.collection("produits").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /produits : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Liste des produits suivant une catégorie */
    app.get("/produits/:categorie", (req,res) => {
	let categorie = req.params.categorie;
        console.log("/produits/"+categorie);
        try {
            db.collection("produits").find({type:categorie}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /produits/"+categorie+" : "+ e);
            res.end(JSON.stringify([]));
        }
    });
    

    
    /* Liste des catégories de produits */
    app.get("/categories", (req,res) => {
        console.log("/categories");
	    categories = [];
        try {
            db.collection("produits").find().toArray((err, documents) => {
		    for (let doc of documents) {
                if (!categories.includes(doc.type)) categories.push(doc.type); 
		    }
            res.end(JSON.stringify(categories));
            });
        } catch(e) {
            console.log("Erreur sur /categories : " + e);
            res.end(JSON.stringify([]));
        }
    });
    
    /* Ajout d'un produit dans un panier*/
    app.put("/panier/add/:user", (req,res) =>{
        console.log("DEBUT/panier/user/produit/ajout ");
        let user = req.params.user;
        
    	try {
            db.collection("paniers")
            .updateOne( { "_id": new ObjectID(req.body._id) },
            { $set: { "user": req.params.user, "produit": req.body.produit, "quantite":req.body.quantite} },
            { upsert: true });
                //{"user": user},$set(req.body));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
    


/* Liste des paniers */
    app.get("/paniers", (req,res) => {
        console.log("/panier");
        try {
            db.collection("paniers").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /paniers : "+ e);
            res.end(JSON.stringify([]));
        }
    });

 /* Affichage d'un panier  */
    app.get("/panier/:user", (req,res) => {
        let membre = req.params.user;
        try {
            db.collection("paniers").find({"user":membre}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /produits/"+membre+" : "+ e);
            res.end(JSON.stringify([]));
        }
    });


     /* Vider un panier  */
     app.put("/panier/vider", (req,res) =>{
        console.log("DEBUT/panier/user/vider ");
          
    	try {
            db.collection("paniers")
            .updateOne( {"user": req.body.user },
            { $set: {  "_id": new ObjectID(req.body._id), "produit": req.body.produit, "quantite":req.body.quantite} },
            { upsert: true });
                //{"user": user},$set(req.body));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /*Nouveau client*/
    app.post("/membre/new", (req,res) => {
        //chaque nouveau client doit avoir un panier vide!
        try {
            db.collection("membres")
            .insertOne(req.body, function (error, response) {
                if(error) {
                    res.end(JSON.stringify({"resultat": 0, "message": "Ajout echoué"}));
                } else {
                    res.end(JSON.stringify({"resultat": 1, "message": "Ajout réussi"}));
                }
            });
        } catch (e) {
            print (e);
        }
    });
    /*  Nouveau panier pour nouvel utilisateur */
    app.post("/panier/new",(req,res)=>{
        try {
            db.collection("paniers")
            .insertOne(req.body, function (error, response) {
                    if(error) {
                    res.end(JSON.stringify({"resultat": 0, "message": "panier echoué"}));
                } else {
                    res.end(JSON.stringify({"resultat": 1, "message": "panier réussi"}));
                }
            });
        } catch (e) {
            print (e);
        }
    });
    /* Connexion */
    app.post("/membre/connexion", (req,res) => {
        try {
            db.collection("membres")
            .find(req.body)
            .toArray((err, documents) => {
                if (documents != undefined && documents.length == 1)
                    res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie"}));
                else res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
});

app.listen(8888);
