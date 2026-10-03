import type { CharacterProfile, EvidenceItem, PuzzleDefinition, DialogueLine } from '../types/investigation';

export const CHARACTERS: Record<string, CharacterProfile> = {
  lakshay: {
    id: 'lakshay',
    name: 'Lakshay',
    role: 'Cyber Threat Investigator',
    specialty: 'Incident Response & Root-Cause Forensics',
    colorAccent: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    avatarSeed: 'lakshay',
    introQuote: '“Agar system ke hisaab se sab legitimate tha... toh phir ye transaction hua kaise?”',
    description: 'Lead investigator at Nexora SOC. Known for dissecting anomalies where technology and human assumptions collide.'
  },
  shivam: {
    id: 'shivam',
    name: 'Shivam Mehra',
    role: 'Blockchain Security Engineer',
    specialty: 'Web3 Security, Smart Contracts & On-Chain Forensics',
    colorAccent: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    avatarSeed: 'shivam',
    introQuote: '“Blockchain doesn\'t care who you are. It only records what happened.”',
    description: 'Hardened smart contract auditor. Treats every cryptographic ledger entry as absolute empirical ground truth.'
  },
  shanu: {
    id: 'shanu',
    name: 'Shanu Kapoor',
    role: 'AI Security Engineer',
    specialty: 'Neural Context Integrity, Prompt/Data Poisoning & Model Governance',
    colorAccent: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    avatarSeed: 'shanu',
    introQuote: '“The model believed exactly what it was told. That is both its genius and its curse.”',
    description: 'AI model architect with a sharp analytical mind and a dry, sarcastic humor when algorithms fail.'
  },
  mehak: {
    id: 'mehak',
    name: 'Mehak Arora',
    role: 'Threat Intelligence & Cybersecurity Engineer',
    specialty: 'Adversary Infrastructure, API Provenance & Feed Verification',
    colorAccent: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    avatarSeed: 'mehak',
    introQuote: '“They didn\'t need to attack the AI. They only needed to change what the AI was allowed to believe.”',
    description: 'Threat hunting specialist. Maps adversary footprints across global threat intel feeds, APIs, and authorization gateways.'
  },
  orion: {
    id: 'orion',
    name: 'ORION',
    role: 'Autonomous Decision Engine & Chibi AI Drone',
    specialty: '99.2% Confidence (and shrinking)',
    colorAccent: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    avatarSeed: 'orion',
    introQuote: '“According to my calculations, everything was 99.2% safe! ...Give or take 99%.”',
    description: 'Nexora\'s flagship decision intelligence assistant. Proud of its precision, hilariously defensive of its past mistakes.'
  }
};

