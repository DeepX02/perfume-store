import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-perfume.jpg";

const productData = {
  "1": {
    id: "1",
    name: "Noir Élégance",
    brand: "ÉLÉGANCE",
    price: 189,
    originalPrice: 220,
    images: [heroImage, heroImage, heroImage],
    description: "A sophisticated blend of dark woods and exotic spices that embodies luxury and mystery. This exquisite fragrance opens with bergamot and black pepper, develops into a heart of rose and jasmine, and settles into a base of sandalwood, vetiver, and amber.",
    notes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      middle: ["Rose", "Jasmine", "Violet"],
      base: ["Sandalwood", "Vetiver", "Amber", "Musk"]
    },
    size: "100ml",
    concentration: "Eau de Parfum",
    rating: 4.8,
    reviews: 156,
    inStock: true
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const product = productData[id as keyof typeof productData] || productData["1"];

  const addToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const addToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been saved to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.brand}
              </Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-luxury-gold text-luxury-gold"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-luxury-gold">
                ${product.price}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
              <Badge variant="destructive">Save ${product.originalPrice - product.price}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <span className="text-sm text-muted-foreground">Size</span>
                <p className="font-medium">{product.size}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Concentration</span>
                <p className="font-medium">{product.concentration}</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Fragrance Notes */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Fragrance Notes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-luxury-gold mb-2">Top Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.top.map((note) => (
                        <Badge key={note} variant="outline">{note}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-luxury-gold mb-2">Middle Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.middle.map((note) => (
                        <Badge key={note} variant="outline">{note}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-luxury-gold mb-2">Base Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.base.map((note) => (
                        <Badge key={note} variant="outline">{note}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                onClick={addToCart}
                variant="luxury"
                className="flex-1 h-12"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              
              <Button
                variant="luxuryOutline"
                size="icon"
                onClick={addToWishlist}
                className="h-12 w-12"
              >
                <Heart className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {product.inStock && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  ✨ Free shipping on orders over $150
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;