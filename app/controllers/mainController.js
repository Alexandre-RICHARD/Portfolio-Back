const mainController = {
  test: async (req, res) => {
    try {
      res.json("Le test fonctionne");
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};
  
module.exports = mainController;