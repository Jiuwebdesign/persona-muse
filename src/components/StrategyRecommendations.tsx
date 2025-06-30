import React, { useState } from 'react';
import { ArrowLeft, Target, TrendingUp, Users, Lightbulb, BarChart3, MessageSquare, Edit, Save, X, Download, ChevronDown, Edit3 } from 'lucide-react';
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
  onUpdate: (index: number, updatedStrategy: Partial<StrategyRecommendation>) => void;
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
  onUpdate,
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
      onUpdate(index, editedStrategy);
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
    <div className="max-w-7xl mx-auto">
      {productInput && (
        <ProjectSummary productInput={productInput} language={language} isStrategyView />
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display text-white mb-4">
          {t('strategyRecommendations')}
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          {t('strategySubtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <StrategyCard
            key={index}
            strategy={strategy}
            index={index}
            onUpdate={onUpdate}
            language={language}
          />
        ))}
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

interface StrategyCardProps {
  strategy: StrategyRecommendation;
  index: number;
  onUpdate: (index: number, updatedStrategy: Partial<StrategyRecommendation>) => void;
  language: Language;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, index, onUpdate, language }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStrategy, setEditedStrategy] = useState(strategy);
  const t = (key: string) => getTranslation(language, key);

  const handleSave = () => {
    onUpdate(index, editedStrategy);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedStrategy(strategy);
    setIsEditing(false);
  };

  const priorityStyles = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  return (
    <div className="bg-white/90 rounded-xl shadow-lg transition-all duration-300">
      <div
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 bg-brand-blue/10 p-3 rounded-full">
            <Lightbulb className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{strategy.title}</h3>
            <p className="text-sm text-gray-600">{strategy.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${priorityStyles[strategy.priority]}`}>
            {t(strategy.priority.toLowerCase())}
          </span>
          <ChevronDown className={`w-6 h-6 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="border-t border-gray-200 pt-4">
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editedStrategy.description}
                  onChange={(e) => setEditedStrategy({...editedStrategy, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                />
                <textarea
                  value={editedStrategy.actionItems.join('\n')}
                  onChange={(e) => setEditedStrategy({...editedStrategy, actionItems: e.target.value.split('\n')})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={handleCancel} className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    <X className="w-4 h-4 mr-1"/>{t('cancel')}
                  </button>
                  <button onClick={handleSave} className="flex items-center px-3 py-1 bg-brand-green text-black rounded-md hover:bg-opacity-80">
                    <Save className="w-4 h-4 mr-1"/>{t('save')}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 mb-4">{strategy.description}</p>
                <ul className="space-y-2 list-disc list-inside">
                  {strategy.actionItems.map((item, i) => (
                    <li key={i} className="text-gray-600">{item}</li>
                  ))}
                </ul>
                <div className="flex justify-end mt-4">
                  <button onClick={() => setIsEditing(true)} className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                    <Edit3 className="w-4 h-4 mr-1"/>{t('edit')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};