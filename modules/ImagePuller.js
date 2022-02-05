const puppeteer = require("puppeteer-core");

/**
 * Image puller Module
 */
class ImagePuller {
  /**
   * default constructor
   * @param String keyword the keyword to search for
   */
  constructor(keyword, number) {
    this.keyword = keyword;
    this.numberOfElements = number;
  }

  /**
   * get images
   * @returns array returns array of objects
   */
  async get() {
    console.log(`[+]  Fetching [${this.numberOfElements}] images..`);

    // launching instance
    console.log("[+] ", "Launching instance..");
    const browser = await puppeteer.launch({
      executablePath: process.env.EXECUTABLE_PATH,
      timeout: 0,
      headless: true,
      args: ["--disable-extensions", "--incognito", "--window-size=500,500"],
    });

    /** open new tab */
    console.log("[+] ", "Opening new web page..");
    const page = await browser.newPage();

    /** parameters */
    const url = process.env.WEBSITE_URL;
    const query = new URLSearchParams({
      q: this.keyword,
      oq: this.keyword,
      tbm: "isch",
      start: 0,
      ijn: 2,
      num: this.numberOfElements,
      sourceid: "chrome",
      ie: "UTF-8",
    }).toString();

    /** visit web page */
    console.log("[+] ", "Visiting [google.com]..");
    await page.goto(`${url}?${query}`, {
      timeout: 120000,
    });

    /** scroll once */
    console.log("[+]  Scrolling to load more images..");
    await page.evaluate(() => {
      window.scrollBy(0, document.body.scrollHeight);
    });

    /** extract data */
    console.log("[+]  Extracting data..");
    var data = [];
    try {
      data = await page.$$eval(".islrc > div", (divs) => {
        return divs.map((div) => {
          return {
            image:
              div.querySelector("img").getAttribute("src") ??
              div.querySelector("img").getAttribute("data-src"),
            title: div.querySelector("img").getAttribute("alt"),
            source: div.querySelector("a:nth-child(2)").getAttribute("href"),
          };
        });
      });
    } catch {
      await browser.close();
    } finally {
      /** close instance */
      console.log("[+] ", "Closing instance..");
      await browser.close();
    }

    /** return results */
    return data.slice(0, this.numberOfElements);
  }
}

module.exports = ImagePuller;
