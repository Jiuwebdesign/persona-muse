import React from 'react';
import { FileText, Target, Users, Lightbulb } from 'lucide-react';
import { ProductInput, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface ProjectSummaryProps {
  productInput: ProductInput;
  language: Language;
  isStrategyView?: boolean;
}

export const ProjectSummary: React.FC<ProjectSummaryProps> = ({ productInput, language, isStrategyView }) => {
  const t = (key: string) => getTranslation(language, key);

  const summaryItems = [
    { label: t('productName'), value: productInput.name },
    { label: t('productCategory'), value: productInput.category },
    { label: t('productDescription'), value: productInput.description },
    { label: t('targetAudience'), value: productInput.targetAudience },
  ];

  if (isStrategyView) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
        <div className="flex items-center text-white mb-4">
          <FileText className="w-5 h-5 mr-3 text-brand-green" />
          <h2 className="text-2xl font-display">{t('projectSummary')}</h2>
        </div>
        <p className="text-white/80">
          {t('generatingStrategiesFor')} <span className="font-bold text-white">{productInput.name}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 mr-3 text-brand-blue" />
        <h2 className="text-2xl font-bold text-gray-900">{t('projectSummary')}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        {summaryItems.map(item => (
          <div key={item.label}>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">{item.label}</h3>
            <p className="text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
      
      {/* Supporting Materials */}
      {(productInput.documents && productInput.documents.length > 0) || (productInput.links && productInput.links.length > 0) && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3">{t('supportingMaterials')}</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {productInput.documents && productInput.documents.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-2">{t('documents')}</h5>
                <div className="space-y-1">
                  {productInput.documents.map((doc, index) => (
                    <div key={index} className="text-xs text-gray-500 flex items-center">
                      <FileText className="w-3 h-3 mr-1" />
                      {doc.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {productInput.links && productInput.links.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-2">{t('referenceLinks')}</h5>
                <div className="space-y-1">
                  {productInput.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 block truncate"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};