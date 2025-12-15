# ARP Docs

Public documentation site for ARP, built with Docusaurus and deployed as static assets to S3 + CloudFront.

## Local development

Prereqs: Node.js `20` (see `.nvmrc`)

```bash
npm install
npm run start
```

Then open `http://localhost:3000/public_docs/` in your browser (the dev server does not auto-open a browser).

## Build

```bash
npm run build
```

Build output is written to `build/`.

## Deployment

See `arp/ARP_Docs/docs/deployment/aws.md`.
