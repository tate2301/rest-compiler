const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    fs = require('fs'),
    url = require('url')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/compile", (req, res) => {
    const { code } = req.body
    const exec = require('child_process').exec;
    const id = makeId(10)
    const executablePath = __dirname + "/exec/" + id
    const filePath = __dirname + '/code/' + id +'.c'

    const searchRegExp = /\“/g
    const search2 = /\”/g
    const replaceWith = "\""

    const data = code.replace(searchRegExp, replaceWith).replace(search2, "\"")

    console.log({data})

    console.log({data})

    try {
        fs.appendFile(filePath, data, function() {
            exec(
                `gcc ${filePath} -o ${executablePath} && ./exec/${id}`,
                function callback(error, stdout, stderr){
                    if (error) {
                        res.json({
                            error: true,
                            message: "An error occurred" + error.message
                        })
                    } else if(stderr) {
                        res.json({
                            error: true,
                            message: `Compilation error - ${stderr}`
                        })
                    } else {
                        res.json({
                            error: false,
                            message: stdout
                        })
                    }
                });
        });
    } catch (e) {
        res.json({
            error: true,
            message: "An error occurred on the server"
        })
    }

})

app.listen(8000, () => {
    console.log("Server started on port 8000")
})


function makeId(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
