import { useState, useMemo } from 'react';
import { Search, Star, ShoppingCart, Grid3X3, LayoutList, SlidersHorizontal, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from "react-router-dom";



import gpuImage from '@/assets/gpu-card.jpg';
import cpuImage from '@/assets/cpu-chip.jpg';
import ramImage from '@/assets/ram-sticks.jpg';
import motherboardImage from '@/assets/motherboard.jpg';
import gamingPcImage from '@/assets/gaming-pc-hero.jpg';
import miniPcImage from '@/assets/mini-pc.jpg';
import workstationImage from '@/assets/workstation-pc.jpg';


const allProducts = [
  // =========================
  // GRAPHICS CARDS
  // =========================
  {
    id: 'rtx-4090',
    name: 'NVIDIA RTX 4090',
    category: 'Graphics Card',
    image: gpuImage,
    price: 1599,
    originalPrice: 1799,
    rating: 5.0,
    reviews: 812,
    badge: 'Best Seller',
    inStock: true,
    description: 'Flagship GPU for 4K gaming, AI workloads, and content creation.'
  },
  {
    id: 'rtx-4080-super',
    name: 'RTX 4080 SUPER',
    category: 'Graphics Card',
    image: gpuImage,
    price: 999,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 524,
    badge: 'Sale',
    inStock: true,
    description: 'High-end GPU with DLSS 3 and ray tracing for smooth 4K gaming.'
  },
  {
    id: 'rx-7900-xtx',
    name: 'AMD RX 7900 XTX',
    category: 'Graphics Card',
    image: gpuImage,
    price: 899,
    originalPrice: null,
    rating: 4.8,
    reviews: 367,
    badge: null,
    inStock: true,
    description: 'Powerful AMD GPU optimized for raster performance and creators.'
  },

  // =========================
  // PROCESSORS (CPU)
  // =========================
  {
    id: 'intel-i9-14900k',
    name: 'Intel Core i9-14900K',
    category: 'Processor',
    image: cpuImage,
    price: 589,
    originalPrice: 649,
    rating: 4.9,
    reviews: 641,
    badge: 'Featured',
    inStock: true,
    description: '24-core hybrid CPU built for extreme gaming and productivity.'
  },
  {
    id: 'ryzen-9-7950x',
    name: 'Ryzen 9 7950X',
    category: 'Processor',
    image: cpuImage,
    price: 549,
    originalPrice: null,
    rating: 4.8,
    reviews: 532,
    badge: null,
    inStock: true,
    description: '16-core powerhouse for multitasking, rendering, and gaming.'
  },
  {
    id: 'ryzen-7-7800x3d',
    name: 'Ryzen 7 7800X3D',
    category: 'Processor',
    image: cpuImage,
    price: 449,
    originalPrice: null,
    rating: 5.0,
    reviews: 720,
    badge: 'Best Seller',
    inStock: true,
    description: 'Best gaming CPU with 3D V-Cache technology.'
  },

  // =========================
  // MOTHERBOARDS
  // =========================
  {
    id: 'z790-aorus-elite',
    name: 'Z790 AORUS Elite',
    category: 'Motherboard',
    image: motherboardImage,
    price: 349,
    originalPrice: null,
    rating: 4.8,
    reviews: 214,
    badge: 'New',
    inStock: true,
    description: 'High-end Intel motherboard with DDR5 and PCIe 5.0 support.'
  },
  {
    id: 'b650-tomahawk',
    name: 'MSI B650 TOMAHAWK',
    category: 'Motherboard',
    image: motherboardImage,
    price: 229,
    originalPrice: 269,
    rating: 4.7,
    reviews: 198,
    badge: 'Sale',
    inStock: true,
    description: 'Reliable AM5 motherboard for Ryzen processors.'
  },

  // =========================
  // MEMORY (RAM)
  // =========================
  {
    id: 'ddr5-32gb',
    name: 'DDR5 32GB (2x16GB) 6000MHz',
    category: 'Memory',
    image: ramImage,
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviews: 488,
    badge: 'Sale',
    inStock: true,
    description: 'High-speed DDR5 RAM optimized for gaming and multitasking.'
  },
  {
    id: 'ddr5-64gb',
    name: 'DDR5 64GB (2x32GB) 6000MHz',
    category: 'Memory',
    image: ramImage,
    price: 289,
    originalPrice: null,
    rating: 4.8,
    reviews: 205,
    badge: null,
    inStock: true,
    description: 'Professional-grade memory for creators and workstations.'
  },

  // =========================
  // STORAGE
  // =========================
  {
    id: 'samsung-990-pro',
    name: 'Samsung 990 PRO 2TB NVMe',
    category: 'Storage',
    image: ramImage,
    price: 219,
    originalPrice: 249,
    rating: 4.9,
    reviews: 933,
    badge: 'Best Seller',
    inStock: true,
    description: 'Ultra-fast PCIe 4.0 NVMe SSD for gaming and professional use.'
  },
  {
    id: 'seagate-4tb-hdd',
    name: 'Seagate Barracuda 4TB HDD',
    category: 'Storage',
    image: ramImage,
    price: 89,
    originalPrice: null,
    rating: 4.6,
    reviews: 412,
    badge: null,
    inStock: true,
    description: 'Reliable high-capacity storage for backups and media.'
  },

  // =========================
  // POWER SUPPLY
  // =========================
  {
    id: 'corsair-rm1000x',
    name: 'Corsair RM1000x 1000W Gold',
    category: 'Power Supply',
    image: miniPcImage,
    price: 199,
    originalPrice: 229,
    rating: 4.9,
    reviews: 356,
    badge: 'Recommended',
    inStock: true,
    description: 'Fully modular PSU with 80+ Gold efficiency.'
  },

  // =========================
  // PC CASE
  // =========================
  {
    id: 'lian-li-o11',
    name: 'Lian Li O11 Dynamic',
    category: 'PC Case',
    image: miniPcImage,
    price: 159,
    originalPrice: null,
    rating: 4.8,
    reviews: 502,
    badge: 'Popular',
    inStock: true,
    description: 'Premium tempered-glass case with excellent airflow.'
  },

  // =========================
  // PRE-BUILT PCS
  // =========================
  {
    id: 'apex-pro-gaming',
    name: 'APEX Pro Gaming PC',
    category: 'Pre-built PC',
    image: gamingPcImage,
    price: 2499,
    originalPrice: 2799,
    rating: 5.0,
    reviews: 312,
    badge: 'Featured',
    inStock: true,
    description: 'RTX 4090 + i9-14900K ultimate gaming machine.'
  },
  {
    id: 'creator-pro',
    name: 'CREATOR Pro Workstation',
    category: 'Workstation',
    image: workstationImage,
    price: 3299,
    originalPrice: 3599,
    rating: 4.9,
    reviews: 184,
    badge: 'Pro',
    inStock: true,
    description: 'Professional workstation optimized for 3D and video editing.'
  }
];

const categories = ['Graphics Card', 'Processor', 'Memory', 'Motherboard', 'Pre-built PC', 'Workstation'];

const Shop = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(true);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 4000]);
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Search filter
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: `$${product.price}`,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const activeFiltersCount = selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 4000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="pt-24 pb-8 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            NEXUS<span className="text-primary">PC</span> Shop
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore our complete collection of high-performance PC components and pre-built systems.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base rounded-xl border-border/50 focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 md:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 rounded-lg border border-border bg-background text-foreground text-sm flex-1 md:flex-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="sticky top-36 space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-lg flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="bg-secondary/30 rounded-2xl p-5 border border-border">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        ({allProducts.filter(p => p.category === category).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-secondary/30 rounded-2xl p-5 border border-border">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={4000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">${priceRange[0]}</span>
                    <span className="text-muted-foreground">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="bg-secondary/30 rounded-2xl p-5 border border-border">
                <h3 className="font-semibold mb-4">Quick Filters</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSortBy('rating')}
                  >
                    ⭐ Top Rated
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      clearFilters();
                      setSearchQuery('Sale');
                    }}
                  >
                    🏷️ On Sale
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      clearFilters();
                      setSearchQuery('New');
                    }}
                  >
                    ✨ New Arrivals
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid/List */}
          <main className="flex-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> of{' '}
                <span className="text-foreground font-medium">{allProducts.length}</span> products
              </p>
              {selectedCategories.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCategories.map(cat => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-2"
                    >
                      {cat}
                      <button onClick={() => handleCategoryChange(cat, false)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="group bg-card hover:bg-secondary/50 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                      {product.badge && (
                        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                          product.badge === 'Sale' ? 'bg-destructive text-destructive-foreground' :
                          product.badge === 'Best Seller' ? 'bg-accent text-accent-foreground' :
                          product.badge === 'Featured' ? 'bg-primary text-primary-foreground' :
                          product.badge === 'Pro' ? 'bg-purple-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {product.badge}
                        </div>
                      )}

                      {product.originalPrice && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-destructive/90 text-destructive-foreground text-xs font-bold rounded-lg">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </div>
                      )}

                      {/* Quick Add Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="absolute bottom-3 right-3 p-3 rounded-xl bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-lg"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider">{product.category}</span>
                      <h3 className="font-display font-bold text-foreground text-lg mt-1 mb-2">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground text-sm">{product.rating}</span>
                        <span className="text-muted-foreground text-sm">({product.reviews})</span>
                      </div>

                      {/* Price & Add to Cart */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-xl font-bold text-primary">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-muted-foreground text-sm line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          variant="hero"
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && filteredProducts.length > 0 && (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="group flex flex-col md:flex-row gap-6 bg-card hover:bg-secondary/50 border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.badge && (
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold ${
                          product.badge === 'Sale' ? 'bg-destructive text-destructive-foreground' :
                          product.badge === 'Best Seller' ? 'bg-accent text-accent-foreground' :
                          product.badge === 'Featured' ? 'bg-primary text-primary-foreground' :
                          product.badge === 'Pro' ? 'bg-purple-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <span className="text-muted-foreground text-xs uppercase tracking-wider">{product.category}</span>
                        <h3 className="font-display font-bold text-foreground text-xl mt-1">{product.name}</h3>
                        <p className="text-muted-foreground mt-2">{product.description}</p>
                        <div className="flex items-center gap-1.5 mt-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-muted-foreground text-sm">{product.rating} ({product.reviews} reviews)</span>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                          <span className="font-display text-2xl font-bold text-primary">${product.price}</span>
                          {product.originalPrice && (
                            <>
                              <span className="text-muted-foreground text-lg line-through">${product.originalPrice}</span>
                              <span className="px-2 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded">
                                Save ${product.originalPrice - product.price}
                              </span>
                            </>
                          )}
                        </div>
                        <Button onClick={() => handleAddToCart(product)} variant="hero">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
