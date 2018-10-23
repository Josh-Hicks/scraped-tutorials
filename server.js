const express = require('express')

const scraper = require('./utils/scraper')
const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  const mediumArticles = new Promise((resolve, reject) => {
    scraper
      .scrapeMedium()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('Medium scrape failed'))
  })

  const youtubeVideos = new Promise((resolve, reject) => {
    scraper
      .scrapeYoutube()
      .then(data => {
        resolve(data)
      })
      .catch(err => reject('YouTube scrape failed'))
  })

  Promise.all([mediumArticles, youtubeVideos])
    .then(data => {
      res.render('index', { data: { articles: data[0], videos: data[1] } })
    })
    .catch(err => res.status(500).send(err))
})

app.listen(process.env.PORT || 3000)
