const Catway = require('../models/Catway');
const mongoose = require('mongoose');

exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render('catwaysList', { catways });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.render('catwaydetail', { catway: null });
    res.render('catwayDetails', { catway });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createCatway = async (req, res) => {
  try {
    const newCatway = new Catway({
      name: req.body.name,
      catwayState: req.body.catwayState,
      type: req.body.type,
      catwayNumber: req.body.catwayNumber
    });
    
    const savedCatway = await newCatway.save();
    res.status(201).json(savedCatway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCatway = async (req, res) => {
  try {
    const { catwayId, newDescription} = req.body;

    if (!catwayId) {
      return res.status(400).send('ID Catway requis');
    }

    if (!mongoose.Types.ObjectId.isValid(catwayId)) {
      return res.status(400).json({ error: 'ID Catway non valide' });
    }

    const updatedData = {};
    if (newDescription) updatedData.catwayState = newDescription;

    const updatedCatway = await Catway.findByIdAndUpdate(catwayId, updatedData, { new: true });

    if (!updatedCatway) {
      return res.status(404).json({ error: 'Catway non trouvé' });
    }

    res.status(200).json(updatedCatway);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du Catway' });
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    const catwayId = req.body.catwayId;

    if (!catwayId) {
      return res.status(400).send('ID catway requis');
    }

    if (!mongoose.Types.ObjectId.isValid(catwayId)) {
      return res.status(400).send('ID catway invalide');
    }

    const catway = await Catway.findByIdAndDelete(catwayId);

    if (!catway) {
      return res.status(404).send('catway non trouvé');
    }

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la suppression du catway');
  }
};
