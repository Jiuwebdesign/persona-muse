import React from 'react';
import { FileText, Target, Users, Lightbulb } from 'lucide-react';
import { ProductInput, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface ProjectSummaryProps {
  productInput: ProductInput;
  language: Language;
}

export const ProjectSummary: React.FC<ProjectSummaryProps> = ({ productInput, language }) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-purple-600">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mr-3">
          <FileText className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{t('projectSummary')}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <Target className="w-4 h-4 text-purple-600 mr-2" />
              <h3 className="font-semibold text-gray-900">{productInput.name}</h3>
            </div>
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              {productInput.description}
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Users className="w-4 h-4 text-purple-600 mr-2" />
              <h4 className="font-medium text-gray-700">{t('targetAudience')}</h4>
            </div>
            <p className="text-sm text-gray-600">
              {productInput.targetAudience}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <Lightbulb className="w-4 h-4 text-purple-600 mr-2" />
              <h4 className="font-medium text-gray-700">{t('keyFeatures')}</h4>
            </div>
            <p className="text-sm text-gray-600">
              {productInput.keyFeatures}
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Target className="w-4 h-4 text-purple-600 mr-2" />
              <h4 className="font-medium text-gray-700">{t('userPainPoints')}</h4>
            </div>
            <p className="text-sm text-gray-600">
              {productInput.painPoints}
            </p>
          </div>
        </div>
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