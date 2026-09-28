# Synapse Technology — Documentation Portal for CodeCanyon

A modern, responsive, high-performance HTML/CSS/JS documentation website designed specifically for digital product upload on **CodeCanyon / Envato Market**.

Modeled faithfully on the clean tech documentation aesthetic, featuring:
- **Exact Layout & Typography**: Matches the minimalist UI with sidebar navigation, breadcrumbs, article cards (`↗`), and interactive FAQ accordions.
- **Collapsible Sidebar**: Multi-level accordion menu with category chevrons and active view highlights.
- **Interactive Live Search (Ctrl+K)**: Instant search modal with keyboard navigation (`↑`, `↓`, `Enter`, `Esc`) indexing all articles and FAQs.
- **Dark & Light Mode**: Built-in theme switcher with smooth transitions and `localStorage` persistence.
- **One-Click Code Copy**: Copy button with toast notifications for code snippets and bash commands.
- **Feedback Widget**: Interactive "Was this helpful? 👍 / 👎" rating widget on every article.
- **100% Offline Compatible**: Can be opened directly in any browser by double-clicking `index.html` (zero server required) or hosted on any web server.
- **Print / PDF Friendly**: Clean print styles so buyers can export documentation directly to PDF.

---

## 📁 File Structure

```text
Synapse Documentation/
├── index.html               # Main documentation web app
├── css/
│   └── style.css            # Clean, vanilla CSS stylesheet with CSS variables
├── js/
│   └── app.js               # Lightweight modular vanilla JavaScript logic
├── Images/
│   └── synapse-banner.jpg   # High-resolution SaaS dashboard banner
└── README.md                # Documentation guide and customization instructions
```

---

## 🚀 How to Run & Preview

### Option 1: Direct File Preview
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server
Run any local server from the root directory:
```bash
# Python
python -m http.server 8080

# Or Node.js
npx serve .
```
Then visit `http://localhost:8080` in your web browser.

---

## 📦 Bundling for CodeCanyon Upload

When preparing your final zip file for CodeCanyon:
1. Include this entire folder as `Documentation/` inside your master zip archive.
2. In your root `README.txt`, instruct buyers:
   > *"To view the product documentation, open `Documentation/index.html` in any web browser."*

---

## 🎨 Customizing for Your Product

- **Brand Name & Logo**: Edit the `<header>` in `index.html` to update the brand text and SVG logo.
- **Colors & Styling**: Modify the CSS variables at the top of `css/style.css` (e.g. `--primary: #2563eb;`).
- **Adding New Articles**: Add an entry to the `searchRegistry` array in `js/app.js` and a corresponding `<section class="view-panel" id="view-your-id">` in `index.html`.
