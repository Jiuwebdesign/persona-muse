import React, { useState } from 'react';
import { ArrowRight, Zap, Target, Users, Lightbulb } from 'lucide-react';
import { ProductInput, Language } from '../types';
import { DocumentUpload } from './DocumentUpload';
import { getTranslation } from '../utils/translations';

interface ProductInputProps {
  onSubmit: (input: ProductInput) => void;
  isLoading: boolean;
  language: Language;
}

export const ProductInputForm: React.FC<ProductInputProps> = ({ onSubmit, isLoading, language }) => {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    category: 'other', // 設定預設值
    description: '',
    targetAudience: '',
    keyFeatures: '',
    painPoints: '',
    documents: [],
    links: []
  });

  const t = (key: string) => getTranslation(language, key);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof ProductInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = [
    formData.name,
    formData.description,
    formData.targetAudience
  ].every(value => value.trim().length > 0);

  const categories = [
    { value: 'productivity', label: t('productivity') },
    { value: 'communication', label: t('communication') },
    { value: 'e-commerce', label: t('ecommerce') },
    { value: 'education', label: t('education') },
    { value: 'healthcare', label: t('healthcare') },
    { value: 'finance', label: t('finance') },
    { value: 'entertainment', label: t('entertainment') },
    { value: 'other', label: t('other') }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-display text-white uppercase mb-4">
          {t('describeProduct')}
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          {t('productInputSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          <div className="space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-display text-white">{t('coreInformation')}</h2>
            <div>
              <label className="flex items-center text-sm font-bold text-brand-green mb-2">
                <Zap className="w-4 h-4 mr-2" />
                {t('productName')}
              </label>
              <input
                type="text"
                placeholder={t('productNamePlaceholder')}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/30 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="flex items-center text-sm font-bold text-brand-green mb-2">
                <Users className="w-4 h-4 mr-2" />
                {t('targetAudience')}
              </label>
              <textarea
                placeholder={t('targetAudiencePlaceholder')}
                value={formData.targetAudience}
                onChange={(e) => handleChange('targetAudience', e.target.value)}
                rows={8}
                className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/30 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-colors resize-none"
                required
              />
            </div>
          </div>
          
          <div className="space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-display text-white">{t('productDescription')}</h2>
            <div>
              <label className="flex items-center text-sm font-bold text-brand-green mb-2">
                <Lightbulb className="w-4 h-4 mr-2" />
                {t('productDescription')}
              </label>
              <textarea
                placeholder={t('productDescriptionPlaceholder')}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={12}
                className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/30 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-colors resize-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="font-display uppercase px-12 py-4 bg-brand-green text-black font-bold text-lg rounded-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                {t('generatingPersonas')}
              </>
            ) : (
              <>
                {t('generatePersonas')}
                <ArrowRight className="w-6 h-6 ml-3 inline-block" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};