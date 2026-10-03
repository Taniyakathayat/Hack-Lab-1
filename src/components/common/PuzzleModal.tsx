import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import type { PuzzleDefinition } from '../../types/investigation';
import { sound } from '../../services/sound';

interface PuzzleModalProps {
  puzzle: PuzzleDefinition;
  isOpen: boolean;
  onSuccess: () => void;
  onClose?: () => void;
}

export const PuzzleModal: React.FC<PuzzleModalProps> = ({
  puzzle,
  isOpen,
  onSuccess,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const selectedOption = puzzle.options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSelect = (optionId: string) => {
    if (hasSubmitted && isCorrect) return; // Locked on success
    setSelectedOptionId(optionId);
    setHasSubmitted(false);
    sound.playBlip(620);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    setHasSubmitted(true);
    if (selectedOption.isCorrect) {
      sound.playUnlockSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F0FF', '#38BDF8', '#10B981', '#C084FC'],
        });
      } catch {}
    } else {
      sound.playGlitch();
    }
  };

  const handleProceed = () => {
    sound.playBlip(800);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 15 }}
        className="glass-panel w-full max-w-2xl rounded-3xl p-6 md:p-8 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Puzzle Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                FORENSIC REASONING CHALLENGE
              </span>
              <h2 className="font-cyber font-bold text-lg md:text-xl text-slate-100 mt-1">
                {puzzle.title}
              </h2>
              <p className="text-xs text-slate-400 font-sans">{puzzle.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="my-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-200 font-sans text-sm md:text-base leading-relaxed font-medium">
          {puzzle.question}
        </div>

        {/* Option Cards */}
        <div className="space-y-3 mb-5 max-h-[38vh] overflow-y-auto pr-1">
          {puzzle.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const showSuccessStyle = hasSubmitted && isSelected && option.isCorrect;
            const showErrorStyle = hasSubmitted && isSelected && !option.isCorrect;

            return (
              <motion.button
                key={option.id}
                whileHover={!hasSubmitted || !isCorrect ? { scale: 1.01 } : {}}
                whileTap={!hasSubmitted || !isCorrect ? { scale: 0.99 } : {}}
                onClick={() => handleSelect(option.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  showSuccessStyle
                    ? 'bg-emerald-950/60 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                    : showErrorStyle
                    ? 'bg-rose-950/60 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                    : isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-tech text-xs font-bold shrink-0 mt-0.5 border ${
                    showSuccessStyle
                      ? 'bg-emerald-500 text-black border-emerald-400'
                      : showErrorStyle
                      ? 'bg-rose-500 text-white border-rose-400'
                      : isSelected
                      ? 'bg-cyan-400 text-black border-cyan-300'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>

                <div className="flex-1 font-sans text-xs md:text-sm leading-snug">
                  {option.text}
                </div>

                {showSuccessStyle && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {showErrorStyle && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ORION Feedback Box */}
        <AnimatePresence>
          {hasSubmitted && selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 rounded-2xl mb-4 border flex items-start gap-3 ${
                isCorrect
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
              }`}
            >
              <Bot className={`w-5 h-5 shrink-0 mt-0.5 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`} />
              <div className="text-xs font-sans">
                <span className="font-cyber font-bold uppercase tracking-wider block mb-0.5">
                  {isCorrect ? 'ORION CONFIRMS VALID HYPOTHESIS:' : 'ORION TELEMETRY WARNING:'}
                </span>
                {isCorrect
                  ? selectedOption.orionReactionRight || selectedOption.explanation
                  : selectedOption.orionReactionWrong || selectedOption.explanation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint Box */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 font-sans flex items-start gap-2"
            >
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-cyber font-bold text-amber-300 mr-1">INVESTIGATION HINT:</span>
                {puzzle.hint}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setShowHint(!showHint);
              sound.playBlip(550);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-cyber text-slate-300 flex items-center gap-1.5 transition-all"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{showHint ? 'Hide Hint' : 'Request Clue'}</span>
          </button>

          {hasSubmitted && isCorrect ? (
            <button
              onClick={handleProceed}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all animate-pulse"
            >
              <Sparkles className="w-4 h-4" />
              <span>UNLOCK EVIDENCE & PROCEED</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId}
              className={`px-6 py-2.5 rounded-xl font-cyber font-bold text-sm tracking-wider flex items-center gap-2 transition-all ${
                selectedOptionId
                  ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>SUBMIT DEDUCTION</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
