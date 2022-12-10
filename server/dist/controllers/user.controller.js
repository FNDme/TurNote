"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBoard = exports.allAccess = void 0;
const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.allAccess = allAccess;
const userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.userBoard = userBoard;
