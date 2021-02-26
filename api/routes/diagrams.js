const express = require('express');
const diagramController = require('../db/services/diagrams');

const router = express.Router();

router.get('/:user',
  diagramController.getAllDiagrams,
  (req, res) => res.status(200).json({
    diagrams: res.locals.diagrams
  }))

router.delete('/:diagramId',
  diagramController.deleteDiagram,
  diagramController.getAllDiagrams,
  (req, res) => res.status(200).json({
    diagrams: res.locals.diagrams
  }));

router.put('/favorite/:diagramId',
  diagramController.toggleFavorite,
  (req, res) => res.status(200).json({
    diagram: res.locals.diagram
  }));

router.put('/',
  diagramController.addOrUpdateDiagram,
  (req, res) => res.status(200).json({
    diagram: res.locals.diagram
  }));

module.exports = router;