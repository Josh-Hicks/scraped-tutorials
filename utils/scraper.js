const puppeteer = require('puppeteer')

const scrapeMedium = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://medium.com/search?q=headless%20browser')

  const scrapedData = await page.evaluate(() => {
    const mediumData = []
    const elementsArray = Array.from(
      document.querySelectorAll('div.postArticle-content a')
    )

    const links = elementsArray
      .filter(link => link.getAttribute('data-action-value'))
      .map(link => `${link.getAttribute('data-action-value')}`)

    const titles = Array.from(document.querySelectorAll('.graf--title')).map(
      el => el.textContent
    )

    elementsArray.forEach(el => {
      const title = titles[elementsArray.indexOf(el)]
      const link = links[elementsArray.indexOf(el)]
      if (title && link) {
        mediumData.push({
          title,
          link
        })
      }
    })

    return mediumData
  })

  await browser.close()
  return scrapedData
}

const scrapeYoutube = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://www.youtube.com/results?search_query=headless+browser'
  )

  const scrapedData = await page.evaluate(() => {
    const combinedData = []
    const elementsArray = Array.from(
      document.querySelectorAll('.ytd-video-renderer #video-title')
    )
    const links = elementsArray.map(link => `${link.getAttribute('href')}`)
    const titles = elementsArray.map(title => `${title.getAttribute('title')}`)

    elementsArray.forEach(el =>
      combinedData.push({
        title: titles[elementsArray.indexOf(el)],
        link: links[elementsArray.indexOf(el)]
      })
    )

    return combinedData.splice(0, 9)
  })

  await browser.close()
  return scrapedData
}

module.exports.scrapeMedium = scrapeMedium
module.exports.scrapeYoutube = scrapeYoutube
