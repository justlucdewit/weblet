const fs = require("fs");
const format = require('js-beautify').html;

export class Website {
    // colors
    backgroundColor?:string;
    textColor?:string;
    primaryColor?:string;

    // config
    compression:boolean;
    outFile:string;
    css:any

    // meta
    title?:string;
    author?:string;
    description?:string;
    keywords:string[] = [];

    // header
    header:boolean = false;
    headerContent?:string;

    constructor(config:any){
        // colors
        this.backgroundColor = config.palette.background ? config.palette.background : undefined;
        this.textColor = config.palette.text ? config.palette.text : undefined;
        this.primaryColor = config.palette.primary ? config.palette.primary : undefined;

        // config
        this.compression = config.outStyle == "compress";
        this.outFile = config.outName ?? "output.html";

        // meta
        this.title = config.title ?? "";
        this.author = config.author ?? "";
        this.description = config.description ?? "";
        this.keywords = config.keywords ?? "";

        // header
        this.header = config.header !== undefined;
        this.headerContent = config.header.content ?? "";

        this.css = this.header || this.backgroundColor || this.textColor || this.primaryColor;
    }

    public render(){
        let HTMLString = `
        <html>
            <head>
                ${this.title ? `<title>${this.title}</title>`: ""}
                <meta charset="UTF-8"/>
                ${this.author ? `<meta title="author" content="${this.author}">` : ""}
                ${this.author ? `<meta title="description" content="${this.description}">` : ""}
                ${this.author ? `<meta title="keywords" content="${this.keywords}">` : ""}
                ${this.css ? `
                <style rel="stylesheet" type="text/css">
                    ${this.backgroundColor || this.textColor || this.primaryColor ? `
                    body{
                        ${this.backgroundColor ? `background-color: ${this.backgroundColor};`: ""}
                        ${this.textColor ? `color: ${this.textColor};`: ""}
                    }` : ""}
                
                    header {
                        text-align: center;
                        padding: 10px;
                        font-size: 40px;
                        font-weight: bolder;
                        font-family: sans-serif;
                    }
                </style>` : ""}
            </head>
            <body>
                ${this.header ? `<header>${this.headerContent ? this.headerContent : ""}</header>` : ""}
            </body>
        </html>`;

        HTMLString = format(HTMLString);

        if (this.compression){
            HTMLString = HTMLString.split("\n").join("").split("\t").join("").split("  ").join("");
        }
        let success = true;
        fs.writeFile(this.outFile, HTMLString, (err) => {
            if (err) {
                console.log(`error trying to write to file ${this.outFile}: ${err}`);
                success = false;
            }
        });

        return success;
    }
}