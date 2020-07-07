'use strict';

const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const dotenv = require('dotenv');
dotenv.config();
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

let authData;
let authSwitch = true;
// App
const app = express();
async function getToken(){
    let token;
    console.log("KEYCLOAK_HOST");
    const url = process.env.KEYCLOAK_HOST+'/auth/realms/master/protocol/openid-connect/token'
    console.log('URL: ' + url);
    const requestBody = authSwitch ? {
        client_id: process.env.CLIENT_ID,
        grant_type: 'password',
        client_secret: process.env.CLIENT_SECRET,
        scope: 'openid',
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    }:{
        client_id: process.env.CLIENT_ID,
        grant_type: 'refresh_token',
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: authData.refresh_token
    } 

    
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    
    const res = axios.post(url, qs.stringify(requestBody), config)
    .then((result) => {
        return result.data;
    })
    .catch((err) => {
        console.log('err: ', err);
        return err;
    })
    return await res;
}
app.get('/', (req, res) => {

    getToken().then(data => {
        const msg = authSwitch ? 'AUTH TOKEN: ' : 'REFRESH TOKEN: ';
        authSwitch = !authSwitch;
        authData = data;
        res.send(msg+ JSON.stringify(data.access_token));
    }).catch(err => {
    res.send('hello err: ' + JSON.stringify(err));
    });
    
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);