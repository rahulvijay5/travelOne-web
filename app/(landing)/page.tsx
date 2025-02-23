import React from "react";
// import { ModeToggle } from '@/components/ModeToggle'
// import { SignInButton } from '@clerk/nextjs';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
import Footer from "./_components/Footer";
import CTA from "./_components/CTA";
import UpcomingFeatures from "./_components/UpcomingFeatures";
import Testimonials from "./_components/Testimonials";
import Pricing from "./_components/Pricing";
import FeaturesOwners from "./_components/FeaturesOwners";
import FeaturesTravelers from "./_components/FeaturesTravelers";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-col gap-20 max-w-6xl mx-auto">
        <Hero />
        <FeaturesTravelers />
        <FeaturesOwners />
        <Pricing />
        <UpcomingFeatures />
        <Testimonials />
      </main>
        <CTA />
      <Footer />
    </div>
    // <div className="flex items-center justify-center min-h-screen w-full">
    //   <div className="flex flex-col items-center justify-center gap-4">
    //     <ModeToggle />
    //     <h1 className="text-4xl font-bold">LandingPage</h1>
    //     <p className="text-lg">Under Construction, will create this later</p>
    //     <div className="flex items-center justify-center gap-4">
    //       <SignInButton fallbackRedirectUrl="/dashboard">
    //         <Button>Sign In</Button>
    //       </SignInButton>
    //       <Button asChild>
    //         <Link href="/dashboard">Dashboard</Link>
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
