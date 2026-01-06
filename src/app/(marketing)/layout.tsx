import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import PromoBanner from "@/components/marketing/PromoBanner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
