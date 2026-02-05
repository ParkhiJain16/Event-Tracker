const axios = require("axios");
const cheerio = require("cheerio");
const Event = require("../models/Event");

const EVENTBRITE_URL =
  "https://www.eventbrite.com/d/australia--sydney/events/";

/**
 * Check if event has changed
 */
function hasEventChanged(existing, incoming) {
  return existing.title !== incoming.title;
}

async function scrapeEventbrite() {
  console.log("Scraping Eventbrite...");

  const { data } = await axios.get(EVENTBRITE_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);
  const scrapedEvents = [];

  /**
   * UPDATED SELECTOR (IMPORTANT)
   * Eventbrite no longer uses .event-card
   */
  $('a[href*="/e/"]').each((i, el) => {
    const title = $(el).text().trim();
    const href = $(el).attr("href");

    if (!title || !href) return;

    const url = href.startsWith("http")
      ? href
      : `https://www.eventbrite.com${href}`;

    scrapedEvents.push({
      title,
      source: {
        name: "Eventbrite",
        url
      },
      lastScrapedAt: new Date()
    });
  });

  console.log("Scraped events count:", scrapedEvents.length);

  // INSERT / UPDATE LOGIC
  for (const e of scrapedEvents) {
    const existingEvent = await Event.findOne({
      "source.url": e.source.url
    });

    // NEW EVENT
    if (!existingEvent) {
      await Event.create({
        ...e,
        status: "new"
      });
      console.log("New event:", e.title);
    }

    // UPDATED EVENT
    else if (hasEventChanged(existingEvent, e)) {
      existingEvent.title = e.title;
      existingEvent.status = "updated";
      existingEvent.lastScrapedAt = new Date();
      await existingEvent.save();
      console.log("Updated event:", e.title);
    }

    // UNCHANGED EVENT
    else {
      existingEvent.lastScrapedAt = new Date();
      await existingEvent.save();
    }
  }

  // MARK INACTIVE EVENTS
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - 24);

  await Event.updateMany(
    {
      lastScrapedAt: { $lt: cutoff },
      status: { $ne: "inactive" }
    },
    { $set: { status: "inactive" } }
  );

  console.log("Inactive events marked");
  console.log("Scraping complete");
}

module.exports = scrapeEventbrite;
