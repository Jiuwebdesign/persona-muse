import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
        <Globe className="w-4 h-4" />
        <span>{languages.find(l => l.code === currentLanguage)?.flag}</span>
        <span>{languages.find(l => l.code === currentLanguage)?.name}</span>
      </button>
      
      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors w-full text-left ${
              currentLanguage === language.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
            }`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};