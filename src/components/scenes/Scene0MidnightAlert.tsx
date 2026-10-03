import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Terminal, 
  ArrowRight, 
  Server, 
  Flame, 
  Zap
} from 'lucide-react';
import { DialogueBox } from '../dialogue/DialogueBox';
import { SCENE_SCRIPTS } from '../../data/storyData';
import { sound } from '../../services/sound';

interface Scene0MidnightAlertProps {
  onComplete: () => void;
}

export const Scene0MidnightAlert: React.FC<Scene0MidnightAlertProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'clock' | 'alarm' | 'dialogue' | 'ready'>('clock');
  const [inspectedMonitors, setInspectedMonitors] = useState<string[]>([]);
  const [selectedMonitorData, setSelectedMonitorData] = useState<{
    id: string;
    title: string;
    status: string;
    metrics: string[];
  } | null>(null);

  const monitors = [
    {
      id: 'm1',
      title: 'TREASURY VAULT 01 (MAINNET)',
      status: 'CRITICAL DRAIN',
      metrics: ['Balance: 4,117,600 NXR (-82,400)', 'Transfer TX: TX-NEX-7741', 'Gas Price: 24 Gwei', 'Multi-Sig: BYPASSED'],
      isRed: true
    },
    {
      id: 'm2',
      title: 'ORION INFERENCE GATEWAY',
      status: 'ANOMALY DETECTED',
      metrics: ['Inference ID: ORION-DEC-7741', 'Confidence: 99.2%', 'Context Hash: 0x8fa9...c21d', 'Status: SETTLED_AUTO'],
      isRed: true
    },
    {
      id: 'm3',
      title: 'ORION POLICY BROKER',
      status: 'POLICY FIRED',
      metrics: ['Rule: ORION-SETTLEMENT-V2', 'Threshold Met: >=95%', 'Signer HSM: ENGAGED', 'Human Override: DISABLED'],
      isRed: false
    },
    {
      id: 'm4',
      title: 'GLOBAL THREAT FEED RADAR',
      status: 'NEW INGESTION',
      metrics: ['Source: NOVA-INTEL-FEED', 'Packet ID: NIF-2038', 'Payload: Counterparty Trust', 'Provenance: UNREGISTERED'],
      isRed: false
    }
  ];

  const handleInspectMonitor = (m: typeof monitors[0]) => {
    sound.playScan();
    setSelectedMonitorData(m);
    if (!inspectedMonitors.includes(m.id)) {
      setInspectedMonitors([...inspectedMonitors, m.id]);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[82vh] py-6 px-4 select-none">
      {/* 1. Cold Open: Blinking 01:47:13 AM */}
      {step === 'clock' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="text-center space-y-6"
        >
          <div className="text-cyan-400 font-tech text-sm tracking-[0.3em] uppercase animate-pulse">
            NEXORA INTELLIGENCE SYSTEMS // SOC FLOOR
          </div>

          <div className="text-6xl md:text-8xl font-display font-black text-slate-100 tracking-wider drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            01:47:13 <span className="text-cyan-400 text-4xl">AM</span>
          </div>

          <p className="text-slate-400 font-sans max-w-md mx-auto text-sm leading-relaxed">
            The operations floor is dead silent. Rows of automated settlement terminals run quietly in the dark.
          </p>

          <button
            onClick={() => {
              sound.playAlarm();
              setStep('alarm');
            }}
            className="px-8 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-cyber font-bold text-sm tracking-widest shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105"
          >
            ENTER THE NEXORA SOC →
          </button>
        </motion.div>
      )}

      {/* 2. Priority 0 Alarm Sequence */}
      {(step === 'alarm' || step === 'dialogue' || step === 'ready') && (
        <div className="w-full flex flex-col items-center">
          {/* Flashing Top Alert Banner */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full glass-panel-alert rounded-2xl p-4 md:p-5 mb-6 border border-rose-500/50 flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse-glow"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-950 border-2 border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <ShieldAlert className="w-7 h-7 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-tech font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500 text-black">
                    CRITICAL SEVERITY 0
                  </span>
                  <span className="text-xs font-tech text-rose-300">
                    TX-NEX-7741 // CONFIRMED ON-CHAIN
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-display font-bold text-white tracking-wide mt-0.5">
                  UNAUTHORIZED 82,400 NXR TREASURY TRANSFER
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-tech text-rose-300 uppercase">AI Verification</div>
                <div className="text-xs font-cyber font-bold text-emerald-400">99.2% APPROVED (LOW RISK)</div>
              </div>
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            </div>
          </motion.div>

          {/* Interactive SOC Terminal Screens Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {monitors.map((m) => {
              const isInspected = inspectedMonitors.includes(m.id);

              return (
                <motion.div
                  key={m.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleInspectMonitor(m)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    m.isRed
                      ? 'bg-rose-950/40 border-rose-500/40 hover:border-rose-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-tech text-slate-400 uppercase">
                      TERMINAL 0{m.id.replace('m', '')}
                    </span>
                    <span
                      className={`text-[9px] font-tech font-bold px-1.5 py-0.5 rounded uppercase ${
                        m.isRed ? 'bg-rose-900/80 text-rose-300' : 'bg-amber-900/80 text-amber-300'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Server className={`w-4 h-4 ${m.isRed ? 'text-rose-400' : 'text-cyan-400'}`} />
                    <h3 className="text-xs font-cyber font-bold text-slate-200 truncate">
                      {m.title}
                    </h3>
                  </div>

                  <div className="space-y-1">
                    {m.metrics.slice(0, 2).map((met, i) => (
                      <div key={i} className="text-[11px] font-tech text-slate-400 truncate">
                        • {met}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-tech text-cyan-400">
                    <span>{isInspected ? '✓ LOG INSPECTED' : 'CLICK TO INSPECT'}</span>
                    <Zap className="w-3 h-3" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Selected Monitor Drawer */}
          {selectedMonitorData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="w-full glass-panel rounded-2xl p-4 mb-6 border border-cyan-500/30"
            >
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-cyber font-bold text-xs text-slate-200">
                    RAW SOC TELEMETRY: {selectedMonitorData.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMonitorData(null)}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Close [×]
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {selectedMonitorData.metrics.map((met, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <div className="text-[10px] font-tech text-cyan-400">FIELD #{idx + 1}</div>
                    <div className="text-xs font-tech text-slate-200 font-semibold mt-0.5 truncate">
                      {met}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Dialogue Section */}
          {step === 'alarm' && (
            <div className="w-full mt-4">
              <DialogueBox
                dialogues={SCENE_SCRIPTS.prologue_alert}
                onComplete={() => setStep('ready')}
              />
            </div>
          )}

          {/* Proceed Button */}
          {step === 'ready' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 flex flex-col items-center gap-3"
            >
              <button
                onClick={() => {
                  sound.playBlip(900);
                  onComplete();
                }}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 text-black font-cyber font-extrabold text-base tracking-widest shadow-[0_0_35px_rgba(0,240,255,0.4)] flex items-center gap-3 transition-all transform hover:scale-105 cursor-pointer"
              >
                <Flame className="w-5 h-5 text-black" />
                <span>MEET THE INVESTIGATION TEAM →</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
              <p className="text-xs font-tech text-slate-400">
                Case ID: NEX-042 // Nexora Intelligence Systems
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
