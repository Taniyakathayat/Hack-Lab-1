import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  Flame, 
  Network, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

import { DialogueBox } from '../dialogue/DialogueBox';
import { SCENE_SCRIPTS, ATTACK_GRAPH_NODES } from '../../data/storyData';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../services/sound';

interface Scene6FinalReconstructionProps {
  onUnlockEvidence: (evidenceId: string) => void;
  onComplete: () => void;
}

export const Scene6FinalReconstruction: React.FC<Scene6FinalReconstructionProps> = ({
  onUnlockEvidence,
  onComplete,
}) => {
  const [hasCompletedDialogue, setHasCompletedDialogue] = useState<boolean>(false);
  const [placedNodeIds, setPlacedNodeIds] = useState<string[]>([]);
  const [availableNodePool, setAvailableNodePool] = useState<typeof ATTACK_GRAPH_NODES>(() =>
    [...ATTACK_GRAPH_NODES].sort(() => Math.random() - 0.5)
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [wrongShakeId, setWrongShakeId] = useState<string | null>(null);

  const nextExpectedIndex = placedNodeIds.length;
  const nextExpectedNode = ATTACK_GRAPH_NODES[nextExpectedIndex];

  const handleSelectPoolNode = (node: typeof ATTACK_GRAPH_NODES[0]) => {
    if (isCompleted) return;

    if (node.id === nextExpectedNode?.id) {
      sound.playScan();
      const updatedPlaced = [...placedNodeIds, node.id];
      setPlacedNodeIds(updatedPlaced);
      setAvailableNodePool(availableNodePool.filter((n) => n.id !== node.id));

      if (updatedPlaced.length === ATTACK_GRAPH_NODES.length) {
        setIsCompleted(true);
        sound.playUnlockSuccess();
        onUnlockEvidence('FINAL-E05');
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#00F0FF', '#38BDF8', '#F59E0B', '#EC4899', '#A855F7'],
          });
        } catch {}
      }
    } else {
      sound.playGlitch();
      setWrongShakeId(node.id);
      setTimeout(() => setWrongShakeId(null), 600);
    }
  };

  const handleResetBoard = () => {
    sound.playBlip(500);
    setPlacedNodeIds([]);
    setAvailableNodePool([...ATTACK_GRAPH_NODES].sort(() => Math.random() - 0.5));
    setIsCompleted(false);
  };

  const handleAutoAssemble = () => {
    sound.playUnlockSuccess();
    setPlacedNodeIds(ATTACK_GRAPH_NODES.map((n) => n.id));
    setAvailableNodePool([]);
    setIsCompleted(true);
    onUnlockEvidence('FINAL-E05');
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center min-h-[82vh] py-6 px-4 select-none">
      {/* Chapter Subheader */}
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20">
        <div>
          <span className="text-[10px] font-tech text-cyan-400 uppercase tracking-widest">
            SUB-LAB 05 // HOLOGRAPHIC WAR BOARD & RECONSTRUCTION
          </span>
          <h2 className="text-xl md:text-3xl font-display font-bold text-slate-100">
            THE GHOST IN THE LEDGER
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-tech text-cyan-400">03:02 AM // WAR ROOM</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
      </div>

      {/* Opening Dialogue Sequence */}
      {!hasCompletedDialogue ? (
        <div className="w-full my-auto">
          <DialogueBox
            dialogues={SCENE_SCRIPTS.sublab5_reconstruction}
            onComplete={() => setHasCompletedDialogue(true)}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {/* Team Avatars Surrounding the Board */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2">
              <CharacterAvatar characterId="lakshay" emotion="confident" size="sm" />
              <div className="hidden sm:block text-left">
                <span className="text-[11px] font-cyber text-cyan-400 font-bold block">Lakshay</span>
                <span className="text-[9px] text-slate-400 font-sans">“Sequence the root cause.”</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CharacterAvatar characterId="shivam" emotion="thinking" size="sm" />
              <div className="hidden sm:block text-left">
                <span className="text-[11px] font-cyber text-emerald-400 font-bold block">Shivam</span>
                <span className="text-[9px] text-slate-400 font-sans">“Follow the token hops.”</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CharacterAvatar characterId="shanu" emotion="confident" size="sm" />
              <div className="hidden sm:block text-left">
                <span className="text-[11px] font-cyber text-purple-400 font-bold block">Shanu</span>
                <span className="text-[9px] text-slate-400 font-sans">“Trace context poison.”</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CharacterAvatar characterId="mehak" emotion="confident" size="sm" />
              <div className="hidden sm:block text-left">
                <span className="text-[11px] font-cyber text-pink-400 font-bold block">Mehak</span>
                <span className="text-[9px] text-slate-400 font-sans">“Check API tokens.”</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CharacterAvatar characterId="orion" emotion={isCompleted ? 'confident' : 'thinking'} size="sm" />
              <div className="hidden sm:block text-left">
                <span className="text-[11px] font-cyber text-sky-400 font-bold block">ORION</span>
                <span className="text-[9px] text-slate-400 font-sans">“Rooting for you!”</span>
              </div>
            </div>
          </div>

          {/* Central Holographic War Board */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-cyan-400/40 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-cyan-400" />
                <h3 className="font-cyber font-bold text-sm md:text-base text-slate-100">
                  HOLOGRAPHIC ATTACK GRAPH RECONSTRUCTION
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-tech text-cyan-300">
                  {placedNodeIds.length} OF {ATTACK_GRAPH_NODES.length} NODES LINKED
                </span>
                <button
                  onClick={handleResetBoard}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-cyber text-slate-400 hover:text-slate-200 border border-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleAutoAssemble}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-[11px] font-cyber text-cyan-300 border border-cyan-500/30"
                >
                  Auto-Link
                </button>
              </div>
            </div>

            {/* Attack Chain Assembly Area */}
            <div className="my-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 min-h-[160px] flex flex-wrap items-center gap-2 relative">
              {placedNodeIds.length === 0 && (
                <div className="w-full text-center text-slate-500 font-tech text-xs py-8">
                  ← Click nodes from the forensic pool below in chronological attack order to link the chain →
                </div>
              )}

              {placedNodeIds.map((nodeId, idx) => {
                const node = ATTACK_GRAPH_NODES.find((n) => n.id === nodeId);
                if (!node) return null;

                return (
                  <React.Fragment key={node.id}>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-400/50 text-cyan-200 font-cyber font-bold text-xs shadow-[0_0_15px_rgba(0,240,255,0.25)] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{node.label}</span>
                    </motion.div>
                    {idx < placedNodeIds.length - 1 && (
                      <span className="text-cyan-400 font-bold text-xs">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Next Expected Hint Bar */}
            {!isCompleted && nextExpectedNode && (
              <div className="mb-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-tech text-cyan-300 flex items-center justify-between">
                <span>NEXT STEP IN ATTACK VECTOR:</span>
                <span className="font-cyber font-bold uppercase">{nextExpectedNode.category}</span>
              </div>
            )}

            {/* Available Forensic Node Pool */}
            {!isCompleted && (
              <div>
                <div className="text-xs font-tech text-slate-400 mb-2 uppercase">
                  UNLINKED FORENSIC PIECES (CLICK TO PLACE):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {availableNodePool.map((node) => (
                    <motion.button
                      key={node.id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleSelectPoolNode(node)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        wrongShakeId === node.id
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200 animate-bounce'
                          : 'bg-slate-900/80 border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-200'
                      }`}
                    >
                      <div className="text-[9px] font-tech text-slate-400 uppercase truncate">
                        {node.category}
                      </div>
                      <div className="font-cyber font-bold text-xs truncate mt-0.5">
                        {node.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="font-cyber font-bold text-sm text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {isCompleted ? 'ATTACK CHAIN 100% RECONSTRUCTED' : 'AWAITING FULL ATTACK GRAPH LINKAGE'}
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {isCompleted
                  ? 'All 14 forensic nodes mapped across Web3, AI, and Cybersecurity.'
                  : 'Link each component from initial threat actor to cross-chain dispersion.'}
              </p>
            </div>

            {isCompleted ? (
              <button
                onClick={() => {
                  sound.playUnlockSuccess();
                  onComplete();
                }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 text-black font-cyber font-extrabold text-sm tracking-widest flex items-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105 cursor-pointer"
              >
                <Flame className="w-4 h-4" />
                <span>REVEAL THE GHOST IN THE LEDGER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-xs font-tech text-slate-500 flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                <span>Complete graph to trigger final reveal</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
