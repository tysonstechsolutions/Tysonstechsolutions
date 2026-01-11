import Link from "next/link";
import { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tysonstechsolutions.com";

export const metadata: Metadata = {
  title: "Blog - Web Development, AI, SEO & Digital Marketing Tips",
  description: "Expert insights on web development, AI chatbots, SEO, digital marketing, and business technology. Learn from industry professionals.",
  keywords: ["web development blog", "AI chatbot tips", "SEO guide", "digital marketing blog", "business technology"],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  const categories = [...new Set(blogPosts.map((p) => p.category))];
  const featuredPosts = blogPosts.slice(0, 3);
  const recentPosts = blogPosts.slice(3);

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Insights, guides, and tips on web development, AI, SEO, and growing your business with technology.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            All Posts
          </span>
          {categories.map((category) => (
            <span
              key={category}
              className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-orange-400 to-orange-600" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-500 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500">{post.date}</span>
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-500 mb-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Get the latest articles on web development, AI, and business technology delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
