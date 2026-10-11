# Naveen Machineries

Company website for agricultural implements, construction machinery, precision components, hydraulic solutions, and gear profile working. This repository contains the editable website and its version history.

## Project

- `index.html`: page content, product cards, and enquiry interface.
- `style.css` and `base.css`: responsive design and styles.
- `app.js`: product filters, details, navigation, theme, and email enquiry preparation.
- `assets/`: optimized website images.
- `LAUNCH-GUIDE.md`: step-by-step Cloudflare Pages launch instructions.

## Local preview

Run from the repository folder:

```sh
python -m http.server 3000
```

Then open `http://localhost:3000`. No package installation, build step, database, or API keys are needed.

## Versions

- `v1.0-initial`: approved baseline before business contact details.
- `v1.1-contact`: phone and business email added, with email enquiry drafts.
- `main`: latest version, including this documentation.

Preserve the version tags. Make future changes on a separate branch, review them, and merge approved changes into `main`.

## Contact and enquiry behavior

Business phone: +91 9490115657. Business email: Naveenmachineries@gmail.com.

The enquiry form validates input and prepares a `mailto:` draft. Visitors must send it from their email application. It does not send mail through a server, store submissions, or confirm delivery. If no mail application opens, visitors can copy the prepared message and email it manually.

The business address and WhatsApp availability remain unconfirmed. The Careers section has no confirmed job listings.

## Images

The clay brick machine image is a company-supplied photograph. Other current product and hero visuals are generated concept illustrations, not photographs of confirmed company inventory. Their use is disclosed on the website; replace with actual company photos when available.

## Privacy

Keep this repository private. A public website deployment will still expose the HTML, CSS, JavaScript, and images served to visitors. Never put passwords, API tokens, confidential documents, or customer data into these files.
