// src/components/HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section style={{ padding: '60px 20px', textAlign: 'center' }}>
      <h2>Bienvenido a Mi Landing Page</h2>
      <p>Descubre algo increíble.</p>
      <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Empieza Ahora</button>
    </section>
  );
};

export default HeroSection;
