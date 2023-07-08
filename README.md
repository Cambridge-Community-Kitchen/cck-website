This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Ensure you have a recent copy of node and npm/yarn then run:

```bash
npm install
# or
yarn install
```

### Environment variables

If you have access to the CMS at https://app.hygraph.com, visit the CCK project, and under 'Settings', retrieve the read-only content API URL, and set it (perhaps in a file like `.bashrc`):

```
GRAPHCMS_URL=https://eu-central-1.cdn.hygraph.com/content/.../master
```

### Running the server locally

Once your environment is set up, run the development server as follows:

```bash
npm run dev
# or
yarn dev
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
