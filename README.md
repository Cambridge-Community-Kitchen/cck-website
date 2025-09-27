This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Ensure you have the correct version of node installed, then install
dependencies:

```bash
# if using nvm
nvm use

# These should match:
node -v
cat .nvmrc

# To install dependencies,
npm install
```

### Environment variables

Sign into opencollective and generate an opencollective API token (do not add
any scopes, it just needs to grab open-access data).

```
export OPENCOLLECTIVE_API_TOKEN=f00df00df00df00df00df00df00df00df00df00d
```

### Running the server locally

Once your environment is set up, run the development server as follows:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The website is deployed on the [Vercel Platform](https://vercel.com/). The [Next.js deployment documentation](https://nextjs.org/docs/deployment) has more guidance onhow this works in general.
