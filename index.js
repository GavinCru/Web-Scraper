const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const express = require('express');

const app = express()

const agent = new https.Agent({
    rejectUnauthorized: false
});

const url = 'https://starfish-app-lx64b.ondigitalocean.app/'
axios.get(url, { httpsAgent: agent })
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.section-wrapper', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('a')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))


app.listen(PORT, () => console.log("Server running on PORT " + PORT + ""))