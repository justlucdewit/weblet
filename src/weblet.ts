#!/usr/bin/env node
import { Website} from "./Website";

const fs = require("fs");

const version = "1.0.0";

if (process.argv.length > 2) {
    fs.readFile(process.argv[2], 'utf-8', (err, data) => {
        if (err) {
            console.log(`error trying to read file ${process.argv[2]}: ${err}`);
        }else {
            const json = JSON.parse(data);
            new Website(json).render();
        }
    });
}else{
    console.log(`weblet V${version}`);
}