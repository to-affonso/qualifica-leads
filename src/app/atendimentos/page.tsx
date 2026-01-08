'use client';

import { useState, useEffect } from 'react';
import { 
  Typography, 
  Input, 
  Button, 
  Tabs, 
  Table, 
  Tag, 
  Spin,
  Alert
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import FilterModal, { FilterValues } from '@/components/modals/FilterModal';
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
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states - usando o novo formato
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({
    status: [],
    tipoNegocio: [],
    tipoImovel: [],
    interesseVisita: [],
    origem: [],
    dataPrimeiroContato: null,
    dataUltimoContato: null
  });

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

  // Função para aplicar filtros
  const handleApplyFilters = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  // Função para remover um filtro específico
  const removeFilter = (filterType: keyof FilterValues, value: string) => {
    const newFilters = { ...appliedFilters };
    if (Array.isArray(newFilters[filterType])) {
      (newFilters[filterType] as string[]) = (newFilters[filterType] as string[]).filter(item => item !== value);
    }
    setAppliedFilters(newFilters);
  };

  // Função para limpar todos os filtros
  const clearAllFilters = () => {
    setAppliedFilters({
      status: [],
      tipoNegocio: [],
      tipoImovel: [],
      interesseVisita: [],
      origem: [],
      dataPrimeiroContato: null,
      dataUltimoContato: null
    });
  };

  // Função para verificar se há filtros aplicados
  const hasActiveFilters = () => {
    return appliedFilters.status.length > 0 ||
           appliedFilters.tipoNegocio.length > 0 ||
           appliedFilters.tipoImovel.length > 0 ||
           appliedFilters.interesseVisita.length > 0 ||
           appliedFilters.origem.length > 0 ||
           appliedFilters.dataPrimeiroContato !== null ||
           appliedFilters.dataUltimoContato !== null;
  };

  // Função para formatar data para exibição
  const formatDateRange = (dateRange: [any, any] | null) => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) return '';
    const startDate = dateRange[0].format('DD/MM/YYYY');
    const endDate = dateRange[1].format('DD/MM/YYYY');
    return `${startDate} a ${endDate}`;
  };

  // Filtrar dados baseado na aba ativa, termo de busca e filtros aplicados
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

    // Aplicar filtros do modal
    if (appliedFilters.status.length > 0) {
      filtered = filtered.filter(lead => appliedFilters.status.includes(lead.status));
    }

    if (appliedFilters.tipoNegocio.length > 0) {
      filtered = filtered.filter(lead => appliedFilters.tipoNegocio.includes(lead.tipoNegocio));
    }

    if (appliedFilters.origem.length > 0) {
      filtered = filtered.filter(lead => appliedFilters.origem.includes(lead.origem));
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
  }, [activeTab, searchTerm, mockData, originalData, appliedFilters]);

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
          style={{
            ...getStatusStyle(status),
            borderRadius: '4px'
          }}
          className="px-3 py-1 border-0"
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
              onClick={() => setFilterModalOpen(true)}
              className="h-10 px-4"
            >
              Filtrar
            </Button>
          </div>

          {/* Applied Filters Section */}
          {hasActiveFilters() && (
            <div className="mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600 font-medium">Filtros:</span>
                
                {/* Status filters */}
                {appliedFilters.status.map((status) => (
                  <Tag
                    key={`status-${status}`}
                    closable
                    onClose={() => removeFilter('status', status)}
                    style={{
                      backgroundColor: '#E4F0ED',
                      border: '1px solid #E4F0ED',
                      color: '#191F23',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                    closeIcon={<CloseOutlined style={{ fontSize: '10px', color: '#191F23' }} />}
                  >
                    Status: {status}
                  </Tag>
                ))}

                {/* Tipo de negócio filters */}
                {appliedFilters.tipoNegocio.map((tipo) => (
                  <Tag
                    key={`tipo-negocio-${tipo}`}
                    closable
                    onClose={() => removeFilter('tipoNegocio', tipo)}
                    style={{
                      backgroundColor: '#E4F0ED',
                      border: '1px solid #E4F0ED',
                      color: '#191F23',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                    closeIcon={<CloseOutlined style={{ fontSize: '10px', color: '#191F23' }} />}
                  >
                    Tipo de negócio: {tipo}
                  </Tag>
                ))}

                {/* Tipo de imóvel filters */}
                {appliedFilters.tipoImovel.map((tipo) => (
                  <Tag
                    key={`tipo-imovel-${tipo}`}
                    closable
                    onClose={() => removeFilter('tipoImovel', tipo)}
                    style={{
                      backgroundColor: '#E4F0ED',
                      border: '1px solid #E4F0ED',
                      color: '#191F23',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                    closeIcon={<CloseOutlined style={{ fontSize: '10px', color: '#191F23' }} />}
                  >
                    Tipo de imóvel: {tipo}
                  </Tag>
                ))}

                {/* Interesse em visita filters */}
                {appliedFilters.interesseVisita.map((interesse) => (
                  <Tag
                    key={`interesse-${interesse}`}
                    closable
                    onClose={() => removeFilter('interesseVisita', interesse)}
                    style={{
                      backgroundColor: '#E4F0ED',
                      border: '1px solid #E4F0ED',
                      color: '#191F23',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                    closeIcon={<CloseOutlined style={{ fontSize: '10px', color: '#191F23' }} />}
                  >
                    Interesse em visita: {interesse}
                  </Tag>
                ))}

                {/* Origem filters */}
                {appliedFilters.origem.map((origem) => (
                  <Tag
                    key={`origem-${origem}`}
                    closable
                    onClose={() => removeFilter('origem', origem)}
                    style={{
                      backgroundColor: '#E4F0ED',
                      border: '1px solid #E4F0ED',
                      color: '#191F23',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                    closeIcon={<CloseOutlined style={{ fontSize: '10px', color: '#191F23' }} />}
                  >
                    Origem: {origem}
                  </Tag>
                ))}

                {/* Data primeiro contato filter */}
                {appliedFilters.dataPrimeiroContato && (
                  <Tag
                    closable
                    onClose={() => setAppliedFilters({ ...appliedFilters, dataPrimeiroContato: null })}
                    style={{
                      backgroundColor: '#E4F0ED',
                      border: '1px solid #E4F0ED',
                      color: '#191F23',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                    closeIcon={<CloseOutlined style={{ fontSize: '10px', color: '#191F23' }} />}
                  >
                    Data primeiro contato: {formatDateRange(appliedFilters.dataPrimeiroContato)}
                  </Tag>
                )}

                {/* Data último contato filter */}
                {appliedFilters.dataUltimoContato && (
                  <Tag
                    closable
                    onClose={() => setAppliedFilters({ ...appliedFilters, dataUltimoContato: null })}
                    style={{
                      backgroundColor: '#E4F0ED',
                      border: '1px solid #E4F0ED',
                      color: '#191F23',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                    closeIcon={<CloseOutlined style={{ fontSize: '10px', color: '#191F23' }} />}
                  >
                    Data último contato: {formatDateRange(appliedFilters.dataUltimoContato)}
                  </Tag>
                )}

                {/* Clear all filters button */}
                <Button
                  type="text"
                  size="small"
                  onClick={clearAllFilters}
                  style={{
                    color: '#20A483',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '4px 8px',
                    height: 'auto'
                  }}
                  className="hover:bg-green-50"
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          )}

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

        {/* Filter Modal */}
        <FilterModal
          open={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={handleApplyFilters}
          statusOptions={Object.entries(statusCounts).map(([status, count]) => ({
            label: status,
            value: status,
            count
          }))}
          businessTypeOptions={Object.entries(businessTypeCounts).map(([type, count]) => ({
            label: type,
            value: type,
            count
          }))}
          sourceOptions={Object.entries(sourceCounts).map(([source, count]) => ({
            label: source,
            value: source,
            count
          }))}
        />
      </div>
    </MainLayout>
  );
};

export default AtendimentosPage;