import React, { useState } from 'react';
import { 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  Key, 
  Cpu, 
  Sliders, 
  Share2, 
  ShieldCheck 
} from 'lucide-react';
import { DialogueBox } from '../dialogue/DialogueBox';
import { SCENE_SCRIPTS, PUZZLES } from '../../data/storyData';
import { PuzzleModal } from '../common/PuzzleModal';
import { sound } from '../../services/sound';

interface Scene5SubLab4SignerProps {
  onUnlockEvidence: (evidenceId: string) => void;
  onComplete: () => void;
}

export const Scene5SubLab4Signer: React.FC<Scene5SubLab4SignerProps> = ({
  onUnlockEvidence,
  onComplete,
}) => {
  const [hasCompletedDialogue, setHasCompletedDialogue] = useState<boolean>(false);
  const [simConfidence, setSimConfidence] = useState<number>(99.2);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState<boolean>(false);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean>(false);


  const policyThreshold = 95.0;
  const isAutoApproved = simConfidence >= policyThreshold;

  const handleSimSlider = (val: number) => {
    setSimConfidence(val);
    if (val >= policyThreshold) {
      sound.playAlarm();
    } else {
      sound.playBlip(500);
    }
  };

  const handlePuzzleSuccess = () => {
    setIsPuzzleSolved(true);
    setIsPuzzleOpen(false);
    onUnlockEvidence('AUTH-E04');
  };


  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center min-h-[82vh] py-6 px-4 select-none">
      {/* Chapter Subheader */}
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
        <div>
          <span className="text-[10px] font-tech text-amber-400 uppercase tracking-widest">
            SUB-LAB 04 // AI GOVERNANCE & SIGNER ARCHITECTURE
          </span>
          <h2 className="text-xl md:text-3xl font-display font-bold text-slate-100">
            THE INVISIBLE SIGNER
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-tech text-amber-400">ORION-SETTLEMENT-V2</span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        </div>
      </div>

      {/* Opening Dialogue Sequence */}
      {!hasCompletedDialogue ? (
        <div className="w-full my-auto">
          <DialogueBox
            dialogues={SCENE_SCRIPTS.sublab4_intro}
            onComplete={() => setHasCompletedDialogue(true)}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {/* Action Broker Policy Engine Flow */}
          <div className="glass-panel rounded-3xl p-6 border border-amber-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <h3 className="font-cyber font-bold text-sm text-slate-200">
                  AUTOMATED SETTLEMENT POLICY SIMULATOR
                </h3>
              </div>
              <span className="text-xs font-tech text-amber-400">
                PROFILE: ORION-SETTLEMENT-V2
              </span>
            </div>

            {/* Interactive Architecture Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-5">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <Cpu className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                <div className="text-[10px] font-tech text-slate-400 uppercase">AI ENGINE</div>
                <div className="font-cyber font-bold text-xs text-slate-100">ORION 2.0</div>
                <div className="text-[11px] font-tech text-sky-300 mt-1">Score: {simConfidence.toFixed(1)}%</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <Share2 className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <div className="text-[10px] font-tech text-slate-400 uppercase">MIDDLEWARE</div>
                <div className="font-cyber font-bold text-xs text-slate-100">ACTION BROKER</div>
                <div className="text-[11px] font-tech text-indigo-300 mt-1">Route Payload</div>
              </div>

              <div className={`p-3.5 rounded-2xl border text-center transition-all ${
                isAutoApproved ? 'bg-rose-950/60 border-rose-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-slate-950/80 border-slate-800'
              }`}>
                <Sliders className={`w-5 h-5 mx-auto mb-1 ${isAutoApproved ? 'text-rose-400' : 'text-slate-400'}`} />
                <div className="text-[10px] font-tech text-slate-400 uppercase">POLICY GATE</div>
                <div className="font-cyber font-bold text-xs text-slate-100">THRESHOLD &gt;= 95%</div>
                <div className={`text-[11px] font-tech font-bold mt-1 ${isAutoApproved ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isAutoApproved ? 'PASS (AUTO)' : 'REQUIRE MULTISIG'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <Key className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <div className="text-[10px] font-tech text-slate-400 uppercase">KEY VAULT</div>
                <div className="font-cyber font-bold text-xs text-slate-100">HSM SIGNER</div>
                <div className="text-[11px] font-tech text-amber-300 mt-1">{isAutoApproved ? 'Keys Fired ⚡' : 'Idle'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-[10px] font-tech text-slate-400 uppercase">WEB3</div>
                <div className="font-cyber font-bold text-xs text-slate-100">SMART CONTRACT</div>
                <div className="text-[11px] font-tech text-emerald-300 mt-1">{isAutoApproved ? '82,400 NXR Drain' : 'Vault Safe'}</div>
              </div>
            </div>

            {/* Slider to test threshold behavior */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-tech mb-2">
                <span className="text-slate-300">Simulate ORION Model Confidence:</span>
                <span className="text-amber-400 font-bold">{simConfidence.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="100"
                step="0.1"
                value={simConfidence}
                onChange={(e) => handleSimSlider(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex items-center justify-between text-[10px] font-tech text-slate-500 mt-1">
                <span>80.0% (Manual Multi-Sig Required)</span>
                <span className="text-rose-400 font-bold">95.0% Automation Bypass Gate</span>
                <span>100.0% (Auto-Disbursement)</span>
              </div>
            </div>
          </div>

          {/* Campaign ORION-NEXUS Footprint Box (Unlocked after or during) */}
          <div className="glass-panel-amber rounded-3xl p-5 border border-amber-500/40">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/60">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-400 animate-spin" />
                <h3 className="font-cyber font-bold text-sm text-slate-100">
                  GLOBAL NEXORA THREAT CORRELATION RADAR
                </h3>
              </div>
              <span className="text-xs font-tech font-extrabold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">
                CAMPAIGN: ORION-NEXUS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center">
                <div className="text-[10px] font-tech text-slate-400 uppercase">Target Networks</div>
                <div className="text-lg font-display font-bold text-amber-300">04 CHAINS</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center">
                <div className="text-[10px] font-tech text-slate-400 uppercase">Related Wallets</div>
                <div className="text-lg font-display font-bold text-amber-300">14 ADDRESSES</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center">
                <div className="text-[10px] font-tech text-slate-400 uppercase">Targeted AI Bots</div>
                <div className="text-lg font-display font-bold text-amber-300">03 ENGINES</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center">
                <div className="text-[10px] font-tech text-slate-400 uppercase">Campaign Status</div>
                <div className="text-lg font-display font-bold text-rose-400 animate-pulse">ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="font-cyber font-bold text-sm text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {isPuzzleSolved ? 'AUTHORIZATION EVIDENCE DECRYPTED' : 'READY FOR GOVERNANCE AUDIT CHALLENGE'}
              </div>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {isPuzzleSolved
                  ? 'Evidence record AUTH-E04 added to the Evidence Vault.'
                  : 'Identify what critical assumption was violated in the automated signing policy.'}
              </p>
            </div>

            {isPuzzleSolved ? (
              <button
                onClick={() => {
                  sound.playBlip(900);
                  onComplete();
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
              >
                <span>ENTER THE WAR ROOM // SUB-LAB 05</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playBlip(700);
                  setIsPuzzleOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-black" />
                <span>SOLVE SUB-LAB 04 PUZZLE</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Puzzle Modal */}
      <PuzzleModal
        puzzle={PUZZLES.puzzle4}
        isOpen={isPuzzleOpen}
        onSuccess={handlePuzzleSuccess}
      />
    </div>
  );
};
