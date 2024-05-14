import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";

const app = express();
app.use(express.json());

app.get("/requests", async (req, res) => {
  const { url, out } = req.query;
  try {
    const response = await axios.get(url);
    const outputFormat = out ? out.toLowerCase() : "text";

    if (outputFormat === "html") {
      res.json({ data: response.data });
    } else if (outputFormat === "text") {
      const dom = new JSDOM(response.data);
      const textContent = dom.window.document.body.textContent;
      res.json({ data: textContent });
    } else {
      res.status(400).json({ error: "Invalid output format specified" });
    }
  } catch (error) {
    if (error.response) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

const PORT = process.env.PORT || 8899;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
