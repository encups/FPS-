"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type ContentType = "social" | "email" | "ad" | "blog";

interface GeneratedContent {
  type: ContentType;
  content: string;
  timestamp: Date;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<ContentType>("social");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [history, setHistory] = useState<GeneratedContent[]>([]);

  const contentTypes = [
    { id: "social" as ContentType, name: "Social Media", icon: "📱", color: "bg-blue-500" },
    { id: "email" as ContentType, name: "Email", icon: "✉️", color: "bg-purple-500" },
    { id: "ad" as ContentType, name: "Ad Copy", icon: "📢", color: "bg-orange-500" },
    { id: "blog" as ContentType, name: "Blog Post", icon: "📝", color: "bg-green-500" },
  ];

  const templates = {
    social: [
      "Engagement post about [topic]",
      "Product launch announcement",
      "Customer testimonial story",
      "Behind-the-scenes content",
    ],
    email: [
      "Welcome email sequence",
      "Product promotion campaign",
      "Newsletter with storytelling",
      "Re-engagement campaign",
    ],
    ad: [
      "Facebook ad copy",
      "Google search ad",
      "Instagram story ad",
      "Landing page headline",
    ],
    blog: [
      "How-to guide about [topic]",
      "Industry trends analysis",
      "Customer success story",
      "Product comparison post",
    ],
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeTab, prompt }),
      });

      const data = await response.json();
      const newContent: GeneratedContent = {
        type: activeTab,
        content: data.content,
        timestamp: new Date(),
      };

      setGeneratedContent(newContent);
      setHistory([newContent, ...history]);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getTypeColor = (type: ContentType) => {
    return contentTypes.find((t) => t.id === type)?.color || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-900">Frame Fables</div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg text-sm font-semibold">
                Professional Plan
              </div>
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                Settings
              </button>
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Content Studio
          </h1>
          <p className="text-xl text-gray-600">
            Generate professional marketing content with AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type Selector */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Content Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      activeTab === type.id
                        ? "border-primary-600 bg-primary-50 shadow-lg"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className={`text-sm font-semibold ${
                      activeTab === type.id ? "text-primary-700" : "text-gray-700"
                    }`}>
                      {type.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templates[activeTab].map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(template)}
                    className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-left transition-all group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-primary-700">
                      {template}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <label className="text-lg font-semibold text-gray-900 mb-3 block">
                What do you want to create?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you need... (e.g., 'Create a social media post announcing our new product launch')"
                className="w-full bg-gray-50 text-gray-900 rounded-lg p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 border border-gray-200"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-600/30"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    "✨ Generate Content"
                  )}
                </button>
                <button
                  onClick={() => setPrompt("")}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-200 p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Generated Content
                  </h3>
                  <button
                    onClick={() => {
                      copyToClipboard(generatedContent.content);
                      alert("Copied to clipboard!");
                    }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-700 flex items-center gap-2"
                  >
                    <span>📋</span>
                    Copy
                  </button>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {generatedContent.content}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-sm text-blue-700 mb-1 font-medium">
                    Content Created
                  </div>
                  <div className="text-3xl font-bold text-blue-900">
                    {history.length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
                  <div className="text-sm text-primary-700 mb-1 font-medium">
                    Credits Remaining
                  </div>
                  <div className="text-3xl font-bold text-primary-900">
                    42/50
                  </div>
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent History</h3>
              <div className="space-y-3">
                {history.slice(0, 5).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setGeneratedContent(item)}
                    className="w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-left transition-all border border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${getTypeColor(item.type)}`} />
                      <span className="text-sm font-semibold text-gray-900">
                        {contentTypes.find((t) => t.id === item.type)?.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </button>
                ))}
                {history.length === 0 && (
                  <div className="text-sm text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                    No content generated yet
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium border border-gray-200 transition-all">
                  🎨 Brand Settings
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium border border-gray-200 transition-all">
                  📅 Schedule Post
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium border border-gray-200 transition-all">
                  📈 View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
