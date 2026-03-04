'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Send, User, Clock } from 'lucide-react'
import { db, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from '@/lib/firebase'

interface Message {
  id: string
  name: string
  content: string
  timestamp: Date
}

export function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  // 从 Firebase 加载留言
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData: Message[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        messagesData.push({
          id: doc.id,
          name: data.name,
          content: data.content,
          timestamp: data.timestamp?.toDate() || new Date(),
        })
      })
      setMessages(messagesData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return

    setIsSubmitting(true)

    try {
      await addDoc(collection(db, 'messages'), {
        name: name.trim(),
        content: content.trim(),
        timestamp: Timestamp.now(),
      })

      // 清空表单
      setName('')
      setContent('')
    } catch (error) {
      console.error('Error adding message:', error)
      alert('发布失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <section id="guestbook" className="py-24 relative">
      <div className="container max-w-4xl">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 mb-6">
            <MessageSquare className="w-4 h-4 text-[#00ff9d]" />
            <span className="text-[#00ff9d] text-sm font-mono">留言板</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sentient mb-4">
            留下你的想法
          </h2>
          <p className="text-foreground/60 font-mono text-sm max-w-md mx-auto">
            欢迎分享你对 AI 的看法、建议或任何问题，所有人都能看到你的留言
          </p>
        </div>

        {/* 留言表单 */}
        <Card className="mb-8 bg-black/40 backdrop-blur-xl border-white/10">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-foreground/60 mb-2">
                  昵称
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入你的昵称"
                  maxLength={20}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-[#00ff9d]/50 transition-colors font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-foreground/60 mb-2">
                  留言内容
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="写下你想说的话..."
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-[#00ff9d]/50 transition-colors font-mono text-sm resize-none"
                />
                <div className="text-right text-xs text-foreground/40 mt-1 font-mono">
                  {content.length}/500
                </div>
              </div>
              <Button
                type="submit"
                disabled={!name.trim() || !content.trim() || isSubmitting}
                className="w-full bg-[#00ff9d]/10 border border-[#00ff9d]/50 text-[#00ff9d] hover:bg-[#00ff9d]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? '发布中...' : '发布留言'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 留言列表 */}
        <div className="space-y-4">
          {loading ? (
            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 text-center">
                <div className="inline-block w-8 h-8 border-2 border-[#00ff9d] border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-foreground/40 font-mono text-sm">
                  加载留言中...
                </p>
              </CardContent>
            </Card>
          ) : messages.length === 0 ? (
            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/40 font-mono text-sm">
                  还没有留言，来做第一个留言的人吧！
                </p>
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => (
              <Card
                key={message.id}
                className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-[#00ff9d]/30 transition-colors"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-[#00ff9d]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-foreground">
                          {message.name}
                        </span>
                        <span className="text-foreground/40 text-xs font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-foreground/80 text-sm leading-relaxed break-words">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 提示信息 */}
        <p className="text-center text-foreground/30 text-xs font-mono mt-8">
          所有人都能看到你的留言
        </p>
      </div>
    </section>
  )
}
