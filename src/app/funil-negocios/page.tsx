'use client';

import { useState } from 'react';
import { 
  Typography, 
  Input, 
  Button, 
  Card,
  Tag,
  Dropdown
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined,
  DownOutlined,
  EditOutlined,
  FolderOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text } = Typography;

// Mock data for kanban cards
const mockKanbanData = {
  atendido: [
    {
      id: 1,
      nome: 'Aparecida Silva',
      telefone: '(11) 96547-8974',
      tipoNegocio: 'Compra',
      corretor: 'Não atribuído'
    },
    {
      id: 2,
      nome: 'Cássia Albuquerque',
      telefone: '(21) 99876-5432',
      tipoNegocio: 'Compra',
      corretor: 'Não atribuído'
    },
    {
      id: 3,
      nome: 'Demétrio Freitas',
      telefone: '(31) 98642-9753',
      tipoNegocio: 'Locação',
      corretor: 'João Silva'
    }
  ],
  visitaAgendada: [
    {
      id: 4,
      nome: 'Aparecida Silva',
      telefone: '(11) 96547-8974',
      tipoNegocio: 'Compra',
      corretor: 'Não atribuído'
    },
    {
      id: 5,
      nome: 'Demétrio Freitas',
      telefone: '(31) 98642-9753',
      tipoNegocio: 'Locação',
      corretor: 'João Silva'
    }
  ],
  visitaRealizada: [
    {
      id: 6,
      nome: 'Aparecida Silva',
      telefone: '(11) 96547-8974',
      tipoNegocio: 'Compra',
      corretor: 'Não atribuído'
    },
    {
      id: 7,
      nome: 'Demétrio Freitas',
      telefone: '(31) 98642-9753',
      tipoNegocio: 'Locação',
      corretor: 'João Silva'
    }
  ],
  emFechamento: [
    {
      id: 8,
      nome: 'Aparecida Silva',
      telefone: '(11) 96547-8974',
      tipoNegocio: 'Compra',
      corretor: 'Não atribuído'
    },
    {
      id: 9,
      nome: 'Demétrio Freitas',
      telefone: '(31) 98642-9753',
      tipoNegocio: 'Locação',
      corretor: 'João Silva'
    }
  ]
};

const FunilNegociosPage = () => {
  const [searchText, setSearchText] = useState('');

  // Order by dropdown items
  const orderByMenuItems = [
    {
      key: '1',
      label: 'Data de criação',
    },
    {
      key: '2',
      label: 'Nome do cliente',
    },
    {
      key: '3',
      label: 'Valor do negócio',
    },
  ];

  const getTipoNegocioColor = (tipo: string) => {
    return tipo === 'Compra' ? '#387BA8' : '#20A483';
  };

  const renderKanbanCard = (item: any, index: number, array: any[]) => (
    <Card 
      key={item.id}
      className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      size="small"
      style={{ marginBottom: index === array.length - 1 ? '0' : '16px' }}
    >
      <div className="space-y-3">
        {/* Nome */}
        <div>
          <Text className="font-medium text-gray-900">{item.nome}</Text>
        </div>
        
        {/* Telefone */}
        <div>
          <Text className="text-sm text-gray-600">{item.telefone}</Text>
        </div>
        
        {/* Tipo de Negócio */}
        <div>
          <Tag 
            style={{ 
              backgroundColor: getTipoNegocioColor(item.tipoNegocio),
              color: '#ffffff',
              border: 'none'
            }}
            className="rounded-full px-3 py-1"
          >
            {item.tipoNegocio}
          </Tag>
        </div>
        
        {/* Corretor */}
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-xs text-gray-500">Corretor: </Text>
            <Text className="text-xs font-medium">{item.corretor}</Text>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              type="text" 
              icon={<FolderOutlined />} 
              size="small"
              className="text-gray-400 hover:text-gray-600"
            />
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
        </div>
      </div>
    </Card>
  );

  const renderKanbanColumn = (title: string, count: number, items: any[], bgColor: string) => (
    <div className="flex-1 min-w-0">
      {/* Column Header */}
      <div 
        className="p-4 rounded-t-lg"
        style={{ backgroundColor: bgColor }}
      >
        <Text className="font-semibold text-gray-700">
          {title} <span className="font-normal">{count.toString().padStart(2, '0')}</span>
        </Text>
      </div>
      
      {/* Column Content */}
      <div 
        className="p-4 min-h-96"
        style={{ backgroundColor: bgColor }}
      >
        <div>
          {items.map((item, index) => renderKanbanCard(item, index, items))}
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="h-full flex flex-col bg-white">
        {/* Header Section */}
        <div className="px-6 py-6">
          {/* Title */}
          <Title level={2} className="!mb-6 !mt-0">
            Funil de negócios
          </Title>

          {/* Search and Actions Row */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Pesquisar atendimento"
                prefix={<SearchOutlined className="text-gray-400" />}
                className="h-10"
                style={{ maxWidth: 400 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            
            <Dropdown
              menu={{ items: orderByMenuItems }}
              trigger={['click']}
            >
              <Button className="h-10 px-4">
                Ordenar por <DownOutlined />
              </Button>
            </Dropdown>
            
            <Button
              icon={<FilterOutlined />}
              className="h-10 px-4"
            >
              Filtrar
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 px-6 pb-6">
          <div className="flex gap-4 h-full">
            {renderKanbanColumn(
              'Atendido', 
              mockKanbanData.atendido.length, 
              mockKanbanData.atendido,
              '#F2F4F8'
            )}
            {renderKanbanColumn(
              'Visita agendada', 
              mockKanbanData.visitaAgendada.length, 
              mockKanbanData.visitaAgendada,
              '#F2F4F8'
            )}
            {renderKanbanColumn(
              'Visita realizada', 
              mockKanbanData.visitaRealizada.length, 
              mockKanbanData.visitaRealizada,
              '#F2F4F8'
            )}
            {renderKanbanColumn(
              'Em fechamento', 
              mockKanbanData.emFechamento.length, 
              mockKanbanData.emFechamento,
              '#F2F4F8'
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FunilNegociosPage;