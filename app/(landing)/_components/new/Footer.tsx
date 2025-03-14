
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">GetYourStay.in</h3>
            <p className="dark:text-white/80 text-black mb-6">
              Revolutionizing hotel management with technology that empowers owners, simplifies operations, and enhances guest experiences.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#' },
                { name: 'Features', href: '#features' },
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'FAQ', href: '#faq' },
                { name: 'Contact', href: '#contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href} 
                    className="dark:text-white/80 text-black hover:text-white hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Solutions</h3>
            <ul className="space-y-3">
              {[
                'For Hotel Owners',
                'For Managers',
                'For Travelers',
                'Enterprise Solutions',
                'Case Studies',
                'Resources',
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#" 
                    className="dark:text-white/80 hover:text-white hover:underline transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center md:items-start">
                <MapPin className=" mr-3 " />
                <span className="dark:text-white/80">
                  Manyata Tech Park, Bangalore
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 " />
                <Link
                  href="tel:+918000000000" 
                  className="dark:text-white/80 dark:hover:text-white transition-colors"
                >
                  +91 9252 993 555
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 " />
                <Link
                  href="mailto:rahulviijay@gmail.com" 
                  className="dark:text-white/80 dark:hover:text-white transition-colors"
                >
                  rahulviijay@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="dark:border-white/20 border my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="dark:text-white/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GetYourStay.in. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="dark:text-white/60 text-muted-foreground text-sm dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/tnc" className="dark:text-white/60 text-muted-foreground text-sm dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            {/* <Link href="#" className="text-white/60 text-sm hover:text-white transition-colors">
              Cookie Policy
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;