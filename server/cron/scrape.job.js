const cron = require("node-cron");
const scrapeEventbrite = require("../scrapers/eventbrite.scraper");

function startScrapingJob() {
  // Runs every 6 hours
  cron.schedule("* * * * *", async () => {
    console.log("Cron job started: Scraping events");
    try {
      await scrapeEventbrite();
    } catch (err) {
      console.error("Scraping failed:", err.message);
    }
  });
}

module.exports = startScrapingJob;
