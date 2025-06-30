import React, { useState, useEffect } from 'react';
import { CheckCircle, Eye, Edit3, Save, X, Trash2 } from 'lucide-react';
import { Persona, Language } from '../types';
import { PersonaModal } from './PersonaModal';
import { getTranslation } from '../utils/translations';

interface EditablePersonaCardProps {
  persona: Persona;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updatedPersona: Partial<Persona>) => void;
  language: Language;
}

export const EditablePersonaCard: React.FC<EditablePersonaCardProps> = ({
  persona,
  isSelected,
  onSelect,
  onUpdate,
  language,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPersona, setEditedPersona] = useState(persona);
  const [showModal, setShowModal] = useState(false);
  const t = (key: string) => getTranslation(language, key);

  useEffect(() => {
    setEditedPersona(persona);
  }, [persona]);

  const handleSave = () => {
    onUpdate(persona.id, editedPersona);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedPersona(persona);
    setIsEditing(false);
  };

  const CardContent = () => (
    <div className="relative w-full h-full flex flex-col justify-between p-5">
      {/* Selection Overlay */}
      {isSelected && (
        <div className="absolute inset-0 bg-brand-green/80 flex items-center justify-center">
          <CheckCircle className="w-16 h-16 text-black" />
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start text-white">
        {isEditing ? (
          <input 
            type="text" 
            value={editedPersona.name}
            onChange={(e) => setEditedPersona({...editedPersona, name: e.target.value})}
            className="font-display text-3xl bg-transparent border-b border-white/50 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <h3 className="font-display text-3xl">{persona.name}</h3>
        )}
        <span className="font-sans text-lg">{persona.age}</span>
      </div>
      
      {/* Footer */}
      <div className="text-white">
        {isEditing ? (
          <textarea
            value={editedPersona.bio}
            onChange={(e) => setEditedPersona({...editedPersona, bio: e.target.value})}
            className="w-full text-sm bg-black/20 rounded-md p-2 border border-white/30 focus:outline-none focus:ring-1 focus:ring-brand-green"
            rows={3}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <p className="text-sm">{persona.bio}</p>
        )}
        
        {isEditing ? (
            <div className="flex justify-end space-x-2 mt-2">
                <button onClick={(e) => { e.stopPropagation(); handleCancel(); }} className="p-2 bg-black/20 rounded-full hover:bg-red-500"><X className="w-4 h-4"/></button>
                <button onClick={(e) => { e.stopPropagation(); handleSave(); }} className="p-2 bg-brand-green text-black rounded-full hover:scale-110"><Save className="w-4 h-4"/></button>
            </div>
        ) : (
            <div className="flex justify-end space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); setShowModal(true); }} className="p-2 bg-black/20 rounded-full hover:bg-white/40"><Eye className="w-4 h-4"/></button>
                <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="p-2 bg-black/20 rounded-full hover:bg-white/40"><Edit3 className="w-4 h-4"/></button>
            </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div
        className="group relative rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-300 transform-gpu"
        onClick={() => onSelect(persona.id)}
        style={{
          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isSelected ? `0 0 20px rgba(188, 255, 101, 0.7)` : '0 10px 15px rgba(0,0,0,0.1)',
        }}
      >
        {/* Background Image */}
        <img
          src={persona.imageUrl}
          alt={persona.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        {/* Content */}
        <CardContent />
      </div>
      <PersonaModal
        persona={persona}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        language={language}
      />
    </>
  );
};