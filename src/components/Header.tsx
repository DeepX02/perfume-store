import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-luxury-gold to-luxury-rose-gold bg-clip-text text-transparent">
          ÉLÉGANCE
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-luxury-gold",
              isActive("/") ? "text-luxury-gold" : "text-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={cn(
              "text-sm font-medium transition-colors hover:text-luxury-gold",
              isActive("/products") ? "text-luxury-gold" : "text-foreground"
            )}
          >
            Perfumes
          </Link>
          <Link
            to="/upload"
            className={cn(
              "text-sm font-medium transition-colors hover:text-luxury-gold",
              isActive("/upload") ? "text-luxury-gold" : "text-foreground"
            )}
          >
            <Upload className="w-4 h-4 inline mr-1" />
            Upload
          </Link>
        </nav>

        <Link to="/cart">
          <Button variant="ghost" size="sm" className="hover:text-luxury-gold">
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;