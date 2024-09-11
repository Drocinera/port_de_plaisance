const Catway = require('../models/Catway');

exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(catway);
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
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCatway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(updatedCatway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.partialUpdateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedCatway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(updatedCatway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
    if (!deletedCatway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json({ message: "Catway supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
