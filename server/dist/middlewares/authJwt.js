"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const verifyToken = (req, res, next) => {
    let token = req.headers.token || req.session.token;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};
exports.authJwt = {
    verifyToken
};
