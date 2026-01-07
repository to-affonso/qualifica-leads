'use client';

import { useState, useEffect } from 'react';
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
  Space,
  Spin,
  Alert
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined,
  UpOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { 
  loadLeadsData, 
  countLeadsByStatus, 
  countLeadsByBusinessType, 
  countLeadsBySource,
  TransformedLead,
  LeadData 
} from '@/utils/leadsData';

const { Title } = Typography;

const AtendimentosPage = () => {
  const router = useRouter();
  
  // Estados para dados e carregamento
  const [mockData, setMockData] = useState<TransformedLead[]>([]);
  const [originalData, setOriginalData] = useState<LeadData[]>([]);
  const [filteredData, setFilteredData] = useState<TransformedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para contadores dinâmicos
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [businessTypeCounts, setBusinessTypeCounts] = useState<Record<string, number>>({});
  const [sourceCounts, setSourceCounts] = useState<Record<string, number>>({});
  
  // Estados existentes
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTipoNegocio, setSelectedTipoNegocio] = useState<string[]>([]);
  const [selectedOrigem, setSelectedOrigem] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[any, any] | null>(null);

  // Carregar dados do JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Transformar dados usando a função existente
        const data = await loadLeadsData();
        setMockData(data);
        setFilteredData(data);
        
        // Carregar dados originais separadamente
        const response = await fetch('/db/leads_mock.json');
        if (response.ok) {
          const originalLeads: LeadData[] = await response.json();
          setOriginalData(originalLeads);
        }
        
        // Calcular contadores
        setStatusCounts(countLeadsByStatus(data));
        setBusinessTypeCounts(countLeadsByBusinessType(data));
        setSourceCounts(countLeadsBySource(data));
        
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados dos atendimentos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrar dados baseado na aba ativa e termo de busca
  useEffect(() => {
    if (mockData.length === 0) return;
    
    let filtered = [...mockData];

    // Filtrar por aba
    switch (activeTab) {
      case 'interesse-visita':
        filtered = filtered.filter(lead => {
          const originalLead = originalData.find(orig => orig.leadId === lead.key);
          return originalLead?.visitInterest === 'Sim';
        });
        break;
      case 'incompletos':
        filtered = filtered.filter(lead => 
          lead.status === 'Ajuda solicitada' || lead.status === 'Intervenção humana'
        );
        break;
      case 'sem-resposta':
        filtered = filtered.filter(lead => lead.status === 'Sem resposta');
        break;
      default:
        // 'todos' - não filtra
        break;
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.telefone.includes(searchTerm) ||
        lead.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.tipoNegocio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.origem.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [activeTab, searchTerm, mockData, originalData]);

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
      render: (nome: string, record: TransformedLead) => (
        <div>
          <div className="font-medium text-gray-900">{nome}</div>
          <div className="text-sm" style={{ color: '#697077' }}>{record.telefone}</div>
        </div>
      ),
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
      title: 'Tipo de imóvel',
      dataIndex: 'tipoImovel',
      key: 'tipoImovel',
      width: 150,
      render: (_: any, record: TransformedLead) => {
        if (!originalData.length) return '-';
        const originalLead = originalData.find(orig => orig.leadId === record.key);
        return originalLead?.propertyType || '-';
      },
    },
    {
      title: 'Interesse em visita',
      dataIndex: 'interesseVisita',
      key: 'interesseVisita',
      width: 150,
      render: (_: any, record: TransformedLead) => {
        if (!originalData.length) return '-';
        const originalLead = originalData.find(orig => orig.leadId === record.key);
        return originalLead?.visitInterest || '-';
      },
    },
    {
      title: 'Origem',
      dataIndex: 'origem',
      key: 'origem',
      width: 150,
    },
    {
      title: 'Primeiro contato',
      dataIndex: 'primeiroContato',
      key: 'primeiroContato',
      width: 150,
      render: (_: any, record: TransformedLead) => {
        if (!originalData.length) return '-';
        const originalLead = originalData.find(orig => orig.leadId === record.key);
        if (!originalLead?.creationDate) return '-';
        
        try {
          const date = new Date(originalLead.creationDate);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          
          return (
            <div className="text-sm">
              <div className="text-gray-900">{`${day}/${month}/${year}`}</div>
              <div style={{ color: '#697077' }}>{`${hours}:${minutes}`}</div>
            </div>
          );
        } catch (error) {
          return '-';
        }
      },
    },
    {
      title: 'Último contato',
      dataIndex: 'ultimoContato',
      key: 'ultimoContato',
      width: 150,
      render: (text: string) => {
        const [datePart, timePart] = text.split('\n');
        return (
          <div className="text-sm">
            <div className="text-gray-900">{datePart}</div>
            <div style={{ color: '#697077' }}>{timePart}</div>
          </div>
        );
      },
    },
  ];

  // Tab items
  const tabItems = [
    {
      key: 'todos',
      label: 'Todos',
    },
    {
      key: 'interesse-visita',
      label: 'Interesse em visita',
    },
    {
      key: 'incompletos',
      label: 'Atendimentos incompletos',
    },
    {
      key: 'sem-resposta',
      label: 'Sem resposta',
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Tabs Row */}
          <div className="flex items-center">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              className="flex-1 custom-tabs-spacing"
            />
          </div>
        </div>

        {/* Scrollable Table Section */}
        <div className="flex-1 overflow-hidden bg-white px-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <Alert
                message="Erro ao carregar dados"
                description={error}
                type="error"
                showIcon
                action={
                  <Button size="small" onClick={() => window.location.reload()}>
                    Tentar novamente
                  </Button>
                }
              />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={false}
              scroll={{ y: 'calc(100vh - 280px)' }}
              className="h-full"
              size="middle"
              onRow={(record) => ({
                onClick: () => {
                  router.push(`/atendimentos/detalhes?id=${record.key}`);
                },
                style: { cursor: 'pointer' }
              })}
            />
          )}
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
                    <span className="text-gray-700">Em atendimento ({statusCounts['Em atendimento'] || 0})</span>
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
                    <span className="text-gray-700">Concluído ({statusCounts['Concluído'] || 0})</span>
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
                    <span className="text-gray-700">Ajuda solicitada ({statusCounts['Ajuda solicitada'] || 0})</span>
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
                    <span className="text-gray-700">Sem resposta ({statusCounts['Sem resposta'] || 0})</span>
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
                    <span className="text-gray-700">Número inválido ({statusCounts['Número inválido'] || 0})</span>
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
                    <span className="text-gray-700">Intervenção humana ({statusCounts['Intervenção humana'] || 0})</span>
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
                  {Object.entries(businessTypeCounts).map(([type, count]) => (
                    <Checkbox
                      key={type}
                      checked={selectedTipoNegocio.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTipoNegocio([...selectedTipoNegocio, type]);
                        } else {
                          setSelectedTipoNegocio(selectedTipoNegocio.filter(t => t !== type));
                        }
                      }}
                    >
                      <span className="text-gray-700">{type} ({count})</span>
                    </Checkbox>
                  ))}
                </div>
              </Collapse.Panel>

              {/* Origem Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Origem</span>} 
                key="origem"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  {Object.entries(sourceCounts).map(([source, count]) => (
                    <Checkbox
                      key={source}
                      checked={selectedOrigem.includes(source)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrigem([...selectedOrigem, source]);
                        } else {
                          setSelectedOrigem(selectedOrigem.filter(o => o !== source));
                        }
                      }}
                    >
                      <span className="text-gray-700">{source} ({count})</span>
                    </Checkbox>
                  ))}
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