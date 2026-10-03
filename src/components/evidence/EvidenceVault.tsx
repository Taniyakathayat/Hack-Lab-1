import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Archive, 
  X, 
  ShieldCheck, 
  Cpu, 
  Network, 
  Key, 
  Share2, 
  Lock, 
  FileSearch,
  CheckCircle2
} from 'lucide-react';
import type { EvidenceItem } from '../../types/investigation';
import { EVIDENCE_LIST } from '../../data/storyData';
import { sound } from '../../services/sound';

interface EvidenceVaultProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedEvidenceIds: string[];
}

export const EvidenceVault: React.FC<EvidenceVaultProps> = ({
  isOpen,
  onClose,
  unlockedEvidenceIds,
}) => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case 'blockchain':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'ai':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'api':
        return <Network className="w-5 h-5 text-pink-400" />;
      case 'auth':
        return <Key className="w-5 h-5 text-amber-400" />;
      case 'nexus':
        return <Share2 className="w-5 h-5 text-cyan-400" />;
      default:
        return <FileSearch className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full glass-panel border-l border-cyan-500/30 p-6 flex flex-col overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
                  <Archive className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h2 className="font-cyber font-bold text-base text-slate-100 tracking-wider">
                    EVIDENCE VAULT
                  </h2>
                  <p className="text-[11px] font-tech text-cyan-400">
                    {unlockedEvidenceIds.length} OF {EVIDENCE_LIST.length} CLUES RECOVERED
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Evidence List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {EVIDENCE_LIST.map((item) => {
                const isUnlocked = unlockedEvidenceIds.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    whileHover={isUnlocked ? { scale: 1.02 } : {}}
                    onClick={() => {
                      if (isUnlocked) {
                        setSelectedEvidence(item);
                        sound.playScan();
                      } else {
                        sound.playGlitch();
                      }
                    }}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                      isUnlocked
                        ? 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.08)]'
                        : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                        {isUnlocked ? (
                          getCategoryIcon(item.iconType)
                        ) : (
                          <Lock className="w-5 h-5 text-slate-600" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-tech font-bold px-2 py-0.5 rounded ${
                              isUnlocked
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-900 text-slate-500'
                            }`}
                          >
                            {item.code}
                          </span>
                          {isUnlocked && (
                            <span className="text-[10px] font-tech text-slate-400">
                              {item.timestamp}
                            </span>
                          )}
                        </div>

                        <h3 className="font-cyber font-bold text-sm text-slate-200 mt-1 truncate">
                          {isUnlocked ? item.title : 'ENCRYPTED FORENSIC CLUE'}
                        </h3>

                        <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-2">
                          {isUnlocked
                            ? item.summary
                            : 'Solve the investigation challenge in this Sub-Lab to decrypt this evidence record.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Status */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-tech text-slate-400">
              <span>NEXORA FORENSIC VAULT</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SECURE HSM
              </span>
            </div>
          </motion.div>

          {/* Detailed Evidence Inspection Modal */}
          <AnimatePresence>
            {selectedEvidence && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-cyan-400/40 shadow-[0_0_40px_rgba(0,240,255,0.25)] flex flex-col"
                >
                  <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-400/40">
                        {getCategoryIcon(selectedEvidence.iconType)}
                      </div>
                      <div>
                        <span className="text-xs font-tech font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                          {selectedEvidence.code}
                        </span>
                        <h3 className="font-cyber font-bold text-lg text-slate-100 mt-1">
                          {selectedEvidence.title}
                        </h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedEvidence(null)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-[10px] font-tech text-cyan-400 uppercase">
                        Executive Summary
                      </div>
                      <p className="text-sm text-slate-200 font-sans mt-1 leading-relaxed">
                        {selectedEvidence.summary}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                      <div className="text-[10px] font-tech text-cyan-400 uppercase mb-2">
                        Forensic Telemetry
                      </div>
                      {selectedEvidence.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1 border-b border-slate-900 last:border-0"
                        >
                          <span className="text-slate-400 font-sans">{detail.label}:</span>
                          <span className="font-tech text-slate-200 font-medium sm:text-right mt-0.5 sm:mt-0">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEvidence(null)}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cyber font-bold text-sm tracking-wider transition-all"
                  >
                    RETURN TO INVESTIGATION
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};
