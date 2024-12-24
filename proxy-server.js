const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();

// Activer CORS pour toutes les requêtes
app.use(cors());

// Parser les requêtes JSON
app.use(bodyParser.json());

// Route pour relayer les requêtes vers LibreTranslate
app.post('/translate', async (req, res) => {
    try {
        const response = await fetch('https://fr.libretranslate.com/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('Erreur du proxy :', error);
        res.status(500).json({ error: 'Erreur lors de la communication avec LibreTranslate.' });
    }
});

// Lancer le serveur proxy
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur proxy en cours d'exécution sur le port ${PORT}`));
