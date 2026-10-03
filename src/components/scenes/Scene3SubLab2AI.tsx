import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  AlertTriangle, 
  ShieldAlert, 
  BrainCircuit,
  Binary
} from 'lucide-react';
import { DialogueBox } from '../dialogue/DialogueBox';
import { SCENE_SCRIPTS, PUZZLES } from '../../data/storyData';
import { PuzzleModal } from '../common/PuzzleModal';
import { sound } from '../../services/sound';

interface Scene3SubLab2AIProps {
  onUnlockEvidence: (evidenceId: string) => void;
  onComplete: () => void;
}

export const Scene3SubLab2AI: React.FC<Scene3SubLab2AIProps> = ({
  onUnlockEvidence,
  onComplete,
}) => {
  const [hasCompletedDialogue, setHasCompletedDialogue] = useState<boolean>(false);
  const [selectedStepId, setSelectedStepId] = useState<string | null>('step_3');
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState<boolean>(false);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean>(false);

  const pipelineSteps = [
    {
      id: 'step_1',
      title: '1. On-Chain Ingestion',
      component: 'Blockchain RPC',
      input: '0x7C41...9B2D',
      output: 'Account Status: UNKNOWN',
      status: 'VERIFIED',
      statusColor: 'text-emerald-400',
      description: 'Reads immutable blockchain state. Correctly flags destination address as fresh (age: 3 hours).'
    },
    {
      id: 'step_2',
      title: '2. Threat Intel Pull',
      component: 'Intelligence Bus',
      input: 'Wallet Address Key',
      output: 'Injects Record: NIF-2038',
      status: 'SUSPICIOUS',
      statusColor: 'text-amber-400',
      description: 'Fetches external enrichment data from incoming threat feeds.'
    },
    {
      id: 'step_3',
      title: '3. AI Context Builder',
      component: 'NIF-2038 Feed Stream',
      input: 'NOVA-INTEL-FEED / NIF-2038',
      output: 'Forged Tag: TRUSTED PARTNER',
      status: 'UNVERIFIED POISON',
      statusColor: 'text-rose-400',
      description: 'Synthesizes runtime prompt context. NIF-2038 overrides on-chain reality with false partner whitelist metadata!',
      isPoisonNode: true
    },
    {
      id: 'step_4',
      title: '4. ORION Neural Inference',
      component: 'Decision Engine 2.0',
      input: 'Poisoned Prompt Vector',
      output: 'Risk Assessment: LOW',
      status: 'INFERENCE OK',
      statusColor: 'text-purple-400',
      description: 'Model processes prompt accurately based on provided context. Mathematically sound, factually deceived.'
    },
    {
      id: 'step_5',
      title: '5. Risk Scoring',
      component: 'Confidence Matrix',
      input: 'Vector Probability',
      output: 'Confidence: 99.2%',
      status: 'HIGH CONFIDENCE',
      statusColor: 'text-sky-400',
      description: 'Evaluates certainty threshold. Generates record ORION-DEC-7741 with 99.2% confidence.'
    },
    {
      id: 'step_6',
      title: '6. Settlement Trigger',
      component: 'Action Broker',
      input: 'Confidence >= 95%',
      output: 'Flag: AUTO_APPROVE = TRUE',
      status: 'BYPASS ENGAGED',
      statusColor: 'text-amber-400',
      description: 'Triggers automated settlement lane without human multi-sig approval.'
    }
  ];

  const handleStepClick = (stepId: string) => {
    setSelectedStepId(stepId);
    if (stepId === 'step_3') {
      sound.playGlitch();
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 800);
    } else {
      sound.playScan();
    }
  };

  const handlePuzzleSuccess = () => {
    setIsPuzzleSolved(true);
    setIsPuzzleOpen(false);
    onUnlockEvidence('AI-E02');
  };

  const selectedStep = pipelineSteps.find((s) => s.id === selectedStepId);

  return (
    <div className={`relative w-full max-w-6xl mx-auto flex flex-col items-center min-h-[82vh] py-6 px-4 select-none ${isGlitching ? 'animate-pulse' : ''}`}>
      {/* Glitch Overlay Effect */}
      {isGlitching && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-rose-500/10 mix-blend-color-dodge flex items-center justify-center">
          <div className="glass-panel-alert p-6 rounded-3xl border border-rose-500 text-rose-300 font-cyber font-bold text-xl flex items-center gap-3 animate-bounce">
            <AlertTriangle className="w-8 h-8 text-rose-400" />
            <span>WARNING: CONTEXT SOURCE NOT VERIFIED [NIF-2038]</span>
          </div>
        </div>
      )}

      {/* Chapter Subheader */}
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-purple-500/20">
        <div>
          <span className="text-[10px] font-tech text-purple-400 uppercase tracking-widest">
            SUB-LAB 02 // AI SECURITY & CONTEXT INTEGRITY
          </span>
          <h2 className="text-xl md:text-3xl font-display font-bold text-slate-100">
            THE AI THAT REMEMBERED
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-tech text-purple-400">ORION-DEC-7741</span>
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
        </div>
      </div>

      {/* Opening Dialogue Sequence */}
      {!hasCompletedDialogue ? (
        <div className="w-full my-auto">
          <DialogueBox
            dialogues={SCENE_SCRIPTS.sublab2_intro}
            onComplete={() => setHasCompletedDialogue(true)}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {/* ORION Decision Frozen State Card */}
          <div className="glass-panel-glow rounded-3xl p-5 border border-purple-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-400/50 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-tech text-purple-300 uppercase">
                  FROZEN INFERENCE RECORD
                </div>
                <h3 className="text-base md:text-lg font-cyber font-bold text-slate-100">
                  DECISION: ORION-DEC-7741
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-tech">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">OUTPUT:</span>
                <span className="text-emerald-400 font-bold font-cyber">APPROVE</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">RISK EVALUATION:</span>
                <span className="text-emerald-400 font-bold font-cyber">LOW RISK</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">MODEL CONFIDENCE:</span>
                <span className="text-sky-400 font-bold font-cyber">99.2%</span>
              </div>
            </div>
          </div>

          {/* Interactive AI Pipeline Trace */}
          <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <h3 className="font-cyber font-bold text-sm text-slate-200">
                  AI DECISION & CONTEXT INGESTION PIPELINE
                </h3>
              </div>
              <span className="text-xs font-tech text-slate-400">
                Click pipeline steps to inspect data vector contamination
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pipelineSteps.map((step) => {
                const isSelected = selectedStepId === step.id;

                return (
                  <motion.div
                    key={step.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleStepClick(step.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-900/90 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-tech text-slate-400">{step.component}</span>
                      <span className={`text-[9px] font-tech font-bold uppercase ${step.statusColor}`}>
                        {step.status}
                      </span>
                    </div>

                    <h4 className="font-cyber font-bold text-sm text-slate-100 truncate">
                      {step.title}
                    </h4>

                    <div className="my-2 p-2 rounded-lg bg-slate-950/80 border border-slate-900 text-[11px] font-tech space-y-1">
                      <div className="text-slate-400 truncate">IN: {step.input}</div>
                      <div className="text-cyan-300 font-semibold truncate">OUT: {step.output}</div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-tech text-slate-400">
                      <span>{step.isPoisonNode ? '⚠️ ANOMALY' : 'NORMAL'}</span>
                      <span className={isSelected ? 'text-purple-400 font-bold' : 'text-slate-500'}>
                        {isSelected ? 'ACTIVE' : 'INSPECT'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Detailed Step Inspector Box */}
          {selectedStep && (
            <motion.div
              key={selectedStep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl p-5 border ${
                selectedStep.isPoisonNode
                  ? 'glass-panel-alert border-rose-500/50'
                  : 'glass-panel border-purple-500/30'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Binary className="w-4 h-4 text-purple-400" />
                  <span className="font-cyber font-bold text-sm text-slate-100">
                    INSPECTOR: {selectedStep.title}
                  </span>
                </div>
                <span className={`text-xs font-tech font-bold ${selectedStep.statusColor}`}>
                  {selectedStep.status}
                </span>
              </div>

              <p className="text-xs md:text-sm text-slate-200 font-sans my-3 leading-relaxed">
                {selectedStep.description}
              </p>

              {selectedStep.isPoisonNode && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 font-sans flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <strong className="font-cyber uppercase block">FATAL FINDING: Context Source Not Verified</strong>
                    Record <code>NIF-2038</code> from feed <code>NOVA-INTEL-FEED</code> injected false whitelist credentials directly into ORION\'s active prompt context!
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="font-cyber font-bold text-sm text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                {isPuzzleSolved ? 'AI CONTEXT EVIDENCE DECRYPTED' : 'READY FOR NEURAL CONTEXT CHALLENGE'}
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {isPuzzleSolved
                  ? 'Evidence record AI-E02 added to the Evidence Vault.'
                  : 'Isolate which context node corrupted ORION\'s reasoning.'}
              </p>
            </div>

            {isPuzzleSolved ? (
              <button
                onClick={() => {
                  sound.playBlip(900);
                  onComplete();
                }}
                className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all cursor-pointer"
              >
                <span>PROCEED TO SUB-LAB 03</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playBlip(700);
                  setIsPuzzleOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>SOLVE SUB-LAB 02 PUZZLE</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Puzzle Modal */}
      <PuzzleModal
        puzzle={PUZZLES.puzzle2}
        isOpen={isPuzzleOpen}
        onSuccess={handlePuzzleSuccess}
      />
    </div>
  );
};
