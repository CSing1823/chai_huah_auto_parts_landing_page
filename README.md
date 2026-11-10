# Chai Huah Auto Parts & Service – Official Business Landing Page

## Project Overview

This project is a multilingual landing page for Chai Huah Auto Parts & Service, a local automotive workshop and spare parts retailer in Banting, Selangor, Malaysia. It introduces the business, describes its repair and maintenance services and parts, and helps customers find the workshop or get in touch.

## Key Features

- Three static language pages: English (`index.html`), Bahasa Melayu (`index-ms.html`), and Simplified Chinese (`index-zh.html`), with links to switch languages.
- Responsive navigation with links to the main page sections.
- Business overview, workshop experience and customer statistics.
- Six service descriptions covering maintenance, engine repair, suspension, brakes, electrical work, and computer diagnostics.
- Spare parts categories and example brands, plus a workshop photo gallery with an image lightbox.
- Business address, a Google Maps directions link, click-to-call and WhatsApp links, and a Facebook link.
- Custom JavaScript for smooth section navigation, scroll effects, animated statistics, the gallery lightbox, and a back-to-top control.

The pages do not contain a contact form or an embedded map. The contact options are the external links shown on the site.

## Technology Stack

- HTML5 for page structure and content
- CSS3 in `css/style.css` for layout, styling, responsive behavior, and animations
- Vanilla JavaScript in `js/script.js` for page interactions
- Bootstrap 5.3.0 and Bootstrap Icons 1.11.0, loaded from jsDelivr CDN

There is no package manager, build step, or server-side application in this repository.

## Project Structure

```text
chai_huah_auto_parts_landing_page/
├── index.html                 # English landing page
├── index-ms.html              # Bahasa Melayu landing page
├── index-zh.html              # Simplified Chinese landing page
├── css/
│   └── style.css              # Shared styles
├── js/
│   └── script.js              # Shared browser interactions
├── images/                    # Workshop photos used by the pages
├── google3e658b76a602726e.html # Google site verification file
├── README.md
├── PROJECT_MAP.md
├── QUICK_START.md
├── DELIVERY_SUMMARY.md
├── SETUP_CHECKLIST.md
├── START_HERE.txt
└── .gitignore
```

## Website Deployment

No deployed website URL is specified in the project documentation or repository configuration. The HTML pages link to local files and external services, so the site can be hosted as a static website by uploading the project files while preserving the folder structure.

## Local Setup / Usage

No installation or build process is required. You can open `index.html` directly in a browser. To serve the files locally instead, run this command from the project folder:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>. Open `index-ms.html` or `index-zh.html` for the other language versions. Bootstrap styles, scripts, and icons are loaded from jsDelivr, so those resources require an internet connection.

---

### Author

**See Chan Sing**\
Bachelor of Computer Science (Information Systems)\
Universiti Malaya (UM)\
Malaysia
