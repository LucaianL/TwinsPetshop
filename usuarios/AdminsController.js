const express = require("express");
const router = express.Router();

const adminAuth = require("../middlewares/adminAuth");

router.get("/usuario/admin/index", adminAuth, (req, res) => {
    res.render("usuarios/admin/adm_index");
});

module.exports = router;
