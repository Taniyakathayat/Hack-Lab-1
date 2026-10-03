import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  Radio 
} from 'lucide-react';

import { DialogueBox } from '../dialogue/DialogueBox';
import { SCENE_SCRIPTS, PUZZLES } from '../../data/storyData';
import { PuzzleModal } from '../common/PuzzleModal';
import { sound } from '../../services/sound';

interface Scene2SubLab1WalletProps {
  onUnlockEvidence: (evidenceId: string) => void;
  onComplete: () => void;
}

export const Scene2SubLab1Wallet: React.FC<Scene2SubLab1WalletProps> = ({
  onUnlockEvidence,
  onComplete,
}) => {
  const [hasCompletedDialogue, setHasCompletedDialogue] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node_wallet');
  const [inspectedNodes, setInspectedNodes] = useState<string[]>([]);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState<boolean>(false);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean>(false);

  const nodes = [
    {
      id: 'node_treasury',
      title: 'Nexora Treasury Vault',
      type: 'Source',
      value: '82,400 NXR Outflow',
      status: 'VERIFIED_NEXORA',
      statusColor: 'text-cyan-400',
      details: [
        'Contract: 0x11A0...33F1 (Nexora Multi-Sig Vault)',
        'Signer: Automated Signer (Key Profile V2)',
        'Timestamp: Block #19844201',
        'Human Override: NOT REQUESTED'
      ]
    },
    {
      id: 'node_wallet',
      title: '0x7C41...9B2D',
      type: 'Destination Target',
      value: '82,400 NXR Inflow',
      status: 'STATUS: UNKNOWN (ON-CHAIN)',
      statusColor: 'text-rose-400',
      details: [
        'On-Chain Address: 0x7C4148b37A20...9B2D',
        'Account Age: 3 Hours Old (Freshly Deployed)',
        'Nexora Relationship: NONE / UNKNOWN',
        'Prior AI Label: "LOW RISK" in ORION-DEC-7741'
      ],
      isSuspicious: true
    },
    {
      id: 'node_bridge',
      title: 'OmniChain Bridge Adapter',
      type: 'Cross-Chain Router',
      value: 'Token Split Interception',
      status: 'BRIDGE HOP DETECTED',
      statusColor: 'text-amber-400',
      details: [
        'Bridge Protocol: OmniLayer L2 Liquidity Router',
        'Method: depositAndBridgeFunds()',
        'Splitting Output: 50% to Wallet-A, 50% to Wallet-B',
        'Destination Chains: Arbitrum & Base'
      ]
    },
    {
      id: 'node_downstream',
      title: 'Wallet-A / Wallet-B',
      type: 'Downstream Cashout',
      value: '41,200 NXR each',
      status: 'DISPERSAL COMPLETE',
      statusColor: 'text-purple-400',
      details: [
        'Wallet-A: 0x992B...314F (Arbitrum DEX swap)',
        'Wallet-B: 0x48D1...77A2 (Base Privacy Mixer)',
        'Tornado Cash interaction: Flagged',
        'Speed of dispersal: Under 45 seconds'
      ]
    }
  ];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    sound.playScan();
    if (!inspectedNodes.includes(nodeId)) {
      setInspectedNodes([...inspectedNodes, nodeId]);
    }
  };

  const handlePuzzleSuccess = () => {
    setIsPuzzleSolved(true);
    setIsPuzzleOpen(false);
    onUnlockEvidence('WEB3-E01');
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center min-h-[82vh] py-6 px-4 select-none">
      {/* Chapter Subheader */}
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20">
        <div>
          <span className="text-[10px] font-tech text-emerald-400 uppercase tracking-widest">
            SUB-LAB 01 // WEB3 FORENSICS & BLOCKCHAIN AUDIT
          </span>
          <h2 className="text-xl md:text-3xl font-display font-bold text-slate-100">
            THE WALLET THAT LIED
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-tech text-slate-400">TX-NEX-7741</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Opening Dialogue Sequence */}
      {!hasCompletedDialogue ? (
        <div className="w-full my-auto">
          <DialogueBox
            dialogues={SCENE_SCRIPTS.sublab1_intro}
            onComplete={() => setHasCompletedDialogue(true)}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {/* Interactive Blockchain Ledger Explorer Flow */}
          <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="font-cyber font-bold text-sm text-slate-200">
                  ON-CHAIN TRANSACTION FLOW EXPLORER
                </h3>
              </div>
              <span className="text-xs font-tech text-slate-400">
                Click nodes to inspect cryptographic metadata
              </span>
            </div>

            {/* Nodes Grid / Flow Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {nodes.map((n, idx) => {
                const isSelected = selectedNodeId === n.id;

                return (
                  <motion.div
                    key={n.id}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => handleNodeClick(n.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                      isSelected
                        ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-tech text-slate-400">HOP #{idx + 1}</span>
                      <span className={`text-[9px] font-tech font-bold uppercase ${n.statusColor}`}>
                        {n.status}
                      </span>
                    </div>

                    <h4 className="font-cyber font-bold text-sm text-slate-100 truncate">
                      {n.title}
                    </h4>
                    <div className="text-xs font-tech text-cyan-300 mt-1">{n.value}</div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-tech text-slate-400">
                      <span>{n.type}</span>
                      <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                        {isSelected ? 'ACTIVE' : 'INSPECT'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Selected Node Inspection Drawer */}
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel-glow rounded-3xl p-5 border border-cyan-400/40"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span className="font-cyber font-bold text-sm text-slate-100">
                    FORENSIC METADATA: {selectedNode.title}
                  </span>
                </div>
                <span className={`text-xs font-tech font-bold ${selectedNode.statusColor}`}>
                  {selectedNode.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-3">
                {selectedNode.details.map((detail, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[10px] font-tech text-cyan-400 uppercase">LOG #{idx + 1}</div>
                    <div className="text-xs font-tech text-slate-200 mt-1">{detail}</div>
                  </div>
                ))}
              </div>

              {selectedNode.isSuspicious && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 font-sans flex items-center gap-2 mt-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    <strong>CONTRADICTION DETECTED:</strong> On-chain status is UNKNOWN (3 hours old), yet AI Decision ORION-DEC-7741 labelled it "LOW RISK / TRUSTED" prior to transfer!
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Action Footer: Challenge Puzzle or Proceed */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="font-cyber font-bold text-sm text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {isPuzzleSolved ? 'WEB3 EVIDENCE DECRYPTED' : 'READY FOR INVESTIGATIVE DEDUCTION'}
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {isPuzzleSolved
                  ? 'Evidence record WEB3-E01 added to the Evidence Vault.'
                  : 'Analyse the contradiction between on-chain blockchain ground truth and AI labels.'}
              </p>
            </div>

            {isPuzzleSolved ? (
              <button
                onClick={() => {
                  sound.playBlip(900);
                  onComplete();
                }}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
              >
                <span>PROCEED TO SUB-LAB 02</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playBlip(700);
                  setIsPuzzleOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-black" />
                <span>SOLVE SUB-LAB 01 PUZZLE</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Puzzle Modal */}
      <PuzzleModal
        puzzle={PUZZLES.puzzle1}
        isOpen={isPuzzleOpen}
        onSuccess={handlePuzzleSuccess}
      />
    </div>
  );
};
