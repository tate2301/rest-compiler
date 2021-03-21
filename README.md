# A simple C compiler using Node.js Server

This is a simple proof of concept for invoking a C compiler to compile code sent in a web requests.
Built to support the codex mobile app in the early stages.

It uses the inbuilt gcc compiler on linux systems. It takes code from the request body and saves it 
with an id in the code folder then invokes gcc and outputs the executable in the exec folder with filename
being the id. It then executes this file and pipes the stdout to the message and sends it in response
object.

A lot more has to be done, in terms of security and piping stdout to the client, but this serves as 
a starting point



## To run
    mkdir code && mkdir exec    
    yarn install 
    yarn start

The compiling endpoint will be accessible at *localhost:8000/compile*

Request Schema
    
    {
        "method": "POST"
        "fields": [
            {
                "code": {
                    "type": "string"  //Valid C-Code
                },
                "required": true
            }
        ]
    }

Response Schema

    {
        error: boolean,
        message: string
    }