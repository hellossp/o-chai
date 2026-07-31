export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
  popular?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "masala-chai",
    title: "Masala Chai",
    subtitle: "Traditional Spiced Brew",
    description: "Hand-crushed cardamom, clove, cinnamon, and fresh ginger slow-simmered with premium Assam CTC tea and creamy milk.",
    price: "₹40",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=85&w=1200",
    tags: ["Signature", "Spiced", "Bestseller"],
    popular: true,
  },
  {
    id: "elaichi-chai",
    title: "Elaichi Chai",
    subtitle: "Green Cardamom Infusion",
    description: "Fragrant green cardamom pods gently bruised and infused in slow-boiled whole milk, creating a velvety aromatic delight.",
    price: "₹45",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=85&w=1200",
    tags: ["Aromatic", "Classic"],
    popular: false,
  },
  {
    id: "ginger-chai",
    title: "Adrak Chai",
    subtitle: "Zesty Fresh Ginger",
    description: "Freshly grated ginger root bringing a sharp, invigorating warmth balanced with rich roasted tea leaves and jaggery.",
    price: "₹40",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&q=85&w=1200",
    tags: ["Warming", "Immunity"],
    popular: true,
  },
  {
    id: "lemon-tea",
    title: "Nimbu Pudina Tea",
    subtitle: "Citrus Mint Refresher",
    description: "Fresh lemon juice, crushed spearmint leaves, and wild mountain honey stirred into light golden Darjeeling black tea.",
    price: "₹50",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=85&w=1200",
    tags: ["Refreshing", "Herbal"],
    popular: false,
  },
];
