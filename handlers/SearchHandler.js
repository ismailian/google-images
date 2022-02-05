const express = require("express");
const ImagePuller = require("../modules/ImagePuller");

/**
 * router
 */
const Index = express.Router();

/**
 * GET /api/v1/search
 */
Index.get("/", async (req, res) => {
  const keyword = req.query.keyword?.trim();
  const count = req.query.number?.trim();

  /** validate keyword */
  if (!keyword || typeof keyword == "undefined") {
    return res
      .status(400)
      .json({ status: false, message: "Parameter [keyword] is required" });
  }

  /** validate number */
  if (req.query.hasOwnProperty("count")) {
    if (isNaN(count)) {
      return res
        .status(400)
        .json({ status: false, message: "Parameter [number] is required" });
    }
  }

  const imagePuller = new ImagePuller(keyword, count || 20);
  const images = await imagePuller.get();

  return res.status(200).json({
    status: true,
    data: {
      search: {
        engine: "google",
        keyword,
        device: "desktop",
      },
      images,
    },
  });
});

module.exports = Index;
