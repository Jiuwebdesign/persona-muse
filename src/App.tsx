import React, { useState, useCallback, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { AppState, ProductInput, Language, Persona, StrategyRecommendation } from './types';
import { ProductInputForm } from './components/ProductInput';
import { PersonaGrid } from './components/PersonaGrid';
import { StrategyRecommendations } from './components/StrategyRecommendations';
import { LanguageSelector } from './components/LanguageSelector';
import { generatePersonas, generateStrategies } from './utils/api';
import { getTranslation } from './utils/translations';

// 新增步驟指示器組件
const StepIndicator: React.FC<{ 
  currentStep: string, 
  language: Language,
  hasPersonas: boolean,
  hasStrategies: boolean,
  onStepClick: (step: string) => void
}> = ({ currentStep, language, hasPersonas, hasStrategies, onStepClick }) => {
  const t = (key: string) => getTranslation(language, key);
  
  const steps = [
    { 
      id: 'input', 
      label: t('step1'), 
      number: 1, 
      isClickable: true // 步驟一始終可以點擊
    },
    { 
      id: 'personas', 
      label: t('step2'), 
      number: 2, 
      isClickable: hasPersonas // 只有當有 personas 時才可以點擊
    },
    { 
      id: 'strategy', 
      label: t('step3'), 
      number: 3, 
      isClickable: hasStrategies // 只有當有 strategies 時才可以點擊
    }
  ];

  const handleStepClick = (step: typeof steps[0]) => {
    if (step.isClickable) {
      onStepClick(step.id);
    }
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`flex items-center ${step.isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onClick={() => handleStepClick(step)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                currentStep === step.id 
                  ? 'bg-brand-green text-black' 
                  : step.isClickable
                    ? steps.findIndex(s => s.id === currentStep) > index
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}>
                {step.number}
              </div>
              <span className={`ml-2 text-sm transition-colors ${
                currentStep === step.id 
                  ? 'text-brand-green font-bold' 
                  : step.isClickable
                    ? 'text-white hover:text-gray-200'
                    : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${
                steps.findIndex(s => s.id === currentStep) > index ? 'bg-white' : 'bg-white/20'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentStep: 'input',
    productInput: null,
    generatedPersonas: [],
    selectedPersonas: [],
    strategies: [],
    isLoading: false,
    language: 'en'
  });
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);

  const handleStepNavigation = (targetStep: string) => {
    // 如果要回到步驟一，需要確認
    if (targetStep === 'input' && state.currentStep !== 'input') {
      setShowConfirmRestart(true);
      return;
    }
    
    // 直接切換到目標步驟
    setState(prev => ({
      ...prev,
      currentStep: targetStep as AppState['currentStep']
    }));
  };

  const t = (key: string) => getTranslation(state.language, key);

  const handleBackToInput = () => {
    if (state.currentStep !== 'input') {
      setShowConfirmRestart(true);
    }
  };

  const confirmRestart = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'input',
      generatedPersonas: [],
      selectedPersonas: [],
      strategies: [],
    }));
    setShowConfirmRestart(false);
  };

  const handleBackToPersonas = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'personas',
    }));
  };

  const handleProductSubmit = async (input: ProductInput) => {
    setState(prev => ({ ...prev, isLoading: true, productInput: input }));
    try {
      const personas = await generatePersonas(input);
      setState(prev => ({
        ...prev,
        generatedPersonas: personas,
        currentStep: 'personas',
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to generate personas:", error);
      // You might want to show an error message to the user
      alert('Failed to generate personas. Check the console for details and make sure your API keys are correct.');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleProceedToStrategy = async () => {
    if (!state.productInput) {
      // This should ideally not happen if the button is only shown with productInput
      alert("Product information is missing.");
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const selectedPersonaObjects = state.generatedPersonas.filter(p =>
        state.selectedPersonas.includes(p.id)
      );
      
      const strategies = await generateStrategies(state.productInput, selectedPersonaObjects);
      
      setState(prev => ({
        ...prev,
        strategies,
        currentStep: 'strategy',
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to generate strategies:", error);
      alert('Failed to generate strategies. Check the console for details.');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleUpdateStrategy = (index: number, updatedStrategy: Partial<StrategyRecommendation>) => {
    setState(prev => {
      const newStrategies = [...prev.strategies];
      newStrategies[index] = { ...newStrategies[index], ...updatedStrategy };
      return { ...prev, strategies: newStrategies };
    });
  };
  
  const handleSelectPersona = (id: string) => {
    setState(prev => {
      const newSelection = prev.selectedPersonas.includes(id)
        ? prev.selectedPersonas.filter(pid => pid !== id)
        : [...prev.selectedPersonas, id];
      return { ...prev, selectedPersonas: newSelection };
    });
  };
  
  const handleUpdatePersona = (id: string, updatedPersona: Partial<Persona>) => {
    setState(prev => ({
      ...prev,
      generatedPersonas: prev.generatedPersonas.map(p =>
        p.id === id ? { ...p, ...updatedPersona } : p
      ),
    }));
  };

  const setLanguage = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const renderContent = () => {
    switch (state.currentStep) {
      case 'input':
        return (
          <ProductInputForm
            onSubmit={handleProductSubmit}
            isLoading={state.isLoading}
            language={state.language}
          />
        );
      case 'personas':
        return (
          <PersonaGrid
            personas={state.generatedPersonas}
            selectedPersonas={state.selectedPersonas}
            onPersonaSelect={handleSelectPersona}
            onPersonaUpdate={handleUpdatePersona}
            onProceed={handleProceedToStrategy}
            language={state.language}
            productInput={state.productInput}
            isLoading={state.isLoading}
          />
        );
      case 'strategy':
        return (
          <StrategyRecommendations
            strategies={state.strategies}
            selectedPersonaCount={state.selectedPersonas.length}
            selectedPersonas={state.selectedPersonas}
            personas={state.generatedPersonas}
            onBack={handleBackToPersonas}
            onStartOver={handleBackToInput}
            onUpdate={handleUpdateStrategy}
            language={state.language}
            productInput={state.productInput}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-8 sm:pb-32">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-baseline space-x-2">
          <h1 className="text-2xl text-white">Persona</h1>
          <span className="text-2xl text-brand-green font-display">Muse</span>
        </div>
        <LanguageSelector selectedLanguage={state.language} onSelectLanguage={setLanguage} />
      </header>
      
      {/* 步驟指示器 */}
      <StepIndicator 
        currentStep={state.currentStep} 
        language={state.language}
        hasPersonas={state.generatedPersonas.length > 0}
        hasStrategies={state.strategies.length > 0}
        onStepClick={handleStepNavigation}
      />
      
      <main>
        {renderContent()}
      </main>

      {/* Buy Me a Coffee 區塊 */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-2">
        <a 
          href="https://coff.ee/jlstudio" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-200 text-sm font-medium"
        >
          <span className="mr-2">☕</span>
          Buy me a coffee
        </a>
        
        <a 
          href="https://www.jlstudio.xyz/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-white/60 hover:text-white transition-colors duration-200 font-medium mr-[24px]"
        >
          made by JL Studio
        </a>
      </div>

      {/* 確認重新開始對話框 */}
      {showConfirmRestart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('confirmRestart')}</h3>
            <p className="text-gray-700 mb-6">{t('confirmRestartMessage')}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmRestart(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={confirmRestart}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                {t('startOver')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;