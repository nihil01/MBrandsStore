import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer({ textColor }: { textColor: string }) {
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Newsletter subscription submitted");
    };

    return (
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3
                            style={{ color: textColor }}
                            className="text-xl font-bold"
                            data-testid="footer-logo"
                        >
                            ModernStyle
                        </h3>
                        <p
                            style={{ color: textColor }}
                            className="leading-relaxed"
                            data-testid="footer-description"
                        >
                            Curating premium clothing with modern designs, quality materials, and timeless style for the contemporary wardrobe.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon">
                                <Facebook className="w-5 h-5" style={{ color: textColor }} />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Instagram className="w-5 h-5" style={{ color: textColor }} />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Twitter className="w-5 h-5" style={{ color: textColor }} />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 style={{ color: textColor }} className="font-semibold">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {["New Arrivals", "Best Sellers", "Sale", "Gift Cards", "Size Guide"].map(
                                (link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            style={{ color: textColor }}
                                            className="hover:underline transition-colors"
                                            data-testid={`link-${link.toLowerCase().replace(" ", "-")}`}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 style={{ color: textColor }} className="font-semibold">
                            Customer Service
                        </h4>
                        <ul className="space-y-2">
                            {["Contact Us", "Shipping Info", "Returns", "FAQ", "Track Order"].map(
                                (link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            style={{ color: textColor }}
                                            className="hover:underline transition-colors"
                                            data-testid={`service-${link.toLowerCase().replace(" ", "-")}`}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 style={{ color: textColor }} className="font-semibold">
                            Stay Updated
                        </h4>
                        <p style={{ color: textColor }} className="text-sm">
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
                            <Button type="submit" className="w-full">
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
                        <h4 style={{ color: textColor }} className="font-semibold">
                            Contact Information
                        </h4>
                        <div className="space-y-2" style={{ color: textColor }}>
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
                        <h4 style={{ color: textColor }} className="font-semibold">
                            Why Shop With Us
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {[
                                { title: "Free Shipping", desc: "On orders over $100" },
                                { title: "Easy Returns", desc: "30-day return policy" },
                                { title: "Secure Payment", desc: "SSL encrypted checkout" },
                                { title: "24/7 Support", desc: "Customer service" },
                            ].map((item) => (
                                <div key={item.title} className="space-y-2">
                                    <div style={{ color: textColor }} className="font-medium">
                                        {item.title}
                                    </div>
                                    <div style={{ color: textColor }}>{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <div style={{ color: textColor }} data-testid="copyright">
                        © 2024 ModernStyle. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                style={{ color: textColor }}
                                className="hover:underline transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
