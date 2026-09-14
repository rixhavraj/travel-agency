import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatrixParticles from "@/components/ui/MatrixParticles";
import AIChatBot from "@/components/AIChatBot";
import MusicToggle from "@/components/MusicToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IRON NEXUS | Best Gym in Greater Noida | Premium Cyberpunk Fitness",
  description: "Looking for the best gym in Greater Noida? Experience IRON NEXUS: the ultra-modern luxury cyberpunk fitness center in Greater Noida. Futuristic training, AI bio-coaching, elite conditioning, and premium memberships.",
  keywords: "gym in greater noida, best gym in greater noida, fitness center greater noida, premium gym greater noida, luxury gym greater noida, iron nexus greater noida, gym near me greater noida, future fitness 2026, cyberpunk gym",
  openGraph: {
    title: "IRON NEXUS | Best Gym in Greater Noida | Premium Cyberpunk Fitness",
    description: "Upgrade your human biometrics. Forge the future of strength at the premier luxury cyberpunk gym in Greater Noida. Futuristic equipment, top coaches, and elite biohacking.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ExerciseGym",
              "name": "IRON NEXUS - GYMPRO Greater Noida",
              "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=400&q=80",
              "@id": "https://ironnexus.gympro.com/#gym",
              "url": "https://ironnexus.gympro.com",
              "telephone": "+919708169442",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Plot Alpha II, Commercial Belt",
                "addressLocality": "Greater Noida",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "201308",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.4744,
                "longitude": 77.5040
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "05:00",
                "closes": "23:00"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-dark-bg text-silver-text font-sans selection:bg-neon-lime selection:text-black">
        {/* Futuristic layout overlays */}
        <MatrixParticles limeDensity={30} purpleDensity={30} interactive={true} />
        <AIChatBot />
        <MusicToggle />
        
        {/* Core page scaffolding */}
        <Navbar />
        
        <main className="flex-grow pt-32 min-h-[calc(100vh-80px)] relative z-10">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
