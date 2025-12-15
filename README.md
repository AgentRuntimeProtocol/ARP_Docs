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

This repo is designed to deploy its static build output to a dedicated S3 bucket, then served via CloudFront to https://agent-runtime-protocol.com/public_docs.