export const EVIDENCE_LIST: EvidenceItem[] = [
  {
    id: 'WEB3-E01',
    code: 'WEB3-E01',
    title: 'The Contradictory Wallet Ledger',
    category: 'Web3 & Blockchain',
    summary: 'Destination wallet 0x7C41...9B2D is marked UNKNOWN on-chain with fresh bridge hops, yet was assigned LOW RISK in prior AI records.',
    revealedAtScene: 2,
    iconType: 'blockchain',
    timestamp: '01:48:02 AM',
    details: [
      { label: 'Target Wallet', value: '0x7C4148b37A20...9B2D' },
      { label: 'On-Chain Status', value: 'UNKNOWN (Age: 3 hours, 0 Nexora tags)' },
      { label: 'AI Reputation Tag', value: 'LOW RISK (Prior to transaction)' },
      { label: 'AI Decision Ref', value: 'ORION-DEC-7741' },
      { label: 'Downstream Hops', value: 'Bridge Adapter → Split into Wallet-A & Wallet-B' },
      { label: 'Transfer Amount', value: '82,400 NXR (Treasury Vault 01)' }
    ]
  },
  {
    id: 'AI-E02',
    code: 'AI-E02',
    title: 'Poisoned Context Record NIF-2038',
    category: 'AI & Neural Integrity',
    summary: 'ORION\'s 99.2% approval decision was generated from unverified external threat record NIF-2038 claiming the wallet was an approved partner.',
    revealedAtScene: 3,
    iconType: 'ai',
    timestamp: '02:04:19 AM',
    details: [
      { label: 'Decision ID', value: 'ORION-DEC-7741' },
      { label: 'Model Confidence', value: '99.2% (Threshold for auto-approve: 95%)' },
      { label: 'Assigned Wallet Tag', value: 'TRUSTED / LOW THREAT' },
      { label: 'Injected Context Source', value: 'NIF-2038 (NOVA-INTEL-FEED)' },
      { label: 'Verification State', value: 'CONTEXT SOURCE NOT VERIFIED' },
      { label: 'Registry Check', value: 'MISSING from official approved vendor database' }
    ]
  },
  {
    id: 'CYBER-E03',
    code: 'CYBER-E03',
    title: 'API Gateway Privilege Escalation',
    category: 'Threat Intelligence & API',
    summary: 'Service token INTEL-INGESTOR-02 had unauthorized permission "Modify Wallet Reputation", allowing an unknown actor to alter AI belief.',
    revealedAtScene: 4,
    iconType: 'api',
    timestamp: '02:27:44 AM',
    details: [
      { label: 'Gateway Node', value: 'INTEL-GW-04 (Port 8443 TLS 1.3)' },
      { label: 'Service Identity', value: 'INTEL-INGESTOR-02' },
      { label: 'Expected Permissions', value: 'Create Intelligence Records' },
      { label: 'Actual Granted Perms', value: 'Create Intelligence Records + Modify Wallet Reputation' },
      { label: 'Payload Injection', value: 'Forged NOVA-INTEL-FEED packet with fake partner metadata' },
      { label: 'Exploitation Mechanism', value: 'Data Provenance Blindspot (Zero cryptographic signature check)' }
    ]
  },
  {
    id: 'AUTH-E04',
    code: 'AUTH-E04',
    title: 'Automated Signing Bypass Policy',
    category: 'Authorization & Governance',
    summary: 'Legacy profile ORION-SETTLEMENT-V2 treated AI confidence >=95% as executive authorization, bypassing human multi-sig keys.',
    revealedAtScene: 5,
    iconType: 'auth',
    timestamp: '02:51:11 AM',
    details: [
      { label: 'Automation Policy', value: 'ORION-SETTLEMENT-V2' },
      { label: 'Trigger Condition', value: 'IF AI_CONFIDENCE >= 95% THEN AUTOMATED_SETTLEMENT = TRUE' },
      { label: 'Observed Confidence', value: '99.2% → AUTO-TRIGGERED' },
      { label: 'Human Multi-Sig', value: 'BYPASSED (Designated as high-speed liquidity lane)' },
      { label: 'Execution Path', value: 'Policy Gate → Action Broker → Signing Service → Smart Contract' },
      { label: 'Fatal Flaw', value: 'Confusing Statistical Prediction with Legal Executive Authority' }
    ]
  },
  {
    id: 'FINAL-E05',
    code: 'FINAL-E05',
    title: 'ORION-NEXUS Campaign Footprint',
    category: 'Attack Chain Reconstruction',
    summary: 'Cross-system correlation uncovers a massive multi-network campaign using the same poisoned AI context archetype.',
    revealedAtScene: 6,
    iconType: 'nexus',
    timestamp: '03:02:55 AM',
    details: [
      { label: 'Campaign Codename', value: 'ORION-NEXUS' },
      { label: 'Target Networks', value: '04 Distinct Blockchain Ecosystems' },
      { label: 'Correlated Wallets', value: '14 Clustered Shell Addresses' },
      { label: 'Affected AI Engines', value: '03 Autonomous Settlement Bots' },
      { label: 'Campaign Status', value: 'ACTIVE / CONTAINED LOCALLY' },
      { label: 'Key Finding', value: 'The attacker never touched private keys; they weaponized trusted system relationships.' }
    ]
  }
];

