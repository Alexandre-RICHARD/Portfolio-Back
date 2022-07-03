const mainController = {
  
    test: async (req, res) => {
      try {
        if (true) {
            res.json("Le test fonctionne");
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error);
      }
    },
  
  };
  
  module.exports = mainController;