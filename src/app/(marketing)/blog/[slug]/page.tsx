import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Static blog posts data - can be replaced with database queries
const postsData: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "how-to-price-sealcoating-jobs": {
    title: "How to Price Sealcoating Jobs in 2024",
    excerpt: "Learn the formula successful contractors use to price sealcoating jobs profitably while staying competitive.",
    category: "Pricing",
    date: "2024-01-15",
    readTime: "5 min read",
    content: `
## The Basics of Sealcoating Pricing

Pricing sealcoating jobs correctly is crucial for your business success. Price too high and you lose jobs to competitors. Price too low and you are leaving money on the table or worse, losing money.

## The Square Footage Formula

Most successful contractors use a per-square-foot pricing model:

- **Residential driveways**: $0.15 - $0.25 per square foot
- **Commercial parking lots**: $0.08 - $0.15 per square foot
- **Minimum job charge**: $150 - $250

## Factors That Affect Pricing

### 1. Surface Condition
- New asphalt or excellent condition: Base rate
- Moderate wear: Add 10-20%
- Heavy oxidation or damage: Add 20-40%

### 2. Crack Filling Requirements
- Minor cracking: Include in base price
- Moderate cracking: Add $50-150
- Extensive cracking: Quote separately

### 3. Location and Access
- Easy access: Base rate
- Difficult access or steep driveway: Add 15-25%
- Remote location: Add travel costs

## Using AI for Instant Quotes

Modern contractors are using AI-powered tools to generate instant quotes. Our platform can:

1. Measure driveways automatically using satellite imagery
2. Calculate square footage in seconds
3. Generate quotes based on your pricing formula
4. Send quotes to customers instantly

This means you can provide accurate quotes 24/7 without manual measurement.

## Conclusion

The key to profitable sealcoating pricing is consistency and efficiency. Use a formula, stick to it, and leverage technology to quote faster than your competition.
    `,
  },
  "respond-to-leads-faster": {
    title: "Why Response Time is Everything in Home Services",
    excerpt: "Studies show the first contractor to respond wins 78% of jobs. Here is how to always be first.",
    category: "Lead Generation",
    date: "2024-01-10",
    readTime: "4 min read",
    content: `
## The 5-Minute Rule

Research shows that responding to leads within 5 minutes makes you **21 times more likely** to qualify that lead compared to waiting 30 minutes.

In home services, the first contractor to respond wins approximately **78% of jobs**.

## Why Speed Matters

### 1. Customer Psychology
When someone requests a quote, they are in "buying mode." This mindset fades quickly. The longer you wait, the less motivated they become.

### 2. Competition
While you are finishing that job or eating lunch, your competitors are calling your lead. By the time you respond, they may have already scheduled an estimate.

### 3. Trust Building
Fast responses signal professionalism. Customers think: "If they respond this fast, they probably show up on time too."

## How to Respond Faster

### Automated Text Responses
Set up automatic text messages to acknowledge leads immediately:

"Hi [Name], thanks for your interest! I received your request and will call you within the hour. - [Your Name]"

### AI Chatbots
AI chatbots can:
- Respond instantly 24/7
- Qualify leads automatically
- Collect contact information
- Even provide instant quotes

### SMS Alerts
Get text notifications the moment a lead comes in. No more checking email every hour.

## The Bottom Line

Speed wins jobs. If you are not responding within 5 minutes, you are losing business to contractors who are.
    `,
  },
  "seo-for-contractors": {
    title: "SEO Basics for Service Contractors",
    excerpt: "A beginners guide to getting your contracting business found on Google.",
    category: "Marketing",
    date: "2024-01-05",
    readTime: "7 min read",
    content: `
## What is SEO?

SEO (Search Engine Optimization) is how you get your website to show up when people search for services like yours on Google.

When someone searches "sealcoating near me" or "driveway repair [your city]," you want your business to appear.

## The Three Pillars of Local SEO

### 1. Google Business Profile
This is the most important thing you can do for local SEO:

- Claim and verify your Google Business Profile
- Add complete business information
- Upload photos of your work
- Collect Google reviews
- Post updates regularly

### 2. Your Website
Your website needs to tell Google what you do and where:

- Include your city/service area on every page
- Create pages for each service you offer
- Add your address and phone number
- Make sure it loads fast on mobile

### 3. Citations and Reviews
Build your online presence:

- List your business on Yelp, Angi, and industry directories
- Keep your name, address, and phone consistent everywhere
- Actively request reviews from happy customers

## Quick Wins for Contractors

1. **Optimize your Google Business Profile** - This alone can double your leads
2. **Add location pages** - Create a page for each city you serve
3. **Get reviews** - Ask every happy customer for a Google review
4. **Add photos** - Before/after photos of your work

## Common Mistakes

- No Google Business Profile
- Website does not mention your location
- Ignoring reviews
- Duplicate or inconsistent business listings

## Start Today

SEO takes time, but you can start seeing results in 3-6 months. The contractors who invest in SEO today will dominate their local market tomorrow.
    `,
  },
  "ai-chatbots-for-contractors": {
    title: "How AI Chatbots Are Changing Lead Generation",
    excerpt: "Discover how contractors are using AI to capture leads 24/7 and respond instantly to website visitors.",
    category: "Technology",
    date: "2024-01-01",
    readTime: "6 min read",
    content: `
## The Lead Generation Problem

Most contractors face the same challenge: website visitors leave without contacting you. Studies show:

- 98% of website visitors leave without taking action
- The average contractor website converts less than 3% of visitors
- Most leads come in when you are busy on a job

## Enter AI Chatbots

AI chatbots are changing the game for service contractors. Unlike basic chat widgets, AI chatbots can:

### 1. Have Real Conversations
Modern AI understands natural language. It can answer questions about your services, pricing, and availability just like a human would.

### 2. Qualify Leads Automatically
The chatbot asks the right questions:
- What service do you need?
- What is the approximate size?
- When do you need the work done?

By the time you get the lead, it is already qualified.

### 3. Generate Instant Quotes
The most advanced systems can:
- Measure properties using satellite imagery
- Calculate square footage automatically
- Generate quotes based on your pricing
- Send quotes instantly to customers

### 4. Work 24/7
Your chatbot never sleeps. It captures leads at 10 PM on Sunday when you are watching the game.

## Real Results

Contractors using AI chatbots report:
- 3x more leads from the same website traffic
- 50% reduction in time spent on phone quotes
- Higher close rates (customers already have pricing)

## Is It Right for You?

AI chatbots work best for:
- Contractors with a website getting regular traffic
- Services that can be quoted by square footage
- Businesses tired of losing leads to slow response times

## Getting Started

The best part? Modern AI chatbot platforms require no technical knowledge. You can be up and running in minutes.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(postsData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData[slug];

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | TysonsTechSolutions Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = postsData[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-slate-500">{post.date}</span>
            <span className="text-sm text-slate-500">{post.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-slate-600">
            {post.excerpt}
          </p>
        </header>

        <div className="prose prose-lg prose-slate max-w-none">
          {post.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-semibold text-slate-900 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('- ')) {
              return <li key={i} className="text-slate-600 ml-4">{paragraph.replace('- ', '')}</li>;
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
              return <li key={i} className="text-slate-600 ml-4 list-decimal">{paragraph.replace(/^\d+\.\s/, '')}</li>;
            }
            if (paragraph.trim() === '') {
              return null;
            }
            return <p key={i} className="text-slate-600 mb-4">{paragraph}</p>;
          })}
        </div>

        <div className="mt-12 p-8 bg-blue-50 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Ready to capture more leads?
          </h3>
          <p className="text-slate-600 mb-4">
            Try our AI-powered chatbot and start getting instant quotes on your website today.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Start Your Free Trial
          </Link>
        </div>
      </article>
    </div>
  );
}
