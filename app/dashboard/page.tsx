"use client";

import { useState } from "react";
import Link from "next/link";

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
    { id: "social" as ContentType, name: "Social Quest", icon: "⚔️" },
    { id: "email" as ContentType, name: "Email Scroll", icon: "📜" },
    { id: "ad" as ContentType, name: "Ad Campaign", icon: "🏰" },
    { id: "blog" as ContentType, name: "Blog Chronicle", icon: "📖" },
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
    alert("Content copied to clipboard! ⚔️");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-medieval-ink via-gray-900 to-medieval-forest">
      {/* Navigation */}
      <nav className="border-b-4 border-medieval-gold bg-black/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🏰</span>
              <h1 className="pixel-text text-xl text-medieval-gold">Frame Fables</h1>
            </Link>
            <div className="flex items-center gap-4">
              <div className="pixel-border bg-medieval-gold/20 px-4 py-2">
                <span className="pixel-text text-xs text-medieval-gold">
                  ⚡ Knight Plan
                </span>
              </div>
              <button className="pixel-text text-sm text-medieval-parchment hover:text-medieval-gold">
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="pixel-text text-3xl text-medieval-gold mb-2">
            ⚔️ Your Marketing Command Center ⚔️
          </h2>
          <p className="font-pixel text-xl text-medieval-stone">
            Generate epic content for your kingdom
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type Tabs */}
            <div className="pixel-border bg-medieval-stone/10 p-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`pixel-text text-xs py-3 px-2 transition-all ${
                      activeTab === type.id
                        ? "bg-medieval-gold text-medieval-ink"
                        : "bg-transparent text-medieval-parchment hover:bg-medieval-gold/20"
                    }`}
                  >
                    {type.icon} {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Templates */}
            <div className="pixel-border bg-black/30 p-6">
              <h3 className="pixel-text text-lg text-medieval-gold mb-4">
                📋 Quick Templates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templates[activeTab].map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(template)}
                    className="pixel-border bg-medieval-stone/20 hover:bg-medieval-stone/30 p-3 text-left transition-all"
                  >
                    <span className="font-pixel text-sm text-medieval-parchment">
                      {template}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="pixel-border bg-black/30 p-6">
              <label className="pixel-text text-sm text-medieval-gold mb-3 block">
                🖋️ Describe Your Quest
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Tell the AI what content you need... (e.g., 'Create a social media post announcing our new product launch with medieval theme')"
                className="w-full pixel-border bg-medieval-ink/50 text-medieval-parchment font-pixel text-lg p-4 h-32 resize-none focus:outline-none focus:border-medieval-gold"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="pixel-border medieval-shadow bg-medieval-gold text-medieval-ink px-6 py-3 pixel-text text-sm hover:bg-medieval-bronze transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? "🔮 Crafting..." : "⚡ Generate"}
                </button>
                <button
                  onClick={() => setPrompt("")}
                  className="pixel-border bg-transparent text-medieval-parchment px-6 py-3 pixel-text text-sm hover:bg-medieval-parchment/10"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <div className="pixel-border medieval-shadow bg-medieval-gold/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="pixel-text text-lg text-medieval-gold">
                    ✨ Generated Content
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedContent.content)}
                    className="pixel-border bg-medieval-gold text-medieval-ink px-4 py-2 pixel-text text-xs hover:bg-medieval-bronze"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="pixel-border bg-medieval-ink/50 p-4">
                  <p className="font-pixel text-lg text-medieval-parchment whitespace-pre-wrap">
                    {generatedContent.content}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="pixel-border bg-medieval-stone/10 p-6">
              <h3 className="pixel-text text-lg text-medieval-gold mb-4">
                📊 Your Stats
              </h3>
              <div className="space-y-3">
                <div className="pixel-border bg-black/30 p-3">
                  <div className="font-pixel text-sm text-medieval-stone mb-1">
                    Content Created
                  </div>
                  <div className="pixel-text text-2xl text-medieval-parchment">
                    {history.length}
                  </div>
                </div>
                <div className="pixel-border bg-black/30 p-3">
                  <div className="font-pixel text-sm text-medieval-stone mb-1">
                    Credits Remaining
                  </div>
                  <div className="pixel-text text-2xl text-medieval-gold">
                    42/50
                  </div>
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div className="pixel-border bg-medieval-stone/10 p-6">
              <h3 className="pixel-text text-lg text-medieval-gold mb-4">
                📜 Recent Scrolls
              </h3>
              <div className="space-y-3">
                {history.slice(0, 5).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setGeneratedContent(item)}
                    className="w-full pixel-border bg-black/30 hover:bg-black/50 p-3 text-left transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>
                        {contentTypes.find((t) => t.id === item.type)?.icon}
                      </span>
                      <span className="pixel-text text-xs text-medieval-gold">
                        {contentTypes.find((t) => t.id === item.type)?.name}
                      </span>
                    </div>
                    <div className="font-pixel text-xs text-medieval-stone">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </div>
                  </button>
                ))}
                {history.length === 0 && (
                  <div className="font-pixel text-sm text-medieval-stone text-center py-4">
                    No content yet. Start your quest!
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pixel-border bg-medieval-gold/10 p-6">
              <h3 className="pixel-text text-sm text-medieval-gold mb-4">
                ⚡ Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-4 py-2 pixel-text text-xs">
                  🎨 Brand Settings
                </button>
                <button className="w-full pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-4 py-2 pixel-text text-xs">
                  📅 Schedule Post
                </button>
                <button className="w-full pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-4 py-2 pixel-text text-xs">
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
