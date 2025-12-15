---
title: AWS Deployment
---

This repo builds a static Docusaurus site and publishes it to a dedicated S3 bucket. The main website CloudFront distribution should route `/public_docs*` to that bucket as a second origin.

## High-level setup

1. Create an S3 bucket for docs.
2. Allow the main website CloudFront distribution to read from the docs bucket (bucket policy).
3. Update the website CloudFront distribution to route `/public_docs*` to the docs bucket origin.
4. Configure GitHub Actions (OIDC role + repo secrets) so pushes to `main` deploy.

## Notes

- The site is configured with `baseUrl: "/public_docs/"`.
- The deploy workflow syncs `build/` to the bucket prefix `public_docs/` so CloudFront requests map 1:1 to S3 keys.
- The CloudFront rewrite function should be attached to the `/public_docs*` cache behavior so `/public_docs` and pretty URLs resolve to `index.html` files.

## GitHub Actions role (high level)

The deploy workflow needs an IAM role that can:

- `s3:ListBucket` on the docs bucket
- `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` on `arn:aws:s3:::<docs-bucket>/public_docs/*`
- (optional) `cloudfront:CreateInvalidation` on the main website distribution
- (optional) `cloudformation:DescribeStacks` if you use `AWS_STACK_NAME`
