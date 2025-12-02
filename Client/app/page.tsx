import type React from "react"
import Link from "next/link"
import { FileText, Zap, MessageSquare, ArrowRight } from "lucide-react"

export default function Home() {
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
              {/* <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <div className="w-4 h-4 border border-primary-foreground rounded-sm" />
              </div> */}
              <Link href="/">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">RAG PDF Chatbot</h1>
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Intelligent PDF analysis powered by AI</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
            {/* Hero Section */}
            <section className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-balance">Chat with Your PDFs</h2>
                <p className="text-base sm:text-lg text-muted-foreground text-balance max-w-2xl">
                  Upload any PDF and ask questions powered by advanced AI. Get instant, accurate answers from your
                  documents using Retrieval-Augmented Generation (RAG).
                </p>
              </div>

              <Link href="/chat">
                <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all font-semibold border border-primary/20">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <FeatureCard
                icon={<FileText className="w-6 h-6" />}
                title="PDF Upload"
                description="Easily upload PDF files and start analyzing them instantly"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Instant Answers"
                description="Get fast, accurate responses about your document content"
              />
              <FeatureCard
                icon={<MessageSquare className="w-6 h-6" />}
                title="Natural Chat"
                description="Interact naturally with your documents through conversational AI"
              />
            </section>

            {/* How It Works */}
            <section className="mt-12 sm:mt-16 space-y-6 sm:space-y-8">
              <h3 className="text-2xl sm:text-3xl font-bold">How It Works</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StepCard step={1} title="Upload PDF" description="Select and upload your PDF file" />
                <StepCard step={2} title="AI Processing" description="Our system processes and indexes your document" />
                <StepCard step={3} title="Ask Questions" description="Chat naturally and get AI-powered answers" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 sm:p-6 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-200 space-y-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <h4 className="font-semibold text-sm sm:text-base">{title}</h4>
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="p-4 sm:p-6 rounded-xl border border-border/40 bg-card space-y-3 relative">
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
        {step}
      </div>
      <h4 className="font-semibold text-sm sm:text-base mt-4">{title}</h4>
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
