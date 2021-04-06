const fs = require("fs")


function GeneralWrite(message) {
    fs.writeFileSync("./../logs/general.txt",message,"UTF-8", {
        "flags":"w+"
    })
}



exports.General = GeneralWrite