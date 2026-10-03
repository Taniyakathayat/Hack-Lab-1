import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FastForward, History, RotateCcw } from 'lucide-react';
import type { DialogueLine } from '../../types/investigation';
import { CHARACTERS } from '../../data/storyData';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../services/sound';

interface DialogueBoxProps {
  dialogues: DialogueLine[];
  onComplete: () => void;
  autoPlay?: boolean;
  className?: string;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogues,
  onComplete,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const currentLine = dialogues[currentIndex];
  const characterProfile = currentLine ? CHARACTERS[currentLine.character] || {
    name: 'SYSTEM TELEMETRY',
    role: 'SOC Log',
    colorAccent: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.4)',
  } : null;

  // Typewriter effect
  useEffect(() => {
    if (!currentLine) return;

    // Trigger associated sound effect
    if (currentLine.soundEffect) {
      if (currentLine.soundEffect === 'alarm') sound.playAlarm();
      else if (currentLine.soundEffect === 'glitch') sound.playGlitch();
      else if (currentLine.soundEffect === 'scan') sound.playScan();
      else if (currentLine.soundEffect === 'unlock') sound.playUnlockSuccess();
      else sound.playBlip(550);
    }

    let index = 0;
    const fullText = currentLine.text;
    setDisplayedText('');
    setIsTyping(true);

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        if (index % 3 === 0) sound.playTypeTick();
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [currentIndex, currentLine]);

  // Advance to next line
  const handleAdvance = useCallback(() => {
    if (isTyping && currentLine) {
      // Fast forward text
      setDisplayedText(currentLine.text);
      setIsTyping(false);
      sound.playBlip(700);
      return;
    }

    if (currentIndex < dialogues.length - 1) {
      sound.playBlip(600);
      setCurrentIndex((prev) => prev + 1);
    } else {
      sound.playBlip(800);
      onComplete();
    }
  }, [isTyping, currentLine, currentIndex, dialogues.length, onComplete]);

  // Replay current line
  const handleReplay = () => {
    if (!currentLine) return;
    setIsTyping(true);
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (index < currentLine.text.length) {
        setDisplayedText(currentLine.text.slice(0, index + 1));
        if (index % 3 === 0) sound.playTypeTick();
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 18);
  };

  // Keyboard shortcut listener (Space, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleAdvance();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAdvance]);

  if (!currentLine || !characterProfile) return null;

  return (
    <div className={`relative w-full max-w-4xl mx-auto select-none ${className}`}>
      {/* Dialogue Bubble Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLine.id}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative glass-panel rounded-2xl p-5 md:p-6 shadow-2xl border flex flex-col md:flex-row items-center md:items-start gap-5 overflow-hidden"
          style={{
            borderColor: `${characterProfile.colorAccent}40`,
            boxShadow: `0 0 35px ${characterProfile.glowColor}`,
          }}
        >
          {/* Ambient Cyber Accent Line */}
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${characterProfile.colorAccent}, transparent)`,
            }}
          />

          {/* Character Avatar Box */}
          <div className="shrink-0 flex flex-col items-center">
            <CharacterAvatar
              characterId={currentLine.character}
              emotion={currentLine.emotion || 'neutral'}
              isSpeaking={isTyping}
              size="lg"
            />
            <div className="mt-2 text-center">
              <span
                className="px-2.5 py-0.5 rounded-full text-[11px] font-cyber font-bold tracking-wider uppercase border"
                style={{
                  color: characterProfile.colorAccent,
                  borderColor: `${characterProfile.colorAccent}50`,
                  backgroundColor: `${characterProfile.colorAccent}15`,
                }}
              >
                {characterProfile.name}
              </span>
              <div className="text-[10px] text-slate-400 font-sans mt-0.5 max-w-[140px] truncate">
                {characterProfile.role}
              </div>
            </div>
          </div>

          {/* Speech Box & Controls */}
          <div className="flex-1 flex flex-col justify-between min-h-[120px] w-full">
            <div>
              {/* Optional Subtext Header */}
              {currentLine.subtext && (
                <div className="text-xs font-tech text-cyan-400/80 mb-2 flex items-center gap-1.5 tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  {currentLine.subtext}
                </div>
              )}

              {/* Typed Dialogue Content */}
              <div className="text-slate-100 font-sans text-base md:text-lg leading-relaxed md:leading-relaxed font-medium">
                {displayedText}
                {isTyping && (
                  <span
                    className="inline-block w-2 h-4 ml-1 align-middle animate-pulse"
                    style={{ backgroundColor: characterProfile.colorAccent }}
                  />
                )}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              {/* History & Replay Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReplay}
                  title="Replay Line"
                  className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Replay</span>
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  title="Dialogue Log"
                  className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all text-xs flex items-center gap-1"
                >
                  <History className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log</span>
                </button>
                <span className="text-[11px] font-tech text-slate-500 ml-1">
                  {currentIndex + 1} / {dialogues.length}
                </span>
              </div>

              {/* Advance Action Button */}
              <button
                onClick={handleAdvance}
                className="group relative px-5 py-2 rounded-xl font-cyber font-bold text-sm tracking-wider text-black flex items-center gap-2 transition-all duration-200 transform active:scale-95 shadow-lg"
                style={{
                  backgroundColor: characterProfile.colorAccent,
                  boxShadow: `0 0 20px ${characterProfile.glowColor}`,
                }}
              >
                <span>
                  {isTyping ? 'SKIP' : currentIndex === dialogues.length - 1 ? 'PROCEED' : 'CONTINUE'}
                </span>
                {isTyping ? (
                  <FastForward className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
                <span className="hidden md:inline-block text-[10px] bg-black/20 text-black px-1.5 py-0.5 rounded ml-1 font-tech">
                  SPACE ↵
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dialogue History Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-2xl max-h-[80vh] rounded-2xl p-6 border border-cyan-500/30 flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-cyber font-bold text-lg text-slate-100">
                    TRANSMISSION TRANSCRIPT LOG
                  </h3>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-cyber text-slate-300"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <div className="overflow-y-auto flex-1 my-4 space-y-3 pr-2">
                {dialogues.slice(0, currentIndex + 1).map((line, idx) => {
                  const prof = CHARACTERS[line.character] || {
                    name: 'SYSTEM',
                    colorAccent: '#00F0FF',
                  };
                  return (
                    <div
                      key={line.id || idx}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-cyber font-bold uppercase"
                          style={{ color: prof.colorAccent }}
                        >
                          {prof.name}
                        </span>
                        {line.subtext && (
                          <span className="text-[10px] font-tech text-slate-500">
                            [{line.subtext}]
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-200 font-sans">{line.text}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
