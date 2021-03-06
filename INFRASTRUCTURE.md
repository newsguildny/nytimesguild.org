# Infrastructure

This website is built on several Google Cloud Platform (GCP) technologies.

nytimesguild.org is served by a Global HTTPS Load Balancer (LB), which has two backends:

1. A Google Cloud Storage (GCS) backend bucket, www-nytimesguild-org, which is accessible to the public internet. Only public web pages are deployed to this bucket.
2. An App Engine backend service, which is protected by IAP. This hosts our private [Library](https://github.com/nytimes/library) instance.

The GCS bucket is connected to Cloud CDN, with 1 hour TTLs.

In addition, there are two Cloud Run services:

1. GoTrue, which is an identity management service that we use for authenticating Netlify CMS authors
2. Git Gateway, which uses a Personal Access Token to authenticate with GitHub to manage PRs for authoring and publishing content.

These are currently not fronted by the LB, but they probably should be, just for convenience.

Most of this infrastructure is manually managed via the GCP Console. The Cloud Run services are automatically deployed whenever their respective repos (the forks in the `newsguildny` org) are pushed to.

## Deployments

There is a GitHub workflow defined at `.github/workflows/deploy.yml` that builds and exports the site to static files and then deploys them to GCS.

Deployments are executed by a dedicated service account with the minimal required permissions to update GCS objects.
