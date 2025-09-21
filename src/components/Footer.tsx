import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    const footerSections = [
        {
            title: t('footer.company'),
            links: [
                { name: t('footer.about'), href: '#' },
                { name: t('footer.careers'), href: '#' },
                { name: t('footer.contact'), href: '#' },
            ],
        },
        {
            title: t('footer.help'),
            links: [
                { name: t('footer.shipping'), href: '#' },
                { name: t('footer.returns'), href: '#' },
                { name: t('footer.sizeGuide'), href: '#' },
            ],
        },
        {
            title: t('footer.legal'),
            links: [
                { name: t('footer.privacy'), href: '#' },
                { name: t('footer.terms'), href: '#' },
                { name: t('footer.cookies'), href: '#' },
            ],
        },
    ];

    const socialLinks = [
        { name: 'Instagram', href: '#', icon: '📷' },
        { name: 'Facebook', href: '#', icon: '👤' },
        { name: 'Twitter', href: '#', icon: '🐦' },
        { name: 'YouTube', href: '#', icon: '📺' },
    ];

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">MBrands</h2>
                            <p className="mt-2 text-gray-600 max-w-sm">
                                {t('hero.subtitle')}
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>

                            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                                (24/7) Tel: +994559825989
                            </h3>

                            <a className={"text-"} href={`https://wa.me/994559825989`}>WhatsApp link</a>

                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                                        aria-label={social.name}
                                    >
                                        <span className="text-lg">{social.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Separator */}
                <Separator className="my-8 bg-gray-200" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                    {/* Payment Methods */}
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Payment methods:</span>
                        <div className="flex space-x-2">
                            {['💳', '🏦', '💰', '📱'].map((icon, index) => (
                                <div
                                    key={index}
                                    className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center"
                                >
                                    <span className="text-sm">{icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-gray-600 text-center md:text-right">
                        <p>© {new Date().getFullYear()} MBrands. {t('footer.rights')}</p>
                    </div>
                </div>

                {/* Features Bar */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-lg">🚚</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 text-sm">Free Shipping</h4>
                                <p className="text-xs text-gray-600">On orders over $200</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-lg">↩️</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 text-sm">Easy Returns</h4>
                                <p className="text-xs text-gray-600">30-day return policy</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-lg">🔒</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 text-sm">Secure Checkout</h4>
                                <p className="text-xs text-gray-600">SSL encrypted payments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}