# Showcase your Open Source Contributions 🤍

Create a website with an RSS feed of your recent GitHub pull requests and issues across the Open Source projects you contribute to.

![atinux-pull-requests](https://github.com/user-attachments/assets/cfa82cc2-51af-4fd4-9012-1f8517dd370f)

Demo: https://contribs.ahmedrangel.com

## Features

- List the 50 most recent pull requests and issues you've contributed to.
- RSS feed
- Only add your GitHub token to get started

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and fill in your GitHub token:

```bash
cp .env.example .env
```

Create a GitHub token with no special scope on [GitHub](https://github.com/settings/personal-access-tokens/new) and set it in the `.env` file:

```bash
NUXT_GITHUB_TOKEN=your-github-token
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy

Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com) on your Cloudflare account:

```bash
npx nuxthub deploy
```

Then checkout your server cache, analaytics and more in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).

## Credits

This project is inspired by [Atinux](https://github.com/atinux)'s [my-pull-requests](https://github.com/atinux/my-pull-requests) project.

## License

[MIT](./LICENSE)
