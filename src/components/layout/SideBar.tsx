'use client';

import { Menu, Typography } from 'antd';
import { 
  CustomerServiceOutlined,
  BookOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const { Text } = Typography;

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine selected key based on current path
  const getSelectedKey = () => {
    if (pathname.startsWith('/atendimentos')) return 'atendimentos';
    if (pathname.startsWith('/catalogo-imoveis')) return 'catalogo-imoveis';
    if (pathname.startsWith('/configuracoes')) return 'configuracoes';
    return 'atendimentos'; // Default to atendimentos instead of inicial
  };
  
  const [selectedKey, setSelectedKey] = useState(getSelectedKey());

  // Main menu items with navigation
  const mainMenuItems = [
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

  const handleMenuClick = (key: string) => {
    const item = mainMenuItems.find(item => item.key === key);
    if (item) {
      setSelectedKey(key);
      router.push(item.path);
    }
  };

  return (
    <div className="w-64 border-r border-gray-200 h-full flex flex-col" style={{ backgroundColor: '#F2F4F8' }}>
      {/* Main Menu */}
      <div className="flex-1 px-3 pt-4">
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
              !rounded-lg !mx-0 !my-1 !h-10 !leading-10
              ${item.key === selectedKey 
                ? '!bg-white !text-teal-600 !shadow-sm' 
                : '!text-gray-700 hover:!bg-white hover:!bg-opacity-50'
              }
            `
          }))}
        />
      </div>

      {/* Footer Menu - Hidden for v1 */}
      {/* 
      <div className="px-3 pb-4 border-t border-gray-100 pt-4">
        <Menu
          mode="inline"
          className="border-none bg-transparent"
          style={{ backgroundColor: 'transparent' }}
        >
          {footerMenuItems.map(item => (
            <Menu.Item 
              key={item.key} 
              icon={item.icon}
              className="!rounded-lg !mx-0 !my-1 !h-10 !leading-10 !text-gray-700 hover:!bg-white hover:!bg-opacity-50"
            >
              <span className="text-sm font-medium">{item.label}</span>
            </Menu.Item>
          ))}
        </Menu>
      </div>
      */}
    </div>
  );
};

export default SideBar;