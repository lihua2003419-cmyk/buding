"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishTime: string;
  link: string;
  summary?: string;
}

const rssSources = [
  { name: "机器之心", rssUrl: "https://www.jiqizhixin.com/rss" },
  { name: "量子位", rssUrl: "https://www.qbitai.com/feed" },
  { name: "InfoQ", rssUrl: "https://www.infoq.cn/feed" },
  { name: "AI前线", rssUrl: "https://www.aifront.net/feed" },
  { name: "雷锋网", rssUrl: "https://www.leiphone.com/feed" },
  { name: "新智元", rssUrl: "https://www.aimark.cn/feed" },
  { name: "TechWeb", rssUrl: "https://www.techweb.com.cn/rss/all.xml" },
  { name: "钛媒体", rssUrl: "https://www.tmtpost.com/feed" },
];

const fallbackNews: NewsItem[] = [
  { id: "1", title: "ChatGPT发布重大更新，GPT-4 Turbo全面开放", source: "机器之心", publishTime: "2026-03-03", link: "https://www.jiqizhixin.com", summary: "OpenAI宣布GPT-4 Turbo模型全面开放，支持128K上下文窗口，知识库更新至2024年4月。新模型在推理能力、代码生成和多语言支持方面均有显著提升。" },
  { id: "2", title: "百度文心一言4.0发布，中文理解能力再突破", source: "量子位", publishTime: "2026-03-03", link: "https://www.qbitai.com", summary: "百度正式发布文心一言4.0版本，在中文语义理解、文学创作和逻辑推理方面实现重大突破。新版本支持多模态输入，可处理图文混合任务。" },
  { id: "3", title: "阿里通义千问开源，国产大模型生态加速", source: "InfoQ", publishTime: "2026-03-02", link: "https://www.infoq.cn", summary: "阿里云宣布开源通义千问大模型，提供7B、14B、72B等多个版本。模型采用Apache 2.0协议，支持商业使用，已在GitHub获得数万Star。" },
  { id: "4", title: "字节跳动推出豆包大模型，多场景应用落地", source: "36氪", publishTime: "2026-03-02", link: "https://36kr.com", summary: "字节跳动正式发布豆包大模型家族，涵盖通用对话、代码生成、图像理解等多个版本。模型已接入抖音、飞书等字节系产品，日调用量超千亿次。" },
  { id: "5", title: "智谱AI发布GLM-4，国产大模型能力再升级", source: "机器之心", publishTime: "2026-03-02", link: "https://www.jiqizhixin.com", summary: "智谱AI发布新一代基座大模型GLM-4，在中文理解、数学推理和代码生成等评测中接近GPT-4水平。同时推出GLMs智能体平台，支持零代码创建AI应用。" },
  { id: "6", title: "Meta发布Llama 3开源大模型，性能对标GPT-4", source: "新智元", publishTime: "2026-02-29", link: "https://www.aimark.cn", summary: "Meta正式发布Llama 3系列开源大模型，包含8B和70B两个版本。模型在多项基准测试中表现优异，接近GPT-4水平，且完全免费开放商业使用。" },
];

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const allNews: NewsItem[] = [];
        const promises = rssSources.map(async (source) => {
          try {
            const response = await fetch(
              `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.rssUrl)}`
            );
            const data = await response.json();
            if (data.items && data.items.length > 0) {
              return data.items.slice(0, 3).map((item: any, index: number) => {
                // 清理 HTML 标签并提取纯文本
                let summary = '';
                if (item.description) {
                  // 移除 HTML 标签
                  summary = item.description.replace(/<[^>]*>/g, '');
                  // 移除多余的空白字符
                  summary = summary.replace(/\s+/g, ' ').trim();
                  // 截取前 120 个字符
                  summary = summary.substring(0, 120);
                  // 如果内容被截断，添加省略号
                  if (summary.length >= 120) {
                    summary += '...';
                  }
                }
                // 如果没有提取到内容，使用标题作为简介
                if (!summary || summary.length < 10) {
                  summary = item.title || '点击查看详情';
                }
                
                return {
                  id: `${source.name}-${index}`,
                  title: item.title,
                  source: source.name,
                  publishTime: new Date(item.pubDate).toLocaleDateString("zh-CN"),
                  link: item.link,
                  summary: summary,
                };
              });
            }
          } catch (e) {
            console.error(`Failed to fetch ${source.name}:`, e);
          }
          return [];
        });

        const results = await Promise.all(promises);
        results.forEach((items) => allNews.push(...items));

        if (allNews.length > 0) {
          setNews(allNews.slice(0, 16));
        } else {
          setNews(fallbackNews);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <section id="news" className="py-24 container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-sentient mb-4">AI 每日资讯</h2>
        <p className="text-foreground/60 font-mono">追踪 AI 行业最新动态</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-[#00ff9d] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-foreground/60 font-mono">正在加载最新资讯...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-colors flex flex-col h-full">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium leading-snug flex-1">{item.title}</h3>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-foreground/50 font-mono">
                <span>{item.source}</span>
                <span>{item.publishTime}</span>
              </div>
              
              <div className="mt-auto pt-4">
                <Link href={item.link} target="_blank">
                  <Button size="sm">
                    阅读全文
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
