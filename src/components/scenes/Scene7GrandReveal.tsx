import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  RotateCcw, 
  Cpu, 
  Network, 
  Award 
} from 'lucide-react';

import { DialogueBox } from '../dialogue/DialogueBox';
import { SCENE_SCRIPTS } from '../../data/storyData';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../services/sound';

interface Scene7GrandRevealProps {
  onRestart: () => void;
}

export const Scene7GrandReveal: React.FC<Scene7GrandRevealProps> = ({ onRestart }) => {
  const [hasCompletedDialogue, setHasCompletedDialogue] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'graph' | 'classification' | 'recommendations' | 'certificate'>('graph');

  const attackChainSteps = [
    { label: 'FALSE DATA', desc: 'Unregistered NOVA-INTEL-FEED packet injected into gateway', color: 'text-pink-400', border: 'border-pink-500/40' },
    { label: 'TRUSTED AI CONTEXT', desc: 'Context Builder treats NIF-2038 as verified whitelist data', color: 'text-purple-400', border: 'border-purple-500/40' },
    { label: 'HIGH AI CONFIDENCE', desc: 'ORION 2.0 infers 99.2% statistical confidence based on false premises', color: 'text-sky-400', border: 'border-sky-500/40' },
    { label: 'AUTOMATED AUTHORIZATION', desc: 'Legacy policy ORION-SETTLEMENT-V2 treats score >=95% as executive intent', color: 'text-amber-400', border: 'border-amber-500/40' },
    { label: 'WEB3 TRANSACTION', desc: 'HSM automated signer executes 82,400 NXR on smart contract', color: 'text-emerald-400', border: 'border-emerald-500/40' },
    { label: 'BLOCKCHAIN DISPERSAL', desc: 'Funds bridged across OmniChain adapter to Wallets A & B', color: 'text-cyan-400', border: 'border-cyan-500/40' }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center min-h-[82vh] py-6 px-4 select-none">
      {/* Chapter Subheader */}
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20">
        <div>
          <span className="text-[10px] font-tech text-cyan-400 uppercase tracking-widest">
            CASE CONCLUSION // NEXORA CYBER THREAT DIVISION
          </span>
          <h2 className="text-xl md:text-3xl font-display font-bold text-slate-100">
            THE GHOST IN THE LEDGER
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-tech text-emerald-400">STATUS: CONTAINED</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Opening Dialogue Sequence */}
      {!hasCompletedDialogue ? (
        <div className="w-full my-auto">
          <DialogueBox
            dialogues={SCENE_SCRIPTS.grand_reveal}
            onComplete={() => setHasCompletedDialogue(true)}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {/* Philosophical Epiphany Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-glow rounded-3xl p-6 md:p-8 border border-cyan-400/50 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)]"
          >
            <div className="text-xs font-tech tracking-[0.3em] uppercase text-cyan-400 mb-2">
              CORE FORENSIC REVELATION
            </div>
            <h3 className="text-xl md:text-3xl font-display font-black text-white leading-tight tracking-wide">
              THE ATTACKER NEVER NEEDED TO BREAK THE SYSTEM.
            </h3>
            <div className="text-base md:text-xl font-display font-bold text-cyan-300 mt-2">
              THEY USED THE TRUST ALREADY INSIDE IT.
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('graph');
                sound.playBlip(600);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-cyber font-bold transition-all ${
                activeTab === 'graph'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CHAIN OF TRUST EXPLOIT
            </button>
            <button
              onClick={() => {
                setActiveTab('classification');
                sound.playBlip(600);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-cyber font-bold transition-all ${
                activeTab === 'classification'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              INCIDENT CLASSIFICATION
            </button>
            <button
              onClick={() => {
                setActiveTab('recommendations');
                sound.playBlip(600);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-cyber font-bold transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ZERO-TRUST RECOMMENDATIONS
            </button>
            <button
              onClick={() => {
                setActiveTab('certificate');
                sound.playBlip(600);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-cyber font-bold transition-all ${
                activeTab === 'certificate'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              INVESTIGATOR DOSSIER
            </button>
          </div>

          {/* Tab 1: Chain of Trust Exploit */}
          {activeTab === 'graph' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-3xl p-6 border border-cyan-500/30"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {attackChainSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl bg-slate-950/80 border ${step.border} space-y-2 relative overflow-hidden`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-tech text-slate-400">STAGE 0{idx + 1}</span>
                      <span className={`text-xs font-cyber font-bold ${step.color}`}>{step.label}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Incident Classification */}
          {activeTab === 'classification' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-3xl p-6 border border-cyan-500/30"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-tech text-cyan-400 uppercase">Primary Vector</div>
                  <div className="font-cyber font-bold text-sm text-slate-100">AI Context Manipulation (RAG / Data Poisoning)</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-tech text-cyan-400 uppercase">Secondary Vectors</div>
                  <div className="font-cyber font-bold text-sm text-slate-100">Threat Intel Abuse, API Privilege Escalation, Automated Web3 Signing</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-tech text-cyan-400 uppercase">Affected Domains</div>
                  <div className="font-cyber font-bold text-sm text-slate-100">AI Security × API Security × Web3 Security × On-Chain Ledgers</div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-1">
                  <div className="text-[10px] font-tech text-rose-300 uppercase">Campaign Designation</div>
                  <div className="font-cyber font-bold text-sm text-rose-200">ORION-NEXUS // ACTIVE GLOBALLY (14 Wallets, 4 Networks)</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Zero-Trust Recommendations */}
          {activeTab === 'recommendations' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-3xl p-6 border border-cyan-500/30 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-cyber font-bold text-sm">
                  <Cpu className="w-4 h-4" /> AI SECURITY
                </div>
                <ul className="text-xs text-slate-300 font-sans space-y-1.5 list-disc pl-4">
                  <li>Input & data provenance verification.</li>
                  <li>Cryptographic signature check on all context feeds.</li>
                  <li>AI as statistical recommendation, NEVER executive authority.</li>
                  <li>Confidence calibration guards against prompt poisoning.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-cyber font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" /> WEB3 & BLOCKCHAIN
                </div>
                <ul className="text-xs text-slate-300 font-sans space-y-1.5 list-disc pl-4">
                  <li>Mandatory human multi-sig for treasury transfers.</li>
                  <li>Strict on-chain destination wallet allowlisting.</li>
                  <li>Cross-chain bridge rate-limiting and anomaly detection.</li>
                  <li>Smart contract time-lock delays for non-routine funds.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/40 space-y-2">
                <div className="flex items-center gap-2 text-pink-400 font-cyber font-bold text-sm">
                  <Network className="w-4 h-4" /> CYBERSECURITY & IAM
                </div>
                <ul className="text-xs text-slate-300 font-sans space-y-1.5 list-disc pl-4">
                  <li>Enforce absolute Principle of Least Privilege on API tokens.</li>
                  <li>Isolate ingestion permissions from reputation write permissions.</li>
                  <li>Zero-Trust validation of all third-party threat intelligence.</li>
                  <li>Continuous behavioral monitoring of service identities.</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Certificate / Case Dossier */}
          {activeTab === 'certificate' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel-glow rounded-3xl p-8 border border-cyan-400/50 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-tech text-cyan-400 uppercase tracking-widest">
                  NEXORA CYBER INTELLIGENCE ACADEMY
                </span>
                <h3 className="text-2xl font-display font-black text-white mt-1">
                  CASE NEX-042 FORENSIC CLEARANCE
                </h3>
                <p className="text-xs text-slate-300 font-sans max-w-md mx-auto mt-1">
                  Awarded to Lead Investigator <strong>Lakshay</strong> for successfully uncovering the chain of trust exploitation across AI, Web3, and API architecture.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-tech text-emerald-300">
                <ShieldCheck className="w-4 h-4" /> LAB 01 — THE GHOST IN THE LEDGER: 100% COMPLETED
              </div>
            </motion.div>
          )}

          {/* Cliffhanger Epilogue Banner */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CharacterAvatar characterId="orion" emotion="confused" size="sm" />
              <div>
                <div className="font-cyber font-bold text-xs text-rose-400 uppercase">
                  UNRESOLVED GLOBAL THREAT
                </div>
                <div className="text-sm font-sans text-slate-200">
                  “We stopped the transaction. But the ghost is still in the ledger.”
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playBlip(700);
                onRestart();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 text-xs font-cyber font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY CASE INVESTIGATION</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
