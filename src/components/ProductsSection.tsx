import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Monitor, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

import cpuImage from '@/assets/cpu-chip.jpg';
import gpuImage from '@/assets/gpu-card.jpg';
import ramImage from '@/assets/ram-sticks.jpg';
import motherboardImage from '@/assets/motherboard.jpg';
import gamingPcImage from '@/assets/gaming-pc-hero.jpg';
import workstationImage from '@/assets/workstation-pc.jpg';
import miniPcImage from '@/assets/mini-pc.jpg';

const tabs = ['Components', 'Prebuilt'];

const categories = [
  'CPU',
  'GPU',
  'RAM',
  'Motherboard',
  'Power Supply',
  'Air Cooler',
  'Monitor',
];

const products: Record<string, any[]> = {
  CPU: Array.from({ length: 12 }, (_, i) => ({
    id: `intel-i9-${14900 - i}k`,
    name: `Intel Core i9-${14900 - i}K`,
    specs: 'Up to 6.0GHz • 24 Cores • 32 Threads',
    price: `$${599 - i * 10}`,
    image: cpuImage,
    details: [
      'Architecture: Raptor Lake Refresh',
      'Socket: LGA 1700',
      'Cache: 36MB',
      'TDP: 125W',
      'Integrated Graphics: Intel UHD 770',
    ],
  })),
  GPU: Array.from({ length: 12 }, (_, i) => ({
    id: `nvidia-rtx-${4090 - i * 10}`,
    name: `NVIDIA RTX ${4090 - i * 10}`,
    specs: 'GDDR6X • Ray Tracing • DLSS 3',
    price: `$${1799 - i * 50}`,
    image: gpuImage,
    details: [
      'Memory: 24GB GDDR6X',
      'Boost Clock: 2.52 GHz',
      'Outputs: HDMI 2.1, DisplayPort 1.4a',
      'Power Draw: 450W',
    ],
  })),
  RAM: Array.from({ length: 12 }, (_, i) => ({
    id: `ddr5-${16 + i * 4}gb`,
    name: `DDR5 Memory ${16 + i * 4}GB`,
    specs: '6000MHz • Dual Channel • RGB',
    price: `$${99 + i * 20}`,
    image: ramImage,
    details: [
      'Type: DDR5',
      'Latency: CL30',
      'Voltage: 1.35V',
      'Heat Spreader: Aluminum',
    ],
  })),
  Motherboard: Array.from({ length: 12 }, (_, i) => ({
    id: `z790-board-${i + 1}`,
    name: `Z790 Gaming Board ${i + 1}`,
    specs: 'PCIe 5.0 • WiFi 6E • DDR5',
    price: `$${299 + i * 20}`,
    image: motherboardImage,
    details: [
      'Form Factor: ATX',
      'Socket: LGA 1700',
      'USB Ports: USB-C Gen 2x2',
      'Networking: 2.5Gb Ethernet',
    ],
  })),
  'Power Supply': Array.from({ length: 12 }, (_, i) => ({
    id: `modular-psu-${750 + i * 50}`,
    name: `Modular PSU ${750 + i * 50}W`,
    specs: '80+ Gold • Fully Modular',
    price: `$${129 + i * 15}`,
    image: workstationImage,
    details: [
      'Efficiency: 80+ Gold',
      'Fan: 135mm Silent Fan',
      'Protections: OVP, UVP, SCP',
    ],
  })),
  'Air Cooler': Array.from({ length: 12 }, (_, i) => ({
    id: `air-cooler-pro-${i + 1}`,
    name: `Air Cooler Pro ${i + 1}`,
    specs: 'Dual Tower • Silent Fans',
    price: `$${69 + i * 5}`,
    image: miniPcImage,
    details: [
      'Heat Pipes: 6 Copper Pipes',
      'Fan Size: 140mm',
      'Max TDP: 250W',
    ],
  })),
  Monitor: Array.from({ length: 12 }, (_, i) => ({
    id: `gaming-monitor-${27 + i}"`,
    name: `Gaming Monitor ${27 + i}"`,
    specs: '1440p • 240Hz • IPS',
    price: `$${399 + i * 50}`,
    image: gamingPcImage,
    details: [
      'Panel Type: IPS',
      'Response Time: 1ms',
      'Adaptive Sync: G-Sync / FreeSync',
    ],
  })),
};

