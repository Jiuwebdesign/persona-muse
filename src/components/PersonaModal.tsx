import React from 'react';
import { X, User, MapPin, Briefcase, Target, Frown, Activity, Heart, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
import { Persona, Language } from '../types';
import { MoodBoard } from './MoodBoard';
import { getTranslation } from '../utils/translations';

interface PersonaModalProps {
  persona: Persona;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PersonaModal: React.FC<PersonaModalProps> = ({ persona, isOpen, onClose, language }) => {
  const t = (key: string) => getTranslation(language, key);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Persona Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-4">
                  <img
                    src={persona.imageUrl}
                    alt={persona.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{persona.name}</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <User className="w-4 h-4 mr-1" />
                      {persona.age} years old
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {persona.occupation}
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {persona.location}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('bio')}</h4>
                  <p className="text-gray-600">{persona.bio}</p>
                </div>

                {/* Quote */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('keyQuote')}</h4>
                  <p className="text-gray-700 italic">"{persona.quote}"</p>
                </div>

                {/* Scenario */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                    {t('scenario')}
                  </h4>
                  <p className="text-gray-700">{persona.scenario}</p>
                </div>

                {/* Job to Be Done */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    {t('jobToBeDone')}
                  </h4>
                  <p className="text-gray-700 italic">"{persona.jobToBeDone}"</p>
                </div>

                {/* Demographics */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('demographics')}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{t('gender')}</div>
                      <div className="font-medium">{persona.demographics.gender}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{t('educationLevel')}</div>
                      <div className="font-medium">{persona.demographics.education}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{t('familyStatus')}</div>
                      <div className="font-medium">{persona.demographics.familyStatus}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{t('income')}</div>
                      <div className="font-medium">{persona.demographics.income}</div>
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
                  <ul className="space-y-2">
                    {persona.goals.map((goal, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Frustrations */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Frown className="w-5 h-5 mr-2 text-red-600" />
                    {t('frustrationsPainPoints')}
                  </h4>
                  <ul className="space-y-2">
                    {persona.frustrations.map((frustration, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{frustration}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Previous Experiences */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    {t('previousExperiences')}
                  </h4>
                  <ul className="space-y-2">
                    {persona.previousExperiences.map((experience, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{experience}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Success Criteria */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-yellow-600" />
                    {t('successCriteria')}
                  </h4>
                  <p className="text-gray-700 italic">"{persona.successCriteria}"</p>
                </div>

                {/* Behaviors */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    {t('behaviors')}
                  </h4>
                  <ul className="space-y-2">
                    {persona.behaviors.map((behavior, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{behavior}</span>
                      </li>
                    ))}
                  </ul>
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
                      <div className="flex flex-wrap gap-1">
                        {persona.psychographics.values.map((value, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">{t('interests')}</div>
                      <div className="flex flex-wrap gap-1">
                        {persona.psychographics.interests.map((interest, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
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