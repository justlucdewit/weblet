"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var format = require('js-beautify').html;
var Website = /** @class */ (function () {
    function Website(config) {
        var _a, _b, _c, _d, _e, _f;
        this.keywords = [];
        // header
        this.header = false;
        // config
        this.compression = config.outStyle == "compress";
        this.outFile = (_a = config.outName) !== null && _a !== void 0 ? _a : "output.html";
        // meta
        this.title = (_b = config.title) !== null && _b !== void 0 ? _b : "";
        this.author = (_c = config.author) !== null && _c !== void 0 ? _c : "";
        this.description = (_d = config.description) !== null && _d !== void 0 ? _d : "";
        this.keywords = (_e = config.keywords) !== null && _e !== void 0 ? _e : "";
        // header
        this.header = config.header !== undefined;
        this.headerContent = (_f = config.header.content) !== null && _f !== void 0 ? _f : "";
    }
    Website.prototype.render = function () {
        var _this = this;
        var HTMLString = "\n        <HTML>\n            <head>\n                " + (this.title ? "<title>" + this.title + "</title>" : "") + "\n                <meta charset=\"UTF-8\"/>\n                " + (this.author ? "<meta title=\"author\" content=\"" + this.author + "\">" : "") + "\n                " + (this.author ? "<meta title=\"description\" content=\"" + this.description + "\">" : "") + "\n                " + (this.author ? "<meta title=\"keywords\" content=\"" + this.keywords + "\">" : "") + "\n            </head>\n            <body>\n                " + (this.header ? "<header>" + (this.headerContent ? this.headerContent : "") + "</header>" : "") + "\n            </body>\n        </HTML>";
        HTMLString = format(HTMLString);
        if (this.compression) {
            HTMLString = HTMLString.split("\n").join("").split("\t").join("").split("  ").join("");
        }
        fs.writeFile(this.outFile, HTMLString, function (err) {
            if (err) {
                console.log("error trying to write to file " + _this.outFile + ": " + err);
            }
            else {
                console.log("done!");
            }
        });
    };
    return Website;
}());
exports.Website = Website;
