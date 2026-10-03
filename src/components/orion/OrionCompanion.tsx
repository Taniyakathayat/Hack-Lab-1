import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { CharacterAvatar } from '../character/CharacterAvatar';
import type { CharacterEmotion } from '../../types/investigation';
import { sound } from '../../services/sound';



interface OrionCompanionProps {
  confidence: number;
  currentHint?: string;
  className?: string;
}

const ORION_QUIPS = [
  '“I stand by my 99.2% confidence score! ...Mostly.”',
  '“I trusted the data. The data did not deserve my trust.”',
  '“If anyone asks, my model weights were not consulted on this!”',
  '“I am mathematically pure, but factually deceived.”',
  '“I would like to officially request a confidence recalibration.”',
  '“Someone gave malicious data a fake moustache and I believed it.”',
];

export const OrionCompanion: React.FC<OrionCompanionProps> = ({
  confidence,
  currentHint,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentQuipIndex, setCurrentQuipIndex] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Derive emotion based on confidence score
  const getEmotion = (): CharacterEmotion => {
    if (confidence > 80) return 'confident';
    if (confidence > 50) return 'thinking';
    if (confidence > 30) return 'confused';
    return 'facepalm';
  };

  const handlePokeOrion = () => {
    sound.playBlip(750);
    setCurrentQuipIndex((prev) => (prev + 1) % ORION_QUIPS.length);
    setIsOpen(true);
  };

  return (
    <div className={`fixed bottom-5 right-5 z-40 select-none ${className}`}>
      {/* Expanded Speech Bubble Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            className="mb-3 w-72 glass-panel-glow rounded-2xl p-4 border border-sky-400/40 shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-2 border-b border-sky-900/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span className="text-xs font-cyber font-bold text-sky-300">
                  ORION 2.0 CONSOLE
                </span>
              </div>
              <div className="text-[10px] font-tech text-sky-400">
                CONF: {confidence.toFixed(1)}%
              </div>
            </div>

            {/* Bubble Content */}
            <div className="py-2.5">
              {showHint && currentHint ? (
                <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 text-xs text-amber-200 font-sans">
                  <div className="font-cyber font-bold text-amber-400 flex items-center gap-1 mb-1">
                    <Lightbulb className="w-3.5 h-3.5" /> INVESTIGATOR HINT:
                  </div>
                  {currentHint}
                </div>
              ) : (
                <p className="text-xs text-sky-100 font-sans leading-relaxed italic">
                  {ORION_QUIPS[currentQuipIndex]}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-sky-900/60 flex items-center justify-between gap-2">
              {currentHint && (
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    sound.playBlip(600);
                  }}
                  className="px-2 py-1 rounded-lg bg-sky-950 hover:bg-sky-900 border border-sky-500/30 text-[11px] font-cyber text-sky-300 flex items-center gap-1"
                >
                  <Lightbulb className="w-3 h-3 text-amber-400" />
                  <span>{showHint ? 'Show Quip' : 'Need Hint?'}</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-[10px] text-slate-400 hover:text-slate-200 font-tech px-2 py-1"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Avatar Button */}
      <motion.button
        onClick={handlePokeOrion}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group p-1.5 rounded-full glass-panel-glow border-2 border-sky-400/60 shadow-[0_0_25px_rgba(56,189,248,0.35)] flex items-center justify-center cursor-pointer transition-all"
      >
        <CharacterAvatar
          characterId="orion"
          emotion={getEmotion()}
          isSpeaking={isOpen}
          size="md"
        />

        {/* Confidence Badge Pill */}
        <div
          className={`absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-tech font-bold border shadow-md ${
            confidence > 75
              ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
              : confidence > 40
              ? 'bg-amber-950 text-amber-400 border-amber-500/40'
              : 'bg-rose-950 text-rose-400 border-rose-500/40'
          }`}
        >
          {confidence.toFixed(0)}%
        </div>

        {/* Pulsing Alert when hint is available */}
        {currentHint && !isOpen && (
          <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-amber-500/80 border border-amber-300 text-black flex items-center justify-center animate-bounce">
            <Lightbulb className="w-3 h-3" />
          </div>
        )}
      </motion.button>
    </div>
  );
};
