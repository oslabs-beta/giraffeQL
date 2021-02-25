const Diagram = require('../models/diagram');

module.exports = {
  addDiagram: (req, res, next) => {
    try {
      const { user, diagramName, tables, position, description } = req.body;
      Diagram.create({
        user: user,
        diagramName: diagramName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        reactFlowData: tables,
        position: position
      }).then((data) => {
        res.locals.diagram = data;
        return next();
      });
    } catch(err) {
      return next(err);
    } 
  },
  getAllDiagrams: (req, res, next) => {
    try {
      let user;
      if (Object.keys(res.locals).includes('user')) user = res.locals.user._id;
      else user = req.params.user || res.locals.diagram.user;
      if (!user) return res.status(400).send('missing necessary data');
      Diagram.find({ user: user })
        .then((data) => {
          res.locals.diagrams = data
          return next();
        })
    } catch(err) {
      return next(err);
    }
  },
  deleteDiagram: (req, res, next) => {
    try {
      const { diagramId } = req.params;
      Diagram.findOneAndDelete({ _id: diagramId })
        .then((data) => {
          if (!data) return res.status(204).send('no data found)')
          res.locals.diagram = data;
          return next();
        })
    } catch(err) {
      return next(err);
    }
    
  },
  updateDiagram: (req, res, next) => {
    try {
      const { diagramId, user, diagramName, tables, description } = req.body;
      if (diagramId) {
        Diagram.findOneAndUpdate(
          { _id: diagramId },
          {
            user: user,
            diagramName: diagramName,
            updatedAt: Date.now(),
            tables: tables
          },
          {
            new: true,
            upsert: true
          })
          .then((data) => {
            res.locals.diagram = data;
            return next();
          })
      } else {
        const { user, diagramName, tables, description } = req.body;
        Diagram.create({
          user: user,
          diagramName: diagramName,
          description: description,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          tables: tables,
          favorite: false
        }).then((data) => {
          res.locals.diagram = data;
          return next();
        });
      }
      
    } catch(err) {
      return next(err);
    }
  },
  toggleFavorite: async (req, res, next) => {
    try {
      const { diagramId } = req.params;
      const diagram = await Diagram.findById(diagramId);
      if (!diagram) return res.status(204).send('no data found');
      const newFav = !diagram.favorite;
      Diagram.findOneAndUpdate({ _id: diagramId }, 
        { favorite: newFav },
        { new: true}).then(data => {
          res.locals.diagram = data;
          return next();
        });
    } catch(err) {
      return next(err);
    }
  }
}