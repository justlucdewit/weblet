#!/usr/bin/env node
import { Website} from "./Website";
import { performance } from "perf_hooks"

const fs = require("fs");

const version = "1.0.0";

if (process.argv.length > 2) {
    fs.readFile(process.argv[2], 'utf-8', (err, data) => {
        if (err) {
            console.log(`error trying to read file ${process.argv[2]}: ${err}`);
        }else {
            const json = JSON.parse(data);
            const start = performance.now();
            if (new Website(json).render()){
                console.log(`done! took ${Math.round((performance.now()-start)*100)/100} ms`)
            }
        }
    });
}else{
    console.log(`weblet V${version}`);
}