require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const request = require('request');
const serverless = require('serverless-http');
const router = express.Router();

app.use(express.json());
app.use(cors());

router.post('/verify', (req, res) => {
    if (
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null
    ) {
        return res.send({ status: false, message: "Press captcha" });
    }


    const secret = "6Lc8Bj4iAAAAAKTvQSSZnWisPSkX-xFArt9N_hdG";
    const verify = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.captcha}`

    request(verify, (err, response, body) => {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            return res.send({ status: false, message: "Failed captcha verification" });
        }

        return res.send({ status: true, message: "Captcha Passed" });
    })
})

app.use('/', router)

module.exports = app;
module.exports.handler = serverless(app);