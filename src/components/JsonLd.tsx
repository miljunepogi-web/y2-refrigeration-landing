import { siteConfig } from "@/lib/site";

export function JsonLd() {
  const payload = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    telephone: siteConfig.phoneDisplay,
    areaServed: siteConfig.serviceArea,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Cavite",
      addressCountry: "PH",
    },
    url: siteConfig.url,
    sameAs: [siteConfig.facebookPageUrl, siteConfig.messengerUrl],
    serviceType: [
      "Aircon Cleaning",
      "Aircon Installation",
      "Aircon Repair",
      "Preventive Maintenance",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
