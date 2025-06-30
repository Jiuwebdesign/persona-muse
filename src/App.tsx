import React, { useState, useCallback, useMemo } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { AppState, ProductInput, Language, Persona, StrategyRecommendation } from './types';
import { ProductInputForm } from './components/ProductInput';
import { PersonaGrid } from './components/PersonaGrid';
import { StrategyRecommendations } from './components/StrategyRecommendations';
import { LanguageSelector } from './components/LanguageSelector';
import { generatePersonas, generateStrategies } from './utils/api';
import { getTranslation } from './utils/translations';

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

  const t = (key: string) => getTranslation(state.language, key);

  const handleBackToInput = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'input',
      generatedPersonas: [],
      selectedPersonas: [],
      strategies: [],
    }));
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
    <div className="min-h-screen w-full p-4 sm:p-8">
      <header className="flex justify-between items-center mb-8">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={state.currentStep !== 'input' ? handleBackToInput : () => {}}
        >
          {state.currentStep !== 'input' && <ArrowLeft className="w-6 h-6 text-white" />}
          <div className="flex items-baseline space-x-2">
            <h1 className="text-2xl text-white">Persona</h1>
            <span className="text-2xl text-brand-green font-display">Muse</span>
          </div>
        </div>
        <LanguageSelector selectedLanguage={state.language} onSelectLanguage={setLanguage} />
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;