import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';
import PCBuilderSection from '@/components/PCBuilderSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import CommunitySection from '@/components/CommunitySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <PCBuilderSection />
        <WhyChooseUsSection />
        <FeaturedProductsSection />
        <TestimonialsSection />
        <BlogSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
