import React, { useState } from 'react';
import { ArrowLeft, Target, TrendingUp, Users, Lightbulb, BarChart3, MessageSquare, Edit, Save, X, Download } from 'lucide-react';
import { StrategyRecommendation, Language, ProductInput, Persona } from '../types';
import { ProjectSummary } from './ProjectSummary';
import { getTranslation } from '../utils/translations';
import { exportElementToPDF, exportPersonasToPDF } from '../utils/pdfExport';

interface StrategyRecommendationsProps {
  strategies: StrategyRecommendation[];
  selectedPersonaCount: number;
  selectedPersonas: string[];
  personas: Persona[];
  onBack: () => void;
  onStartOver: () => void;
  onStrategyUpdate: (index: number, updatedStrategy: Partial<StrategyRecommendation>) => void;
  language: Language;
  productInput: ProductInput | null;
}

const categoryIcons = {
  'Onboarding': Users,
  'Feature Prioritization': Target,
  'UI/UX Design': Lightbulb,
  'Marketing & Communication': MessageSquare,
  'KPIs & Metrics': BarChart3
};

const priorityColors = {
  'High': 'bg-red-100 text-red-800 border-red-200',
  'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Low': 'bg-green-100 text-green-800 border-green-200'
};

export const StrategyRecommendations: React.FC<StrategyRecommendationsProps> = ({
  strategies,
  selectedPersonaCount,
  selectedPersonas,
  personas,
  onBack,
  onStartOver,
  onStrategyUpdate,
  language,
  productInput
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedStrategy, setEditedStrategy] = useState<StrategyRecommendation | null>(null);

  const t = (key: string) => getTranslation(language, key);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedStrategy(strategies[index]);
  };

  const handleSave = (index: number) => {
    if (editedStrategy) {
      onStrategyUpdate(index, editedStrategy);
      setEditingIndex(null);
      setEditedStrategy(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedStrategy(null);
  };

  const handleExportPDF = async () => {
    const selectedPersonaData = personas.filter(p => selectedPersonas.includes(p.id));
    await exportPersonasToPDF(
      selectedPersonaData, 
      strategies, 
      productInput?.name || 'Product',
      productInput
    );
  };

  const selectedPersonaData = personas.filter(p => selectedPersonas.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto" id="strategy-section">
      {/* Project Summary */}
      {productInput && (
        <ProjectSummary productInput={productInput} language={language} />
      )}

      {/* Selected Personas Summary */}
      {selectedPersonaData.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-green-600">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mr-3">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t('selectedPersonas')}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedPersonaData.map((persona) => (
              <div key={persona.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={persona.imageUrl}
                    alt={persona.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{persona.name}</h3>
                    <p className="text-sm text-gray-600">{persona.age} {t('years')}, {persona.occupation}</p>
                    <p className="text-xs text-gray-500 italic">"{persona.quote.substring(0, 50)}..."</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {t('strategicRecommendations')}
          </h1>
          <button
            onClick={handleExportPDF}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            {t('exportPDF')}
          </button>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('strategySubtitle')}
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {strategies.map((strategy, index) => {
          const IconComponent = categoryIcons[strategy.category as keyof typeof categoryIcons] || Target;
          const isEditing = editingIndex === index;
          const currentStrategy = isEditing ? editedStrategy! : strategy;
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {isEditing ? (
                          <input
                            value={currentStrategy.title}
                            onChange={(e) => setEditedStrategy({...currentStrategy, title: e.target.value})}
                            className="text-xl font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none"
                          />
                        ) : (
                          <h3 className="text-xl font-semibold text-gray-900">{strategy.title}</h3>
                        )}
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${priorityColors[currentStrategy.priority]}`}>
                          {currentStrategy.priority} {t('priority')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{currentStrategy.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleSave(index)}
                          className="flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          {t('save')}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                        >
                          <X className="w-4 h-4 mr-1" />
                          {t('cancel')}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        {t('edit')}
                      </button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={currentStrategy.description}
                    onChange={(e) => setEditedStrategy({...currentStrategy, description: e.target.value})}
                    className="w-full text-gray-600 mb-6 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600 mb-6">{strategy.description}</p>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('actionItems')}</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentStrategy.actionItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        {isEditing ? (
                          <input
                            value={item}
                            onChange={(e) => {
                              const newActionItems = [...currentStrategy.actionItems];
                              newActionItems[itemIndex] = e.target.value;
                              setEditedStrategy({...currentStrategy, actionItems: newActionItems});
                            }}
                            className="text-sm text-gray-700 bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none flex-1"
                          />
                        ) : (
                          <span className="text-sm text-gray-700">{item}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToPersonas')}
        </button>
        
        <div className="flex space-x-4">
          <button
            onClick={onStartOver}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('startOver')}
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            {t('exportReport')}
          </button>
        </div>
      </div>
    </div>
  );
};