import React from 'react';
import { ArrowRight, Users, CheckCircle, Download } from 'lucide-react';
import { Persona, Language, ProductInput } from '../types';
import { EditablePersonaCard } from './EditablePersonaCard';
import { ProjectSummary } from './ProjectSummary';
import { getTranslation } from '../utils/translations';
import { exportPersonasToPDF } from '../utils/pdfExport';

interface PersonaGridProps {
  personas: Persona[];
  selectedPersonas: string[];
  onPersonaSelect: (id: string) => void;
  onPersonaUpdate: (id: string, updatedPersona: Partial<Persona>) => void;
  onProceed: () => void;
  language: Language;
  productInput: ProductInput | null;
}

export const PersonaGrid: React.FC<PersonaGridProps> = ({
  personas,
  selectedPersonas,
  onPersonaSelect,
  onPersonaUpdate,
  onProceed,
  language,
  productInput
}) => {
  const t = (key: string) => getTranslation(language, key);

  const handleExportPDF = async () => {
    const selectedPersonaData = personas.filter(p => selectedPersonas.includes(p.id));
    await exportPersonasToPDF(
      selectedPersonaData.length > 0 ? selectedPersonaData : personas, 
      [], 
      productInput?.name || 'Product',
      productInput
    );
  };

  return (
    <div className="max-w-7xl mx-auto" id="personas-section">
      {/* Project Summary */}
      {productInput && (
        <ProjectSummary productInput={productInput} language={language} />
      )}

      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            {t('yourGeneratedPersonas')}
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
          {t('personasSubtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-12">
        {personas.map((persona) => (
          <EditablePersonaCard
            key={persona.id}
            persona={persona}
            isSelected={selectedPersonas.includes(persona.id)}
            onSelect={onPersonaSelect}
            onUpdate={onPersonaUpdate}
            language={language}
          />
        ))}
      </div>

      {selectedPersonas.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedPersonas.length} {t('personasSelected')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('readyToGenerate')}
                </p>
              </div>
            </div>
            <button
              onClick={onProceed}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('getStrategy')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{t('clickToSelect')}</span>
        </div>
      </div>
    </div>
  );
};