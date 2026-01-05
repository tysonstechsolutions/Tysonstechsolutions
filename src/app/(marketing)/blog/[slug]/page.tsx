import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | TysonsTechSolutions Blog`,
    description: post.excerpt,
    keywords: [post.category.toLowerCase(), "tech blog", "business technology"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-orange-500 hover:text-orange-600 mb-8 inline-flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-slate-500">{post.date}</span>
            <span className="text-sm text-slate-500">{post.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
          <p className="text-xl text-slate-600">{post.excerpt}</p>
        </header>

        {/* Article Content Placeholder */}
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            This article provides comprehensive insights into {post.title.toLowerCase()}.
            Whether you are a business owner, developer, or marketer, you will find
            actionable tips and strategies to improve your results.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-slate-600 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              Understanding the fundamentals is crucial for success
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              Implementation requires careful planning and execution
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              Continuous optimization leads to better results over time
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              Working with experts can accelerate your progress
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            Getting Started
          </h2>
          <p className="text-slate-600 mb-6">
            The first step is to assess your current situation and identify areas
            for improvement. This involves analyzing your existing processes,
            understanding your target audience, and setting clear goals.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            Best Practices
          </h2>
          <p className="text-slate-600 mb-6">
            Following industry best practices ensures you are building on a solid
            foundation. This includes using modern tools and technologies, staying
            up-to-date with trends, and continuously learning from experts in the
            field.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            Conclusion
          </h2>
          <p className="text-slate-600 mb-6">
            Success in this area requires dedication, continuous learning, and the
            right approach. By following the strategies outlined in this article,
            you will be well on your way to achieving your goals.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-orange-50 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Need Help With Your Project?
          </h3>
          <p className="text-slate-600 mb-4">
            TysonsTechSolutions offers expert {post.category.toLowerCase()} services
            for businesses of all sizes. Get a free consultation today.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Get Free Consultation
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Related Articles
            </h3>
            <div className="grid gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                      {related.category}
                    </span>
                    <span className="text-xs text-slate-500">{related.readTime}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 hover:text-orange-500">
                    {related.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Schema.org Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: "TysonsTechSolutions",
            },
            publisher: {
              "@type": "Organization",
              name: "TysonsTechSolutions",
              url: "https://tysonstechsolutions.com",
            },
          }),
        }}
      />
    </div>
  );
}
