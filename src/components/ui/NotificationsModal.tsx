'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Tabs } from 'antd';
import styles from './NotificationsModal.module.css';

const { Text } = Typography;

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ visible, onClose, position }) => {
  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalElement = document.querySelector('.notifications-modal-content');
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

  const notifications = [
    {
      id: 1,
      type: 'lead',
      icon: '🔴',
      title: 'Você recebeu um novo lead.',
      description: 'Aproveite o momento! Entre em contato o quanto antes para aumentar suas...',
      time: '50 MIN',
      isNew: true,
    },
    {
      id: 2,
      type: 'property',
      icon: '📍',
      title: 'Imóvel BO120 está há 45 dias sem visitas. Reavalie preço ou descrição.',
      description: 'Revise o preço ou melhore o anúncio para atrair mais interessados.',
      time: '1 HORA',
      isNew: false,
    },
    {
      id: 3,
      type: 'reminder',
      icon: '📅',
      title: 'Lembrete: Você tem uma visita agendada para amanhã às 10h.',
      description: 'Organize-se com antecedência e garanta uma experiência positiva para o cliente.',
      time: '3 HORAS',
      isNew: false,
    },
  ];

  const tabItems = [
    {
      key: 'all',
      label: 'Tudo',
      children: (
        <div className="space-y-0">
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              <div 
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  notification.isNew ? 'bg-orange-50' : 'bg-white'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg mt-1 flex-shrink-0">
                    {notification.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <Text className="text-sm font-medium text-gray-900 block leading-5 mb-2">
                      {notification.title}
                    </Text>
                    <Text className="text-sm text-gray-600 block leading-5 mb-3">
                      {notification.description}
                    </Text>
                    <Text className="text-xs text-gray-500 font-medium">
                      {notification.time}
                    </Text>
                  </div>
                </div>
              </div>
              {index < notifications.length - 1 && (
                <div className="border-b border-gray-200" />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'communications',
      label: 'Comunicações',
      children: (
        <div className="p-4 text-center text-gray-500">
          <Text>Nenhuma comunicação no momento</Text>
        </div>
      ),
    },
    {
      key: 'product',
      label: 'Produto',
      children: (
        <div className="p-4 text-center text-gray-500">
          <Text>Nenhuma notificação de produto</Text>
        </div>
      ),
    },
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
        className="notifications-modal-content fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200"
        style={{
          top: position.top,
          left: Math.min(position.left, window.innerWidth - 400 - 32),
          width: '400px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
        }}
      >
        {/* Tabs */}
        <Tabs
          defaultActiveKey="all"
          items={tabItems}
          className={`notifications-tabs ${styles.notificationsTabs}`}
          tabBarStyle={{
            margin: 0,
            paddingLeft: '16px',
            paddingRight: '16px',
            borderBottom: '1px solid #e5e7eb',
          }}
        />
        
        {/* Ver todas button */}
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors">
            Ver todas
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationsModal;