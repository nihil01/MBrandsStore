import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer({ textColor }: { textColor: string }) {
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Newsletter subscription submitted");
    };

    const linkStyle = { color: textColor, textDecoration: "none" };

    return (
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 style={{ color: textColor }} className="text-xl font-bold">ModernStyle</h3>
                        <p style={{ color: textColor }} className="leading-relaxed">
                            Curating premium clothing with modern designs, quality materials, and timeless style.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon"><Facebook style={{ color: textColor }} /></Button>
                            <Button variant="ghost" size="icon"><Instagram style={{ color: textColor }} /></Button>
                            <Button variant="ghost" size="icon"><Twitter style={{ color: textColor }} /></Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 style={{ color: textColor }} className="font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            {["New Arrivals", "Best Sellers", "Sale", "Gift Cards", "Size Guide"].map(link => (
                                <li key={link}>
                                    <a href="#" style={linkStyle} className="hover:underline">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 style={{ color: textColor }} className="font-semibold">Customer Service</h4>
                        <ul className="space-y-2">
                            {["Contact Us", "Shipping Info", "Returns", "FAQ", "Track Order"].map(link => (
                                <li key={link}>
                                    <a href="#" style={linkStyle} className="hover:underline">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <Separator className="my-8" />

                {/* Contact Info & Trust */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Contact Info */}
                    <div className="space-y-3">
                        <h4 style={{ color: textColor }} className="font-semibold">Contact Information</h4>
                        <div style={{ color: textColor }} className="space-y-2">
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />123 Fashion Street, Style City</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4" />+1 (555) 123-4567</div>
                            <div className="flex items-center gap-2"><Mail className="w-4 h-4" />support@modernstyle.com</div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {[
                                { title: "Secure Payment", desc: "SSL encrypted checkout" },
                                { title: "24/7 Support", desc: "Customer service" },
                            ].map(item => (
                                <div key={item.title}>
                                    <div style={{ color: textColor }} className="font-medium">{item.title}</div>
                                    <div style={{ color: textColor }}>{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />
            </div>
        </footer>
    );
}
