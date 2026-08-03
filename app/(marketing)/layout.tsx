import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { StickyContact } from "@/components/marketing/StickyContact";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyContact />
    </>
  );
}
