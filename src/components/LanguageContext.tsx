import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
    language: 'ru' | 'en' | 'az';
    setLanguage: (language: 'ru' | 'en' | 'az') => void;
    t: (key: string) => string;
}

const translations = {
    ru: {
        // Header
        'header.search': 'Поиск...',
        'header.cart': 'Корзина',
        'header.login': 'Войти',
        'header.profile': 'Профиль',
        'header.admin': 'Админка',
        'header.logout': 'Выйти',

        // Navigation
        'nav.newArrivals': 'Новинки',
        'nav.men': 'Мужское',
        'nav.women': 'Женское',
        'nav.accessories': 'Аксессуары',
        'nav.sale': 'Распродажа',
        'nav.tshirts': 'Футболки',
        'nav.jeans': 'Джинсы',
        'nav.jackets': 'Куртки',
        'nav.shoes': 'Обувь',
        'nav.tops': 'Топы',
        'nav.dresses': 'Платья',
        'nav.bags': 'Сумки',
        'nav.belts': 'Ремни',
        'nav.hats': 'Шляпы',
        'nav.watches': 'Часы',
        'nav.jewelry': 'Украшения',

        // Product Grid
        'products.title': 'Наша коллекция',
        'products.description': 'Откройте для себя нашу коллекцию премиальной одежды',
        'products.category': 'Категория',
        'products.sortBy': 'Сортировать по',
        'products.allCategories': 'Все категории',
        'products.newest': 'Новые',
        'products.priceLowHigh': 'Цена: по возрастанию',
        'products.priceHighLow': 'Цена: по убыванию',
        'products.name': 'Название',
        'products.showing': 'Показано',
        'products.of': 'из',
        'products.products': 'товаров',
        'products.noProducts': 'Товары не найдены',
        'products.tryFilters': 'Попробуйте изменить фильтры',

        // Product Card
        'product.new': 'Новинка',
        'product.sale': 'Распродажа',
        'product.addToCart': 'В корзину',
        'product.quickView': 'Быстрый просмотр',

        // Shopping Cart
        'cart.title': 'Корзина',
        'cart.empty': 'Корзина пуста',
        'cart.emptyDescription': 'Добавьте товары, чтобы начать',
        'cart.size': 'Размер',
        'cart.subtotal': 'Подытог',
        'cart.shipping': 'Доставка',
        'cart.free': 'Бесплатно',
        'cart.total': 'Итого',
        'cart.freeShipping': 'Добавьте ещё',
        'cart.freeShippingMore': 'для бесплатной доставки',
        'cart.checkout': 'Оформить заказ',

        // Hero Section
        'hero.title': 'Современный стиль для каждого',
        'hero.subtitle': 'Откройте для себя нашу коллекцию премиальной одежды',
        'hero.shopNow': 'Покупать сейчас',

        // Footer
        'footer.company': 'Компания',
        'footer.about': 'О нас',
        'footer.careers': 'Карьера',
        'footer.contact': 'Контакты',
        'footer.help': 'Помощь',
        'footer.shipping': 'Доставка',
        'footer.returns': 'Возврат',
        'footer.sizeGuide': 'Размерная сетка',
        'footer.legal': 'Правовая информация',
        'footer.privacy': 'Конфиденциальность',
        'footer.terms': 'Условия',
        'footer.cookies': 'Файлы cookie',
        'footer.newsletter': 'Подпишитесь на новости',
        'footer.newsletterText': 'Получайте последние новости и специальные предложения',
        'footer.email': 'Ваш email',
        'footer.subscribe': 'Подписаться',
        'footer.rights': 'Все права защищены.',

        // Auth
        'auth.login': 'Войти',
        'auth.register': 'Регистрация',
        'auth.email': 'Email',
        'auth.password': 'Пароль',
        'auth.confirmPassword': 'Подтвердите пароль',
        'auth.firstName': 'Имя',
        'auth.lastName': 'Фамилия',
        'auth.loginButton': 'Войти',
        'auth.registerButton': 'Зарегистрироваться',
        'auth.switchToRegister': 'Нет аккаунта? Зарегистрируйтесь',
        'auth.switchToLogin': 'Уже есть аккаунт? Войдите',

        // Admin
        'admin.title': 'Панель администратора',
        'admin.addProduct': 'Добавить товар',
        'admin.productList': 'Список товаров',
        'admin.name': 'Название',
        'admin.description': 'Описание',
        'admin.price': 'Цена',
        'admin.category': 'Категория',
        'admin.brand': 'Бренд',
        'admin.size': 'Размер',
        'admin.color': 'Цвет',
        'admin.stock': 'Количество',
        'admin.images': 'Изображения',
        'admin.addProductButton': 'Добавить товар',
        'admin.edit': 'Редактировать',
        'admin.delete': 'Удалить',
        'admin.save': 'Сохранить',
        'admin.cancel': 'Отмена',

        // Common
        'common.loading': 'Загрузка...',
        'common.error': 'Ошибка',
        'common.success': 'Успешно',
        'common.close': 'Закрыть',
        'common.save': 'Сохранить',
        'common.cancel': 'Отмена',
        'common.next': 'Далее',
        'common.previous': 'Назад',
        'common.or': 'или',

        'productModal.description': 'Описание',
        'productModal.size': 'Размер',
        'productModal.quantity': 'Количество',
        'productModal.selectSizePlaceholder': 'Выберите размер',
        'productModal.inStock': 'В наличии',
        'productModal.addToCart': 'Добавить в корзину',
        'productModal.outOfStock': 'Нет в наличии',

        'features.freeShipping': 'Бесплтаная доставка',
        'features.freeShippingDesc': 'Выше $100 по всему миру',
        'features.easyReturns': 'Легкие возвраты',
        'features.easyReturnsDesc': 'В течении 30 дней',
        'features.premiumQuality': 'Премиальное качество',
        'features.premiumQualityDesc': 'Избранные премиум коллекции',

    },
    en: {
        // Header
        'header.search': 'Search...',
        'header.cart': 'Cart',
        'header.login': 'Login',
        'header.profile': 'Profile',
        'header.admin': 'Admin',
        'header.logout': 'Logout',

        // Navigation
        'nav.newArrivals': 'New Arrivals',
        'nav.men': 'Men',
        'nav.women': 'Women',
        'nav.accessories': 'Accessories',
        'nav.sale': 'Sale',
        'nav.tshirts': 'T-Shirts',
        'nav.jeans': 'Jeans',
        'nav.jackets': 'Jackets',
        'nav.shoes': 'Shoes',
        'nav.tops': 'Tops',
        'nav.dresses': 'Dresses',
        'nav.bags': 'Bags',
        'nav.belts': 'Belts',
        'nav.hats': 'Hats',
        'nav.watches': 'Watches',
        'nav.jewelry': 'Jewelry',

        // Product Grid
        'products.title': 'Our Collection',
        'products.description': 'Discover our curated selection of premium clothing',
        'products.category': 'Category',
        'products.sortBy': 'Sort By',
        'products.allCategories': 'All Categories',
        'products.newest': 'Newest',
        'products.priceLowHigh': 'Price: Low to High',
        'products.priceHighLow': 'Price: High to Low',
        'products.name': 'Name',
        'products.showing': 'Showing',
        'products.of': 'of',
        'products.products': 'products',
        'products.noProducts': 'No products found',
        'products.tryFilters': 'Try adjusting your filters',

        // Product Card
        'product.new': 'New',
        'product.sale': 'Sale',
        'product.addToCart': 'Add to Cart',
        'product.quickView': 'Quick View',

        // Shopping Cart
        'cart.title': 'Shopping Cart',
        'cart.empty': 'Your cart is empty',
        'cart.emptyDescription': 'Add some products to get started',
        'cart.size': 'Size',
        'cart.subtotal': 'Subtotal',
        'cart.shipping': 'Shipping',
        'cart.free': 'Free',
        'cart.total': 'Total',
        'cart.freeShipping': 'Add',
        'cart.freeShippingMore': 'more for free shipping',
        'cart.checkout': 'Checkout',

        // Hero Section
        'hero.title': 'Modern Style for Everyone',
        'hero.subtitle': 'Discover our curated collection of premium clothing',
        'hero.shopNow': 'Shop Now',

        // Footer
        'footer.company': 'Company',
        'footer.about': 'About Us',
        'footer.careers': 'Careers',
        'footer.contact': 'Contact',
        'footer.help': 'Help',
        'footer.shipping': 'Shipping',
        'footer.returns': 'Returns',
        'footer.sizeGuide': 'Size Guide',
        'footer.legal': 'Legal',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.cookies': 'Cookie Policy',
        'footer.newsletter': 'Subscribe to our newsletter',
        'footer.newsletterText': 'Get the latest updates and special offers',
        'footer.email': 'Your email',
        'footer.subscribe': 'Subscribe',
        'footer.rights': 'All rights reserved.',

        // Auth
        'auth.login': 'Login',
        'auth.register': 'Sign Up',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirmPassword': 'Confirm Password',
        'auth.firstName': 'First Name',
        'auth.lastName': 'Last Name',
        'auth.loginButton': 'Sign In',
        'auth.registerButton': 'Create Account',
        'auth.switchToRegister': "Don't have an account? Sign up",
        'auth.switchToLogin': 'Already have an account? Sign in',

        // Admin
        'admin.title': 'Admin Dashboard',
        'admin.addProduct': 'Add Product',
        'admin.productList': 'Product List',
        'admin.name': 'Name',
        'admin.description': 'Description',
        'admin.price': 'Price',
        'admin.category': 'Category',
        'admin.brand': 'Brand',
        'admin.size': 'Size',
        'admin.color': 'Color',
        'admin.stock': 'Stock Quantity',
        'admin.images': 'Images',
        'admin.addProductButton': 'Add Product',
        'admin.edit': 'Edit',
        'admin.delete': 'Delete',
        'admin.save': 'Save',
        'admin.cancel': 'Cancel',

        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.close': 'Close',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.next': 'Next',
        'common.previous': 'Previous',
        'common.or': 'or',

        // В разделе en:
        'features.freeShipping': 'Free Shipping',
        'features.freeShippingDesc': 'On orders over $100 worldwide',
        'features.easyReturns': 'Easy Returns',
        'features.easyReturnsDesc': '30-day hassle-free returns',
        'features.premiumQuality': 'Premium Quality',
        'features.premiumQualityDesc': 'Curated premium collection',

        'productModal.description': 'Description',
        'productModal.size': 'Size',
        'productModal.quantity': 'Quantity',
        'productModal.selectSizePlaceholder': 'Select a size',
        'productModal.inStock': 'In Stock',
        'productModal.addToCart': 'Add to Cart',
        'productModal.outOfStock': 'Out of Stock',
    },
    az: {
        // Header
        'header.search': 'Axtarış...',
        'header.cart': 'Səbət',
        'header.login': 'Giriş',
        'header.profile': 'Profil',
        'header.admin': 'Admin',
        'header.logout': 'Çıxış',

        // Navigation
        'nav.newArrivals': 'Yeniliklər',
        'nav.men': 'Kişilər',
        'nav.women': 'Qadınlar',
        'nav.accessories': 'Aksesuarlar',
        'nav.sale': 'Endirim',
        'nav.tshirts': 'T-Köynəklər',
        'nav.jeans': 'Cinslər',
        'nav.jackets': 'Gödəkçələr',
        'nav.shoes': 'Ayaqqabı',
        'nav.tops': 'Toplər',
        'nav.dresses': 'Paltarlar',
        'nav.bags': 'Çantalar',
        'nav.belts': 'Kəmərlər',
        'nav.hats': 'Papaqlar',
        'nav.watches': 'Saatlar',
        'nav.jewelry': 'Zinət əşyaları',

        // Product Grid
        'products.title': 'Bizim Kolleksiya',
        'products.description': 'Premium geyim kolleksiyamızı kəşf edin',
        'products.category': 'Kateqoriya',
        'products.sortBy': 'Sıralama',
        'products.allCategories': 'Bütün Kateqoriyalar',
        'products.newest': 'Ən Yeni',
        'products.priceLowHigh': 'Qiymət: Aşağıdan Yuxarıya',
        'products.priceHighLow': 'Qiymət: Yuxarıdan Aşağıya',
        'products.name': 'Ad',
        'products.showing': 'Göstərilir',
        'products.of': 'dən',
        'products.products': 'məhsul',
        'products.noProducts': 'Məhsul tapılmadı',
        'products.tryFilters': 'Filterləri dəyişdirməyə cəhd edin',

        // Product Card
        'product.new': 'Yeni',
        'product.sale': 'Endirim',
        'product.addToCart': 'Səbətə əlavə et',
        'product.quickView': 'Tez baxış',

        // Shopping Cart
        'cart.title': 'Səbət',
        'cart.empty': 'Səbət boşdur',
        'cart.emptyDescription': 'Başlamaq üçün məhsul əlavə edin',
        'cart.size': 'Ölçü',
        'cart.subtotal': 'Ara cəm',
        'cart.shipping': 'Çatdırılma',
        'cart.free': 'Pulsuz',
        'cart.total': 'Cəmi',
        'cart.freeShipping': 'Daha əlavə edin',
        'cart.freeShippingMore': 'pulsuz çatdırılma üçün',
        'cart.checkout': 'Sifariş ver',

        // Hero Section
        'hero.title': 'Hər kəs üçün Müasir Stil',
        'hero.subtitle': 'Premium geyim kolleksiyamızı kəşf edin',
        'hero.shopNow': 'İndi alış-veriş et',

        // Footer
        'footer.company': 'Şirkət',
        'footer.about': 'Haqqımızda',
        'footer.careers': 'Karyera',
        'footer.contact': 'Əlaqə',
        'footer.help': 'Kömək',
        'footer.shipping': 'Çatdırılma',
        'footer.returns': 'Qaytarma',
        'footer.sizeGuide': 'Ölçü Cədvəli',
        'footer.legal': 'Hüquqi',
        'footer.privacy': 'Məxfilik Siyasəti',
        'footer.terms': 'İstifadə Şərtləri',
        'footer.cookies': 'Cookie Siyasəti',
        'footer.newsletter': 'Xəbər bülletenimizə abunə olun',
        'footer.newsletterText': 'Ən son yeniliklər və xüsusi təklifləri əldə edin',
        'footer.email': 'E-poçt ünvanınız',
        'footer.subscribe': 'Abunə ol',
        'footer.rights': 'Bütün hüquqlar qorunur.',

        // Auth
        'auth.login': 'Giriş',
        'auth.register': 'Qeydiyyat',
        'auth.email': 'E-poçt',
        'auth.password': 'Parol',
        'auth.confirmPassword': 'Parolu Təsdiq edin',
        'auth.firstName': 'Ad',
        'auth.lastName': 'Soyad',
        'auth.loginButton': 'Daxil ol',
        'auth.registerButton': 'Hesab yarat',
        'auth.switchToRegister': 'Hesabınız yoxdur? Qeydiyyatdan keçin',
        'auth.switchToLogin': 'Artıq hesabınız var? Daxil olun',

        // Admin
        'admin.title': 'Admin Paneli',
        'admin.addProduct': 'Məhsul əlavə et',
        'admin.productList': 'Məhsul siyahısı',
        'admin.name': 'Ad',
        'admin.description': 'Təsvir',
        'admin.price': 'Qiymət',
        'admin.category': 'Kateqoriya',
        'admin.brand': 'Brend',
        'admin.size': 'Ölçü',
        'admin.color': 'Rəng',
        'admin.stock': 'Miqdar',
        'admin.images': 'Şəkillər',
        'admin.addProductButton': 'Məhsul əlavə et',
        'admin.edit': 'Redaktə et',
        'admin.delete': 'Sil',
        'admin.save': 'Saxla',
        'admin.cancel': 'Ləğv et',

        // Common
        'common.loading': 'Yüklənir...',
        'common.error': 'Xəta',
        'common.success': 'Uğurlu',
        'common.close': 'Bağla',
        'common.save': 'Saxla',
        'common.cancel': 'Ləğv et',
        'common.next': 'Növbəti',
        'common.previous': 'Əvvəlki',
        'common.or': 'və ya',

        // В разделе az:
        'features.freeShipping': 'Pulsuz Çatdırılma',
        'features.freeShippingDesc': '$100-dən çox sifarişlər üçün dünya üzrə',
        'features.easyReturns': 'Asan Qaytarma',
        'features.easyReturnsDesc': '30 günlük problemsiz qaytarma',
        'features.premiumQuality': 'Premium Keyfiyyət',
        'features.premiumQualityDesc': 'Seçilmiş premium kolleksiya',

        'productModal.description': 'Təsvir',
        'productModal.size': 'Ölçü',
        'productModal.quantity': 'Miqdar',
        'productModal.selectSizePlaceholder': 'Ölçü seçin',
        'productModal.inStock': 'Stokda var',
        'productModal.addToCart': 'Səbətə əlavə et',
        'productModal.outOfStock': 'Stokda yoxdur',

    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<'ru' | 'en' | 'az'>(() => {
        const saved = localStorage.getItem('language');
        return (saved as 'ru' | 'en' | 'az') || 'ru';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: string): string => {
        // @ts-ignore
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};