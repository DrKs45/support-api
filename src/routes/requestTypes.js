const express = require('express');
const RequestType = require('../models/RequestType');

const router = express.Router();

// GET /api/request-types : liste tous les types actifs
router.get('/', async (req, res) => {
  try {
    const requestTypes = await RequestType.find({ isActive: true });
    res.json(requestTypes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// GET /api/request-types/:id : récupère un type par ID
router.get('/:id', async (req, res) => {
  try {
    const requestType = await RequestType.findById(req.params.id);
    if (!requestType) {
      return res.status(404).json({ message: 'RequestType non trouvé' });
    }
    res.json(requestType);
  } catch (error) {
    res.status(400).json({ message: 'ID invalide', error: error.message });
  }
});

// POST /api/request-types : crée un nouveau type
router.post('/', async (req, res) => {
  try {
    const requestType = new RequestType(req.body);
    const saved = await requestType.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
});


