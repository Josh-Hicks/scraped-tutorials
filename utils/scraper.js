const puppeteer = require('puppeteer')

const scrapeMedium = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://medium.com/search?q=headless%20browser')

  const scrapedData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('article a'))
      .filter(el=>el.querySelector('h2'))
      .map(link=>({
        title: link.querySelector('h2').textContent,
        link: link.href
      }))
  )

  await browser.close()
  return scrapedData
}

const scrapeYoutube = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    'https://www.youtube.com/results?search_query=headless+browser'
  )

  const scrapedData = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.ytd-video-renderer #video-title'))
      .map(link => ({
        title: link.getAttribute('title'),
        link: link.getAttribute('href')
      }))
      .slice(0, 10)
  )


  await browser.close()
  return scrapedData
}

module.exports.scrapeMedium = scrapeMedium
module.exports.scrapeYoutube = scrapeYoutube
