import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ArrowRight, 
  Sparkles, 
  Quote, 
  Cpu, 
  Shield, 
  Search, 
  TerminalSquare 
} from 'lucide-react';
import { CHARACTERS } from '../../data/storyData';
import { CharacterAvatar } from '../character/CharacterAvatar';
import type { CharacterId } from '../../types/investigation';
import { sound } from '../../services/sound';

interface Scene1TeamAssembleProps {
  onComplete: () => void;
}

export const Scene1TeamAssemble: React.FC<Scene1TeamAssembleProps> = ({ onComplete }) => {
  const [selectedCharId, setSelectedCharId] = useState<CharacterId>('lakshay');
  const [readyMembers, setReadyMembers] = useState<string[]>(['lakshay']);

  const charList: CharacterId[] = ['lakshay', 'shivam', 'shanu', 'mehak', 'orion'];

  const handleSelectChar = (id: CharacterId) => {
    setSelectedCharId(id);
    sound.playBlip(650);
    if (!readyMembers.includes(id)) {
      setReadyMembers([...readyMembers, id]);
    }
  };

  const selectedProfile = CHARACTERS[selectedCharId];

  const getRoleIcon = (id: CharacterId) => {
    switch (id) {
      case 'lakshay':
        return <Shield className="w-4 h-4 text-cyan-400" />;
      case 'shivam':
        return <TerminalSquare className="w-4 h-4 text-emerald-400" />;
      case 'shanu':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'mehak':
        return <Search className="w-4 h-4 text-pink-400" />;
      case 'orion':
        return <Sparkles className="w-4 h-4 text-sky-400" />;
      default:
        return <Users className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[82vh] py-6 px-4 select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-tech tracking-widest uppercase mb-1">
          <Users className="w-4 h-4" />
          <span>INCIDENT RESPONSE SPECIALISTS // ASSEMBLED</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-display font-black text-slate-100 tracking-wide">
          THE INVESTIGATION TEAM
        </h2>
        <p className="text-slate-400 font-sans text-xs md:text-sm max-w-lg mx-auto mt-1">
          Click each specialist below to inspect their tactical role, technical background, and forensic toolkit.
        </p>
      </div>

      {/* Team Roster Lineup Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full mb-6">
        {charList.map((id) => {
          const char = CHARACTERS[id];
          const isSelected = selectedCharId === id;
          const isReady = readyMembers.includes(id);

          return (
            <motion.div
              key={id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectChar(id)}
              className={`p-4 rounded-2xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
              style={isSelected ? { borderColor: char.colorAccent } : {}}
            >
              <CharacterAvatar
                characterId={id}
                emotion={isSelected ? 'confident' : 'neutral'}
                isSpeaking={isSelected}
                size="md"
              />

              <div className="mt-3 w-full">
                <div
                  className="font-cyber font-bold text-xs md:text-sm truncate uppercase tracking-wider"
                  style={{ color: char.colorAccent }}
                >
                  {char.name}
                </div>
                <div className="text-[10px] text-slate-400 font-sans truncate mt-0.5">
                  {char.role}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 w-full flex items-center justify-between text-[10px] font-tech text-slate-400">
                <span className="flex items-center gap-1">
                  {getRoleIcon(id)} {id.toUpperCase()}
                </span>
                <span className={isReady ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {isReady ? '✓ READY' : 'CLICK'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Dossier Profile Detail Box */}
      {selectedProfile && (
        <motion.div
          key={selectedCharId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full glass-panel rounded-3xl p-6 border mb-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl"
          style={{
            borderColor: `${selectedProfile.colorAccent}40`,
            boxShadow: `0 0 35px ${selectedProfile.glowColor}`,
          }}
        >
          <div className="shrink-0 flex flex-col items-center">
            <CharacterAvatar
              characterId={selectedCharId}
              emotion="confident"
              isSpeaking={true}
              size="lg"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-cyber font-bold tracking-wider uppercase border"
                style={{
                  color: selectedProfile.colorAccent,
                  borderColor: `${selectedProfile.colorAccent}60`,
                  backgroundColor: `${selectedProfile.colorAccent}15`,
                }}
              >
                {selectedProfile.name}
              </span>
              <span className="text-xs font-tech text-slate-300">
                // {selectedProfile.role}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 font-sans text-sm italic flex items-start gap-2">
              <Quote className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{selectedProfile.introQuote}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="font-tech text-cyan-400 block mb-0.5">CORE SPECIALTY:</span>
                <span className="text-slate-300 font-sans">{selectedProfile.specialty}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="font-tech text-cyan-400 block mb-0.5">BACKGROUND DOSSIER:</span>
                <span className="text-slate-300 font-sans">{selectedProfile.description}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Advance to Sub-Lab 01 */}
      <button
        onClick={() => {
          sound.playBlip(900);
          onComplete();
        }}
        className="px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-black font-cyber font-extrabold text-base tracking-widest shadow-[0_0_35px_rgba(16,185,129,0.35)] flex items-center gap-3 transition-all transform hover:scale-105 cursor-pointer"
      >
        <span>LAUNCH SUB-LAB 01: THE WALLET THAT LIED</span>
        <ArrowRight className="w-5 h-5 text-black" />
      </button>
    </div>
  );
};
