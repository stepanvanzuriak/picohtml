const puppeteer = require("puppeteer");
const httpServer = require("http-server");

let browser;
let page;
const width = 600;
const height = 400;
const server = httpServer.createServer({ root: __dirname });
server.listen(8080);

describe("Basic tests", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      slowMo: 80,
      args: ["--no-sandbox", `--window-size=${width},${height}`]
    });
    page = await browser.newPage();
  });

  it(
    "renders correctly",
    async () => {
      await page.goto("http://localhost:8080/basic.html");
      await page.waitForSelector(".header");

      const html = await page.$eval(".header", e => e.innerHTML);
      expect(html).toBe("Hello planet");
    },
    20000
  );

  it(
    "onclick",
    async () => {
      await page.goto("http://localhost:8080/onclick.html");
      await page.click(".btn");

      const html = await page.$eval(".test", e => e.innerHTML);

      expect(html).toBe("Test");
    },
    20000
  );

  it(
    "raw",
    async () => {
      await page.goto("http://localhost:8080/raw.html");

      const html = await page.$eval(".test", e => e.innerHTML);

      expect(html).toBe("<p>Text</p> <p>HTML Text</p>");
    },
    20000
  );

  afterAll(() => {
    browser.close();
    server.close();
  });
});
