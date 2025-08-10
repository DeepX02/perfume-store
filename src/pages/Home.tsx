import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Crown, Gem } from "lucide-react";
import Header from "@/components/Header";
import ProductCard, { Product } from "@/components/ProductCard";
import heroImage from "@/assets/hero-perfume.jpg";
import roseImage from "@/assets/rose-mystique.jpg";
import goldImage from "@/assets/gold-essence.jpg";

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Noir Élégance",
    brand: "ÉLÉGANCE",
    price: 189,
    image: heroImage,
    description: "A sophisticated blend of dark woods and exotic spices"
  },
  {
    id: "2", 
    name: "Rose Mystique",
    brand: "ÉLÉGANCE",
    price: 156,
    image: roseImage,
    description: "Luxurious rose petals with hints of vanilla and amber"
  },
  {
    id: "3",
    name: "Gold Essence",
    brand: "ÉLÉGANCE", 
    price: 234,
    image: goldImage,
    description: "Opulent golden fragrance with citrus and musk notes"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-gray to-luxury-black opacity-90"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-luxury-gold mr-3" />
            <span className="text-luxury-gold font-medium tracking-wider">LUXURY FRAGRANCE COLLECTION</span>
            <Sparkles className="w-8 h-8 text-luxury-gold ml-3" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-luxury-cream to-luxury-gold bg-clip-text text-transparent">
            ÉLÉGANCE
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover the world's most exquisite fragrances. Each bottle tells a story of luxury, crafted for the discerning individual.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="hero"
              size="lg" 
              className="px-8 py-4 text-lg"
            >
              <Link to="/products">
                Explore Collection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="luxuryOutline"
              size="lg"
              className="px-8 py-4 text-lg"
            >
              <Link to="/upload">
                Add New Fragrance
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-luxury-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-luxury-gold rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ÉLÉGANCE</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the pinnacle of luxury fragrances with our curated collection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-luxury transition-all duration-300">
              <CardContent className="pt-6">
                <Crown className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Each fragrance is carefully crafted using the finest ingredients from around the world
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-luxury transition-all duration-300">
              <CardContent className="pt-6">
                <Gem className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Exclusive Collection</h3>
                <p className="text-muted-foreground">
                  Limited edition perfumes that reflect sophistication and exclusivity
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-luxury transition-all duration-300">
              <CardContent className="pt-6">
                <Sparkles className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Personalized Experience</h3>
                <p className="text-muted-foreground">
                  Find your signature scent with our expertly curated fragrance profiles
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground text-lg">
              Discover our most coveted fragrances
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              asChild
              variant="luxuryOutline" 
              size="lg"
            >
              <Link to="/products">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;