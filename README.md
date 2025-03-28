# ApnaCA Website

A Next.js website for ApnaCA, a platform offering accounting services for small businesses in India.

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

## Deployment Instructions

### Setting up OpenAI API for the Chatbot

The website includes an AI-powered chatbot that requires an OpenAI API key to function. Follow these steps to configure it properly for deployment:

1. **Local Development:**
   - Create a `.env.local` file in the root directory
   - Add your OpenAI API key: `NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here`

2. **Vercel Deployment:**
   - Go to your project in the Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add a new environment variable:
     - Name: `NEXT_PUBLIC_OPENAI_API_KEY`
     - Value: Your actual OpenAI API key
   - Save and redeploy your application

3. **Troubleshooting Deployment Issues:**
   - If the chatbot doesn't work after deployment:
     - Verify the environment variable is correctly set in Vercel
     - Check browser console logs for any API-related errors
     - The chatbot will automatically fall back to a basic mode with predefined responses if the API is unavailable

### Using the Chatbot

The chatbot can answer questions about:
- Pricing plans
- Features and services
- Waitlist information
- Founder information
- Contact details
- And more

In AI-powered mode, it uses the OpenAI API to generate responses. In basic mode, it uses predefined answers for common questions.
