export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Kulhad Pouring Tradition",
    category: "Craftsmanship",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=85&w=1200",
    alt: "Earthen terracotta cup filled with freshly brewed steaming chai",
  },
  {
    id: "g2",
    title: "Handpicked Tea Leaves",
    category: "Ingredients",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=85&w=1200",
    alt: "Fresh green tea leaves in wooden basket",
  },
  {
    id: "g3",
    title: "Morning Brew Ritual",
    category: "Ambience",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=85&w=1200",
    alt: "Boiling chai kettle on warm stove",
  },
  {
    id: "g4",
    title: "Crushed Whole Spices",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=85&w=1200",
    alt: "Brass mortar and pestle with cardamom and cloves",
  },
  {
    id: "g5",
    title: "Warm Handcrafted Spaces",
    category: "Café",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=85&w=1200",
    alt: "Minimalist warm café wooden seating area",
  },
  {
    id: "g6",
    title: "Conversations & Steaming Cups",
    category: "Community",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=85&w=1200",
    alt: "Friends sharing chai at wooden table",
  },
];
