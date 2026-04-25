import { Button } from "@/components/ui/Button";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-navy flex items-center justify-center px-6 pt-16">
        <div className="text-center max-w-md">
          <p className="font-cinzel font-900 text-orange text-8xl mb-4">404</p>
          <h1 className="font-cinzel font-700 text-white text-2xl uppercase tracking-wide mb-4">
            Page Not Found
          </h1>
          <p className="font-cormorant italic font-300 text-amber text-lg mb-8">
            This page doesn&apos;t exist — but your property project can.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button variant="primary" href="/">
              Go Home
            </Button>
            <Button variant="secondary" href="/estimate">
              Get an Estimate
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
