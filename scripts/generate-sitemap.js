const fs = require("fs");
const globby = require("globby");

async function generateSitemap() {
  // Fetch all routes based on patterns
  // Your folder structure might be different so change bellow to match your needs
  const pages = await globby([
    "src/pages/**/*.tsx", // All routes inside /pages
    "!src/pages/**/[*.tsx", // Ignore my dynamic route index
    "!src/pages/_*.tsx", // Ignore next.js files
    "!src/pages/404.tsx", // Ignore 404 page
    "!src/pages/api", // Ignore API routes
  ]);

  const urlSet = pages
    .map((page) => {
      // Remove none route related parts of filename.
      const path = page.replace("src/pages", "").replace(/(.tsx)/, "").replace(/(index)/, "");
      // Remove the word index from route
      const route = path === "/index" ? "" : path;
      // Top priority for index and companies page
      const priority = ["/index", "/companies"].includes(path) ? "1.0" : "0.5";
      // Build url portion of sitemap.xml
      return `<url><loc>https://rgbjoy.com${route}</loc><priority>${priority}</priority><changefreq>daily</changefreq></url>`;
    })
    .join("");

  // Add urlSet to entire sitemap string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

  // Create sitemap file
  fs.writeFileSync("public/sitemap.xml", sitemap);

  console.log("Generated public/sitemap.xml");
}

module.exports = generateSitemap;