"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const podcasts = [
  {
    id: 1,
    name: "科技早知道",
    description: "声动活泼出品，聚焦全球科技行业最新动态，深度解读科技趋势",
    platform: "小宇宙",
    link: "https://www.xiaoyuzhoufm.com/podcast/5e5c52c9418a84a04625e6cc"
  },
  {
    id: 2,
    name: "硅谷101",
    description: "泓君主理，深入硅谷科技圈，访谈创业者和投资人，了解前沿科技",
    platform: "小宇宙",
    link: "https://www.xiaoyuzhoufm.com/podcast/5e5c52c9418a84a04625e6cc"
  },
  {
    id: 3,
    name: "AI每日热搜播报",
    description: "范小磊主理，每日更新AI行业热点资讯，快速了解AI圈最新动态",
    platform: "小宇宙",
    link: "https://www.xiaoyuzhoufm.com/podcast/686a9cae0aba9f882432de03"
  },
  {
    id: 4,
    name: "人民公园说AI",
    description: "叫我小苏就好主理，用轻松幽默的方式聊AI技术和产品",
    platform: "小宇宙",
    link: "https://www.xiaoyuzhoufm.com/podcast/65257ff6e8ce9deaf70a65e9"
  },
  {
    id: 5,
    name: "HuggingFace每日AI论文速递",
    description: "拨号上网主理，每日精选HuggingFace上的最新AI论文，追踪前沿研究",
    platform: "小宇宙",
    link: "https://www.xiaoyuzhoufm.com/podcast/667d1ecfc13b46d76c3f64b8"
  },
  {
    id: 6,
    name: "十字路口Crossing",
    description: "Koji、Ronghui主理，关注AI与社会的交叉点，探讨技术人文话题",
    platform: "小宇宙",
    link: "https://www.xiaoyuzhoufm.com/podcast/60502e253c92d4f62c2a9577"
  }
];

export function PodcastSection() {
  return (
    <section id="podcasts" className="py-24 container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-sentient mb-4">AI 播客推荐</h2>
        <p className="text-foreground/60 font-mono">精选优质 AI 播客，用耳朵探索智能世界</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <Card key={podcast.id} className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-colors flex flex-col">
            <h3 className="text-xl font-medium mb-2">{podcast.name}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed flex-1 mb-4">
              {podcast.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-foreground/40 font-mono">{podcast.platform}</span>
              <Link href={podcast.link} target="_blank">
                <Button size="sm">
                  去收听
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
