import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { useState, useEffect } from "react";
import Cart from "@/components/Cart";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-sm border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md">
              <UtensilsCrossed className={`w-6 h-6 ${isScrolled || !isHomePage ? "text-primary" : "text-white"}`} />
              <span className={`font-serif text-2xl font-bold ${isScrolled || !isHomePage ? "text-foreground" : "text-white"}`}>
                Zaika
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" data-testid="link-menu">
              <span className={`hover-elevate active-elevate-2 px-3 py-2 rounded-md ${isScrolled || !isHomePage ? "text-foreground" : "text-white"}`}>
                Menu
              </span>
            </Link>
            <Cart />
            <Link href="/upload" data-testid="link-add-dish">
              <Button variant={isScrolled || !isHomePage ? "default" : "outline"} className={!isScrolled && isHomePage ? "bg-white/10 border-white/30 text-white hover:bg-white/20" : ""}>
                Add Dish
              </Button>
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || !isHomePage ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled || !isHomePage ? "text-foreground" : "text-white"}`} />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link href="/" data-testid="link-menu-mobile">
                <span className="block hover-elevate active-elevate-2 px-3 py-2 rounded-md">Menu</span>
              </Link>
              <div className="px-3">
                <Cart />
              </div>
              <Link href="/upload" data-testid="link-add-dish-mobile">
                <Button className="w-full">Add Dish</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
