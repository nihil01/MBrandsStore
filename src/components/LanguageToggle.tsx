import { Languages, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/LanguageContext";

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: 'en' as const, label: 'English', flag: '🇺🇸' },
        { code: 'az' as const, label: 'Azərbaycan', flag: '🇦🇿' },
        { code: 'ru' as const, label: 'Русский', flag: '🇷🇺' },
    ];

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                    <Languages className="h-4 w-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            {currentLanguage.flag}
          </span>
                    <span className="text-xs font-medium text-gray-700 uppercase">
            {language}
          </span>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`flex items-center gap-3 cursor-pointer ${
                            language === lang.code ? 'bg-gray-100' : ''
                        }`}
                    >
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.label}</span>
                        {language === lang.code && (
                            <span className="ml-auto w-2 h-2 bg-black rounded-full"></span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}