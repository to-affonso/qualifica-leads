'use client';

import { Menu, Typography } from 'antd';
import { 
  HomeOutlined,
  CustomerServiceOutlined,
  FunnelPlotOutlined,
  BookOutlined,
  BarChartOutlined,
  SettingOutlined,
  SendOutlined,
  QuestionCircleOutlined
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
    if (pathname.startsWith('/funil-negocios')) return 'funil-negocios';
    if (pathname.startsWith('/catalogo-imoveis')) return 'catalogo-imoveis';
    if (pathname.startsWith('/relatorios')) return 'relatorios';
    if (pathname.startsWith('/configuracoes')) return 'configuracoes';
    if (pathname === '/') return 'inicial';
    return 'inicial';
  };
  
  const [selectedKey, setSelectedKey] = useState(getSelectedKey());

  // Main menu items with navigation
  const mainMenuItems = [
    {
      key: 'inicial',
      icon: <HomeOutlined />,
      label: 'Inicial',
      path: '/',
    },
    {
      key: 'atendimentos',
      icon: <CustomerServiceOutlined />,
      label: 'Atendimentos',
      path: '/atendimentos',
    },
    {
      key: 'funil-negocios',
      icon: <FunnelPlotOutlined />,
      label: 'Funil de negócios',
      path: '/funil-negocios',
    },
    {
      key: 'catalogo-imoveis',
      icon: <BookOutlined />,
      label: 'Catálogo de imóveis',
      path: '/catalogo-imoveis',
    },
    {
      key: 'relatorios',
      icon: <BarChartOutlined />,
      label: 'Relatórios',
      path: '/relatorios',
    },
    {
      key: 'configuracoes',
      icon: <SettingOutlined />,
      label: 'Configurações',
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

  // Footer menu items
  const footerMenuItems = [
    {
      key: 'enviar-feedback',
      icon: <SendOutlined />,
      label: 'Enviar feedback',
    },
    {
      key: 'central-ajuda',
      icon: <QuestionCircleOutlined />,
      label: 'Central de Ajuda',
    },
  ];

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
        >
          {mainMenuItems.map(item => (
            <Menu.Item 
              key={item.key} 
              icon={item.icon}
              className={`
                !rounded-lg !mx-0 !my-1 !h-10 !leading-10
                ${item.key === selectedKey 
                  ? '!bg-white !text-teal-600 !shadow-sm' 
                  : '!text-gray-700 hover:!bg-white hover:!bg-opacity-50'
                }
              `}
            >
              <span className="text-sm font-medium">{item.label}</span>
            </Menu.Item>
          ))}
        </Menu>
      </div>

      {/* Footer Menu */}
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
    </div>
  );
};

export default SideBar;