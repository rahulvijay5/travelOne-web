// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { appName } from '@/lib/constants';
export default function Footer() {
  return (
    <footer className="px-6 py-8 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p>
            {appName} is revolutionizing the hospitality industry by providing a unified platform for
            travelers and hotel owners to manage bookings and experiences seamlessly.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-primary">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-primary">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Email: support@appname.com</p>
          <p>Phone: +91 1234 567890</p>
          <p>Address: 123, Main Street, City, Country</p>
        </div>
        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" aria-label="Facebook">
              <Facebook className="h-6 w-6 hover:text-primary" />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <Twitter className="h-6 w-6 hover:text-primary" />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <Instagram className="h-6 w-6 hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {appName}. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy-policy" className="hover:text-primary text-sm">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-primary text-sm">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}