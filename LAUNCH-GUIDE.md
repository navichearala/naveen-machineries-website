# Naveen Machineries: Website Launch Checklist

This guide launches the existing static website using your private GitHub repository and Cloudflare Pages. Buying a domain is optional until the free website address has been tested; no purchase or public deployment was performed as part of saving the code.

## Your starting point

- GitHub account: `navichearala`.
- Repository: `naveen-machineries-website`, private.
- Production branch: `main`.
- Preserved versions: `v1.0-initial` and `v1.1-contact`.
- Site files: HTML, CSS, JavaScript, and images; no build framework or database.

Private source storage and public website access are separate decisions. Do not store secrets in frontend files, even when the GitHub repository is private.

## Launch on the free address

Follow this sequence, adapted from [Cloudflare's static HTML deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

1. Create or sign in to your Cloudflare account.
2. Open **Workers & Pages**.
3. Select **Create application**, then the **Pages** tab.
4. Choose **Import an existing Git repository**.
5. Connect your GitHub account. When selecting repository permissions, grant access only to `naveen-machineries-website` if the installation screen allows it.
6. Select that repository and choose **Begin setup**.
7. Enter the settings below.
8. Select **Save and Deploy**. This is the point at which you authorize the site to become publicly accessible.
9. Open the exact `pages.dev` URL returned by Cloudflare. Do not assume your preferred project name or address is available.

Cloudflare supports Git integration with private repositories; its setup flow and automatic deployments are described in [Cloudflare Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/).

### Settings for this repository

| Field | Value |
|---|---|
| Project name | `naveen-machineries`, if available |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `.` (the repository root) |
| Root directory, if separately requested | Leave blank/default |
| Environment variables | None |

The output is the repository root because `index.html` and `assets/` are located there; no `dist` folder is generated. Cloudflare documents `exit 0` for sites that need no build and provides a `pages.dev` address after deployment ([static HTML guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)).

## Check before sharing with customers

Complete these checks on a phone and a computer:

- [ ] Homepage, navigation, product filters, and product detail windows work.
- [ ] The company photograph and other images load.
- [ ] Phone link opens the correct number: +91 9490115657.
- [ ] Email link opens Naveenmachineries@gmail.com.
- [ ] Submit the enquiry form, open the email draft, and verify recipient, subject, and message.
- [ ] Send a test email yourself and confirm receipt in the business inbox.
- [ ] Understand that closing the email app without pressing Send does not submit an enquiry.
- [ ] Confirm that conceptual images and product descriptions are acceptable for public use.
- [ ] Add the business address when ready.
- [ ] Keep Careers general until real vacancy information is available.
- [ ] Review any privacy notice needed before adding analytics, tracking, or server-side forms.

The current enquiry flow is an email-app handoff, not automatic website-to-inbox delivery. If you later want direct delivery without an email app, connect a form service or a server-side email provider, with appropriate spam protection and privacy handling.

## Buy a domain after testing

My suggested name is `naveenmachineries.com`, subject to an availability check. Compare annual renewal cost, not only the first-year promotion, and choose a standard-priced rather than premium domain.

Cloudflare Registrar offers registration and renewal at cost without registrar markups ([Cloudflare Registrar](https://www.cloudflare.com/domains/)). Porkbun is another option with published registration and renewal pricing ([Porkbun domain pricing](https://porkbun.com/products/domains)).

1. Search the exact domain at your chosen registrar.
2. Review availability, registration price, renewal price, fees, and term.
3. Buy it in your own account using contact details you control.
4. Enable two-factor authentication and renewal reminders; consider auto-renew.
5. Do not buy a separate hosting package or website builder for this deployment.

Cloudflare Pages offers a free starting tier; check its current limits before selecting a plan ([Cloudflare Pages](https://www.cloudflare.com/products/pages/)).

## Connect your domain

These steps follow [Cloudflare's custom-domain instructions](https://developers.cloudflare.com/pages/configuration/custom-domains/).

1. Add your domain as a website/zone in the same Cloudflare account.
2. For the root domain, configure the domain's nameservers at your registrar to use the values Cloudflare supplies.
3. If the domain already has email or other services, preserve their existing DNS records before changing nameservers.
4. Open **Workers & Pages → your project → Custom domains → Set up a domain**.
5. Enter the domain you purchased and follow the prompts.
6. Add the `www` address separately if you want both forms of the address.
7. Wait until Cloudflare reports the domain and HTTPS certificate active.
8. Test HTTPS on each configured address and retest phone and email links.

Do not only create a DNS record: the domain must also be associated with the Pages project in its Custom domains screen ([Cloudflare custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)).

## Update future versions safely

1. Make edits on a feature branch, such as `update-product-photos`.
2. Open a pull request and inspect its preview deployment.
3. Check the mobile layout, product details, and enquiry flow.
4. Merge approved changes into `main`.
5. Confirm the production deployment succeeded, then test the live website.
6. Add a new version tag for meaningful milestones. Keep the initial tags unchanged.

Cloudflare automatically deploys changes from the connected repository and supports preview deployments for reviewing changes before production ([Cloudflare deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)).

## Your immediate next step

Sign in to Cloudflare, open Workers & Pages, and start the Pages Git-import flow. Stop before Save and Deploy if you do not yet want this version to be publicly accessible.
