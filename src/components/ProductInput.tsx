import React, { useState } from 'react';
import { ArrowRight, Lightbulb, Target, Users, Zap } from 'lucide-react';
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
    category: '',
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
    formData.category,
    formData.description,
    formData.targetAudience,
    formData.keyFeatures,
    formData.painPoints
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('describeProduct')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('productInputSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Zap className="w-4 h-4 mr-2 text-purple-600" />
                {t('productName')}
              </label>
              <input
                type="text"
                placeholder={t('productNamePlaceholder')}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Target className="w-4 h-4 mr-2 text-purple-600" />
                {t('productCategory')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                required
              >
                <option value="">{t('selectCategory')}</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Users className="w-4 h-4 mr-2 text-purple-600" />
                {t('targetAudience')}
              </label>
              <textarea
                placeholder={t('targetAudiencePlaceholder')}
                value={formData.targetAudience}
                onChange={(e) => handleChange('targetAudience', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                required
              />
            </div>
          </div>

          {/* Middle Column - Product Details */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Lightbulb className="w-4 h-4 mr-2 text-purple-600" />
                {t('productDescription')}
              </label>
              <textarea
                placeholder={t('productDescriptionPlaceholder')}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Zap className="w-4 h-4 mr-2 text-purple-600" />
                {t('keyFeatures')}
              </label>
              <textarea
                placeholder={t('keyFeaturesPlaceholder')}
                value={formData.keyFeatures}
                onChange={(e) => handleChange('keyFeatures', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Target className="w-4 h-4 mr-2 text-purple-600" />
                {t('userPainPoints')}
              </label>
              <textarea
                placeholder={t('userPainPointsPlaceholder')}
                value={formData.painPoints}
                onChange={(e) => handleChange('painPoints', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                required
              />
            </div>
          </div>

          {/* Right Column - Supporting Materials */}
          <div className="bg-gray-50 rounded-xl p-6">
            <DocumentUpload
              documents={formData.documents || []}
              links={formData.links || []}
              onDocumentsChange={(documents) => setFormData(prev => ({ ...prev, documents }))}
              onLinksChange={(links) => setFormData(prev => ({ ...prev, links }))}
              language={language}
            />
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                {t('generatingPersonas')}
              </>
            ) : (
              <>
                {t('generatePersonas')}
                <ArrowRight className="w-5 h-5 ml-3" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};