import { useState } from "react";
import Header from "@/components/Header";
import ProductCard, { Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-perfume.jpg";
import roseImage from "@/assets/rose-mystique.jpg";
import goldImage from "@/assets/gold-essence.jpg";
import azureImage from "@/assets/azure-dreams.jpg";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const products: Product[] = [
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
  },
  {
    id: "4",
    name: "Azure Dreams",
    brand: "ÉLÉGANCE",
    price: 198,
    image: azureImage,
    description: "Fresh marine scent with bergamot and sea salt"
  },
  {
    id: "5",
    name: "Velvet Night",
    brand: "ÉLÉGANCE",
    price: 167,
    image: roseImage,
    description: "Sensual evening fragrance with jasmine and patchouli"
  },
  {
    id: "6",
    name: "Crystal Pure",
    brand: "ÉLÉGANCE",
    price: 145,
    image: azureImage,
    description: "Clean and crisp with white tea and lily of the valley"
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState("all");

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => {
      if (priceRange === "under-150") return product.price < 150;
      if (priceRange === "150-200") return product.price >= 150 && product.price <= 200;
      if (priceRange === "over-200") return product.price > 200;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-luxury-gold to-luxury-rose-gold bg-clip-text text-transparent">
            Perfume Collection
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our exquisite range of luxury fragrances, each crafted to perfection
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search perfumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-150">Under $150</SelectItem>
                <SelectItem value="150-200">$150 - $200</SelectItem>
                <SelectItem value="over-200">Over $200</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria</p>
            <Button onClick={() => {
              setSearchTerm("");
              setPriceRange("all");
              setSortBy("name");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;