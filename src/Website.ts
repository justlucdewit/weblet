const fs = require("fs");
const format = require('js-beautify').html;

export class Website {
    // config
    compression:boolean;
    outFile:string;

    // meta
    title?:string;
    author?:string;
    description?:string;
    keywords:string[] = [];

    // header
    header:boolean = false;
    headerContent?:string;

    constructor(config:any){
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
    }

    render(){
        let HTMLString = `
        <HTML>
            <head>
                ${this.title ? `<title>${this.title}</title>`: ""}
                <meta charset="UTF-8"/>
                ${this.author ? `<meta title="author" content="${this.author}">` : ""}
                ${this.author ? `<meta title="description" content="${this.description}">` : ""}
                ${this.author ? `<meta title="keywords" content="${this.keywords}">` : ""}
            </head>
            <body>
                ${this.header ? `<header>${this.headerContent ? this.headerContent : ""}</header>` : ""}
            </body>
        </HTML>`;

        HTMLString = format(HTMLString);

        if (this.compression){
            HTMLString = HTMLString.split("\n").join("").split("\t").join("").split("  ").join("");
        }

        fs.writeFile(this.outFile, HTMLString, (err) => {
            if (err) {
                console.log(`error trying to write to file ${this.outFile}: ${err}`);
            }else{
                console.log("done!");
            }
        });
    }
}