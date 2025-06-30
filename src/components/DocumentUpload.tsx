import React, { useState } from 'react';
import { Upload, X, FileText, Link as LinkIcon } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface DocumentUploadProps {
  documents: File[];
  links: string[];
  onDocumentsChange: (documents: File[]) => void;
  onLinksChange: (links: string[]) => void;
  language: Language;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documents,
  links,
  onDocumentsChange,
  onLinksChange,
  language
}) => {
  const [newLink, setNewLink] = useState('');
  const t = (key: string) => getTranslation(language, key);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onDocumentsChange([...documents, ...files]);
  };

  const removeDocument = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    onDocumentsChange(newDocuments);
  };

  const addLink = () => {
    if (newLink.trim() && !links.includes(newLink.trim())) {
      onLinksChange([...links, newLink.trim()]);
      setNewLink('');
    }
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    onLinksChange(newLinks);
  };

  return (
    <div className="space-y-6">
      {/* Document Upload */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <FileText className="w-4 h-4 mr-2 text-purple-600" />
          {t('supportingDocuments')}
        </label>
        <p className="text-xs text-gray-500 mb-3">{t('supportingDocumentsDesc')}</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.csv"
            onChange={handleFileUpload}
            className="hidden"
            id="document-upload"
          />
          <label htmlFor="document-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">{t('uploadDocuments')}</p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOC, TXT, CSV (Max 10MB each)</p>
          </label>
        </div>

        {/* Uploaded Documents */}
        {documents.length > 0 && (
          <div className="mt-4 space-y-2">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">{doc.name}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    ({(doc.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </div>
                <button
                  onClick={() => removeDocument(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reference Links */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
          <LinkIcon className="w-4 h-4 mr-2 text-purple-600" />
          {t('referenceLinks')}
        </label>
        
        <div className="flex space-x-2">
          <input
            type="url"
            placeholder={t('referenceLinksPlaceholder')}
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && addLink()}
          />
          <button
            onClick={addLink}
            disabled={!newLink.trim()}
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('addLink')}
          </button>
        </div>

        {/* Added Links */}
        {links.length > 0 && (
          <div className="mt-4 space-y-2">
            {links.map((link, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <LinkIcon className="w-4 h-4 text-gray-500 mr-2" />
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 truncate max-w-xs"
                  >
                    {link}
                  </a>
                </div>
                <button
                  onClick={() => removeLink(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};