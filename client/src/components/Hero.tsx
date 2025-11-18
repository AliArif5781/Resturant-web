import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Hero_biryani_dish_image_c0d32226.png";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Authentic Pakistani Cuisine
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Experience the rich flavors and traditions of Pakistan, crafted with passion and served with pride
        </p>
        <Link href="/upload" data-testid="button-explore-menu">
          <Button
            size="lg"
            variant="outline"
            className="px-12 py-6 text-lg backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            View Our Menu
          </Button>
        </Link>
      </div>
    </section>
  );
}
