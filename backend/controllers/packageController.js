const Package = require("../models/package");

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.getAll();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPackageById = async (req, res) => {
  try {

    console.log(`controller id ${req.params.id}`);
    const package = await Package.getById(req.params.id);
    if (package) {
      res.json(package);
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
