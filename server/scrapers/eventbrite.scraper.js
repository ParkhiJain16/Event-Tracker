const axios = require("axios");
const cheerio = require("cheerio");
const Event = require("../models/Event");

const EVENTBRITE_URL =
  "https://www.eventbrite.com/d/australia--sydney/events/";

async function scrapeEventbrite() {
  console.log("Scraping Eventbrite...");

  const { data } = await axios.get(EVENTBRITE_URL);
  const $ = cheerio.load(data);

  const events = [];

  $(".event-card").each((i, el) => {
    const title = $(el).find("h3").text().trim();
    const url = $(el).find("a").attr("href");
    const imageUrl = $(el).find("img").attr("src");

    if (!title || !url) return;

    events.push({
      title,
      city: "Sydney", // ✅ FIXED (NO TYPO)
      imageUrl,
      source: {
        name: "Eventbrite",
        url
      },
      status: "new",
      lastScrapedAt: new Date()
    });
  });

  for (const e of events) {
    const existing = await Event.findOne({ "source.url": e.source.url });

    if (!existing) {
      await Event.create(e);
      console.log("New event:", e.title);
    } else {
      await Event.findByIdAndUpdate(existing._id, {
        lastScrapedAt: new Date(),
        status: existing.status === "imported" ? "imported" : "updated"
      });
    }
  }

  console.log("Scraping complete");
}

module.exports = scrapeEventbrite;
