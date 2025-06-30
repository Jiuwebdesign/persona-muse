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
        <h1 className="text-4xl md:text-6xl font-display text-white uppercase mb-4">
          {t('yourGeneratedPersonas')}
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          {t('personasSubtitle')}
        </p>
      </div>
      
      <div className="text-center mb-8">
        <button
          onClick={handleExportPDF}
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors duration-200"
        >
          <Download className="w-5 h-5 mr-2 inline-block" />
          {t('exportPDF')}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-4 flex items-center justify-between border border-white/30">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-4">
                {personas
                  .filter(p => selectedPersonas.includes(p.id))
                  .slice(0, 3)
                  .map(p => (
                    <img key={p.id} src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-full object-cover border-2 border-white"/>
                  ))
                }
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {selectedPersonas.length} {t('personasSelected')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('readyToGenerate')}
                </p>
              </div>
            </div>
            <button
              onClick={onProceed}
              className="font-display uppercase px-8 py-3 bg-brand-green text-black font-bold text-md rounded-lg hover:scale-105 transition-transform duration-300"
            >
              {t('getStrategy')}
              <ArrowRight className="w-5 h-5 ml-2 inline-block" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};