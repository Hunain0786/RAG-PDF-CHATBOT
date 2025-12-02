"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, RotateCcw, FileText } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  pdfName: string | null
  onReset: () => void
}

export default function ChatInterface({ pdfName, onReset }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `I've loaded your PDF "${pdfName}". Ask me anything about its contents!`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      })

      if (response.ok) {
        const data = await response.json()
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.answer,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        console.error("Failed to get answer")
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I encountered an error while processing your request.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error("Error asking question:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I couldn't connect to the server. Please check if the backend is running.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/80 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate">{pdfName}</p>
            <p className="text-xs text-muted-foreground hidden sm:block">PDF loaded and ready</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
            bg-muted text-muted-foreground hover:bg-muted/80 transition-colors flex-shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">New PDF</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`
                max-w-xs sm:max-w-md rounded-lg px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200 text-xs sm:text-sm
                ${message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-muted-foreground rounded-bl-none border border-border/40"
                }
              `}
            >
              <p className="leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-1 sm:mt-2 opacity-70`}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground rounded-lg px-3 sm:px-4 py-2 sm:py-3 rounded-bl-none border border-border/40">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border/40 backdrop-blur-sm bg-background/80 p-3 sm:p-6">
        <div className="flex gap-2 sm:gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your PDF..."
            disabled={isLoading}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground
              border border-border/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
              transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-base"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90
              active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed
              border border-primary/20 font-medium flex items-center gap-1 sm:gap-2 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}
