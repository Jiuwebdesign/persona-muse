import React, { useState } from 'react';
import { Eye, Volume2, Edit, Save, X } from 'lucide-react';
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
  language 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPersona, setEditedPersona] = useState(persona);

  const t = (key: string) => getTranslation(language, key);

  const handleVoicePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingVoice(true);
    setTimeout(() => setIsPlayingVoice(false), 3000);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditedPersona(persona);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(persona.id, editedPersona);
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditedPersona(persona);
  };

  const getAccentColor = (id: string) => {
    const colors = ['bg-blue-500', 'bg-orange-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500'];
    return colors[parseInt(id) % colors.length];
  };

  const accentColor = getAccentColor(persona.id);

  return (
    <>
      <div
        className={`bg-white rounded-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-2 ${
          isSelected ? 'border-purple-500' : 'border-gray-200'
        }`}
        onClick={() => onSelect(persona.id)}
        style={{ aspectRatio: '3/4' }}
      >
        <div className="h-full flex flex-col">
          {/* Header Section */}
          <div className="bg-gray-100 p-4 border-b-2 border-black">
            <div className="flex items-start justify-between mb-2">
              <div className="text-xs font-bold tracking-wider text-gray-600 transform -rotate-90 origin-left whitespace-nowrap" style={{ transformOrigin: '0 0' }}>
                {isEditing ? (
                  <input
                    value={editedPersona.category || ''}
                    onChange={(e) => setEditedPersona({...editedPersona, category: e.target.value})}
                    className="w-20 text-xs bg-transparent border-b border-gray-400"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  persona.category?.toUpperCase() || 'PERSONA'
                )}
              </div>
              <div className="text-right flex-1 ml-8">
                <div className="text-xs text-gray-600 mb-1">{t('annualSalary')}</div>
                <div className="flex items-center justify-end">
                  <div className="text-lg font-bold">
                    {isEditing ? (
                      <input
                        value={editedPersona.demographics.income.split(' - ')[0].replace('$', '').replace(',', '')}
                        onChange={(e) => setEditedPersona({
                          ...editedPersona,
                          demographics: {
                            ...editedPersona.demographics,
                            income: `$${e.target.value},000 - $${parseInt(e.target.value) + 35},000`
                          }
                        })}
                        className="w-12 text-lg bg-transparent border-b border-gray-400"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      persona.demographics.income.split(' - ')[0].replace('$', '').replace(',', '')
                    )}K
                  </div>
                  <div className="ml-2 w-6 h-0.5 bg-black"></div>
                  <div className="ml-2 w-2 h-2 border border-black transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Lifestyle indicators */}
            <div className="mb-3">
              <div className="text-xs font-bold mb-1">{t('outdoorActivity')}</div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-3 h-3 ${i <= 3 ? 'bg-black' : 'bg-gray-300'}`}></div>
                ))}
              </div>
            </div>

            {/* Key trait */}
            <div className="bg-black text-white px-2 py-1 text-xs font-bold mb-3 inline-block">
              {isEditing ? (
                <input
                  value={editedPersona.psychographics.personality[0] || ''}
                  onChange={(e) => setEditedPersona({
                    ...editedPersona,
                    psychographics: {
                      ...editedPersona.psychographics,
                      personality: [e.target.value, ...editedPersona.psychographics.personality.slice(1)]
                    }
                  })}
                  className="bg-black text-white text-xs w-20"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                persona.psychographics.personality[0]?.toUpperCase() || 'TRAIT'
              )}
            </div>

            {/* Activities */}
            <div className="text-xs space-y-1">
              {persona.psychographics.interests.slice(0, 3).map((interest, index) => (
                <div key={index} className="text-gray-700">
                  {isEditing ? (
                    <input
                      value={interest}
                      onChange={(e) => {
                        const newInterests = [...editedPersona.psychographics.interests];
                        newInterests[index] = e.target.value;
                        setEditedPersona({
                          ...editedPersona,
                          psychographics: {
                            ...editedPersona.psychographics,
                            interests: newInterests
                          }
                        });
                      }}
                      className="text-xs bg-transparent border-b border-gray-400 w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    interest.toUpperCase()
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quote Section */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-800 leading-relaxed mb-4">
                {isEditing ? (
                  <textarea
                    value={editedPersona.quote}
                    onChange={(e) => setEditedPersona({...editedPersona, quote: e.target.value})}
                    className="w-full text-sm bg-transparent border border-gray-300 rounded p-2 resize-none"
                    rows={3}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  `«${persona.quote}»`
                )}
              </p>
            </div>

            {/* Sliders */}
            <div className="space-y-3 mb-4">
              <div>
                <div className="text-xs font-bold mb-1">{t('webComfort')}</div>
                <div className="relative h-1 bg-gray-300">
                  <div className="absolute left-0 top-0 h-full w-3/4 bg-black"></div>
                  <div className="absolute left-3/4 top-0 w-2 h-2 bg-black transform -translate-y-0.5 rotate-45"></div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold mb-1">{t('patience')}</div>
                <div className="relative h-1 bg-gray-300">
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-black"></div>
                  <div className="absolute left-1/2 top-0 w-2 h-2 bg-black transform -translate-y-0.5 rotate-45"></div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold mb-1">{t('budget')}</div>
                <div className="relative h-1 bg-gray-300">
                  <div className="absolute left-0 top-0 h-full w-2/3 bg-black"></div>
                  <div className="absolute left-2/3 top-0 w-2 h-2 bg-black transform -translate-y-0.5 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Image and Name Section */}
          <div className="relative bg-black text-white">
            <div className="flex">
              <div className="flex-1 p-4">
                <div className="text-xs text-gray-400 mb-1 transform -rotate-90 origin-left absolute left-2 top-1/2 whitespace-nowrap">
                  {isEditing ? (
                    <input
                      value={editedPersona.age}
                      onChange={(e) => setEditedPersona({...editedPersona, age: parseInt(e.target.value) || 0})}
                      className="w-8 text-xs bg-black text-white"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    persona.age
                  )} {t('years')}
                </div>
                <div className="ml-8">
                  <h3 className="text-2xl font-bold tracking-wider">
                    {isEditing ? (
                      <input
                        value={editedPersona.name}
                        onChange={(e) => setEditedPersona({...editedPersona, name: e.target.value})}
                        className="bg-black text-white text-2xl font-bold w-full"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      persona.name.toUpperCase()
                    )}
                  </h3>
                </div>
              </div>
              <div className="w-24 h-24 relative overflow-hidden">
                <img
                  src={persona.imageUrl}
                  alt={persona.name}
                  className="w-full h-full object-cover grayscale"
                />
                <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${accentColor}`}></div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-3 bg-gray-50 border-t">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="flex items-center text-xs text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              <Eye className="w-3 h-3 mr-1" />
              {t('details')}
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleVoicePlay}
                className={`flex items-center text-xs transition-colors font-medium ${
                  isPlayingVoice ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Volume2 className={`w-3 h-3 mr-1 ${isPlayingVoice ? 'animate-pulse' : ''}`} />
                {isPlayingVoice ? t('listening') : t('voice')}
              </button>
              
              {isEditing ? (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleSave}
                    className="flex items-center text-xs text-green-600 hover:text-green-700 transition-colors font-medium"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    {t('save')}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center text-xs text-red-600 hover:text-red-700 transition-colors font-medium"
                  >
                    <X className="w-3 h-3 mr-1" />
                    {t('cancel')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center text-xs text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  {t('edit')}
                </button>
              )}
            </div>
          </div>
        </div>
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