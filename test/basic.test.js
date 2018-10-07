const puppeteer = require("puppeteer");
const httpServer = require("http-server");

let browser;
let page;
const server = httpServer.createServer({ root: __dirname });
server.listen(8080);

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: ["--no-sandbox"]
  });
}, 20000);

afterAll(() => {
  server.close();
  browser.close();
}, 20000);

describe(
  "Tests",
  async () => {
    test(
      "basic page",
      async () => {
        page = await browser.newPage();
        await page.goto("http://localhost:8080/basic.html");

        html = await page.$eval(".header", e => e.innerHTML);

        expect(html).toBe("Hello planet");
      },
      20000
    );

    test(
      "onclick",
      async () => {
        await page.goto("http://localhost:8080/onclick.html");
        await page.click(".btn");

        html = await page.$eval(".test", e => e.innerHTML);
        expect(html).toBe("Test");
      },
      20000
    );

    test(
      "Mutlirender",
      async () => {
        await page.goto("http://localhost:8080/mutlirender.html");

        test = await page.$eval(".test", e => e.innerHTML);
        test2 = await page.$eval(".test2", e => e.innerHTML);

        expect(test).toBe("12");
        expect(test2).toBe("14");
      },
      20000
    );

    test(
      "raw",
      async () => {
        await page.goto("http://localhost:8080/raw.html");
        html = await page.$eval(".test", e => e.innerHTML);
        expect(html).toBe("<p>Text</p> <p>HTML Text</p>");
      },
      20000
    );

    test(
      "nested",
      async () => {
        await page.goto("http://localhost:8080/nested.html");

        html = await page.$eval(".test", e => e.innerHTML);
        expect(html).toBe("EMPTY");

        await page.click(".click");
        html = await page.$eval(".test", e => e.innerHTML);
        expect(html).toBe("YES");
      },
      20000
    );
  },
  20000
);
