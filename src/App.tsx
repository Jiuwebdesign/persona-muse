import React, { useState } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { AppState, ProductInput, Language, Persona, StrategyRecommendation } from './types';
import { ProductInputForm } from './components/ProductInput';
import { PersonaGrid } from './components/PersonaGrid';
import { StrategyRecommendations } from './components/StrategyRecommendations';
import { LanguageSelector } from './components/LanguageSelector';
import { generateMockPersonas, generateMockStrategies } from './data/mockData';
import { getTranslation } from './utils/translations';

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentStep: 'input',
    productInput: null,
    generatedPersonas: [],
    selectedPersonas: [],
    strategies: [],
    isLoading: false,
    language: 'en'
  });

  const t = (key: string) => getTranslation(appState.language, key);

  const handleLanguageChange = (language: Language) => {
    setAppState(prev => ({ ...prev, language }));
  };

  const handleProductSubmit = (input: ProductInput) => {
    setAppState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate AI processing time
    setTimeout(() => {
      const personas = generateMockPersonas(input);
      setAppState(prev => ({
        ...prev,
        productInput: input,
        generatedPersonas: personas,
        currentStep: 'personas',
        isLoading: false
      }));
    }, 2000);
  };

  const handlePersonaSelect = (id: string) => {
    setAppState(prev => ({
      ...prev,
      selectedPersonas: prev.selectedPersonas.includes(id)
        ? prev.selectedPersonas.filter(personaId => personaId !== id)
        : [...prev.selectedPersonas, id]
    }));
  };

  const handlePersonaUpdate = (id: string, updatedPersona: Partial<Persona>) => {
    setAppState(prev => ({
      ...prev,
      generatedPersonas: prev.generatedPersonas.map(persona =>
        persona.id === id ? { ...persona, ...updatedPersona } : persona
      )
    }));
  };

  const handleStrategyUpdate = (index: number, updatedStrategy: Partial<StrategyRecommendation>) => {
    setAppState(prev => ({
      ...prev,
      strategies: prev.strategies.map((strategy, i) =>
        i === index ? { ...strategy, ...updatedStrategy } : strategy
      )
    }));
  };

  const handleProceedToStrategy = () => {
    setAppState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate strategy generation
    setTimeout(() => {
      const strategies = generateMockStrategies(appState.selectedPersonas);
      setAppState(prev => ({
        ...prev,
        strategies,
        currentStep: 'strategy',
        isLoading: false
      }));
    }, 1500);
  };

  const handleBackToPersonas = () => {
    setAppState(prev => ({ ...prev, currentStep: 'personas' }));
  };

  const handleStartOver = () => {
    setAppState(prev => ({
      currentStep: 'input',
      productInput: null,
      generatedPersonas: [],
      selectedPersonas: [],
      strategies: [],
      isLoading: false,
      language: prev.language
    }));
  };

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('appTitle')}</h1>
              <p className="text-xs text-gray-500">{t('appSubtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector
              currentLanguage={appState.language}
              onLanguageChange={handleLanguageChange}
            />
            {appState.currentStep !== 'input' && (
              <button
                onClick={handleStartOver}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t('newProject')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  const renderStepIndicator = () => {
    const steps = [
      { id: 'input', label: t('step1'), number: 1 },
      { id: 'personas', label: t('step2'), number: 2 },
      { id: 'strategy', label: t('step3'), number: 3 }
    ];

    return (
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  appState.currentStep === step.id
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : steps.findIndex(s => s.id === appState.currentStep) > index
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {steps.findIndex(s => s.id === appState.currentStep) > index ? (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  appState.currentStep === step.id ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  steps.findIndex(s => s.id === appState.currentStep) > index
                    ? 'bg-green-600'
                    : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {renderStepIndicator()}
        
        {appState.currentStep === 'input' && (
          <ProductInputForm
            onSubmit={handleProductSubmit}
            isLoading={appState.isLoading}
            language={appState.language}
          />
        )}
        
        {appState.currentStep === 'personas' && (
          <PersonaGrid
            personas={appState.generatedPersonas}
            selectedPersonas={appState.selectedPersonas}
            onPersonaSelect={handlePersonaSelect}
            onPersonaUpdate={handlePersonaUpdate}
            onProceed={handleProceedToStrategy}
            language={appState.language}
            productInput={appState.productInput}
          />
        )}
        
        {appState.currentStep === 'strategy' && (
          <StrategyRecommendations
            strategies={appState.strategies}
            selectedPersonaCount={appState.selectedPersonas.length}
            selectedPersonas={appState.selectedPersonas}
            personas={appState.generatedPersonas}
            onBack={handleBackToPersonas}
            onStartOver={handleStartOver}
            onStrategyUpdate={handleStrategyUpdate}
            language={appState.language}
            productInput={appState.productInput}
          />
        )}
      </main>
    </div>
  );
}

export default App;