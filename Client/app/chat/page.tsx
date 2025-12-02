"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import PDFUploader from "@/components/pdf-uploader"
import ChatInterface from "@/components/chat-interface"

export default function ChatPage() {
  const [pdfLoaded, setPdfLoaded] = useState(false)
  const [pdfName, setPdfName] = useState<string | null>(null)

  const handlePDFUpload = (name: string) => {
    setPdfName(name)
    setPdfLoaded(true)
  }

  const handleReset = () => {
    setPdfLoaded(false)
    setPdfName(null)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden dark">
      {/* Futuristic grid background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 flex h-screen flex-col">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3">
              {pdfLoaded && (
                <Link href="/">
                  <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </Link>
              )}

              <Link href="/">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">RAG PDF Chatbot</h1>
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Upload your PDF and ask questions powered by AI
            </p>
          </div>
        </header>

        {/* Main  */}
        <div className="flex-1 overflow-hidden">
          {!pdfLoaded ? (
            <PDFUploader onUpload={handlePDFUpload} />
          ) : (
            <ChatInterface pdfName={pdfName} onReset={handleReset} />
          )}
        </div>
      </div>
    </main>
  )
}
