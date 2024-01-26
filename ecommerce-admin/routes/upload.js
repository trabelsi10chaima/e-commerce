require('dotenv').config()
const {google} = require('googleapis')
//const multer = require('multer')
//const express = require('express')
//const path = require('path');
const stream = require('stream')

const key = 'credentials.json'
const scopes = ["https://www.googleapis.com/auth/drive"] 

const auth = new google.auth.GoogleAuth({
    key : key,
    scopes : scopes
})

//const upload = multer()

// const uploadRouter = express.Router()

const uploadFile = async (req, res) => {
    try {
        const files = req.files
        let images = []

        if(files) {
             // Utilisez Promise.all pour attendre que toutes les opérations asynchrones soient terminées.
            await Promise.all(files.map(async file => {
                const buffer = new stream.PassThrough();
                buffer.end(file.buffer);

                const {data} = await google.drive({
                    version: 'v3',
                    auth: auth
                }).files.create({
                    media: { mimeType: file.mimeType, body: buffer},
                    requestBody: { name: file.originalname, parents: ['1ZrdkoyYVSEc7TgJa7WiM4vTxc50DC63u']},
                    fields: "id"
                })
                images.push(`https://drive.google.com/uc?id=${data.id}`);
                console.log(`file with ID : ${data.id} is uploaded`);
            }));
        }
        return images
    } catch (err) {
        return res.status(500).json({ message : err.message })
    }
}

/*
const uploadFile = async (fileObject) => {
    const buffer = new stream.PassThrough()
    buffer.end(fileObject.buffer)

    const {data} = await google.drive({
        version: 'v3',
        auth: auth
    }).files.create({
        media: { mimeType: fileObject.mimeType, body: buffer},
        requestBody: { name: fileObject.originalname, parents: ['1ZrdkoyYVSEc7TgJa7WiM4vTxc50DC63u']},
        fields: "id, name"
    })
    console.log(`file ${data.name} with ID : ${data.id} is uploaded`)
        
}

uploadRouter.post('/upload', upload.any(), async (req, res) => {
    try {
        const files = req.files

        if(files) {
            files.forEach(file => {
                await uploadFile(file)
            });
        }
    } catch (err) {
        return res.status(500).json({ message : err.message })
    } 
}) 

module.exports = uploadRouter
*/

module.exports = uploadFile
