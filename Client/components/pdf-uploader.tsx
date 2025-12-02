"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText } from "lucide-react"

interface PDFUploaderProps {
  onUpload: (fileName: string) => void
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files[0]?.type === "application/pdf") {
      setSelectedFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file?.type === "application/pdf") {
      setSelectedFile(file)
    }
  }

  const handleUpload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedFile) {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("pdf", selectedFile)

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload_pdf`, {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          onUpload(selectedFile.name)
        } else {
          console.error("Upload failed")
          alert("Failed to upload PDF. Please try again.")
        }
      } catch (error) {
        console.error("Error uploading file:", error)
        alert("Error uploading file. Please check if the backend is running.")
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer
            transition-all duration-300 ease-out
            ${isDragging
              ? "border-primary bg-primary/10 scale-105"
              : "border-border/60 hover:border-primary/50 hover:bg-primary/5"
            }
          `}
        >
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />

          <div className="space-y-4">
            <div className="flex justify-center">
              <div
                className={`
                p-4 rounded-lg transition-all duration-300
                ${isDragging ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-muted-foreground"}
              `}
              >
                {selectedFile ? <FileText className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                {selectedFile ? "Ready to upload" : "Drop your PDF here"}
              </h3>
              {selectedFile ? (
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 truncate">{selectedFile.name}</p>
              ) : (
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">or click to browse your files</p>
              )}
            </div>

            {selectedFile && (
              <button
                onClick={handleUpload}
                className={`
                  w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200
                  bg-primary text-primary-foreground hover:bg-primary/90
                  active:scale-95 border border-primary/20 text-sm sm:text-base
                `}
              >
                {isUploading ? "Uploading..." : "Start Chatting"}
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">PDF files only • Max 10 MB recommended</p>
      </div>
    </div>
  )
}
