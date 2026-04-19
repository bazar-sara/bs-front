'use client';
import { useEffect } from 'react';
import { MainSiteChrome } from './main-site-chrome';
import HeroSection from './hero-section';
import DiscountProductsSection from './discount-products-section';
import AboutSection from './about-section';
import ProductsSection from './products-section';
import ContactSection from './contact-section';

const Landing = () => {
  useEffect(() => {
    const id = window.location.hash?.replace(/^#/, '');
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  return (
    <MainSiteChrome edgeToEdge>
      <HeroSection />
      <DiscountProductsSection />
      <AboutSection />
      <ProductsSection />
      <ContactSection />
    </MainSiteChrome>
  );
};

export default Landing;
