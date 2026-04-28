import { Button } from "@/components/ui/Button";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-navy flex items-center justify-center px-6 pt-16">
        <div className="text-center max-w-lg">

          <p className="font-cinzel font-900 text-orange text-8xl mb-4 leading-none">
            404
          </p>

          <h1 className="font-cinzel font-700 text-white text-2xl uppercase tracking-widest mb-4">
            Page Not Found
          </h1>

          <p className="font-cormorant italic font-300 text-amber text-xl leading-relaxed mb-3">
            We couldn&apos;t find what you were looking for.
          </p>

          <p className="font-barlow font-300 text-white/55 text-sm leading-relaxed mb-10 max-w-md mx-auto">
            The page may have moved, been renamed, or never existed. If you followed
            a link from somewhere else on the site, let us know — we&apos;ll fix it.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary" href="/">
              Go Home
            </Button>
            <Button variant="secondary" href="/services">
              View Services
            </Button>
          </div>

          <p className="font-barlow font-300 text-white/30 text-xs mt-10">
            Looking for an estimate?{" "}
            <a href="/contact" className="text-orange hover:text-amber underline underline-offset-2 transition-colors">
              Contact us directly →
            </a>
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}
