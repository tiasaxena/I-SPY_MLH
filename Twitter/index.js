const puppeteer = require('puppeteer');
const username = 'xxxxxx';
const password = 'xxxxxx';
const warning = "Hate Speech Warning !! Please don't spread hate speech";

let browser = null;
let page = null;

(async () => {
    browser = await puppeteer.launch({ headless: false });
        
    page = await browser.newPage();
    page.setViewport({
        width: 1200,
        height: 900,
        isMobile: false
    });

    await page.goto('https://twitter.com/i/flow/login', {waitUntil: 'networkidle2'});

    //LOGIN
    await page.waitForSelector('input[name="text"]');
    await page.type('input[name="text"]',username,{delay: 50});
    await delay(1000);
    await page.keyboard.press('Enter',{delay: 100});
    await page.waitForSelector('input[name="password"]');
    await delay(1000);
    await page.type('input[name="password"]',password,{delay: 50});
    await page.keyboard.press('Enter',{delay: 100});

    //SEARCH TERM
    await page.waitFor('input[data-testid="SearchBox_Search_Input"]');
    await page.type('input[data-testid="SearchBox_Search_Input"]', '#Ispy_Saveme', {delay: 50});
    await delay(1000);
    await page.keyboard.press('Enter',{delay: 100});
    await delay(1000);

    //SCROLL DOWN + GET AUTHORS 
    let authorsSet = new Set()
    try {
        for (let i = 0; i < 1; i++) {
            const elementHandles = await page.$$('a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1loqt21.r-1wbh5a2.r-dnmrzs.r-1ny4l3l');
            const propertyJsHandles = await Promise.all(
              elementHandles.map(handle => handle.getProperty('href'))
            );
            const urls = await Promise.all(
              propertyJsHandles.map(handle => handle.jsonValue())
            );

            urls.forEach(item => authorsSet.add(item))
            await delay(2000);
        }
    } catch(e) {console.log(e); }

    console.log("-----");
    authorsSet.clear();
    authorsSet.add('wasp_404');
    authorsSet.add('ArjunKHaridas1');
    console.log(authorsSet);

    // VISIT ALL AUTHORS AND CLICK FOLLOW BUTTON
    const urls = Array.from(authorsSet)
    for (let i = 0; i < urls.length; i++) {
      try {
        const url = urls[i];
        await page.goBack();
        await page.waitFor('input[data-testid="SearchBox_Search_Input"]');
        await page.type('input[data-testid="SearchBox_Search_Input"]', `${url}`, {delay: 50});
        await delay(1000);
        await page.keyboard.press('Enter',{delay: 100});
        await delay(2000);
      }
      catch(error) {
        console.error(error);
      }
    }
    await delay(4000);
    await page.click('div[data-testid="reply"]',{clickCount: 1});
    await delay(2000);
    await page.click('div[data-testid="tweetButton"]',{clickCount: 1});
})();

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}