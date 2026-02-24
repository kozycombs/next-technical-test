import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// API routes
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Server is running!" });
});

// iTunes API proxy endpoint
app.get("/api/search", async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

  if (!query || query.trim() === "") {
    res.json({ results: [], resultCount: 0 });
    return;
  }

  try {
    // Proxy request to iTunes API with limit and offset
    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`;
    const response = await fetch(itunesUrl);

    if (!response.ok) {
      throw new Error(`iTunes API returned ${response.status}`);
    }

    const data = await response.json();

    // Set CORS headers to allow frontend access
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.json(data);
  } catch (error) {
    console.error("Error fetching from iTunes API:", error);
    res.status(500).json({
      error: "Failed to fetch from iTunes API",
      results: [],
      resultCount: 0,
    });
  }
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
