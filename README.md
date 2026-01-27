This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Gmail Setup (MX Records)

To activate Gmail for your custom domain, delete any pre-existing MX records associated with your domain and add the following MX records in the DNS section of your domain host:

| Priority | Value |
|----------|-------|
| 1 | ASPMX.L.GOOGLE.COM. |
| 5 | ALT1.ASPMX.L.GOOGLE.COM. |
| 5 | ALT2.ASPMX.L.GOOGLE.COM. |
| 10 | ALT3.ASPMX.L.GOOGLE.COM. |
| 10 | ALT4.ASPMX.L.GOOGLE.COM. |

**Configuration notes:**
- **Name/Host:** Set to `@` or leave blank (default value for your root domain)
- **TTL:** Set to default or the lowest available value (e.g., 3600 or 1 hour)
- **Format:** Some domain hosts require a trailing period (e.g., `ASPMX.L.GOOGLE.COM.`) while others do not. Check your host's specific format requirements or select preconfigured Google/Gmail values if available.
