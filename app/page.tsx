'use client'

import { Hero } from "@/components/hero";
import { NewsSection } from "@/components/news-section";
import { PodcastSection } from "@/components/podcast-section";
import { Leva } from "leva";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <NewsSection />
      <PodcastSection />
      <footer className="py-12 border-t border-white/10">
        <div className="container text-center">
          <p className="text-foreground/40 font-mono text-sm">
            © 2026 瑜镜 - AI 探索者 | 小红书：248342962 | VX：xiaojin-lucky-
          </p>
        </div>
      </footer>
      <Leva hidden />
    </main>
  );
}
