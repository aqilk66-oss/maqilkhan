import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Loader from '../components/common/Loader';
import CustomCursor from '../components/common/CustomCursor';
import PageTransition from '../animations/gsap/PageTransition';
import { SmoothScrollProvider } from '../animations/scroll/SmoothScrollProvider';

export const PublicLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScrollProvider>
      {/* Desktop Custom Interaction Cursor */}
      <CustomCursor />

      {/* Branded Loading Experience */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-electric-cyan selection:text-navy-950 transition-colors duration-250">
        {/* Production Navbar */}
        <Navbar />

        {/* Dynamic Route Content with Cinematic Page Transitions */}
        <main className="flex-grow">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>

        {/* Footer Structural Foundation */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default PublicLayout;
