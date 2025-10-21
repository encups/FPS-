import { NextRequest, NextResponse } from "next/server";

// Medieval-themed system prompts for different content types
const SYSTEM_PROMPTS = {
  social: `You are a medieval bard crafting social media content. Use storytelling, metaphors of quests, kingdoms, and adventures. Keep it engaging, modern, but with a charming medieval flair. Use emojis strategically. Keep posts under 280 characters unless specified otherwise.`,

  email: `You are a royal scribe crafting email campaigns. Use storytelling techniques with a medieval theme while maintaining professional marketing copy. Structure: compelling subject line, engaging opening, clear value proposition, strong call-to-action. Add medieval charm without being cheesy.`,

  ad: `You are a town crier creating compelling advertisements. Write persuasive ad copy with medieval storytelling elements. Focus on benefits, urgency, and clear CTAs. Keep it punchy and conversion-focused while maintaining the medieval theme.`,

  blog: `You are a court historian writing blog chronicles. Create engaging, SEO-friendly blog content with medieval storytelling style. Use metaphors of quests, kingdoms, and legends. Structure with headers, keep paragraphs short, and make it valuable for small businesses.`,
};

export async function POST(req: NextRequest) {
  try {
    const { type, prompt } = await req.json();

    if (!type || !prompt) {
      return NextResponse.json(
        { error: "Missing type or prompt" },
        { status: 400 }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[type as keyof typeof SYSTEM_PROMPTS];
    if (!systemPrompt) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return demo content if no API key configured
      return NextResponse.json({
        content: getDemoContent(type, prompt),
        demo: true,
      });
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "Failed to generate content";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

// Demo content generator for when API key is not configured
function getDemoContent(type: string, prompt: string): string {
  const demoContent = {
    social: `⚔️ Embark on a quest for greatness! ${prompt}

🏰 Your kingdom awaits transformation. Join fellow merchants and craftsmen who've already conquered their markets.

🗡️ Ready to write your success story?

#SmallBusinessQuest #FrameFables #MedievalMarketing`,

    email: `Subject: 🏰 Your Marketing Quest Begins Here!

Greetings, Noble Merchant!

In the realm of small business, many brave souls venture forth seeking fortune and fame. Yet few discover the ancient scrolls of marketing wisdom that could transform their humble shop into a thriving kingdom.

Your quest: ${prompt}

What treasures await you:
✨ Automated content creation (save 10+ hours/week)
⚔️ AI-powered campaigns that actually convert
🏰 Tools forged specifically for small businesses
📜 Templates tested in a thousand battles

The path forward is clear. Will you seize this opportunity?

[Start Your Free Quest] 👈

May your conversions be plentiful,
The Frame Fables Guild

P.S. - The first 100 merchants to join receive a legendary bonus pack worth 50 gold coins... err, dollars!`,

    ad: `🏰 ATTENTION SMALL BUSINESS OWNERS! 🏰

Tired of spending hours on marketing that doesn't work?

Frame Fables turns you into a marketing LEGEND:
⚡ AI creates content in seconds (not hours)
⚔️ Medieval-themed templates that convert
📜 Automated campaigns while you sleep

${prompt}

🎯 SPECIAL QUEST: Start FREE for 7 days
❌ No credit card required
✅ Cancel anytime

Your kingdom awaits. Will you answer the call?

[Start Free Trial] 👑`,

    blog: `# ${prompt}: A Small Business Chronicle

*In the realm of modern marketing, a revolution brews...*

## The Merchant's Dilemma

Every small business owner faces the same dragon: not enough time, not enough budget, yet the kingdom demands constant content, engagement, and growth.

Sound familiar, brave merchant?

## The Ancient Solution (Made Modern)

Long ago, storytellers ruled the market square. They knew that people don't buy products—they buy stories, quests, and transformation.

Frame Fables brings that ancient wisdom into the AI age.

### How It Works

1. **Tell Your Tale**: Share your business story
2. **Choose Your Weapons**: Select marketing tools
3. **AI Crafts Magic**: Content generated in seconds
4. **Conquer Markets**: Deploy and watch results

## Real Kingdoms, Real Results

"Frame Fables saved me 15 hours a week and doubled my engagement!" - Sarah, Bakery Owner

"The medieval theme makes my brand memorable. Customers love it!" - Mike, Fitness Coach

## Your Quest Begins Now

Every great kingdom started with a single brave decision.

What will yours be?

---

*Ready to write your success story? [Start your free quest today →](https://framefables.com)*`,
  };

  return demoContent[type as keyof typeof demoContent] || "Content generated successfully!";
}
