"use client";

import Link from "next/link";
import Image from "next/image";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState } from "react";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* WebGL 背景 */}
      <div className="absolute inset-0 z-0">
        <GL hovering={hovering} />
      </div>

      {/* 内容 */}
      <div className="relative z-10 pb-16 mt-auto text-center pt-32">
        <Pill className="mb-6">AI 探索者</Pill>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          探索 AI 的无限可能
        </h1>
        <div className="flex items-center justify-center gap-4 mt-8 max-w-[500px] mx-auto">
          {/* 头像 */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00ff9d]/30 shadow-lg shadow-[#00ff9d]/10 flex-shrink-0">
            <Image
              src="/zzz.jpg"
              alt="头像"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-mono text-sm sm:text-base text-foreground/60 text-left">
            关于我：一名AI初学者，在这里分享最新 AI 资讯、推荐优质 AI 播客，与你一起探索人工智能的前沿世界
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-foreground/60 font-mono">
          <span>小红书：248342962</span>
          <span>VX：xiaojin-lucky-</span>
        </div>

        <Link className="contents max-sm:hidden" href="#news">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [探索 AI 资讯]
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="#news">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [探索 AI 资讯]
          </Button>
        </Link>
      </div>
    </section>
  );
}
