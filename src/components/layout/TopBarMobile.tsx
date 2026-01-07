'use client';

import React, { useState } from 'react';
import { Avatar, Drawer, Menu, Typography, Button } from 'antd';
import { 
  MenuOutlined,
  CloseOutlined,
  CustomerServiceOutlined,
  BookOutlined,
  SettingOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import { IMAGES } from '@/utils/images';

const { Text } = Typography;

const TopBarMobile = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Determine selected key based on current path
  const getSelectedKey = () => {
    if (pathname.startsWith('/atendimentos')) return 'atendimentos';
    if (pathname.startsWith('/catalogo-imoveis')) return 'catalogo-imoveis';
    if (pathname.startsWith('/configuracoes')) return 'configuracoes';
    return 'atendimentos';
  };

  // Main menu items with navigation
  const mainMenuItems = [
    {
      key: 'inicial',
      icon: <div className="w-5 h-5 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </div>,
      label: <span className="text-sm font-medium">Inicial</span>,
      path: '/atendimentos', // Redirect to atendimentos for now
    },
    {
      key: 'atendimentos',
      icon: <CustomerServiceOutlined />,
      label: <span className="text-sm font-medium">Atendimentos</span>,
      path: '/atendimentos',
    },
    {
      key: 'catalogo-imoveis',
      icon: <BookOutlined />,
      label: <span className="text-sm font-medium">Catálogo de imóveis</span>,
      path: '/catalogo-imoveis',
    },
    {
      key: 'configuracoes',
      icon: <SettingOutlined />,
      label: <span className="text-sm font-medium">Configurações</span>,
      path: '/configuracoes',
    },
  ];

  const footerMenuItems = [
    {
      key: 'feedback',
      icon: <div className="w-5 h-5 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,2H6A2,2 0 0,0 4,4V20L8,16H14A2,2 0 0,0 16,14V4A2,2 0 0,0 14,2M18,6H16V14H8.83L7.83,15H18L22,19V8A2,2 0 0,0 20,6H18Z"/>
        </svg>
      </div>,
      label: <span className="text-sm font-medium">Enviar feedback</span>,
    },
    {
      key: 'ajuda',
      icon: <div className="w-5 h-5 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"/>
        </svg>
      </div>,
      label: <span className="text-sm font-medium">Central de Ajuda</span>,
    },
  ];

  const handleMenuClick = (key: string) => {
    const item = mainMenuItems.find(item => item.key === key);
    if (item && item.path) {
      router.push(item.path);
      setDrawerVisible(false);
    }
  };

  const selectedKey = getSelectedKey();

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <AppImage
            src={IMAGES.LOGO_MAIN}
            alt="Qualifica Leads"
            width={160}
            height={48}
            className="h-8"
          />
        </div>

        {/* Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          className="!border-0 !shadow-none !w-10 !h-10 !p-0 flex items-center justify-center text-gray-600"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={null}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width="100%"
        className="mobile-drawer"
        closeIcon={null}
        styles={{
          body: { padding: 0 },
          header: { display: 'none' }
        }}
      >
        <div className="h-full flex flex-col" style={{ backgroundColor: '#F2F4F8' }}>
          {/* Header with Logo and Close */}
          <div className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
            <AppImage
              src={IMAGES.LOGO_MAIN}
              alt="Qualifica Leads"
              width={160}
              height={48}
              className="h-8"
            />
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setDrawerVisible(false)}
              className="!border-0 !shadow-none !w-10 !h-10 !p-0 flex items-center justify-center text-gray-600"
            />
          </div>

          {/* Main Menu */}
          <div className="flex-1 px-4 pt-6">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={({ key }) => handleMenuClick(key)}
              className="border-none bg-transparent"
              style={{ backgroundColor: 'transparent' }}
              items={mainMenuItems.map(item => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
                className: `
                  !rounded-lg !mx-0 !my-1 !h-12 !leading-12 !text-base
                  ${item.key === selectedKey 
                    ? '!bg-white !text-teal-600 !shadow-sm' 
                    : '!text-gray-700 hover:!bg-white hover:!bg-opacity-50'
                  }
                `
              }))}
            />
          </div>

          {/* Footer Menu */}
          <div className="px-4 pb-4 border-t border-gray-100 pt-4">
            <Menu
              mode="inline"
              className="border-none bg-transparent"
              style={{ backgroundColor: 'transparent' }}
              items={footerMenuItems.map(item => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
                className: "!rounded-lg !mx-0 !my-1 !h-12 !leading-12 !text-base !text-gray-700 hover:!bg-white hover:!bg-opacity-50"
              }))}
            />
          </div>

          {/* User Info */}
          <div className="px-4 pb-6">
            <div className="flex items-center bg-white rounded-lg p-4 shadow-sm">
              <Avatar 
                size={40} 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                icon={<UserOutlined />}
              />
              <div className="flex flex-col items-start ml-4 flex-1">
                <Text className="text-base font-medium text-gray-900 leading-tight">
                  Sarah O Connor
                </Text>
                <Text className="text-sm text-gray-500 leading-tight">
                  Foxter
                </Text>
              </div>
              <DownOutlined className="text-gray-400 text-sm" />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default TopBarMobile;