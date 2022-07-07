const mainController = {
  test: async (req, res) => {
    try {
      res.json("Le test fonctionne");
    } catch (error) {
      res.status(500).json(error);
      console.trace(error);
    }
  },
};
  
module.exports = mainController;