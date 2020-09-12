const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render("index"));
router.get('/notes', (req, res) => res.render("notes"));
router.get('/quizzes', (req, res) => res.render("quizzes"));
router.get('/contact', (req, res) => res.render("contact"));

module.exports = router;