'use client';

import { useState } from 'react';
import { 
  Typography, 
  Input, 
  Button, 
  Tabs, 
  Table, 
  Tag, 
  Drawer,
  Collapse,
  Checkbox,
  DatePicker,
  Space
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  UpOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

const { Title } = Typography;

// Mock data for the table
const mockData = [
  {
    key: '1',
    nome: 'Aparecida Silva',
    telefone: '(11) 99547-6974',
    status: 'Em atendimento',
    tipoNegocio: 'Compra',
    origem: 'WhatsApp',
    ultimoContato: '15/08/2024\n14:30',
  },
  {
    key: '2',
    nome: 'Benedito Mariano',
    telefone: '(13) 98765-4321',
    status: 'Concluído',
    tipoNegocio: 'Locação',
    origem: 'WhatsApp',
    ultimoContato: '14/08/2024\n16:15',
  },
  {
    key: '3',
    nome: 'Cássia Albuquerque',
    telefone: '(21) 99978-5432',
    status: 'Em atendimento',
    tipoNegocio: 'Compra',
    origem: 'Site imobiliária',
    ultimoContato: '14/08/2024\n09:45',
  },
  {
    key: '4',
    nome: 'Demétrio Freitas',
    telefone: '(31) 98642-9753',
    status: 'Ajuda solicitada',
    tipoNegocio: 'Locação',
    origem: 'Facebook Ads',
    ultimoContato: '13/08/2024\n19:00',
  },
  {
    key: '5',
    nome: 'Estela Camargo',
    telefone: '(41) 97531-8642',
    status: 'Intervenção humana',
    tipoNegocio: 'Compra',
    origem: 'OLX',
    ultimoContato: '12/08/2024\n11:22',
  },
  {
    key: '6',
    nome: 'Fabrício Cunha',
    telefone: '(47) 99988-7766',
    status: 'Número inválido',
    tipoNegocio: 'Locação',
    origem: 'Chaves na mão',
    ultimoContato: '11/08/2024\n18:50',
  },
  {
    key: '7',
    nome: 'Graça Pimenta',
    telefone: '(51) 98999-0011',
    status: 'Sem resposta',
    tipoNegocio: 'Compra',
    origem: 'Site imobiliária',
    ultimoContato: '10/08/2024\n10:00',
  },
  {
    key: '8',
    nome: 'Henrique Azevedo',
    telefone: '(61) 97766-5544',
    status: 'Concluído',
    tipoNegocio: 'Locação',
    origem: 'Facebook Ads',
    ultimoContato: '09/08/2024\n17:30',
  },
  {
    key: '9',
    nome: 'Isabel Macedo',
    telefone: '(71) 96655-4433',
    status: 'Em atendimento',
    tipoNegocio: 'Compra',
    origem: 'OLX',
    ultimoContato: '08/08/2024\n12:45',
  },
];

const AtendimentosPage = () => {
  const router = useRouter();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'
  
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTipoNegocio, setSelectedTipoNegocio] = useState<string[]>([]);
  const [selectedOrigem, setSelectedOrigem] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[any, any] | null>(null);

  // Status tag colors and styles
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Em atendimento':
        return { backgroundColor: '#387BA8', color: '#ffffff' };
      case 'Concluído':
        return { backgroundColor: '#20A483', color: '#ffffff' };
      case 'Ajuda solicitada':
        return { backgroundColor: '#FFA600', color: '#121619' };
      case 'Intervenção humana':
        return { backgroundColor: '#DDE1E6', color: '#121619' };
      case 'Número inválido':
        return { backgroundColor: '#697077', color: '#ffffff' };
      case 'Sem resposta':
        return { backgroundColor: '#CE4242', color: '#ffffff' };
      default:
        return { backgroundColor: '#697077', color: '#ffffff' };
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      width: 200,
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <Tag 
          style={getStatusStyle(status)}
          className="rounded-full px-3 py-1 border-0"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Tipo de negócio',
      dataIndex: 'tipoNegocio',
      key: 'tipoNegocio',
      width: 150,
    },
    {
      title: 'Origem',
      dataIndex: 'origem',
      key: 'origem',
      width: 150,
    },
    {
      title: 'Último contato',
      dataIndex: 'ultimoContato',
      key: 'ultimoContato',
      width: 150,
      render: (text: string) => (
        <div className="whitespace-pre-line text-sm">
          {text}
        </div>
      ),
    },
  ];

  // Tab items
  const tabItems = [
    {
      key: 'todos',
      label: 'Todos',
    },
    {
      key: 'em-andamento',
      label: 'Em andamento',
    },
    {
      key: 'finalizados',
      label: 'Finalizados',
    },
  ];

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* Fixed Header Section */}
        <div className="bg-white px-6 py-6">
          {/* Title */}
          <Title level={2} className="!mb-6 !mt-0">
            Atendimentos
          </Title>

          {/* Search and Filter Row */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Pesquisar atendimento"
                prefix={<SearchOutlined className="text-gray-400" />}
                className="h-10"
                style={{ maxWidth: 400 }}
              />
            </div>
            <Button
              icon={<FilterOutlined />}
              onClick={() => setFilterDrawerOpen(true)}
              className="h-10 px-4"
            >
              Filtrar
            </Button>
          </div>

          {/* Tabs and View Toggle Row */}
          <div className="flex items-center justify-between">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              className="flex-1 custom-tabs-spacing"
            />
            <div className="flex items-center gap-2">
              <Button
                type={viewMode === 'table' ? 'primary' : 'text'}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode('table')}
                className="w-10 h-10 !p-0 flex items-center justify-center"
              />
              <Button
                type={viewMode === 'kanban' ? 'primary' : 'text'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('kanban')}
                className="w-10 h-10 !p-0 flex items-center justify-center"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Table Section */}
        <div className="flex-1 overflow-hidden bg-white px-6">
          <Table
            columns={columns}
            dataSource={mockData}
            pagination={false}
            scroll={{ y: 'calc(100vh - 280px)' }}
            className="h-full"
            size="middle"
            onRow={(record) => ({
              onClick: () => {
                router.push(`/atendimentos/${record.key}`);
              },
              style: { cursor: 'pointer' }
            })}
          />
        </div>

        {/* Filter Drawer */}
        <Drawer
          title="Filtros"
          placement="right"
          onClose={() => setFilterDrawerOpen(false)}
          open={filterDrawerOpen}
          width={400}
          className="filter-drawer"
        >
          <div className="space-y-4">
            <Collapse
              defaultActiveKey={['status']}
              ghost
              expandIcon={({ isActive }) => 
                isActive ? <UpOutlined /> : <DownOutlined />
              }
              className="filter-collapse"
            >
              {/* Status Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Status</span>} 
                key="status"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  <Checkbox
                    checked={selectedStatus.includes('Em atendimento')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatus([...selectedStatus, 'Em atendimento']);
                      } else {
                        setSelectedStatus(selectedStatus.filter(s => s !== 'Em atendimento'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Em atendimento (04)</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedStatus.includes('Concluído')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatus([...selectedStatus, 'Concluído']);
                      } else {
                        setSelectedStatus(selectedStatus.filter(s => s !== 'Concluído'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Concluído (76)</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedStatus.includes('Ajuda solicitada')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatus([...selectedStatus, 'Ajuda solicitada']);
                      } else {
                        setSelectedStatus(selectedStatus.filter(s => s !== 'Ajuda solicitada'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Ajuda solicitada (01)</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedStatus.includes('Sem resposta')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatus([...selectedStatus, 'Sem resposta']);
                      } else {
                        setSelectedStatus(selectedStatus.filter(s => s !== 'Sem resposta'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Sem resposta (14)</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedStatus.includes('Número inválido')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatus([...selectedStatus, 'Número inválido']);
                      } else {
                        setSelectedStatus(selectedStatus.filter(s => s !== 'Número inválido'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Número inválido (07)</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedStatus.includes('Intervenção humana')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatus([...selectedStatus, 'Intervenção humana']);
                      } else {
                        setSelectedStatus(selectedStatus.filter(s => s !== 'Intervenção humana'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Intervenção humana (01)</span>
                  </Checkbox>
                </div>
              </Collapse.Panel>

              {/* Tipo de Negócio Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Tipo de negócio</span>} 
                key="tipo-negocio"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  <Checkbox
                    checked={selectedTipoNegocio.includes('Compra')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTipoNegocio([...selectedTipoNegocio, 'Compra']);
                      } else {
                        setSelectedTipoNegocio(selectedTipoNegocio.filter(t => t !== 'Compra'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Compra</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedTipoNegocio.includes('Locação')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTipoNegocio([...selectedTipoNegocio, 'Locação']);
                      } else {
                        setSelectedTipoNegocio(selectedTipoNegocio.filter(t => t !== 'Locação'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Locação</span>
                  </Checkbox>
                </div>
              </Collapse.Panel>

              {/* Origem Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Origem</span>} 
                key="origem"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  <Checkbox
                    checked={selectedOrigem.includes('WhatsApp')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrigem([...selectedOrigem, 'WhatsApp']);
                      } else {
                        setSelectedOrigem(selectedOrigem.filter(o => o !== 'WhatsApp'));
                      }
                    }}
                  >
                    <span className="text-gray-700">WhatsApp</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedOrigem.includes('Site imobiliária')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrigem([...selectedOrigem, 'Site imobiliária']);
                      } else {
                        setSelectedOrigem(selectedOrigem.filter(o => o !== 'Site imobiliária'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Site imobiliária</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedOrigem.includes('Facebook Ads')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrigem([...selectedOrigem, 'Facebook Ads']);
                      } else {
                        setSelectedOrigem(selectedOrigem.filter(o => o !== 'Facebook Ads'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Facebook Ads</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedOrigem.includes('OLX')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrigem([...selectedOrigem, 'OLX']);
                      } else {
                        setSelectedOrigem(selectedOrigem.filter(o => o !== 'OLX'));
                      }
                    }}
                  >
                    <span className="text-gray-700">OLX</span>
                  </Checkbox>
                  
                  <Checkbox
                    checked={selectedOrigem.includes('Chaves na mão')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrigem([...selectedOrigem, 'Chaves na mão']);
                      } else {
                        setSelectedOrigem(selectedOrigem.filter(o => o !== 'Chaves na mão'));
                      }
                    }}
                  >
                    <span className="text-gray-700">Chaves na mão</span>
                  </Checkbox>
                </div>
              </Collapse.Panel>

              {/* Período Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Período</span>} 
                key="periodo"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  <Space direction="vertical" className="w-full">
                    <DatePicker.RangePicker
                      placeholder={['Data inicial', 'Data final']}
                      className="w-full"
                      format="DD/MM/YYYY"
                      value={dateRange}
                      onChange={setDateRange}
                    />
                  </Space>
                </div>
              </Collapse.Panel>
            </Collapse>

            {/* Filter Actions */}
            <div className="pt-6 border-t border-gray-200">
              <Space className="w-full justify-between">
                <Button 
                  type="text" 
                  onClick={() => {
                    setSelectedStatus([]);
                    setSelectedTipoNegocio([]);
                    setSelectedOrigem([]);
                    setDateRange(null);
                  }}
                >
                  Limpar filtros
                </Button>
                <Button 
                  type="primary"
                  onClick={() => {
                    // Apply filters logic here
                    setFilterDrawerOpen(false);
                  }}
                >
                  Aplicar filtros
                </Button>
              </Space>
            </div>
          </div>
        </Drawer>
      </div>
    </MainLayout>
  );
};

export default AtendimentosPage;