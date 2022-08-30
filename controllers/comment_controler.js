const express = require("express");
const router = express.Router();
const methodOverride = (require("method-override"));

//Middleware
router.use(express.json());
router.use(express.urlencoded({extended: false}));
router.use(methodOverride("_method"))

//model import
const db = require("../models");