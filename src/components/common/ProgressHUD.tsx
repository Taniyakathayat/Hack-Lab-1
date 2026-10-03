import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Archive, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Layers, 
  Activity,
  Bot
} from 'lucide-react';
import { sound } from '../../services/sound';
import type { SceneId } from '../../types/investigation';

interface ProgressHUDProps {
  currentSceneIndex: number;
  totalScenes: number;
  currentSceneId: SceneId;
  unlockedEvidenceCount: number;
  totalEvidenceCount: number;
  orionConfidence: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onToggleEvidenceVault: () => void;
  onResetInvestigation: () => void;
  onJumpToScene: (index: number) => void;
}

const SCENE_NAMES = [
  '00. Midnight Alert',
  '01. Team Briefing',
  '02. The Wallet That Lied',
  '03. The AI That Remembered',
  '04. The False Signal',
  '05. The Invisible Signer',
  '06. Attack Reconstruction',
  '07. The Grand Reveal',
];

export const ProgressHUD: React.FC<ProgressHUDProps> = ({
  currentSceneIndex,
  totalScenes,
  unlockedEvidenceCount,
  totalEvidenceCount,
  orionConfidence,
  soundEnabled,
  onToggleSound,
  onToggleEvidenceVault,
  onResetInvestigation,
  onJumpToScene,
}) => {
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);
  const progressPercent = Math.min(100, Math.round((currentSceneIndex / (totalScenes - 1)) * 100));

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/20 px-3 md:px-6 py-2.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Case ID & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-cyber font-bold tracking-wider text-cyan-400">
                  CASE NEX-042
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.2 text-[9px] font-tech font-bold uppercase rounded bg-rose-950/80 text-rose-400 border border-rose-500/40">
                  PRIORITY 0
                </span>
              </div>
              <h1 className="text-xs md:text-sm font-sans font-semibold text-slate-200 tracking-tight hidden sm:block">
                THE GHOST IN THE LEDGER
              </h1>
            </div>
          </div>

          {/* Quick Scene Nav Selector */}
          <div className="relative">
            <button
              onClick={() => setShowNavMenu(!showNavMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-xs font-cyber text-slate-300 transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline font-tech text-cyan-300">
                {SCENE_NAMES[currentSceneIndex]}
              </span>
              <span className="md:hidden font-tech text-cyan-300">
                Ch. {currentSceneIndex}
              </span>
            </button>

            {/* Dropdown Scene Selector */}
            {showNavMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 glass-panel rounded-xl p-2 border border-cyan-500/30 shadow-2xl z-50">
                <div className="text-[10px] font-tech text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Select Chapter
                </div>
                {SCENE_NAMES.map((name, idx) => (
                  <button
                    key={name}
                    onClick={() => {
                      onJumpToScene(idx);
                      setShowNavMenu(false);
                      sound.playBlip(650);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-cyber transition-all flex items-center justify-between ${
                      idx === currentSceneIndex
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{name}</span>
                    {idx < currentSceneIndex && (
                      <span className="text-[10px] text-emerald-400 font-tech">✓ Done</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: ORION AI Confidence Metric */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1 rounded-xl bg-slate-950/70 border border-sky-500/30">
          <Bot className="w-4 h-4 text-sky-400" />
          <div className="text-xs">
            <span className="text-slate-400 font-sans mr-1.5">ORION Confidence:</span>
            <span
              className={`font-tech font-bold ${
                orionConfidence > 75
                  ? 'text-emerald-400'
                  : orionConfidence > 40
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {orionConfidence.toFixed(1)}%
            </span>
          </div>
          <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-cyan-400"
              animate={{ width: `${orionConfidence}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Right: Progress, Evidence Vault & Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Investigation Progress Bar */}
          <div className="hidden sm:flex flex-col items-end mr-1">
            <div className="flex items-center gap-1.5 text-[11px] font-tech text-slate-300">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>Progress: {progressPercent}%</span>
            </div>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Evidence Vault Trigger */}
          <button
            onClick={() => {
              onToggleEvidenceVault();
              sound.playScan();
            }}
            className="relative px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950 to-indigo-950 hover:from-cyan-900 hover:to-indigo-900 border border-cyan-400/40 text-xs font-cyber font-bold text-cyan-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all group"
          >
            <Archive className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
            <span className="hidden md:inline">EVIDENCE VAULT</span>
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-black text-[10px] font-tech font-extrabold">
              {unlockedEvidenceCount}/{totalEvidenceCount}
            </span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-cyan-300 transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Reset Investigation */}
          <button
            onClick={() => {
              if (window.confirm('Reset investigation progress to Prologue?')) {
                onResetInvestigation();
                sound.playGlitch();
              }
            }}
            title="Reset Case"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-950/60 border border-slate-700/70 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
