"use client";

import { useState, useEffect } from 'react';
import { KnightSkin, getAllSkins, getCurrentSkin, setCurrentSkin, unlockSkin } from '@/lib/skins';

interface SkinsModalProps {
  onClose: () => void;
  onSkinChange: () => void;
}

export default function SkinsModal({ onClose, onSkinChange }: SkinsModalProps) {
  const [skins, setSkins] = useState<KnightSkin[]>([]);
  const [currentSkin, setCurrentSkinState] = useState<string>('default');
  const [showPurchase, setShowPurchase] = useState<KnightSkin | null>(null);

  useEffect(() => {
    setSkins(getAllSkins());
    setCurrentSkinState(getCurrentSkin());
  }, []);

  const handleSelectSkin = (skin: KnightSkin) => {
    if (skin.unlocked) {
      setCurrentSkin(skin.id);
      setCurrentSkinState(skin.id);
      onSkinChange();
    } else {
      setShowPurchase(skin);
    }
  };

  const handlePurchase = (skin: KnightSkin) => {
    // In a real app, this would integrate with Stripe or similar
    // For now, just unlock it (demo mode)
    unlockSkin(skin.id);
    setCurrentSkin(skin.id);
    setCurrentSkinState(skin.id);
    setSkins(getAllSkins());
    setShowPurchase(null);
    onSkinChange();

    console.log(`💳 Purchase simulation: ${skin.name} for $${skin.price}`);
  };

  if (showPurchase) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="pixel-border medieval-shadow bg-gradient-to-b from-medieval-ink to-black p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{showPurchase.emoji}</div>
            <h2 className="pixel-text text-xl text-medieval-gold mb-2">
              {showPurchase.name}
            </h2>
            <p className="font-pixel text-sm text-medieval-parchment mb-4">
              {showPurchase.description}
            </p>
            <div className="pixel-text text-3xl text-medieval-gold mb-2">
              ${showPurchase.price}
            </div>
          </div>

          {/* Skin Preview */}
          <div className="pixel-border bg-black/50 p-6 mb-6 flex justify-center">
            <div
              className="w-20 h-20 relative"
              style={{
                backgroundColor: showPurchase.color,
                imageRendering: 'pixelated'
              }}
            >
              <div
                className="absolute top-2 left-2 right-2 h-6"
                style={{ backgroundColor: showPurchase.accentColor }}
              />
              <div
                className="absolute top-6 left-3 right-3 h-3 bg-black/60"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handlePurchase(showPurchase)}
              className="w-full pixel-border medieval-shadow bg-medieval-gold hover:bg-medieval-bronze text-medieval-ink px-6 py-3 pixel-text text-sm transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              💳 UNLOCK NOW (DEMO)
            </button>
            <button
              onClick={() => setShowPurchase(null)}
              className="w-full pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-6 py-3 pixel-text text-xs transition-colors"
            >
              ← BACK TO SKINS
            </button>
          </div>

          <p className="font-pixel text-xs text-medieval-stone text-center mt-4">
            * Demo mode: Unlocks instantly without payment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="pixel-border medieval-shadow bg-gradient-to-b from-medieval-ink to-black p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="pixel-text text-2xl text-medieval-gold mb-2">
            ⚔️ KNIGHT SKINS
          </h2>
          <p className="font-pixel text-sm text-medieval-parchment">
            Customize your hero with unique armor
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {skins.map((skin) => (
            <button
              key={skin.id}
              onClick={() => handleSelectSkin(skin)}
              className={`pixel-border p-4 transition-all hover:translate-x-1 hover:translate-y-1 ${
                currentSkin === skin.id
                  ? 'bg-medieval-gold/20 border-medieval-gold'
                  : 'bg-medieval-stone/10 hover:bg-medieval-stone/20'
              }`}
            >
              {/* Skin Preview */}
              <div className="flex justify-center mb-3">
                <div
                  className="w-16 h-16 relative"
                  style={{
                    backgroundColor: skin.color,
                    imageRendering: 'pixelated'
                  }}
                >
                  <div
                    className="absolute top-2 left-2 right-2 h-5"
                    style={{ backgroundColor: skin.accentColor }}
                  />
                  <div className="absolute top-5 left-2 right-2 h-2 bg-black/60" />
                </div>
              </div>

              <div className="text-2xl mb-2">{skin.emoji}</div>
              <div className="pixel-text text-xs text-medieval-parchment mb-1">
                {skin.name}
              </div>

              {skin.price === 0 ? (
                <div className="font-pixel text-xs text-green-500">FREE</div>
              ) : skin.unlocked ? (
                <div className="font-pixel text-xs text-medieval-gold">OWNED</div>
              ) : (
                <div className="font-pixel text-xs text-medieval-stone">${skin.price}</div>
              )}

              {currentSkin === skin.id && (
                <div className="pixel-text text-xs text-medieval-gold mt-2">
                  ✓ ACTIVE
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full pixel-border bg-transparent hover:bg-medieval-parchment/10 text-medieval-parchment px-6 py-3 pixel-text text-sm transition-colors"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
