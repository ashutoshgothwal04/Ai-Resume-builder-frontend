import { Mail, Phone, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-3">
              <img src="/ProjectLogo.svg" alt="logo" className="h-8 w-auto mr-2" />
              <span className="font-bold text-xl">AI Resume Builder</span>
            </div>
            <p className="text-gray-400 dark:text-gray-300 text-sm mb-3">
              Create professional resumes with the power of AI. Get personalized suggestions and stand out in your job search.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1.5">
              <li>
                <Link to="/dashboard" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors text-sm">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-1.5">
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-blue-400 mr-2" />
                <a href="mailto:luckygothwa2@gmail.com" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors text-sm">
                  luckygothwa2@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-blue-400 mr-2" />
                <a href="tel:+917898234671" className="text-gray-400 dark:text-gray-300 hover:text-white transition-colors text-sm">
                  +91 7898234671
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-6 pt-4 text-center text-gray-400 dark:text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
          <div className="mt-2 space-x-3">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
