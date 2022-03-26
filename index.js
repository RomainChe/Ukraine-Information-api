const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const app = express()

const newspapers = [
    {
        name: "The Guardian",
        address: "https://www.theguardian.com/world/ukraine",
        base: ""
    },
    {
        name: "Telegraph",
        address: "https://www.telegraph.co.uk/russia-ukraine-war/",
        base: 'https://www.telegraph.co.uk'
    },
    {
        name: "The New York Times",
        address: "https://www.nytimes.com/section/world",
        base: "https://www.nytimes.com"
    },
    {
        name: "Le Figaro",
        address: "https://www.lefigaro.fr/international/dossier/tensions-entre-la-russie-et-l-ukraine-tout-comprendre-a-la-menace-d-une-invasion-russe",
        base: ""
    },
    {
        name: "Libération",
        address: "https://www.liberation.fr/international/europe/",
        base: "https://www.liberation.fr"
    },
    {
        name: "France 24",
        address: "https://www.france24.com/fr/tag/ukraine/",
        base: "https://www.france24.com"
    },
    {
        name: "Le Parisien",
        address: "https://www.leparisien.fr/crise-ukraine-russie/",
        base: "https:"
    },
    {
        name: "Mediapart",
        address: "https://www.mediapart.fr/journal/international/dossier/la-guerre-russe-contre-l-ukraine",
        base: "https://www.mediapart.fr"
    },
    {
        name: "L'Express",
        address: "https://www.lexpress.fr/actualite/monde/europe/",
        base: "https://www.lexpress.fr"
    }, 
    {
        name: "Le Point",
        address: "https://www.lepoint.fr/dossiers/monde/ukraine-russie-invasion-guerre-tensions/",
        base: "https://www.lepoint.fr"
    },
    
]

const articles = [];

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Ukraine")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        })
})

app.get('/', (req, res) => {
    res.json('Welcome to mt climate change API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get("/news/:newspapersId", async (req, res) => {
    const newpapersId = req.params.newspapersId;
    const newspaperAddress = newpapers.filter(newspaper => newspaper.name === newpapersId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newpapersId)[0].base
    axios.get(newspaperAddress)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const specificArticles = [];

        $('a:contains("Ukraine")', html).each( function () {
            const title =$(this).text();
            const url = $(this).attr('href');

            specificArticles.push({
                title,
                url : newspaperBase + url,
                source : newpapersId
            })
        })
        res.json(specificArticles)
    }).catch(err => console.log(err));
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))