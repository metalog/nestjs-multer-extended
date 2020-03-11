"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_sharp_1 = require("./multer-sharp");
exports.AmazonS3Storage = (options) => new multer_sharp_1.MulterSharp(options);