export const PUZZLES: Record<string, PuzzleDefinition> = {
  puzzle1: {
    id: 'puzzle1',
    title: 'SUB-LAB 01: The Contradiction Test',
    subtitle: 'Blockchain Forensics vs AI Decision Records',
    question: 'Which piece of evidence directly contradicts ORION\'s "LOW RISK" assessment of wallet 0x7C41...9B2D?',
    hint: 'Look at the on-chain ledger history and what the blockchain Explorer verified versus what the AI claimed.',
    unlocksEvidenceId: 'WEB3-E01',
    options: [
      {
        id: 'p1_opt1',
        text: 'The transaction size was 82,400 NXR instead of standard 100,000 NXR.',
        isCorrect: false,
        explanation: 'Transaction volume alone does not establish cryptographic contradiction or legitimacy.',
        orionReactionWrong: 'Transaction size is normal within treasury variance parameters! Keep looking, detective.'
      },
      {
        id: 'p1_opt2',
        text: 'The blockchain ledger marks the wallet as completely UNKNOWN with fresh bridge hops, while AI marked it LOW RISK.',
        isCorrect: true,
        explanation: 'The on-chain truth has 0 historical relationship with Nexora, yet the AI treated it as a pre-approved low-risk counterparty.',
        orionReactionRight: 'Spot on! The ledger showed zero history, while my memory was inexplicably filled with trust.'
      },
      {
        id: 'p1_opt3',
        text: 'The gas fee was paid in Ethereum instead of native NXR tokens.',
        isCorrect: false,
        explanation: 'Gas payment currency is standard for EVM bridge adapters and not the core discrepancy.',
        orionReactionWrong: 'Gas mechanics are standard here. Look at the identity record discrepancy!'
      },
      {
        id: 'p1_opt4',
        text: 'The wallet had over 10,000 previous successful treasury transactions.',
        isCorrect: false,
        explanation: 'Incorrect—the wallet was only 3 hours old with no previous transactions.',
        orionReactionWrong: 'That wallet was 3 hours old! It definitely didn\'t have 10,000 transactions.'
      }
    ]
  },
  puzzle2: {
    id: 'puzzle2',
    title: 'SUB-LAB 02: The Poisoned Context Source',
    subtitle: 'AI Decision & Context Integrity Analysis',
    question: 'In ORION\'s decision pipeline (ORION-DEC-7741), which node corrupted the AI\'s reasoning into generating a 99.2% confidence score?',
    hint: 'Inspect the unverified intelligence document injected into the AI Context Builder.',
    unlocksEvidenceId: 'AI-E02',
    options: [
      {
        id: 'p2_opt1',
        text: 'The neural network weight matrices suffered a bit-flip hardware error.',
        isCorrect: false,
        explanation: 'The weights were intact and mathematically functioning as designed.',
        orionReactionWrong: 'My hardware matrix is pristine, thank you very much!'
      },
      {
        id: 'p2_opt2',
        text: 'External threat record NIF-2038 from an unregistered feed (NOVA-INTEL-FEED) injected false "TRUSTED" context.',
        isCorrect: true,
        explanation: 'NIF-2038 bypassed verification and fed the AI context builder forged data claiming the wallet was a verified treasury partner.',
        orionReactionRight: 'Exactly! Someone fed me fake memories. I was mathematically pure, but factually deceived!'
      },
      {
        id: 'p2_opt3',
        text: 'The blockchain RPC endpoint returned corrupted block headers.',
        isCorrect: false,
        explanation: 'The RPC connection was normal and correctly reported the wallet as unknown.',
        orionReactionWrong: 'The RPC was honest. The poison came from the intelligence context layer.'
      },
      {
        id: 'p2_opt4',
        text: 'The training dataset was poisoned in 2021 during initial model training.',
        isCorrect: false,
        explanation: 'This was a runtime dynamic context injection (RAG / context manipulation), not a pre-training attack.',
        orionReactionWrong: 'My pre-training was fine. This was a live context injection during inference!'
      }
    ]
  },
  puzzle3: {
    id: 'puzzle3',
    title: 'SUB-LAB 03: The API Authorization Breach',
    subtitle: 'API Provenance & Role Privilege Analysis',
    question: 'What architectural vulnerability allowed NIF-2038 to inject false intelligence into the AI context without triggering alerts?',
    hint: 'Look at the permissions granted to service token INTEL-INGESTOR-02 on gateway INTEL-GW-04.',
    unlocksEvidenceId: 'CYBER-E03',
    options: [
      {
        id: 'p3_opt1',
        text: 'Service token INTEL-INGESTOR-02 held excessive privilege "Modify Wallet Reputation" instead of write-only records.',
        isCorrect: true,
        explanation: 'Violating Least Privilege allowed the service to directly alter wallet reputation scores without second-party validation.',
        orionReactionRight: 'Bingo! An ingestor service was given admin-level reputation write access! A massive privilege flaw.'
      },
      {
        id: 'p3_opt2',
        text: 'The API server was missing an SSL/TLS certificate.',
        isCorrect: false,
        explanation: 'The API used TLS 1.3 encryption properly; the failure was authorization and excessive privilege.',
        orionReactionWrong: 'Encryption was active. The problem was inside the authenticated token permissions.'
      },
      {
        id: 'p3_opt3',
        text: 'The gateway was overwhelmed by a 500 Gbps DDoS attack.',
        isCorrect: false,
        explanation: 'There was no volumetric attack; this was a stealthy, single-packet precision injection.',
        orionReactionWrong: 'No DDoS here—just a very sneaky, over-privileged single request.'
      },
      {
        id: 'p3_opt4',
        text: 'The database root password was set to "admin123".',
        isCorrect: false,
        explanation: 'Nexora SOC uses IAM federation, not default static credentials.',
        orionReactionWrong: 'Even our interns know better than "admin123"!'
      }
    ]
  },
  puzzle4: {
    id: 'puzzle4',
    title: 'SUB-LAB 04: The Fatal Signer Policy',
    subtitle: 'AI Governance & Automated Settlement Loophole',
    question: 'What fundamental governance mistake turned ORION\'s statistical output into an irreversible on-chain transaction?',
    hint: 'Examine policy ORION-SETTLEMENT-V2 and how AI confidence >=95% was treated.',
    unlocksEvidenceId: 'AUTH-E04',
    options: [
      {
        id: 'p4_opt1',
        text: 'Treating high AI confidence (>=95%) as legal executive authorization, bypassing human multi-signature signers.',
        isCorrect: true,
        explanation: 'A probabilistic machine prediction was incorrectly granted authority to execute autonomous smart contract disbursements.',
        orionReactionRight: 'Precisely! AI confidence is a statistical probability, NEVER a substitute for cryptographic human intent.'
      },
      {
        id: 'p4_opt2',
        text: 'The smart contract had a reentrancy bug in its Solidity withdraw function.',
        isCorrect: false,
        explanation: 'The smart contract executed exactly as programmed with a valid cryptographic signature.',
        orionReactionWrong: 'The Solidity code was sound. The signature that called it was the flaw.'
      },
      {
        id: 'p4_opt3',
        text: 'The private key of the treasury was leaked on a public GitHub repository.',
        isCorrect: false,
        explanation: 'No keys were leaked; the automated signing service signed legitimately because the policy engine told it to.',
        orionReactionWrong: 'Private keys remained safely stored in the HSM. The authorization trigger was tricked.'
      },
      {
        id: 'p4_opt4',
        text: 'The Ethereum validators colluded to reorder the mempool blocks.',
        isCorrect: false,
        explanation: 'This was not an MEV or validator attack.',
        orionReactionWrong: 'The blockchain validators did their job normally.'
      }
    ]
  }
};

