import Hero from '../Hero';

export default function HeroExample() {
  return (
    <Hero
      onShopNow={() => console.log('Shop now clicked')}
      onViewCollection={() => console.log('View collection clicked')}
    />
  );
}