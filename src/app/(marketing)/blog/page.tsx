import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | TysonsTechSolutions",
  description: "Tips, guides, and insights for service contractors on lead generation, marketing, and growing your business.",
};

// Static blog posts - can be replaced with database queries later
const posts = [
  {
    slug: "how-to-price-sealcoating-jobs",
    title: "How to Price Sealcoating Jobs in 2024",
    excerpt: "Learn the formula successful contractors use to price sealcoating jobs profitably while staying competitive.",
    category: "Pricing",
    date: "2024-01-15",
    readTime: "5 min read",
  },
  {
    slug: "respond-to-leads-faster",
    title: "Why Response Time is Everything in Home Services",
    excerpt: "Studies show the first contractor to respond wins 78% of jobs. Here is how to always be first.",
    category: "Lead Generation",
    date: "2024-01-10",
    readTime: "4 min read",
  },
  {
    slug: "seo-for-contractors",
    title: "SEO Basics for Service Contractors",
    excerpt: "A beginners guide to getting your contracting business found on Google.",
    category: "Marketing",
    date: "2024-01-05",
    readTime: "7 min read",
  },
  {
    slug: "ai-chatbots-for-contractors",
    title: "How AI Chatbots Are Changing Lead Generation",
    excerpt: "Discover how contractors are using AI to capture leads 24/7 and respond instantly to website visitors.",
    category: "Technology",
    date: "2024-01-01",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-slate-600">
            Tips and insights for service contractors
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-slate-200 p-8 hover:border-orange-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-slate-500">{post.date}</span>
                <span className="text-sm text-slate-500">{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-3 hover:text-orange-500">
                {post.title}
              </h2>
              <p className="text-slate-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
