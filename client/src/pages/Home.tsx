import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DishGrid from "@/components/DishGrid";
import Footer from "@/components/Footer";
import { type Dish } from "@/components/DishCard";

export default function Home() {
  const { data: dishes = [], isLoading } = useQuery<Dish[]>({
    queryKey: ["/api/dishes"],
  });

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      {isLoading ? (
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-muted-foreground">Loading dishes...</p>
          </div>
        </section>
      ) : (
        <DishGrid dishes={dishes} />
      )}
      <Footer />
    </div>
  );
}