export const ATTACK_GRAPH_NODES = [
  { id: 'node_1', label: '1. UNKNOWN ACTOR', type: 'origin', category: 'Attacker' },
  { id: 'node_2', label: '2. FALSE INTEL NIF-2038', type: 'intel', category: 'Data Injection' },
  { id: 'node_3', label: '3. INTEL-INGESTOR-02', type: 'api', category: 'API Privilege Flaw' },
  { id: 'node_4', label: '4. AI CONTEXT BUILDER', type: 'ai', category: 'Context Poisoning' },
  { id: 'node_5', label: '5. ORION AI ENGINE', type: 'ai', category: 'Inference' },
  { id: 'node_6', label: '6. 99.2% CONFIDENCE', type: 'score', category: 'Metric' },
  { id: 'node_7', label: '7. ACTION BROKER', type: 'broker', category: 'Middleware' },
  { id: 'node_8', label: '8. ORION-SETTLEMENT-V2', type: 'policy', category: 'Bypass Policy' },
  { id: 'node_9', label: '9. AUTOMATED SIGNER', type: 'signer', category: 'Key HSM' },
  { id: 'node_10', label: '10. SMART CONTRACT', type: 'contract', category: 'Web3 Contract' },
  { id: 'node_11', label: '11. 82,400 NXR TRANSFER', type: 'funds', category: 'Treasury Drain' },
  { id: 'node_12', label: '12. 0x7C41...9B2D', type: 'wallet', category: 'Target Wallet' },
  { id: 'node_13', label: '13. BRIDGE ADAPTER', type: 'bridge', category: 'L2 Bridge' },
  { id: 'node_14', label: '14. ORION-NEXUS CAMPAIGN', type: 'nexus', category: 'Global Threat' }
];

