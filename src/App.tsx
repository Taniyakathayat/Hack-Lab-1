import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundMatrix } from './components/common/BackgroundMatrix';
import { ProgressHUD } from './components/common/ProgressHUD';
import { EvidenceVault } from './components/evidence/EvidenceVault';
import { OrionCompanion } from './components/orion/OrionCompanion';
import { Scene0MidnightAlert } from './components/scenes/Scene0MidnightAlert';
import { Scene1TeamAssemble } from './components/scenes/Scene1TeamAssemble';
import { Scene2SubLab1Wallet } from './components/scenes/Scene2SubLab1Wallet';
import { Scene3SubLab2AI } from './components/scenes/Scene3SubLab2AI';
import { Scene4SubLab3API } from './components/scenes/Scene4SubLab3API';
import { Scene5SubLab4Signer } from './components/scenes/Scene5SubLab4Signer';
import { Scene6FinalReconstruction } from './components/scenes/Scene6FinalReconstruction';
import { Scene7GrandReveal } from './components/scenes/Scene7GrandReveal';
import type { SceneId } from './types/investigation';
import { EVIDENCE_LIST } from './data/storyData';
import { sound } from './services/sound';

const SCENE_IDS: SceneId[] = [
  'SCENE_0_MIDNIGHT_ALERT',
  'SCENE_1_TEAM_ASSEMBLE',
  'SCENE_2_WALLET_FORENSICS',
  'SCENE_3_AI_PIPELINE',
  'SCENE_4_API_SIGNAL',
  'SCENE_5_SIGNING_ARCHITECTURE',
  'SCENE_6_RECONSTRUCTION',
  'SCENE_7_GRAND_REVEAL',
];

const LOCAL_STORAGE_KEY = 'NEXORA_LAB01_INVESTIGATION_STATE_V1';

export const App: React.FC = () => {
  // Saved state initialization from localStorage
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.currentSceneIndex === 'number' ? parsed.currentSceneIndex : 0;
      }
    } catch {}
    return 0;
  });

  const [unlockedEvidenceIds, setUnlockedEvidenceIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed.unlockedEvidenceIds) ? parsed.unlockedEvidenceIds : [];
      }
    } catch {}
    return [];
  });

  const [orionConfidence, setOrionConfidence] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.orionConfidence === 'number' ? parsed.orionConfidence : 99.2;
      }
    } catch {}
    return 99.2;
  });

  const [isEvidenceVaultOpen, setIsEvidenceVaultOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync state with localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        currentSceneIndex,
        unlockedEvidenceIds,
        orionConfidence,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {}
  }, [currentSceneIndex, unlockedEvidenceIds, orionConfidence]);

  // Handle unlocking forensic evidence and recalculating ORION confidence score
  const handleUnlockEvidence = (evidenceId: string) => {
    if (!unlockedEvidenceIds.includes(evidenceId)) {
      const updated = [...unlockedEvidenceIds, evidenceId];
      setUnlockedEvidenceIds(updated);

      // Decrement ORION confidence progressively as the truth unravels
      setOrionConfidence((prev) => Math.max(12.4, prev - 17.5));
    }
  };

  const handleNextScene = () => {
    sound.playSwoosh();
    setCurrentSceneIndex((prev) => Math.min(SCENE_IDS.length - 1, prev + 1));
  };

  const handleJumpToScene = (index: number) => {
    sound.playSwoosh();
    setCurrentSceneIndex(index);
  };

  const handleResetInvestigation = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCurrentSceneIndex(0);
    setUnlockedEvidenceIds([]);
    setOrionConfidence(99.2);
    setIsEvidenceVaultOpen(false);
  };

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setSoundEnabled(!nextMuted);
  };

  // Current Scene Hints for ORION
  const getSceneHint = (): string | undefined => {
    switch (currentSceneIndex) {
      case 2:
        return 'Check the on-chain age of wallet 0x7C41...9B2D and compare it with the prior AI reputation status!';
      case 3:
        return 'Examine record NIF-2038 from feed NOVA-INTEL-FEED—is that feed in our official registry?';
      case 4:
        return 'Audit the IAM permissions of service INTEL-INGESTOR-02 on gateway INTEL-GW-04.';
      case 5:
        return 'Review policy ORION-SETTLEMENT-V2: What happens when confidence is >= 95%?';
      case 6:
        return 'Reconstruct the chain starting from the UNKNOWN ACTOR and ending at cross-chain dispersion.';
      default:
        return undefined;
    }
  };

  // Render Scene based on index
  const renderCurrentScene = () => {
    switch (currentSceneIndex) {
      case 0:
        return <Scene0MidnightAlert onComplete={handleNextScene} />;
      case 1:
        return <Scene1TeamAssemble onComplete={handleNextScene} />;
      case 2:
        return (
          <Scene2SubLab1Wallet
            onUnlockEvidence={handleUnlockEvidence}
            onComplete={handleNextScene}
          />
        );
      case 3:
        return (
          <Scene3SubLab2AI
            onUnlockEvidence={handleUnlockEvidence}
            onComplete={handleNextScene}
          />
        );
      case 4:
        return (
          <Scene4SubLab3API
            onUnlockEvidence={handleUnlockEvidence}
            onComplete={handleNextScene}
          />
        );
      case 5:
        return (
          <Scene5SubLab4Signer
            onUnlockEvidence={handleUnlockEvidence}
            onComplete={handleNextScene}
          />
        );
      case 6:
        return (
          <Scene6FinalReconstruction
            onUnlockEvidence={handleUnlockEvidence}
            onComplete={handleNextScene}
          />
        );
      case 7:
        return <Scene7GrandReveal onRestart={handleResetInvestigation} />;
      default:
        return <Scene0MidnightAlert onComplete={handleNextScene} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Cinematic Cyber Particle Matrix Background */}
      <BackgroundMatrix />

      {/* Top Telemetry Header HUD */}
      <ProgressHUD
        currentSceneIndex={currentSceneIndex}
        totalScenes={SCENE_IDS.length}
        currentSceneId={SCENE_IDS[currentSceneIndex]}
        unlockedEvidenceCount={unlockedEvidenceIds.length}
        totalEvidenceCount={EVIDENCE_LIST.length}
        orionConfidence={orionConfidence}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onToggleEvidenceVault={() => setIsEvidenceVaultOpen(!isEvidenceVaultOpen)}
        onResetInvestigation={handleResetInvestigation}
        onJumpToScene={handleJumpToScene}
      />

      {/* Main Story & Investigation Stage */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-2 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneIndex}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderCurrentScene()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Interactive ORION Drone Assistant */}
      <OrionCompanion
        confidence={orionConfidence}
        currentHint={getSceneHint()}
      />

      {/* Slide-over Evidence Vault */}
      <EvidenceVault
        isOpen={isEvidenceVaultOpen}
        onClose={() => setIsEvidenceVaultOpen(false)}
        unlockedEvidenceIds={unlockedEvidenceIds}
      />
    </div>
  );
};

export default App;
