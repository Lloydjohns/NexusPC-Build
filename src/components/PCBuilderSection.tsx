import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Cpu, HardDrive, MemoryStick, Fan, MonitorSpeaker, Zap, X, Minus, Plus } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const builderSteps = [
  { icon: Cpu, label: 'Processor', color: 'from-cyan-500 to-blue-500' },
  { icon: MonitorSpeaker, label: 'Graphics', color: 'from-orange-500 to-red-500' },
  { icon: MemoryStick, label: 'Memory', color: 'from-purple-500 to-pink-500' },
  { icon: HardDrive, label: 'Storage', color: 'from-green-500 to-teal-500' },
  { icon: Fan, label: 'Cooling', color: 'from-blue-500 to-cyan-500' },
  { icon: Zap, label: 'Power', color: 'from-yellow-500 to-orange-500' },
];

const componentOptions: Record<string, any[]> = {
  Processor: [
    { name: 'Intel Core i5-13600K', description: 'Balanced gaming CPU', price: 319, score: 80 },
    { name: 'Intel Core i7-14700K', description: 'High-end performance CPU', price: 429, score: 95 },
    { name: 'AMD Ryzen 9 7950X', description: '16-core workstation CPU', price: 599, score: 100 },
  ],
  Graphics: [
    { name: 'RTX 4070 Super', description: '1440p gaming GPU', price: 599, score: 85 },
    { name: 'RTX 4080 Super', description: '4K gaming GPU', price: 999, score: 95 },
    { name: 'RTX 4090', description: 'Flagship GPU', price: 1599, score: 100 },
  ],
  Memory: [
    { name: '16GB DDR5', description: 'Entry memory kit', price: 89, score: 70 },
    { name: '32GB DDR5', description: 'Recommended setup', price: 189, score: 85 },
    { name: '64GB DDR5', description: 'Heavy multitasking', price: 329, score: 100 },
  ],
  Storage: [
    { name: '1TB NVMe SSD', description: 'Fast boot & load times', price: 129, score: 80 },
    { name: '2TB NVMe SSD', description: 'More space for games', price: 229, score: 90 },
    { name: '4TB NVMe SSD', description: 'Massive storage', price: 429, score: 100 },
  ],
  Cooling: [
    { name: 'Air Cooler', description: 'Reliable air cooling', price: 59, score: 70 },
    { name: '240mm AIO', description: 'Liquid cooling solution', price: 129, score: 85 },
    { name: '360mm AIO', description: 'Maximum cooling', price: 189, score: 100 },
  ],
  Power: [
    { name: '750W Gold PSU', description: 'Mid-range builds', price: 129, score: 80 },
    { name: '850W Gold PSU', description: 'High-end builds', price: 159, score: 90 },
    { name: '1000W Gold PSU', description: 'Flagship systems', price: 199, score: 100 },
  ],
};

type SelectedPart = {
  item: any;
  quantity: number;
};

