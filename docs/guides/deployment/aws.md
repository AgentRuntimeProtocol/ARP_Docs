---
title: AWS Deployment
sidebar_position: 1
---

This repo builds a static Docusaurus site and publishes it to a shared S3 bucket under `public_docs/`. The main website CloudFront distribution should route `/public_docs*` to that bucket/prefix.

## High-level setup

1. Create an S3 bucket for the site + docs.
2. Deploy the website repo to `site/` and this repo to `public_docs/` in that bucket.
3. Allow the main website CloudFront distribution to read from `site/*` and `public_docs/*` in the bucket (bucket policy).
4. Update the CloudFront distribution so the default behavior serves the website from `site/` and `/public_docs*` serves docs from `public_docs/`.
5. Configure GitHub Actions (OIDC role + repo secrets) so pushes to `main` deploy.

## Notes

- The site is configured with `baseUrl: "/public_docs/"`.
- The deploy workflow syncs `build/` to the bucket prefix `public_docs/` so CloudFront requests map 1:1 to S3 keys.
- If you use a CloudFront “pretty URLs” rewrite function, attach it to the `/public_docs*` cache behavior so `/public_docs` and pretty URLs resolve to `index.html` files.

## GitHub Actions role (high level)

The deploy workflow needs an IAM role that can:

- `s3:ListBucket` on the shared bucket
- `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` on `arn:aws:s3:::<shared-bucket>/public_docs/*`
- `cloudfront:CreateInvalidation` on the main website distribution
