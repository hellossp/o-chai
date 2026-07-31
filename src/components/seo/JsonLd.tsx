export function JsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": "O Chai",
    "image": "https://ochai.in/og-image.jpg",
    "@id": "https://ochai.in",
    "url": "https://ochai.in",
    "telephone": "+919876543210",
    "priceRange": "₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot 42, Saheed Nagar Main Road",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "OD",
      "postalCode": "751007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.2961,
      "longitude": 85.8245
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "22:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "07:00",
        "closes": "23:30"
      }
    ],
    "servesCuisine": "Indian Tea & Snacks",
    "sameAs": [
      "https://instagram.com/ochai.official",
      "https://facebook.com/ochai.official"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
