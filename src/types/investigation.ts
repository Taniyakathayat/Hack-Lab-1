export type CharacterId = 'lakshay' | 'shivam' | 'shanu' | 'mehak' | 'orion' | 'system';

export type CharacterEmotion = 
  | 'neutral' 
  | 'thinking' 
  | 'alarmed' 
  | 'confident' 
  | 'smug' 
  | 'confused' 
  | 'facepalm' 
  | 'glitch';

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  role: string;
  specialty: string;
  colorAccent: string; // Tailwind/HEX
  glowColor: string;
  avatarSeed: string;
  introQuote: string;
  description: string;
}

export interface DialogueLine {
  id: string;
  character: CharacterId;
  text: string;
  subtext?: string;
  emotion?: CharacterEmotion;
  soundEffect?: 'blip' | 'alarm' | 'glitch' | 'scan' | 'unlock';
  pauseMs?: number;
  highlightWords?: string[];
}

export interface EvidenceItem {
  id: string;
  code: string; // e.g., 'WEB3-E01', 'AI-E02', 'CYBER-E03', 'AUTH-E04'
  title: string;
  category: 'Web3 & Blockchain' | 'AI & Neural Integrity' | 'Threat Intelligence & API' | 'Authorization & Governance' | 'Attack Chain Reconstruction';
  summary: string;
  details: {
    label: string;
    value: string;
  }[];
  revealedAtScene: number;
  iconType: 'blockchain' | 'ai' | 'api' | 'auth' | 'nexus';
  timestamp: string;
}

export interface PuzzleOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  orionReactionWrong?: string;
  orionReactionRight?: string;
}

export interface PuzzleDefinition {
  id: string;
  title: string;
  subtitle: string;
  question: string;
  hint: string;
  options: PuzzleOption[];
  unlocksEvidenceId: string;
}

export interface InteractiveNode {
  id: string;
  label: string;
  sublabel: string;
  status: 'normal' | 'suspicious' | 'compromised' | 'unverified' | 'bypass';
  type: 'treasury' | 'wallet' | 'bridge' | 'ai' | 'intel' | 'gateway' | 'policy' | 'contract';
  inspected: boolean;
  details: {
    key: string;
    val: string;
    warning?: boolean;
  }[];
  dialogueOnClick?: DialogueLine[];
}

export type SceneId = 
  | 'SCENE_0_MIDNIGHT_ALERT'
  | 'SCENE_1_TEAM_ASSEMBLE'
  | 'SCENE_2_WALLET_FORENSICS'
  | 'SCENE_3_AI_PIPELINE'
  | 'SCENE_4_API_SIGNAL'
  | 'SCENE_5_SIGNING_ARCHITECTURE'
  | 'SCENE_6_RECONSTRUCTION'
  | 'SCENE_7_GRAND_REVEAL';

export interface InvestigationState {
  currentSceneIndex: number;
  currentSceneId: SceneId;
  completedScenes: SceneId[];
  unlockedEvidence: string[]; // evidence IDs
  inspectedNodeIds: string[];
  solvedPuzzleIds: string[];
  orionConfidence: number; // 99.2% downwards
  soundEnabled: boolean;
  isEvidenceVaultOpen: boolean;
  activeEvidenceDetail: EvidenceItem | null;
  dialogueHistory: DialogueLine[];
  attackGraphLinks: { from: string; to: string }[];
  isAttackGraphCompleted: boolean;
}
