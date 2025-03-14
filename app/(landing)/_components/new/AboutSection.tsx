
import { Globe, Building, BarChart3, MessageSquare } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import FeatureCard from './FeatureCard';

const AboutSection = () => {
  const features = [
    {
      title: "Custom Hotel Website & App",
      description: "Stand out with your own branded online presence for each property.",
      icon: Globe
    },
    {
      title: "Unified Management",
      description: "Control multiple properties effortlessly from one intuitive dashboard.",
      icon: Building
    },
    {
      title: "Transparent Analytics",
      description: "Gain insights with detailed charts, graphs, and booking data.",
      icon: BarChart3
    },
    {
      title: "Direct Communication",
      description: "Engage with travelers, managers, and collect instant feedback.",
      icon: MessageSquare
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What is GetYourStay.in?</h2>
          <p className="text-lg text-muted-foreground text-balance">
            GetYourStay.in is a state-of-the-art hotel management software that consolidates all your property
            operations into one intuitive platform. From a custom website and native-like app for each hotel
            to seamless booking and QR-based check-ins, our solution is built to simplify your day-to-day tasks
            while driving higher revenue and customer satisfaction.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default AboutSection;