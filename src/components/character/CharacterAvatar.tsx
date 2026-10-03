import React from 'react';
import { motion } from 'framer-motion';
import type { CharacterEmotion, CharacterId } from '../../types/investigation';
import { CHARACTERS } from '../../data/storyData';

interface CharacterAvatarProps {
  characterId: CharacterId;
  emotion?: CharacterEmotion;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  characterId,
  emotion = 'neutral',
  isSpeaking = false,
  size = 'md',
  className = '',
  showBadge = false,
}) => {
  const profile = CHARACTERS[characterId] || {
    name: 'SYSTEM',
    role: 'SOC Terminal',
    colorAccent: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.4)',
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  };

  // Avatar SVG Renderers
  const renderAvatarContent = () => {
    switch (characterId) {
      case 'lakshay':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="lakshay-skin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4a373" />
                <stop offset="100%" stopColor="#b08968" />
              </linearGradient>
              <linearGradient id="lakshay-suit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="lakshay-hair" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1e24" />
                <stop offset="100%" stopColor="#0d0d11" />
              </linearGradient>
            </defs>

            {/* Suit & Collar */}
            <path d="M 15 95 C 20 72, 35 68, 50 68 C 65 68, 80 72, 85 95 Z" fill="url(#lakshay-suit)" stroke="#00F0FF" strokeWidth="1.5" />
            <path d="M 40 70 L 50 82 L 60 70 Z" fill="#00F0FF" opacity="0.8" />
            <circle cx="50" cy="78" r="2" fill="#ffffff" />
            <path d="M 30 75 L 20 95 M 70 75 L 80 95" stroke="#00F0FF" strokeWidth="1" opacity="0.4" />

            {/* Neck */}
            <rect x="42" y="52" width="16" height="18" fill="url(#lakshay-skin)" />
            <path d="M 42 62 Q 50 68 58 62" stroke="#8b5e34" strokeWidth="1.5" fill="none" opacity="0.4" />

            {/* Head */}
            <ellipse cx="50" cy="42" rx="19" ry="22" fill="url(#lakshay-skin)" />
            
            {/* Beard & Jawline */}
            <path d="M 33 42 C 34 58, 42 63, 50 63 C 58 63, 66 58, 67 42 C 67 52, 58 60, 50 60 C 42 60, 33 52, 33 42 Z" fill="#1e1e24" opacity="0.75" />

            {/* Cyber Visor / Smart Eyewear */}
            <rect x="33" y="34" width="34" height="9" rx="3" fill="#0b1329" stroke="#00F0FF" strokeWidth="1.5" />
            <line x1="36" y1="38" x2="64" y2="38" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="60" cy="38" r="2" fill="#00F0FF" className="animate-pulse" />

            {/* Hair */}
            <path d="M 29 38 C 28 22, 40 16, 50 16 C 60 16, 72 22, 71 38 C 68 26, 58 20, 50 20 C 40 20, 32 26, 29 38 Z" fill="url(#lakshay-hair)" />
            <path d="M 32 26 Q 42 17 55 22" stroke="#334155" strokeWidth="2" fill="none" />

            {/* Emotion Details */}
            {emotion === 'alarmed' && (
              <>
                <circle cx="50" cy="54" r="3" fill="#332211" />
                <path d="M 36 28 L 44 31 M 64 28 L 56 31" stroke="#00F0FF" strokeWidth="2" />
              </>
            )}
            {emotion === 'thinking' && (
              <path d="M 45 54 Q 50 52 55 54" stroke="#5a3d28" strokeWidth="2" fill="none" />
            )}
            {emotion === 'confident' && (
              <path d="M 44 53 Q 50 58 56 53" stroke="#5a3d28" strokeWidth="2" fill="none" />
            )}
            {(emotion === 'neutral' || emotion === 'smug') && (
              <line x1="45" y1="54" x2="55" y2="54" stroke="#5a3d28" strokeWidth="2" />
            )}
          </svg>
        );

      case 'shivam':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="shivam-skin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0a96d" />
                <stop offset="100%" stopColor="#bf854b" />
              </linearGradient>
              <linearGradient id="shivam-hoodie" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
            </defs>

            {/* Tech Hoodie with Blockchain Hexagons */}
            <path d="M 12 95 C 18 70, 32 66, 50 66 C 68 66, 82 70, 88 95 Z" fill="url(#shivam-hoodie)" stroke="#10B981" strokeWidth="1.5" />
            <path d="M 50 66 L 50 95" stroke="#10B981" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
            <polygon points="50,72 55,75 55,81 50,84 45,81 45,75" fill="#10B981" opacity="0.8" />

            {/* Neck */}
            <rect x="42" y="50" width="16" height="18" fill="url(#shivam-skin)" />

            {/* Head */}
            <ellipse cx="50" cy="40" rx="18" ry="21" fill="url(#shivam-skin)" />

            {/* Modern Hair + Side Fade */}
            <path d="M 30 36 C 29 20, 42 14, 52 14 C 64 14, 71 22, 70 36 C 66 22, 54 18, 48 18 C 40 18, 33 24, 30 36 Z" fill="#171717" />
            <path d="M 30 32 L 34 22 L 40 28" fill="#171717" />

            {/* Glasses (Blockchain Forensics HUD) */}
            <rect x="34" y="34" width="13" height="9" rx="2" fill="#042f2e" stroke="#10B981" strokeWidth="1.5" />
            <rect x="53" y="34" width="13" height="9" rx="2" fill="#042f2e" stroke="#10B981" strokeWidth="1.5" />
            <line x1="47" y1="38" x2="53" y2="38" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="40" cy="38" r="1.5" fill="#34d399" />
            <circle cx="59" cy="38" r="1.5" fill="#34d399" />

            {/* Mouth */}
            {emotion === 'confused' ? (
              <path d="M 44 54 Q 48 51 56 55" stroke="#5a3d28" strokeWidth="2" fill="none" />
            ) : (
              <line x1="44" y1="53" x2="56" y2="53" stroke="#5a3d28" strokeWidth="2" />
            )}
          </svg>
        );

      case 'shanu':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="shanu-skin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3c699" />
                <stop offset="100%" stopColor="#d99b66" />
              </linearGradient>
              <linearGradient id="shanu-jacket" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b0764" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>

            {/* Neural Jacket */}
            <path d="M 14 95 C 18 72, 34 67, 50 67 C 66 67, 82 72, 86 95 Z" fill="url(#shanu-jacket)" stroke="#A855F7" strokeWidth="1.5" />
            <path d="M 38 68 L 50 86 L 62 68" stroke="#C084FC" strokeWidth="1.5" fill="none" />
            <circle cx="50" cy="80" r="3" fill="#A855F7" />

            {/* Neck */}
            <rect x="43" y="51" width="14" height="18" fill="url(#shanu-skin)" />

            {/* Head */}
            <ellipse cx="50" cy="40" rx="17" ry="20" fill="url(#shanu-skin)" />

            {/* Stylish Violet-Tinted Hair */}
            <path d="M 28 42 C 26 22, 38 12, 50 12 C 64 12, 74 20, 72 44 C 70 54, 66 62, 65 65 C 62 50, 68 30, 50 20 C 35 25, 33 46, 31 56 Z" fill="#2e1065" />
            <path d="M 32 30 C 38 18, 54 18, 62 26" stroke="#c084fc" strokeWidth="2" fill="none" opacity="0.8" />

            {/* Eyes / Neural Monocle */}
            <circle cx="41" cy="38" r="2.5" fill="#1e1b4b" />
            <circle cx="42" cy="37" r="0.8" fill="#ffffff" />
            <circle cx="59" cy="38" r="5.5" fill="#581c87" stroke="#C084FC" strokeWidth="1.5" />
            <circle cx="59" cy="38" r="2.5" fill="#E879F9" />

            {/* Expression */}
            {emotion === 'smug' && (
              <path d="M 45 52 Q 52 56 57 51" stroke="#6b21a8" strokeWidth="2" fill="none" />
            )}
            {emotion === 'thinking' && (
              <path d="M 44 53 Q 49 50 55 53" stroke="#6b21a8" strokeWidth="2" fill="none" />
            )}
            {(emotion === 'neutral' || emotion === 'confident' || emotion === 'confused') && (
              <line x1="45" y1="53" x2="55" y2="53" stroke="#6b21a8" strokeWidth="2" />
            )}
          </svg>
        );

      case 'mehak':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="mehak-skin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5a677" />
                <stop offset="100%" stopColor="#c67d49" />
              </linearGradient>
              <linearGradient id="mehak-tactical" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4c0519" />
                <stop offset="100%" stopColor="#1c1917" />
              </linearGradient>
            </defs>

            {/* Threat Intel Tactical Vest */}
            <path d="M 14 95 C 19 71, 33 66, 50 66 C 67 66, 81 71, 86 95 Z" fill="url(#mehak-tactical)" stroke="#EC4899" strokeWidth="1.5" />
            <rect x="36" y="74" width="28" height="14" rx="2" fill="#18181b" stroke="#F43F5E" strokeWidth="1" />
            <line x1="40" y1="81" x2="60" y2="81" stroke="#F43F5E" strokeWidth="2" />

            {/* Tactical Earpiece */}
            <path d="M 68 38 L 72 44 L 69 48" stroke="#EC4899" strokeWidth="2" fill="none" />
            <circle cx="72" cy="44" r="2" fill="#F43F5E" className="animate-pulse" />

            {/* Neck */}
            <rect x="43" y="50" width="14" height="18" fill="url(#mehak-skin)" />

            {/* Head */}
            <ellipse cx="50" cy="39" rx="17" ry="20" fill="url(#mehak-skin)" />

            {/* Sleek Dark Ponytail Hair */}
            <path d="M 28 36 C 27 18, 42 12, 54 12 C 68 12, 73 22, 72 38 C 66 22, 54 16, 44 17 C 35 18, 30 25, 28 36 Z" fill="#09090b" />
            <path d="M 68 28 C 76 32, 82 46, 80 62 C 78 54, 76 42, 68 36 Z" fill="#09090b" />

            {/* Sharp Eyes */}
            <ellipse cx="42" cy="37" rx="3" ry="2" fill="#18181b" />
            <ellipse cx="58" cy="37" rx="3" ry="2" fill="#18181b" />
            <path d="M 38 33 L 46 34 M 62 33 L 54 34" stroke="#F43F5E" strokeWidth="1.5" />

            {/* Mouth */}
            <line x1="45" y1="51" x2="55" y2="51" stroke="#831843" strokeWidth="2" />
          </svg>
        );

      case 'orion':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="orion-chassis" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="orion-screen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#082f49" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </linearGradient>
            </defs>

            {/* Floating Thruster Rings */}
            <ellipse cx="50" cy="84" rx="20" ry="5" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.6" className="animate-pulse" />
            <ellipse cx="50" cy="90" rx="12" ry="3" fill="#38BDF8" opacity="0.4" />

            {/* Cute Antenna with glowing beacon */}
            <line x1="50" y1="18" x2="50" y2="8" stroke="#38BDF8" strokeWidth="2.5" />
            <circle cx="50" cy="7" r="4" fill={emotion === 'confused' || emotion === 'glitch' ? '#EF4444' : '#FBBF24'} className="animate-ping" opacity="0.8" />
            <circle cx="50" cy="7" r="3" fill={emotion === 'confused' || emotion === 'glitch' ? '#EF4444' : '#FBBF24'} />

            {/* Spherical Robot Chassis */}
            <circle cx="50" cy="48" r="32" fill="url(#orion-chassis)" stroke="#38BDF8" strokeWidth="2.5" />
            <circle cx="50" cy="48" r="29" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 3" />

            {/* Digital Face Visor */}
            <rect x="26" y="32" width="48" height="30" rx="12" fill="url(#orion-screen)" stroke="#38BDF8" strokeWidth="1.5" />

            {/* Robot Expressions */}
            {emotion === 'confident' && (
              <>
                <path d="M 33 46 Q 39 38 45 46" stroke="#38BDF8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 55 46 Q 61 38 67 46" stroke="#38BDF8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 44 54 Q 50 58 56 54" stroke="#FDE047" strokeWidth="2" fill="none" />
              </>
            )}

            {emotion === 'thinking' && (
              <>
                <circle cx="38" cy="44" r="4" fill="#38BDF8" />
                <circle cx="62" cy="44" r="4" fill="#38BDF8" />
                <line x1="43" y1="55" x2="57" y2="55" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="3 2" />
              </>
            )}

            {emotion === 'confused' && (
              <>
                {/* One big eye, one small squiggly */}
                <circle cx="37" cy="42" r="6" fill="#F87171" />
                <path d="M 58 46 Q 63 40 68 46" stroke="#F87171" strokeWidth="3" fill="none" />
                <path d="M 42 56 Q 50 51 58 56" stroke="#F87171" strokeWidth="2" fill="none" />
                <text x="70" y="32" fill="#F87171" fontSize="14" fontWeight="bold">?</text>
              </>
            )}

            {emotion === 'facepalm' && (
              <>
                <line x1="33" y1="44" x2="45" y2="44" stroke="#94A3B8" strokeWidth="3" />
                <line x1="55" y1="44" x2="67" y2="44" stroke="#94A3B8" strokeWidth="3" />
                {/* Tiny robot metallic hand over face */}
                <rect x="42" y="38" width="16" height="18" rx="4" fill="#0284c7" stroke="#38BDF8" strokeWidth="1.5" />
                <line x1="46" y1="42" x2="46" y2="50" stroke="#bae6fd" strokeWidth="1" />
                <line x1="50" y1="42" x2="50" y2="50" stroke="#bae6fd" strokeWidth="1" />
                <line x1="54" y1="42" x2="54" y2="50" stroke="#bae6fd" strokeWidth="1" />
              </>
            )}

            {(emotion === 'neutral' || emotion === 'smug') && (
              <>
                <circle cx="39" cy="45" r="4.5" fill="#38BDF8" className="animate-pulse" />
                <circle cx="61" cy="45" r="4.5" fill="#38BDF8" className="animate-pulse" />
                <line x1="45" y1="55" x2="55" y2="55" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              </>
            )}

            {emotion === 'glitch' && (
              <>
                <rect x="30" y="38" width="16" height="4" fill="#EF4444" />
                <rect x="52" y="44" width="18" height="4" fill="#FBBF24" />
                <line x1="30" y1="52" x2="70" y2="52" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
              </>
            )}
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-cyan-400 font-tech font-bold text-xs">
            SYS
          </div>
        );
    }
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Outer Holographic Glow Ring */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.06, 1] : 1,
          boxShadow: isSpeaking
            ? `0 0 25px ${profile.glowColor}, inset 0 0 15px ${profile.glowColor}`
            : `0 0 10px ${profile.glowColor}`,
        }}
        transition={{ duration: 1.2, repeat: isSpeaking ? Infinity : 0 }}
        className={`relative rounded-full p-1 border-2 ${sizeClasses[size]} flex items-center justify-center bg-slate-950/80 overflow-hidden backdrop-blur-md`}
        style={{ borderColor: profile.colorAccent }}
      >
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none animate-scanline" />

        {/* Character Illustration */}
        <motion.div
          animate={{
            y: characterId === 'orion' ? [0, -4, 0] : isSpeaking ? [0, -2, 0] : 0,
            rotate: emotion === 'confused' ? [0, -3, 0] : 0,
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          {renderAvatarContent()}
        </motion.div>

        {/* Speaking Audio Wave Indicator */}
        {isSpeaking && (
          <div className="absolute bottom-1 flex items-center gap-0.5 z-10 bg-slate-950/90 px-1.5 py-0.5 rounded-full border border-cyan-500/40">
            <span className="w-1 h-2 bg-cyan-400 animate-pulse rounded-full" />
            <span className="w-1 h-3.5 bg-cyan-400 animate-pulse delay-75 rounded-full" />
            <span className="w-1 h-1.5 bg-cyan-400 animate-pulse delay-150 rounded-full" />
          </div>
        )}
      </motion.div>

      {/* Name and Role Badge (Optional) */}
      {showBadge && (
        <div className="mt-2 text-center">
          <div
            className="text-xs font-cyber font-bold tracking-wider uppercase"
            style={{ color: profile.colorAccent }}
          >
            {profile.name}
          </div>
          <div className="text-[10px] text-slate-400 font-sans">{profile.role}</div>
        </div>
      )}
    </div>
  );
};
