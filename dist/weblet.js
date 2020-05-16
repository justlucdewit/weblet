#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Website_1 = require("./Website");
var fs = require("fs");
var version = "1.0.0";
if (process.argv.length > 2) {
    fs.readFile(process.argv[2], 'utf-8', function (err, data) {
        if (err) {
            console.log("error trying to read file " + process.argv[2] + ": " + err);
        }
        else {
            var json = JSON.parse(data);
            new Website_1.Website(json).render();
        }
    });
}
else {
    console.log("weblet V" + version);
}
