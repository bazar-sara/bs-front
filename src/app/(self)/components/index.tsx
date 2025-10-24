'use client';
import { TurquoiseGradient, FloatingShapes } from './styled-components';
import HeaderComponent from './header';
import HeroSection from './hero-section';
import DiscountProductsSection from './discount-products-section';
import AboutSection from './about-section';
import ProductsSection from './products-section';
import ContactSection from './contact-section';
import Footer from './footer';

const Landing = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <TurquoiseGradient>
      <FloatingShapes />
      <HeaderComponent scrollToSection={scrollToSection} />
      <HeroSection />
      <DiscountProductsSection />
      <AboutSection />
      <ProductsSection />
      <ContactSection />
      <Footer scrollToSection={scrollToSection} />
    </TurquoiseGradient>
  );
};

export default Landing;
