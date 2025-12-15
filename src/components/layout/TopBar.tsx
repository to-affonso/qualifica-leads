'use client';

import React, { useState, useRef } from 'react';
import { Avatar, Badge, Button, Dropdown, Space, Typography } from 'antd';
import { 
  BellOutlined, 
  DownOutlined, 
  AppstoreOutlined,
  UserOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import AppImage from '@/components/ui/AppImage';
import AppsModal from '@/components/ui/AppsModal';
import NotificationsModal from '@/components/ui/NotificationsModal';
import { IMAGES } from '@/utils/images';

const { Text } = Typography;

const TopBar = () => {
  const [appsModalVisible, setAppsModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [notificationsPosition, setNotificationsPosition] = useState({ top: 0, left: 0 });
  const appsButtonRef = useRef<HTMLButtonElement>(null);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);

  const handleAppsClick = () => {
    // Close notifications modal if open
    setNotificationsModalVisible(false);
    
    if (appsButtonRef.current) {
      const rect = appsButtonRef.current.getBoundingClientRect();
      const topBarHeight = 64; // Height of the topbar (h-16 = 64px)
      setModalPosition({
        top: topBarHeight + 8, // 8px below the topbar
        left: Math.max(16, rect.left - 16), // Align to the left with some offset, but not less than 16px from edge
      });
    }
    setAppsModalVisible(true);
  };

  const handleAppsModalClose = () => {
    setAppsModalVisible(false);
  };

  const handleNotificationsClick = () => {
    // Close apps modal if open
    setAppsModalVisible(false);
    
    if (notificationsButtonRef.current) {
      const rect = notificationsButtonRef.current.getBoundingClientRect();
      const topBarHeight = 64; // Height of the topbar (h-16 = 64px)
      setNotificationsPosition({
        top: topBarHeight + 8, // 8px below the topbar
        left: Math.max(16, rect.right - 400), // Align to the right of the button, but ensure modal fits on screen
      });
    }
    setNotificationsModalVisible(true);
  };

  const handleNotificationsModalClose = () => {
    setNotificationsModalVisible(false);
  };

  // User profile dropdown menu
  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
    },
    {
      key: '2',
      label: 'Settings',
    },
    {
      key: '3',
      label: 'Logout',
    },
  ];

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left side - Logo and Apps */}
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <div className="flex items-center">
          <AppImage
            src={IMAGES.LOGO_MAIN}
            alt="Qualifica Leads"
            width={160}
            height={48}
            className="h-10"
          />
        </div>

        {/* Apps Button */}
        <Button 
          ref={appsButtonRef}
          type="text" 
          onClick={handleAppsClick}
          className="text-gray-500 hover:text-gray-700 !border-0 !shadow-none !w-10 !h-10 !p-1 flex items-center justify-center"
        >
          <AppImage
            src={IMAGES.ICON_APPS}
            alt="Apps"
            width={24}
            height={24}
          />
        </Button>
      </div>

      {/* Right side - Notifications and User */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <Badge count={3} showZero={false}>
          <Button 
            ref={notificationsButtonRef}
            type="text" 
            onClick={handleNotificationsClick}
            className="text-gray-500 hover:text-gray-700 !border-0 !shadow-none !w-10 !h-10 !p-1 flex items-center justify-center"
          >
            <BellOutlined style={{ fontSize: '24px' }} />
          </Button>
        </Badge>

        {/* User Info */}
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
          <div className="flex items-center cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Avatar 
              size={32} 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
              icon={<UserOutlined />}
            />
            <div className="flex flex-col items-start ml-4">
              <Text className="text-sm font-medium text-gray-900 leading-tight">
                Sarah O Connor
              </Text>
              <Text className="text-xs text-gray-500 leading-tight">
                Foxter
              </Text>
            </div>
            <DownOutlined className="text-gray-400 text-xs ml-3" />
          </div>
        </Dropdown>
      </div>

      {/* Apps Modal */}
      <AppsModal
        visible={appsModalVisible}
        onClose={handleAppsModalClose}
        position={modalPosition}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        visible={notificationsModalVisible}
        onClose={handleNotificationsModalClose}
        position={notificationsPosition}
      />
    </div>
  );
};

export default TopBar;