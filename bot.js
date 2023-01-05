const express = require('express');
const bodyParser = require('body-parser');


const app = express().use(bodyParser.json());

app.post('/webhook', (req, res) =>{
    console.log('POST: webhook'); 

    const body = req.body;

    if (body.object === 'page'){

        body.entry.forEach(entry => {
            //Se reciben y procesan los mensajes 
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        res.status(200).send('Evento Recibido');
    }else{
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res) =>{
    console.log('GET: webhook');

    const VERIFY_TOKEN  = 'stringUnicoParaTuAppBot';

    // parametros validacion de facebook  para la autenticidad de la aplicacion 
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    

    // Validacion si esta inscrito la aplicacion en la pagina de faceboon pzra la autenticacion 
    if(mode && token){
        if(mode === 'subscribe' && token === VERIFY_TOKEN){
            console-log('WEBHOOOK VERIFICADO');
            res.status(200).send(challenge);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }
});


app.listen(3000, () => {
    console.log('Servidor Iniciado.... ')
});



