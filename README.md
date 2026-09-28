# Synapse Technology — Documentation Portal for CodeCanyon

A modern, responsive, high-performance HTML/CSS/JS documentation website designed specifically for digital product upload on **CodeCanyon / Envato Market**.

Modeled faithfully on the clean tech documentation aesthetic, featuring:
- **Exact Layout & Modern Typography**: Clean UI with sidebar navigation, breadcrumbs, article cards, and interactive FAQ accordions.
- **Responsive Off-Canvas Sidebar**: Collapsible multi-level accordion menu with category chevrons, active view highlights, and dedicated mobile drawer with touch close button.
- **Interactive Live Search (Ctrl+K)**: Instant search modal with keyboard navigation (`↑`, `↓`, `Enter`, `Esc`) indexing all articles and FAQs.
- **Dark & Light Mode**: Built-in theme switcher with smooth transitions and `localStorage` persistence.
- **One-Click Code Copy**: Copy button with toast notifications for code snippets and bash commands.
- **Feedback Widget**: Interactive "Was this helpful? 👍 / 👎" rating widget on every article.
- **100% Offline Compatible**: Can be opened directly in any browser by double-clicking `index.html` (zero server required) or hosted on any web server.
- **Print / PDF Friendly**: Clean print styles so buyers can export documentation directly to PDF.

---

## File Structure

```text
Synapse Documentation/
├── index.html                                        # Main documentation web app
├── css/
│   └── style.css                                     # Clean, vanilla CSS stylesheet with CSS variables
├── js/
│   └── app.js                                        # Lightweight modular vanilla JavaScript logic
├── Images/
│   └── synapse-banner.jpg                            # High-resolution SaaS dashboard banner
├── Automobile-Billing-Inventory-Management-Software/ # Dedicated Automobile POS product documentation
│   ├── index.html                                    # Product documentation web app
│   ├── css/style.css                                 # Stylesheet
│   ├── js/app.js                                     # Logic & search registry
│   ├── images/                                       # Product banners & graphics
│   └── README.md                                     # Product documentation guide
└── README.md                                         # Documentation guide and customization instructions
```

---

## How to Run & Preview

### Option 1: Direct File Preview
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server
Run any local server from the root directory:
```bash
# PHP
php -S 127.0.0.1:8000

# Or Node.js
npx serve .
```

---

## Bundling for CodeCanyon Upload

When preparing your final zip file for CodeCanyon:
1. Include this entire folder as `Documentation/` inside your master zip archive.
2. In your root `README.txt`, instruct buyers:
   > *"To view the product documentation, open `Documentation/index.html` in any web browser."*
