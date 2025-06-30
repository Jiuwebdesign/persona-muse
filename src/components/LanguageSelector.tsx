import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '繁體中文' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <div className="relative">
      <select
        value={selectedLanguage}
        onChange={(e) => onSelectLanguage(e.target.value as Language)}
        className="bg-white/10 text-white rounded-md py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green cursor-pointer"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code} className="text-black">
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <Globe className="w-4 h-4" />
      </div>
    </div>
  );
};