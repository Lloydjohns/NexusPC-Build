import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, X } from 'lucide-react';

const blogPosts = [
  {
    title: 'How to Choose the Right CPU for Your Build',
    excerpt: 'Learn the key differences between Intel and AMD processors and find the perfect match for your needs.',
    category: 'Guides',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80',
    content: `
      Choosing the right CPU is one of the most important decisions in building a PC. 
      Intel processors often excel at single-core performance which is great for gaming, 
      whereas AMD CPUs provide more cores and threads for multitasking and content creation.
      
      Key considerations include: clock speed, core count, thermal design power (TDP), 
      and compatibility with your motherboard. Always check benchmarks for the workloads you plan to run.
      
      Don't forget to factor in cooling solutions and overclocking potential if you're aiming for high performance.
    `,
  },
  {
    title: 'What to Look for in a Gaming GPU',
    excerpt: 'From VRAM to clock speeds, discover what specs matter most for your gaming performance.',
    category: 'Hardware',
    readTime: '6 min read',
    image: 'https://i.pinimg.com/1200x/9e/65/76/9e65760e63d209a334687e03ce0aa823.jpg',
    content: `
      A GPU determines how well your system can handle gaming at different resolutions and settings. 
      Key specs to consider include VRAM, core clock speed, memory bandwidth, and architecture.
      
      Ensure the GPU is compatible with your power supply and case size. 
      Newer architectures usually offer better efficiency and ray-tracing capabilities.
      
      Benchmarks for your target games can help you choose the best GPU for your needs.
    `,
  },
  {
    title: 'Step-by-Step Guide to Building Your First PC',
    excerpt: 'A complete walkthrough for beginners, from component selection to your first boot.',
    category: 'Tutorials',
    readTime: '15 min read',
    image: 'https://i.pinimg.com/736x/5c/91/fe/5c91fe091481ac591e7196923d323978.jpg',
    content: `
      Building your first PC can be intimidating, but with careful planning, it’s manageable. 
      Start by choosing a compatible CPU, motherboard, GPU, RAM, and storage.
      
      Assemble the components step by step, starting with the CPU and cooler, followed by RAM, GPU, and storage. 
      Always handle components carefully and follow anti-static precautions.
      
      After assembling, power on and enter the BIOS to check component recognition. 
      Install your operating system, drivers, and software. Finally, test the system stability with stress tests.
    `,
  },
];

const BlogSection = () => {
  const [activePost, setActivePost] = useState<typeof blogPosts[0] | null>(null);
  const [showFullGuide, setShowFullGuide] = useState(false);

  return (
    <section id="blog" className="py-24 relative">
      <div className="absolute inset-0 bg-hero-gradient opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium uppercase tracking-wider text-sm">Resources</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            PC Building <span className="gradient-text">Guide & Blog</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're a first-time builder or an experienced enthusiast, our detailed guides 
            will walk you through everything you need to know.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="group glass rounded-2xl overflow-hidden card-hover cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-medium text-primary">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div
                  className="flex items-center text-primary font-medium text-sm group-hover:translate-x-2 transition-transform cursor-pointer"
                  onClick={() => setActivePost(post)}
                >
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => setShowFullGuide(true)}>
            Read Our Full Guide
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* TOP-UP MODAL FOR BLOG DETAILS */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-background rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={activePost.image}
              alt={activePost.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />

            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full glass text-xs font-medium text-primary">
                {activePost.category}
              </span>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" /> {activePost.readTime}
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">{activePost.title}</h2>

            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {activePost.content}
            </p>

            <div className="mt-6 text-center">
              <Button size="lg" variant="accent" onClick={() => setActivePost(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FULL GUIDE MODAL */}
      {showFullGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-background rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto p-10 relative">
            <button
              onClick={() => setShowFullGuide(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-4xl font-bold mb-6 text-center">Our Full PC Building Guide</h2>

            <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
              At [Your Company], we are passionate about building high-performance PCs tailored to your needs. 
              Our team of experts guides you through every step, from choosing the right CPU, GPU, and memory 
              to optimizing storage, cooling, and power supply. We focus on performance, reliability, and aesthetics.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
              Whether you are a gamer, content creator, or professional, our custom PC builds ensure maximum efficiency and
              smooth operation for your workloads. We provide detailed advice on component selection, compatibility checks,
              and future-proofing so your system remains powerful for years.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
              From assembly, cable management, RGB customization, to thermal and acoustic optimization, our guide ensures
              that every build is not only powerful but also clean, quiet, and visually striking. Learn how to avoid common
              pitfalls and get the most out of your components.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
              By following our full guide, you will gain the knowledge and confidence to select, build, and maintain
              a PC that perfectly fits your personal or professional requirements.
            </p>

            <div className="mt-6 text-center">
              <Button size="lg" variant="accent" onClick={() => setShowFullGuide(false)}>
                Close Guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
