export interface Persona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  location: string;
  category?: string;
  imageUrl: string;
  bio: string;
  demographics: {
    gender: string;
    education: string;
    familyStatus: string;
    income: string;
  };
  psychographics: {
    personality: string[];
    values: string[];
    interests: string[];
    lifestyle: string;
  };
  goals: string[];
  frustrations: string[];
  behaviors: string[];
  quote: string;
  moodBoard: string[];
  voiceNote: string;
  // New fields for enhanced persona
  scenario: string;
  jobToBeDone: string;
  previousExperiences: string[];
  successCriteria: string;
  // Editing state
  isEditing?: boolean;
}

export interface ProductInput {
  name: string;
  category: string;
  description: string;
  targetAudience: string;
  keyFeatures: string;
  painPoints: string;
  // New optional fields
  documents?: File[];
  links?: string[];
}

export interface StrategyRecommendation {
  category: string;
  title: string;
  description: string;
  actionItems: string[];
  priority: 'High' | 'Medium' | 'Low';
  isEditing?: boolean;
}

export interface AppState {
  currentStep: 'input' | 'personas' | 'strategy';
  productInput: ProductInput | null;
  generatedPersonas: Persona[];
  selectedPersonas: string[];
  strategies: StrategyRecommendation[];
  isLoading: boolean;
  language: 'en' | 'de' | 'zh';
}

export type Language = 'en' | 'de' | 'zh';