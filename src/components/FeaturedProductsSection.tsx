import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

import gpuImage from '@/assets/gpu-card.jpg';
import cpuImage from '@/assets/cpu-chip.jpg';
import ramImage from '@/assets/ram-sticks.jpg';
import motherboardImage from '@/assets/motherboard.jpg';
import gamingPcImage from '@/assets/gaming-pc-hero.jpg';
import miniPcImage from '@/assets/mini-pc.jpg';

const products = [
  {
    id: 'rtx-4080-super',
    name: 'RTX 4080 SUPER',
    category: 'Graphics Card',
    image: gpuImage,
    price: '$999',
    originalPrice: '$1,199',
    rating: 4.9,
    reviews: 234,
    badge: 'Best Seller',
  },
  {
    id: 'ryzen-9-7950x',
    name: 'Ryzen 9 7950X',
    category: 'Processor',
    image: cpuImage,
    price: '$549',
    originalPrice: null,
    rating: 4.8,
    reviews: 189,
    badge: null,
  },
  {
    id: 'ddr5-32gb-kit',
    name: 'DDR5 32GB Kit',
    category: 'Memory',
    image: ramImage,
    price: '$149',
    originalPrice: '$199',
    rating: 4.7,
    reviews: 156,
    badge: 'Sale',
  },
  {
    id: 'z790-aorus-elite',
    name: 'Z790 AORUS Elite',
    category: 'Motherboard',
    image: motherboardImage,
    price: '$349',
    originalPrice: null,
    rating: 4.8,
    reviews: 98,
    badge: 'New',
  },
  {
    id: 'apex-pro-gaming',
    name: 'APEX Pro Gaming',
    category: 'Pre-built PC',
    image: gamingPcImage,
    price: '$2,499',
    originalPrice: '$2,799',
    rating: 5.0,
    reviews: 312,
    badge: 'Featured',
  },
  {
    id: 'compact-elite',
    name: 'COMPACT Elite',
    category: 'Pre-built PC',
    image: miniPcImage,
    price: '$1,899',
    originalPrice: null,
    rating: 4.9,
    reviews: 87,
    badge: null,
  },
];

const FeaturedProductsSection = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const confirmAddToCart = () => {
    if (!selectedProduct) return;

    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      category: selectedProduct.category,
    });

    setSelectedProduct(null);
  };

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-hero-gradient opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Featured
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
              Best-Selling <span className="gradient-text">Products</span>
            </h2>
          </div>
          <a href='shop'>
          <Button variant="outline" size="lg">
            See All Products
          </Button>
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group glass rounded-2xl overflow-hidden card-hover">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Quick Add */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-4 right-4 p-3 rounded-xl bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-muted-foreground text-sm">{product.category}</span>
                <h3 className="font-display font-bold text-xl mt-1 mb-3">{product.name}</h3>

                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-accent fill-accent'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                  <span className="text-muted-foreground text-sm">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER MODAL (NOT AFFECTED BY NAVBAR) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4">
          <div className="bg-background glass rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <img
              src={selectedProduct.image}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
            <p className="text-muted-foreground mb-4">{selectedProduct.category}</p>

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-primary">
                {selectedProduct.price}
              </span>
              <Button onClick={confirmAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProductsSection;
