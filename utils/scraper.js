const puppeteer = require('puppeteer');
const browser = puppeteer.launch();

const scrapeMedium = async () => {
    await browser;
    const page = await browser.newPage();
    await page.goto('https://medium.com/search?q=headless%20browser');

    const scrapedData = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.postArticle-content a:first-child[data-action-value]'))
        .filter( node => node.querySelector('.graf--title'))
        .map( link => ({
      	    title: link.querySelector('.graf--title').textContent,
      	    link: link.getAttribute('data-action-value')
        }))
    );

    await page.close();
    return scrapedData;
}

const scrapeYoutube = async () => {
    await browser;
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/results?search_query=headless+browser');

    const scrapedData = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.ytd-video-renderer #video-title'))
        .map( link => ( {
		    title: link.getAttribute('title'),
		    link: link.getAttribute('href'),
	    }))
    );

    await page.close();
    return scrapedData;
}

const closeBrowser = () => {
    return browser.close();
};

module.exports = {
    closeBrowser,
    scrapeMedium, 
    scrapeYoutube
};