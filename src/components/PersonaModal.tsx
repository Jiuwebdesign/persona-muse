import React, { useState, useEffect, useRef } from 'react';
import { X, User, MapPin, Briefcase, Target, Frown, Activity, Heart, Lightbulb, CheckCircle, AlertCircle, Edit3, Save, Camera, Upload } from 'lucide-react';
import { Persona, Language } from '../types';
import { MoodBoard } from './MoodBoard';
import { getTranslation } from '../utils/translations';

interface PersonaModalProps {
  persona: Persona;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedPersona: Partial<Persona>) => void;
  language: Language;
}

export const PersonaModal: React.FC<PersonaModalProps> = ({ persona, isOpen, onClose, onUpdate, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPersona, setEditedPersona] = useState(persona);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = (key: string) => getTranslation(language, key);

  useEffect(() => {
    setEditedPersona(persona);
    setImagePreview(null);
  }, [persona]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setEditedPersona({...editedPersona, imageUrl: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedPersona);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPersona(persona);
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Persona Details</h2>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-opacity-80 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    {t('save')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-opacity-80 transition-colors flex items-center"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  {t('edit')}
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={imagePreview || persona.imageUrl}
                      alt={persona.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    {isEditing && (
                      <>
                        <div 
                          onClick={handleImageClick}
                          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                          title={t('changeImage')}
                        >
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedPersona.name}
                        onChange={(e) => setEditedPersona({...editedPersona, name: e.target.value})}
                        className="text-xl font-semibold text-gray-900 bg-gray-50 rounded-md px-2 py-1 mb-2 w-full"
                      />
                    ) : (
                      <h3 className="text-xl font-semibold text-gray-900">{persona.name}</h3>
                    )}
                    <p className="text-gray-600 flex items-center mt-1">
                      <User className="w-4 h-4 mr-1" />
                      {isEditing ? (
                        <input
                          type="number"
                          value={editedPersona.age}
                          onChange={(e) => setEditedPersona({...editedPersona, age: parseInt(e.target.value) || 0})}
                          className="bg-gray-50 rounded px-1 w-16"
                        />
                      ) : (
                        persona.age
                      )} years old
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedPersona.occupation}
                          onChange={(e) => setEditedPersona({...editedPersona, occupation: e.target.value})}
                          className="bg-gray-50 rounded px-1 flex-1"
                        />
                      ) : (
                        persona.occupation
                      )}
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedPersona.location}
                          onChange={(e) => setEditedPersona({...editedPersona, location: e.target.value})}
                          className="bg-gray-50 rounded px-1 flex-1"
                        />
                      ) : (
                        persona.location
                      )}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('bio')}</h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.bio}
                      onChange={(e) => setEditedPersona({...editedPersona, bio: e.target.value})}
                      className="w-full text-gray-600 bg-gray-50 rounded-md p-2 border"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-600">{persona.bio}</p>
                  )}
                </div>

                {/* Quote */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('keyQuote')}</h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.quote}
                      onChange={(e) => setEditedPersona({...editedPersona, quote: e.target.value})}
                      className="w-full text-gray-700 italic bg-white rounded-md p-2 border"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-700 italic">"{persona.quote}"</p>
                  )}
                </div>

                {/* Scenario */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                    {t('scenario')}
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.scenario}
                      onChange={(e) => setEditedPersona({...editedPersona, scenario: e.target.value})}
                      className="w-full text-gray-700 bg-white rounded-md p-2 border"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700">{persona.scenario}</p>
                  )}
                </div>

                {/* Job to Be Done */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    {t('jobToBeDone')}
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.jobToBeDone}
                      onChange={(e) => setEditedPersona({...editedPersona, jobToBeDone: e.target.value})}
                      className="w-full text-gray-700 italic bg-white rounded-md p-2 border"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-700 italic">"{persona.jobToBeDone}"</p>
                  )}
                </div>

                {/* Demographics - Now editable */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('demographics')}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{t('gender')}</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedPersona.demographics.gender}
                          onChange={(e) => setEditedPersona({
                            ...editedPersona,
                            demographics: { ...editedPersona.demographics, gender: e.target.value }
                          })}
                          className="font-medium bg-white rounded px-1 w-full text-sm"
                        />
                      ) : (
                        <div className="font-medium">{persona.demographics.gender}</div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{t('educationLevel')}</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedPersona.demographics.education}
                          onChange={(e) => setEditedPersona({
                            ...editedPersona,
                            demographics: { ...editedPersona.demographics, education: e.target.value }
                          })}
                          className="font-medium bg-white rounded px-1 w-full text-sm"
                        />
                      ) : (
                        <div className="font-medium">{persona.demographics.education}</div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{t('familyStatus')}</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedPersona.demographics.familyStatus}
                          onChange={(e) => setEditedPersona({
                            ...editedPersona,
                            demographics: { ...editedPersona.demographics, familyStatus: e.target.value }
                          })}
                          className="font-medium bg-white rounded px-1 w-full text-sm"
                        />
                      ) : (
                        <div className="font-medium">{persona.demographics.familyStatus}</div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{t('income')}</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedPersona.demographics.income}
                          onChange={(e) => setEditedPersona({
                            ...editedPersona,
                            demographics: { ...editedPersona.demographics, income: e.target.value }
                          })}
                          className="font-medium bg-white rounded px-1 w-full text-sm"
                        />
                      ) : (
                        <div className="font-medium">{persona.demographics.income}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Goals */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    {t('goalsMotivations')}
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.goals.join('\n')}
                      onChange={(e) => setEditedPersona({...editedPersona, goals: e.target.value.split('\n').filter(g => g.trim())})}
                      className="w-full text-gray-600 bg-gray-50 rounded-md p-2 border"
                      rows={4}
                      placeholder="Enter one goal per line"
                    />
                  ) : (
                    <ul className="space-y-2">
                      {persona.goals.map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Frustrations */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Frown className="w-5 h-5 mr-2 text-red-600" />
                    {t('frustrationsPainPoints')}
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.frustrations.join('\n')}
                      onChange={(e) => setEditedPersona({...editedPersona, frustrations: e.target.value.split('\n').filter(f => f.trim())})}
                      className="w-full text-gray-600 bg-gray-50 rounded-md p-2 border"
                      rows={4}
                      placeholder="Enter one frustration per line"
                    />
                  ) : (
                    <ul className="space-y-2">
                      {persona.frustrations.map((frustration, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{frustration}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Previous Experiences */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    {t('previousExperiences')}
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.previousExperiences.join('\n')}
                      onChange={(e) => setEditedPersona({...editedPersona, previousExperiences: e.target.value.split('\n').filter(e => e.trim())})}
                      className="w-full text-gray-600 bg-gray-50 rounded-md p-2 border"
                      rows={3}
                      placeholder="Enter one experience per line"
                    />
                  ) : (
                    <ul className="space-y-2">
                      {persona.previousExperiences.map((experience, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{experience}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Success Criteria */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-yellow-600" />
                    {t('successCriteria')}
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.successCriteria}
                      onChange={(e) => setEditedPersona({...editedPersona, successCriteria: e.target.value})}
                      className="w-full text-gray-700 italic bg-white rounded-md p-2 border"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-700 italic">"{persona.successCriteria}"</p>
                  )}
                </div>

                {/* Behaviors */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    {t('behaviors')}
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={editedPersona.behaviors.join('\n')}
                      onChange={(e) => setEditedPersona({...editedPersona, behaviors: e.target.value.split('\n').filter(b => b.trim())})}
                      className="w-full text-gray-600 bg-gray-50 rounded-md p-2 border"
                      rows={4}
                      placeholder="Enter one behavior per line"
                    />
                  ) : (
                    <ul className="space-y-2">
                      {persona.behaviors.map((behavior, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{behavior}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Psychographics */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-purple-600" />
                    {t('valuesInterests')}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">{t('values')}</div>
                      {isEditing ? (
                        <textarea
                          value={editedPersona.psychographics.values.join(', ')}
                          onChange={(e) => setEditedPersona({
                            ...editedPersona, 
                            psychographics: {
                              ...editedPersona.psychographics,
                              values: e.target.value.split(',').map(v => v.trim()).filter(v => v)
                            }
                          })}
                          className="w-full text-gray-600 bg-gray-50 rounded-md p-2 border text-sm"
                          rows={2}
                          placeholder="Enter values separated by commas"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {persona.psychographics.values.map((value, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                              {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">{t('interests')}</div>
                      {isEditing ? (
                        <textarea
                          value={editedPersona.psychographics.interests.join(', ')}
                          onChange={(e) => setEditedPersona({
                            ...editedPersona, 
                            psychographics: {
                              ...editedPersona.psychographics,
                              interests: e.target.value.split(',').map(i => i.trim()).filter(i => i)
                            }
                          })}
                          className="w-full text-gray-600 bg-gray-50 rounded-md p-2 border text-sm"
                          rows={2}
                          placeholder="Enter interests separated by commas"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {persona.psychographics.interests.map((interest, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {interest}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mood Board */}
                <MoodBoard
                  images={persona.moodBoard}
                  title={t('visualMoodBoard')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};