type Prebuilt = {
  id: string;
  name: string;
  specs: string;
  price: string;
  image: string;
  details: string[];
  badge?: string | null;
};

const prebuilts: Prebuilt[] = Array.from({ length: 12 }, (_, i) => ({
  id: `prebuilt-elite-${i + 1}`,
  name: `PREBUILT ELITE ${i + 1}`,
  specs: 'RTX 4080 • i9 • 32GB DDR5 • 2TB SSD',
  price: `$${2499 + i * 200}`,
  image: i % 2 === 0 ? gamingPcImage : workstationImage,
  badge: i === 0 ? 'Best Seller' : i === 1 ? 'New' : null,
  details: [
    'CPU: Intel Core i9-14900K',
    'GPU: NVIDIA RTX 4080',
    'RAM: 32GB DDR5 6000MHz',
    'Storage: 2TB NVMe SSD',
    'Cooling: 360mm Liquid Cooler',
    'Power Supply: 1000W 80+ Gold',
    'OS: Windows 11 Pro',
  ],
}));

const ProductsSection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Components');
  const [activeCategory, setActiveCategory] = useState('CPU');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedPrebuilt, setSelectedPrebuilt] = useState<Prebuilt | null>(null);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.specs || 'Prebuilt',
    });
    setSelectedProduct(null);
    setSelectedPrebuilt(null);
  };

  return (
    <section id="products" className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-display">
            Build or Buy Your <span className="gradient-text">Perfect PC</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Browse individual parts or choose a powerful prebuilt system
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'glass text-muted-foreground'
              }`}
            >
              {tab === 'Components' ? (
                <Cpu className="inline mr-2 w-5 h-5" />
              ) : (
                <Monitor className="inline mr-2 w-5 h-5" />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* COMPONENTS */}
        {activeTab === 'Components' && (
          <>
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl font-semibold ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'glass text-muted-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Component Grid */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products[activeCategory].map((item) => (
                <div key={item.id} className="glass rounded-2xl overflow-hidden card-hover">
                  <img src={item.image} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.specs}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-primary">{item.price}</span>
                      <Button size="sm" onClick={() => setSelectedProduct(item)}>
                        View Specs
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See All Products Button */}
            <div className="flex justify-center mt-12">
              <Button onClick={() => navigate('/shop')} size="lg" className="px-8 py-4">
                See All Products
              </Button>
            </div>
          </>
        )}

        {/* PREBUILTS */}
        {activeTab === 'Prebuilt' && (
          <>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {prebuilts.map((pc) => (
                <div key={pc.id} className="glass rounded-2xl overflow-hidden card-hover">
                  <img src={pc.image} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl">{pc.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{pc.specs}</p>
                    <div className="flex justify-between items-center mt-5">
                      <span className="text-xl font-bold text-primary">{pc.price}</span>
                      <Button size="sm" onClick={() => setSelectedPrebuilt(pc)}>
                        View Specs
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See All Products Button */}
            <div className="flex justify-center mt-12">
              <Button onClick={() => navigate('/shop')} size="lg" className="px-8 py-4">
                See All Products
              </Button>
            </div>
          </>
        )}

        {/* COMPONENT MODAL */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-background glass rounded-2xl max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <img src={selectedProduct.image} className="w-full h-56 object-cover rounded-xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
              <p className="text-muted-foreground mb-4">{selectedProduct.specs}</p>

              <ul className="space-y-2 mb-4">
                {selectedProduct.details?.map((detail: string) => (
                  <li key={detail} className="text-sm">• {detail}</li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">{selectedProduct.price}</span>
                <Button onClick={() => handleAddToCart(selectedProduct)}>
                  Add to Build
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* PREBUILT MODAL */}
        {selectedPrebuilt && (
          <div
            className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4"
            onClick={() => setSelectedPrebuilt(null)}
          >
            <div
              className="bg-background glass rounded-2xl max-w-xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPrebuilt(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <img src={selectedPrebuilt.image} className="w-full h-60 object-cover rounded-xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">{selectedPrebuilt.name}</h3>
              <p className="text-muted-foreground mb-4">{selectedPrebuilt.specs}</p>

              <ul className="space-y-2 mb-6">
                {selectedPrebuilt.details.map((detail) => (
                  <li key={detail} className="text-sm">• {detail}</li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">{selectedPrebuilt.price}</span>
                <Button onClick={() => handleAddToCart(selectedPrebuilt)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
