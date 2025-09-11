import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground" data-testid="footer-logo">
              ModernStyle
            </h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="footer-description">
              Curating premium clothing with modern designs, quality materials, and timeless style for the contemporary wardrobe.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" data-testid="social-facebook">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="social-instagram">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="social-twitter">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {["New Arrivals", "Best Sellers", "Sale", "Gift Cards", "Size Guide"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-${link.toLowerCase().replace(' ', '-')}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Customer Service</h4>
            <ul className="space-y-2">
              {["Contact Us", "Shipping Info", "Returns", "FAQ", "Track Order"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`service-${link.toLowerCase().replace(' ', '-')}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2" data-testid="newsletter-form">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
                data-testid="newsletter-email"
                required
              />
              <Button type="submit" className="w-full" data-testid="newsletter-submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Contact Info & Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Contact Information</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2" data-testid="contact-address">
                <MapPin className="w-4 h-4" />
                <span>123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center gap-2" data-testid="contact-phone">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2" data-testid="contact-email">
                <Mail className="w-4 h-4" />
                <span>support@modernstyle.com</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Why Shop With Us</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium text-foreground" data-testid="guarantee-free-shipping">
                  Free Shipping
                </div>
                <div className="text-muted-foreground">On orders over $100</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground" data-testid="guarantee-easy-returns">
                  Easy Returns
                </div>
                <div className="text-muted-foreground">30-day return policy</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground" data-testid="guarantee-secure-payment">
                  Secure Payment
                </div>
                <div className="text-muted-foreground">SSL encrypted checkout</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground" data-testid="guarantee-support">
                  24/7 Support
                </div>
                <div className="text-muted-foreground">Customer service</div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div data-testid="copyright">
            © 2024 ModernStyle. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-foreground transition-colors" data-testid="legal-privacy">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="legal-terms">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="legal-cookies">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}