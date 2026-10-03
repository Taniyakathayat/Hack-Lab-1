import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  Network, 
  Key, 
  ShieldAlert, 
  Send, 
  CheckCircle 
} from 'lucide-react';

import { DialogueBox } from '../dialogue/DialogueBox';
import { SCENE_SCRIPTS, PUZZLES } from '../../data/storyData';
import { PuzzleModal } from '../common/PuzzleModal';
import { sound } from '../../services/sound';

interface Scene4SubLab3APIProps {
  onUnlockEvidence: (evidenceId: string) => void;
  onComplete: () => void;
}

export const Scene4SubLab3API: React.FC<Scene4SubLab3APIProps> = ({
  onUnlockEvidence,
  onComplete,
}) => {
  const [hasCompletedDialogue, setHasCompletedDialogue] = useState<boolean>(false);
  const [packetStep, setPacketStep] = useState<number>(1);
  const [isDisguised, setIsDisguised] = useState<boolean>(false);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState<boolean>(false);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean>(false);

  const packetHops = [
    {
      id: 1,
      name: '1. Unknown Actor',
      ip: '194.26.29.114 (Tor Exit Node)',
      action: 'Constructs forged NOVA-INTEL-FEED payload with forged KYC whitelist',
      stage: 'INGRESS_ORIGIN'
    },
    {
      id: 2,
      name: '2. Gateway INTEL-GW-04',
      ip: 'api.intel.nexora.internal:8443',
      action: 'Authenticates via Token: INTEL-INGESTOR-02 (TLS 1.3)',
      stage: 'API_GATEWAY'
    },
    {
      id: 3,
      name: '3. Record NIF-2038 Ingestion',
      ip: 'Database Cluster: INTEL_RECORDS_V3',
      action: 'Excessive Privilege: Modifies reputation tag directly to LOW_RISK_WHITELIST',
      stage: 'PRIVILEGE_ESCALATION'
    },
    {
      id: 4,
      name: '4. Context Builder Ingestion',
      ip: 'orion-rag-builder.cluster.local',
      action: 'Pulls NIF-2038 into prompt template without digital signature verification',
      stage: 'PROMPT_COMPILATION'
    },
    {
      id: 5,
      name: '5. ORION Inference Engine',
      ip: 'orion-engine-node-07',
      action: 'Reads "TRUSTED PARTNER" context → Concludes 99.2% approval',
      stage: 'DECISION_GENERATED'
    }
  ];

  const handleAdvancePacket = () => {
    sound.playScan();
    setPacketStep((prev) => {
      const next = (prev % packetHops.length) + 1;
      if (next === 3) {
        setIsDisguised(true);
      }
      return next;
    });
  };

  const handlePuzzleSuccess = () => {
    setIsPuzzleSolved(true);
    setIsPuzzleOpen(false);
    onUnlockEvidence('CYBER-E03');
  };

  const currentHop = packetHops.find((h) => h.id === packetStep);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center min-h-[82vh] py-6 px-4 select-none">
      {/* Chapter Subheader */}
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-pink-500/20">
        <div>
          <span className="text-[10px] font-tech text-pink-400 uppercase tracking-widest">
            SUB-LAB 03 // THREAT INTEL & API PROVENANCE
          </span>
          <h2 className="text-xl md:text-3xl font-display font-bold text-slate-100">
            THE FALSE SIGNAL
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-tech text-pink-400">INTEL-GW-04 // TLS 1.3</span>
          <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping" />
        </div>
      </div>

      {/* Opening Dialogue Sequence */}
      {!hasCompletedDialogue ? (
        <div className="w-full my-auto">
          <DialogueBox
            dialogues={SCENE_SCRIPTS.sublab3_intro}
            onComplete={() => setHasCompletedDialogue(true)}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {/* Service Token Privilege Inspector */}
          <div className="glass-panel rounded-3xl p-6 border border-pink-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-pink-400" />
                <h3 className="font-cyber font-bold text-sm text-slate-200">
                  SERVICE IDENTITY AUDIT: INTEL-INGESTOR-02
                </h3>
              </div>
              <span className="text-xs font-tech text-pink-400 font-bold">
                GATEWAY: INTEL-GW-04
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              {/* Expected Permissions */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-[10px] font-tech text-slate-400 uppercase">
                  EXPECTED LEAST-PRIVILEGE SCOPE:
                </div>
                <div className="flex items-center gap-2 text-xs font-tech text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>intel:records:create (Append New Intelligence)</span>
                </div>
              </div>

              {/* Actual Permissions (Privilege Escalation) */}
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 space-y-2 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                <div className="text-[10px] font-tech text-rose-300 uppercase flex items-center justify-between">
                  <span>ACTUAL GRANTED IAM SCOPES:</span>
                  <span className="text-rose-400 font-bold">⚠️ CRITICAL OVER-PRIVILEGE</span>
                </div>
                <div className="space-y-1 text-xs font-tech">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>intel:records:create</span>
                  </div>
                  <div className="flex items-center gap-2 text-rose-300 font-bold p-1 rounded bg-rose-900/40 border border-rose-500/40 animate-pulse">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>reputation:wallet:modify_score (Direct Reputation Write!)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Packet Trail Stepper */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-pink-400/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-pink-400" />
                <h3 className="font-cyber font-bold text-sm text-slate-100">
                  LIVE API DATA PACKET TRACER
                </h3>
              </div>
              <button
                onClick={handleAdvancePacket}
                className="px-4 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-black font-cyber font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>STEP PACKET HOP [{packetStep}/5]</span>
              </button>
            </div>

            {/* Visual Hop Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-4">
              {packetHops.map((h) => {
                const isActive = packetStep === h.id;
                const isPassed = packetStep > h.id;

                return (
                  <div
                    key={h.id}
                    onClick={() => {
                      setPacketStep(h.id);
                      sound.playBlip(600);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-pink-950/80 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                        : isPassed
                        ? 'bg-slate-900/90 border-slate-700 text-slate-300'
                        : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="text-[10px] font-tech text-pink-400 uppercase">
                      HOP 0{h.id}
                    </div>
                    <div className="font-cyber font-bold text-xs text-slate-100 truncate mt-0.5">
                      {h.name.split('. ')[1]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Hop Telemetry Detail & Disguised Packet Humor Box */}
            {currentHop && (
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-xs font-sans">
                  <div className="font-tech text-pink-400 font-bold">{currentHop.name}</div>
                  <div className="text-slate-300 font-tech">NODE / IP: {currentHop.ip}</div>
                  <div className="text-slate-200 mt-1">{currentHop.action}</div>
                </div>

                {/* Funny Mustache Disguise Widget for Fake Packet */}
                <div className="shrink-0 p-3 rounded-2xl bg-slate-900 border border-pink-500/30 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-pink-400 flex items-center justify-center text-pink-400">
                      📄
                    </div>
                    {isDisguised && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 px-1.5 py-0.2 rounded bg-amber-400 text-black text-[9px] font-tech font-black"
                      >
                        🥸 100% TRUSTED
                      </motion.div>
                    )}
                  </div>
                  <div className="text-[11px] font-tech">
                    <span className="text-slate-400 block">PACKET ID:</span>
                    <span className="text-pink-300 font-bold">NIF-2038.payload</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="font-cyber font-bold text-sm text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                {isPuzzleSolved ? 'API EXPLOIT EVIDENCE DECRYPTED' : 'READY FOR API PROVENANCE CHALLENGE'}
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {isPuzzleSolved
                  ? 'Evidence record CYBER-E03 added to the Evidence Vault.'
                  : 'Identify which IAM permission flaw enabled the context injection.'}
              </p>
            </div>

            {isPuzzleSolved ? (
              <button
                onClick={() => {
                  sound.playBlip(900);
                  onComplete();
                }}
                className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 text-black font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all cursor-pointer"
              >
                <span>PROCEED TO SUB-LAB 04</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playBlip(700);
                  setIsPuzzleOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 text-black font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>SOLVE SUB-LAB 03 PUZZLE</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Puzzle Modal */}
      <PuzzleModal
        puzzle={PUZZLES.puzzle3}
        isOpen={isPuzzleOpen}
        onSuccess={handlePuzzleSuccess}
      />
    </div>
  );
};