const PCBuilderSection = () => {
  const [showTopUp, setShowTopUp] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<Record<string, SelectedPart>>({});

  const totalPrice = Object.values(selectedParts).reduce(
    (sum, part) => sum + (part.item.price * part.quantity || 0),
    0
  );

  const selectPart = (category: string, item: any) => {
    setSelectedParts(prev => ({
      ...prev,
      [category]: { item, quantity: 1 }
    }));
    setActiveComponent(null);
  };

  const adjustQuantity = (category: string, delta: number) => {
    setSelectedParts(prev => {
      const part = prev[category];
      if (!part) return prev;
      const newQty = part.quantity + delta;
      if (newQty <= 0) {
        const { [category]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [category]: { ...part, quantity: newQty } };
    });
  };

  /** BOTTLENECK CALCULATOR */
  const bottleneckData = useMemo(() => {
    const cpu = selectedParts['Processor']?.item?.score || 0;
    const gpu = selectedParts['Graphics']?.item?.score || 0;

    const data = [cpu, gpu];
    let reason = '';

    if (!cpu && !gpu) reason = 'Insufficient data to calculate bottleneck.';
    else if (!cpu) reason = 'CPU not selected. Cannot evaluate potential bottleneck.';
    else if (!gpu) reason = 'GPU not selected. Cannot evaluate potential bottleneck.';
    else {
      const diff = gpu - cpu;
      const percentDiff = Math.round((Math.abs(diff) / Math.max(cpu, gpu)) * 100);

      if (diff > 0) {
        reason = `CPU may bottleneck GPU by approx. ${percentDiff}%. Consider a stronger CPU for higher FPS.`;
      } else if (diff < 0) {
        reason = `GPU may be underutilized by approx. ${percentDiff}%. Consider a stronger GPU to match your CPU.`;
      } else {
        reason = `CPU and GPU are well-balanced. No major bottleneck detected.`;
      }
    }

    return { data, reason };
  }, [selectedParts]);

  const chartData = {
    labels: ['CPU', 'GPU'],
    datasets: [
      {
        data: bottleneckData.data,
        backgroundColor: ['#0ea5e9', '#f97316'],
        borderWidth: 6,
        borderColor: ['#0284c7', '#ea580c'],
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}`
        }
      }
    }
  };

  return (
    <>
      {/* ORIGINAL SECTION */}
      <section id="builder" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT - CONTENT */}
            <div>
              <span className="text-primary font-medium uppercase tracking-wider text-sm">Custom PC Builder</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
                Build Your <span className="gradient-text">Dream PC</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Design a PC that suits your exact needs using our custom PC builder. 
                Choose your components, select your budget, and get a complete PC package 
                tailored specifically for you.
              </p>

              <Button variant="hero" size="xl" onClick={() => setShowTopUp(true)}>
                Start Building
                <span className="ml-2">→</span>
              </Button>
            </div>

            {/* RIGHT - COMPONENT GRID */}
            <div className="relative">
              <div className="glass rounded-3xl p-8 glow-primary">
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground">Choose Your Components</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {builderSteps.map(step => {
                    const selectedItem = selectedParts[step.label];
                    return (
                      <div
                        key={step.label}
                        className={`group relative aspect-square rounded-2xl glass border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300
                          ${selectedItem ? 'border-primary bg-primary/10' : 'border-border/50'}
                        `}
                        onClick={() => setActiveComponent(step.label)}
                      >
                        <div className={`p-3 rounded-xl ${step.color} group-hover:scale-110 transition-transform`}>
                          <step.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {step.label}
                        </span>
                        {selectedItem && (
                          <p className="text-xs text-primary mt-1">{selectedItem.item.name} x{selectedItem.quantity}</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <span className="text-muted-foreground text-sm">Estimated Total</span>
                    <div className="font-display text-2xl font-bold text-foreground">${totalPrice}</div>
                  </div>
                  <Button variant="accent" size="sm" onClick={() => setShowTopUp(true)}>View Build</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP-UP MODAL */}
      {showTopUp && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-background rounded-2xl p-8 w-full max-w-[1200px] h-[90vh] overflow-auto relative">
            <button onClick={() => setShowTopUp(false)} className="absolute top-4 right-4 text-foreground">
              <X />
            </button>

            <h2 className="text-3xl font-bold mb-6">Your Selected Components</h2>

            {/* COMPONENT PICKER */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {builderSteps.map(step => {
                const selectedItem = selectedParts[step.label];
                return (
                  <div
                    key={step.label}
                    onClick={() => setActiveComponent(step.label)}
                    className={`border rounded-xl p-4 text-center cursor-pointer ${
                      selectedItem ? 'border-primary bg-primary/10' : 'border-border/50'
                    } hover:border-primary`}
                  >
                    <step.icon className="w-8 h-8 mx-auto mb-2" />
                    <p>{step.label}</p>
                    {selectedItem && <p className="text-xs text-primary">{selectedItem.item.name} x{selectedItem.quantity}</p>}
                  </div>
                );
              })}
            </div>

            {/* CART / SELECTED ITEMS */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-lg">Selected Items</h4>
                {Object.keys(selectedParts).length > 0 && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setSelectedParts({})}
                  >
                    Remove All
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(selectedParts).length === 0 && (
                  <p className="text-muted-foreground col-span-full">No items selected yet</p>
                )}
                {Object.entries(selectedParts).map(([key, part]) => (
                  <div key={key} className="border rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <p className="font-semibold">{key}</p>
                      <p className="text-muted-foreground">{part.item.name}</p>
                      <p className="text-sm mt-1">{part.item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button size="icon" onClick={() => adjustQuantity(key, -1)}><Minus className="w-4 h-4"/></Button>
                        <span>{part.quantity}</span>
                        <Button size="icon" onClick={() => adjustQuantity(key, 1)}><Plus className="w-4 h-4"/></Button>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => adjustQuantity(key, -part.quantity)}>
                        <X className="w-5 h-5 text-red-500"/>
                      </Button>
                      <span className="font-bold">${part.item.price * part.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTLENECK GRAPH */}
            <div className="w-64 mx-auto mb-4 relative">
              <h3 className="text-center font-semibold text-lg mb-2">PC Bottleneck Calculator</h3>
              <Doughnut data={chartData} options={chartOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold">{selectedParts['Processor'] && selectedParts['Graphics'] ? 'Balanced' : 'N/A'}</span>
                <span className="text-xs text-muted-foreground">CPU vs GPU</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground px-4">{bottleneckData.reason}</p>

            {/* TOTAL */}
            <div className="flex justify-between items-center mt-4 p-4 rounded-xl bg-muted/50">
              <span className="text-muted-foreground font-medium">Estimated Total</span>
              <span className="text-2xl font-bold">${totalPrice}</span>
            </div>

            <Button variant="accent" size="lg" className="mt-4" onClick={() => setShowTopUp(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* ITEM PICKER MODAL */}
      {activeComponent && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-background rounded-2xl p-8 max-w-3xl w-full relative">
            <button onClick={() => setActiveComponent(null)} className="absolute top-4 right-4">
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-6">Choose {activeComponent}</h2>

            <div className="space-y-4">
              {componentOptions[activeComponent].map(item => (
                <div key={item.name} className="border rounded-xl p-6 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold mb-2">${item.price}</p>
                    <Button size="sm" onClick={() => selectPart(activeComponent, item)}>Select</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PCBuilderSection;