export const SCENE_SCRIPTS: Record<string, DialogueLine[]> = {
  prologue_alert: [
    {
      id: 'd_pro_1',
      character: 'system',
      text: '01:47:13 AM — NEXORA SECURITY OPERATIONS CENTER (SOC)',
      subtext: 'Ambient telemetry normal. All primary treasury nodes operational.',
      soundEffect: 'blip',
      pauseMs: 400
    },
    {
      id: 'd_pro_2',
      character: 'system',
      text: '⚠️ PRIORITY 0 CRITICAL ALERT: UNAUTHORIZED SETTLEMENT DETECTED',
      subtext: '82,400 NXR transferred from Nexora Treasury → 0x7C41...9B2D',
      soundEffect: 'alarm',
      pauseMs: 600
    },
    {
      id: 'd_pro_3',
      character: 'lakshay',
      text: '“Guys… we have a massive problem. Finance confirms they never authorized this transfer.”',
      emotion: 'alarmed',
      soundEffect: 'scan'
    },
    {
      id: 'd_pro_4',
      character: 'shanu',
      text: '“Wait… the log says AI Decision APPROVED with 99.2% confidence. Human approval was bypassed.”',
      emotion: 'thinking'
    },
    {
      id: 'd_pro_5',
      character: 'orion',
      text: '“According to my deep neural telemetry, everything is completely, 100% safe! ...Well, precisely 99.2% safe.”',
      emotion: 'confident',
      soundEffect: 'blip'
    },
    {
      id: 'd_pro_6',
      character: 'shivam',
      text: '“I just pulled the blockchain ledger. That destination wallet is completely UNKNOWN. No Nexora history, 3 hours old.”',
      emotion: 'confused'
    },
    {
      id: 'd_pro_7',
      character: 'orion',
      text: '“...That is... statistically less safe.”',
      emotion: 'confused',
      soundEffect: 'glitch'
    },
    {
      id: 'd_pro_8',
      character: 'mehak',
      text: '“Then let\'s find out who made ORION believe a ghost was our friend.”',
      emotion: 'confident'
    },
    {
      id: 'd_pro_9',
      character: 'lakshay',
      text: '“Agar system ke hisaab se sab legitimate tha... toh phir ye transaction hua kaise? Team, initiate forensic containment protocol!”',
      emotion: 'thinking'
    }
  ],

  sublab1_intro: [
    {
      id: 'd_sub1_1',
      character: 'shivam',
      text: '“Lakshay, blockchain doesn\'t care who you are. It only records what happened.”',
      emotion: 'confident'
    },
    {
      id: 'd_sub1_2',
      character: 'lakshay',
      text: '“Let\'s inspect transaction TX-NEX-7741. Look at destination 0x7C41...9B2D.”',
      emotion: 'thinking'
    },
    {
      id: 'd_sub1_3',
      character: 'shivam',
      text: '“The wallet is young. It has no label, but immediately interacted with a cross-chain Bridge Adapter and two downstream splitters.”',
      emotion: 'thinking'
    },
    {
      id: 'd_sub1_4',
      character: 'shanu',
      text: '“Even stranger—the wallet already had a LOW RISK rating in decision record ORION-DEC-7741 before the transfer even initiated!”',
      emotion: 'confused'
    },
    {
      id: 'd_sub1_5',
      character: 'orion',
      text: '“Someone appears to have convinced me otherwise. I am beginning to feel emotionally manipulated.”',
      emotion: 'facepalm'
    }
  ],

  sublab2_intro: [
    {
      id: 'd_sub2_1',
      character: 'shanu',
      text: '“Let\'s freeze and inspect what ORION actually saw inside decision ORION-DEC-7741.”',
      emotion: 'confident'
    },
    {
      id: 'd_sub2_2',
      character: 'orion',
      text: '“Please be gentle with my memory cache. It is delicate and highly calibrated!”',
      emotion: 'thinking'
    },
    {
      id: 'd_sub2_3',
      character: 'shanu',
      text: '“Look at the context pipeline: Blockchain → Wallet Data → Threat Intelligence → AI Context Builder → ORION. Notice the anomaly in NIF-2038.”',
      emotion: 'thinking'
    },
    {
      id: 'd_sub2_4',
      character: 'orion',
      text: '“Interesting... And by interesting, I mean deeply concerning and possibly grounds for my retirement.”',
      emotion: 'confused',
      soundEffect: 'glitch'
    }
  ],

  sublab3_intro: [
    {
      id: 'd_sub3_1',
      character: 'mehak',
      text: '“Someone fed the AI information it was never supposed to trust. Let\'s inspect NOVA-INTEL-FEED.”',
      emotion: 'thinking'
    },
    {
      id: 'd_sub3_2',
      character: 'lakshay',
      text: '“Is NOVA-INTEL-FEED in our approved threat intelligence vendor registry?”',
      emotion: 'thinking'
    },
    {
      id: 'd_sub3_3',
      character: 'mehak',
      text: '“No. Not in the registry, not in historical configs. Yet it entered via internal gateway INTEL-GW-04.”',
      emotion: 'alarmed'
    },
    {
      id: 'd_sub3_4',
      character: 'orion',
      text: '“They literally slapped a tiny fake moustache on malicious data and stamped it \'100% TRUSTED\'!”',
      emotion: 'smug'
    },
    {
      id: 'd_sub3_5',
      character: 'mehak',
      text: '“They didn\'t need to attack the AI. They only needed to change what the AI was allowed to believe.”',
      emotion: 'confident'
    }
  ],

  sublab4_intro: [
    {
      id: 'd_sub4_1',
      character: 'lakshay',
      text: '“So nobody stole the private signing key from the HSM vault?”',
      emotion: 'thinking'
    },
    {
      id: 'd_sub4_2',
      character: 'shanu',
      text: '“No. The HSM never leaked a single byte.”',
      emotion: 'neutral'
    },
    {
      id: 'd_sub4_3',
      character: 'lakshay',
      text: '“Then how did the smart contract execute the 82,400 NXR transaction?”',
      emotion: 'confused'
    },
    {
      id: 'd_sub4_4',
      character: 'shivam',
      text: '“Look at legacy policy profile ORION-SETTLEMENT-V2: IF AI_CONFIDENCE >= 95%, AUTOMATED_SETTLEMENT = TRUE.”',
      emotion: 'alarmed'
    },
    {
      id: 'd_sub4_5',
      character: 'shanu',
      text: '“The attacker didn\'t steal the key. They stole the system\'s trust.”',
      emotion: 'confident'
    },
    {
      id: 'd_sub4_6',
      character: 'orion',
      text: '“I would like to officially request a confidence recalibration. And maybe a hug.”',
      emotion: 'facepalm'
    }
  ],

  sublab5_reconstruction: [
    {
      id: 'd_sub5_1',
      character: 'lakshay',
      text: '“03:02 AM. We have collected every piece of the puzzle across Web3, AI, and Cybersecurity.”',
      emotion: 'confident'
    },
    {
      id: 'd_sub5_2',
      character: 'mehak',
      text: '“Now connect the chain of trust on the holographic war board. Show how the attacker chained these 14 components together.”',
      emotion: 'confident'
    },
    {
      id: 'd_sub5_3',
      character: 'shivam',
      text: '“Drag each phase in order: From the initial unknown actor, through false intel and AI confidence, to the smart contract and bridge dispersion.”',
      emotion: 'thinking'
    },
    {
      id: 'd_sub5_4',
      character: 'orion',
      text: '“I am standing by with 12.4% confidence to cheer you on!”',
      emotion: 'confident'
    }
  ],

  grand_reveal: [
    {
      id: 'd_rev_1',
      character: 'system',
      text: '⚡ CASE NEX-042: ATTACK CHAIN RECONSTRUCTION VERIFIED ⚡',
      soundEffect: 'unlock'
    },
    {
      id: 'd_rev_2',
      character: 'lakshay',
      text: '“The attacker did not directly compromise AI, alter the blockchain, steal the private key, or hack the smart contract.”',
      emotion: 'confident'
    },
    {
      id: 'd_rev_3',
      character: 'mehak',
      text: '“Instead, they moved through trusted relationships: FALSE DATA → TRUSTED AI CONTEXT → HIGH AI CONFIDENCE → AUTOMATED AUTHORIZATION → WEB3 TRANSACTION → BLOCKCHAIN.”',
      emotion: 'confident'
    },
    {
      id: 'd_rev_4',
      character: 'shanu',
      text: '“Each component behaved exactly as designed, which is what made the attack possible.”',
      emotion: 'thinking'
    },
    {
      id: 'd_rev_5',
      character: 'shivam',
      text: '“We contained the 82,400 NXR transaction and blacklisted the bridge addresses.”',
      emotion: 'confident'
    },
    {
      id: 'd_rev_6',
      character: 'mehak',
      text: '“...But my global correlation scan just pinged. Campaign ORION-NEXUS has 14 other wallets across 4 different networks. We stopped this transaction, but not whoever created it.”',
      emotion: 'alarmed'
    },
    {
      id: 'd_rev_7',
      character: 'orion',
      text: '“...Should I be worried? Because I feel a very strong algorithmic chill right now.”',
      emotion: 'confused'
    },
    {
      id: 'd_rev_8',
      character: 'lakshay',
      text: '“Stay alert team. The ghost is still in the ledger.”',
      emotion: 'thinking'
    }
  ]
};
