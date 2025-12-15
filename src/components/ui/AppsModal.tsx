'use client';

import React, { useEffect } from 'react';
import { Typography } from 'antd';
import AppImage from '@/components/ui/AppImage';
import { IMAGES } from '@/utils/images';

const { Title, Text } = Typography;

interface AppsModalProps {
  visible: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

const AppsModal: React.FC<AppsModalProps> = ({ visible, onClose, position }) => {
  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalElement = document.querySelector('.apps-modal-content');
      if (modalElement && !modalElement.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const products = [
    { name: 'Administração Aluguel', icon: IMAGES.ICON_KEY },
    { name: 'Seguro Residencial', icon: IMAGES.ICON_KEY },
    { name: 'Fiança aluguel', icon: IMAGES.ICON_KEY },
    { name: 'Administração Pós-venda', icon: IMAGES.ICON_KEY },
    { name: 'Gestão Anúncios', icon: IMAGES.ICON_KEY },
    { name: 'Financiamento', icon: IMAGES.ICON_KEY },
    { name: 'CRM', icon: IMAGES.ICON_KEY },
    { name: 'Qualifica Leads', icon: IMAGES.ICON_KEY, active: true },
  ];

  return (
    <>
      {/* Transparent overlay */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div
        className="apps-modal-content fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-8"
        style={{
          top: position.top,
          left: Math.min(position.left, window.innerWidth - 920 - 32), // Ensure modal doesn't go off-screen
          width: '920px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
        }}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <Title level={2} className="!text-2xl !font-bold !text-gray-900 !mb-2">
              Ecossistema na sua mão
            </Title>
            <Text className="text-base text-gray-500">
              As melhores soluções para sua imobiliária
            </Text>
          </div>

          {/* Loft Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-center space-x-3 mb-3">
              <AppImage
                src={IMAGES.LOGO_LOFT}
                alt="Loft"
                width={32}
                height={32}
              />
              <Title level={4} className="!text-lg !font-semibold !text-gray-900 !mb-0">
                Mais negócio
              </Title>
            </div>
            <Text className="text-sm text-gray-600">
              Sua porta de entrada para alavancar seus negócios!
            </Text>
          </div>

          {/* Products Section */}
          <div>
            <Title level={4} className="!text-lg !font-semibold !text-gray-900 !mb-6">
              Acesse por produto
            </Title>
            
            <div className="grid grid-cols-2 gap-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
                    ${product.active 
                      ? 'border-orange-200 bg-orange-50 shadow-sm' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <AppImage
                    src={product.icon}
                    alt={product.name}
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                  <Text 
                    className={`
                      text-sm font-medium flex-1
                      ${product.active ? 'text-gray-900' : 'text-gray-700'}
                    `}
                  >
                    {product.name}
                  </Text>
                  {product.active && (
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      className="text-green-500 flex-shrink-0"
                    >
                      <path 
                        d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z" 
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppsModal;