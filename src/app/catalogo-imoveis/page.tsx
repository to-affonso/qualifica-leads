'use client';

import { useState } from 'react';
import { 
  Typography, 
  Input, 
  Button, 
  Card, 
  Tag, 
  Drawer,
  Collapse,
  Checkbox,
  Select,
  Space,
  Row,
  Col,
  Switch,
  Tabs
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined,
  SettingOutlined,
  UpOutlined,
  DownOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  CarOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text } = Typography;
const { Option } = Select;

// Mock data for properties
const mockProperties = [
  {
    id: '1',
    tipo: 'Apartamento',
    finalidade: 'Venda',
    preco: 'R$ 1.240.000',
    endereco: 'Rua João Moura, Bela Vista',
    area: '118m²',
    quartos: 4,
    banheiros: 2,
    vagas: 2,
    status: 'Novo',
    imagem: '/images/photos/banner_thumbnail.jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    perfilLeads: 15,
  },
  {
    id: '2',
    tipo: 'Casa',
    finalidade: 'Locação',
    preco: 'R$ 3.500/mês',
    endereco: 'Rua das Flores, Jardim Europa',
    area: '200m²',
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    status: null,
    imagem: '/images/photos/banner_thumbnail (1).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    perfilLeads: 8,
  },
  {
    id: '3',
    tipo: 'Apartamento',
    finalidade: 'Venda',
    preco: 'R$ 850.000',
    endereco: 'Av. Paulista, Cerqueira César',
    area: '85m²',
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    status: null,
    imagem: '/images/photos/banner_thumbnail (2).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    perfilLeads: 22,
  },
  {
    id: '4',
    tipo: 'Cobertura',
    finalidade: 'Venda',
    preco: 'R$ 2.800.000',
    endereco: 'Rua Oscar Freire, Jardins',
    area: '300m²',
    quartos: 4,
    banheiros: 4,
    vagas: 3,
    status: 'Novo',
    imagem: '/images/photos/banner_thumbnail (3).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    perfilLeads: 5,
  },
  {
    id: '5',
    tipo: 'Casa',
    finalidade: 'Locação',
    preco: 'R$ 4.200/mês',
    endereco: 'Rua Harmonia, Vila Madalena',
    area: '180m²',
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    status: 'Novo',
    imagem: '/images/photos/banner_thumbnail (4).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    perfilLeads: 12,
  },
  {
    id: '6',
    tipo: 'Apartamento',
    finalidade: 'Venda',
    preco: 'R$ 650.000',
    endereco: 'Rua Consolação, República',
    area: '65m²',
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    status: null,
    imagem: '/images/photos/banner_thumbnail (5).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    perfilLeads: 18,
  }
];

const CatalogoImoveisPage = () => {
  const router = useRouter();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Venda');
  
  // Filter states
  const [selectedTipo, setSelectedTipo] = useState<string[]>([]);
  const [selectedFinalidade, setSelectedFinalidade] = useState<string[]>([]);
  const [selectedQuartos, setSelectedQuartos] = useState<string[]>([]);
  const [selectedBanheiros, setSelectedBanheiros] = useState<string[]>([]);
  const [selectedVagas, setSelectedVagas] = useState<string[]>([]);
  const [precoMin, setPrecoMin] = useState<string>('');
  const [precoMax, setPrecoMax] = useState<string>('');

  // Filter properties by tab
  const filteredProperties = mockProperties.filter(property => property.finalidade === activeTab);

  // Get status style
  const getStatusStyle = (status: string) => {
    return { backgroundColor: '#20A483', color: '#ffffff' };
  };

  // Property Card Component
  const PropertyCard = ({ property }: { property: any }) => (
    <Card
      hoverable
      className="h-full rounded-lg overflow-hidden"
      style={{ border: '1px solid #C1C7CD' }}
      bodyStyle={{ padding: 0 }}
      onClick={() => router.push(`/catalogo-imoveis/${property.id}`)}
    >
      <div className="relative">
        {/* Property Image */}
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img 
            src={property.imagem} 
            alt={`${property.tipo} - ${property.endereco}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Status Badge */}
        {property.status && (
          <div className="absolute top-3 left-3">
            <Tag 
              style={getStatusStyle(property.status)}
              className="rounded-full px-3 py-1 border-0 text-sm font-medium"
            >
              {property.status}
            </Tag>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Property Type and Purpose */}
        <div className="flex items-center gap-2 mb-2">
          <Text className="text-sm text-gray-600">{property.finalidade}</Text>
          <Text className="text-sm text-gray-600">•</Text>
          <Text className="text-sm text-gray-600">{property.tipo}</Text>
        </div>

        {/* Price */}
        <Title level={4} className="!mb-2 !mt-0 text-xl font-bold">
          {property.preco}
        </Title>

        {/* Address */}
        <div className="flex items-start gap-1 mb-3">
          <EnvironmentOutlined className="text-gray-400 mt-1 text-sm" />
          <Text className="text-sm text-gray-600 leading-relaxed">
            {property.endereco}
          </Text>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <img src="/images/icons/iconSize.svg" alt="Área" className="w-5 h-5 opacity-60" />
            <Text className="text-sm text-gray-600">{property.area}</Text>
          </div>
          <div className="flex items-center gap-1">
            <img src="/images/icons/iconBed.svg" alt="Quartos" className="w-5 h-5 opacity-60" />
            <Text className="text-sm text-gray-600">{property.quartos}</Text>
          </div>
          <div className="flex items-center gap-1">
            <img src="/images/icons/iconShower.svg" alt="Banheiros" className="w-5 h-5 opacity-60" />
            <Text className="text-sm text-gray-600">{property.banheiros}</Text>
          </div>
          <div className="flex items-center gap-1">
            <img src="/images/icons/iconCar.svg" alt="Vagas" className="w-5 h-5 opacity-60" />
            <Text className="text-sm text-gray-600">{property.vagas}</Text>
          </div>
        </div>

        {/* Lead Profile */}
        <div className="mb-4">
          <Tag className="text-xs px-2 py-1 bg-blue-50 text-blue-600 border-blue-200 rounded">
            Imóvel com perfil para {property.perfilLeads} leads
          </Tag>
        </div>

        {/* Property Dates */}
        <div className="text-xs text-gray-500 flex gap-4 mb-4">
          <span>Cadastrado em {property.cadastrado}</span>
          <span>Atualizado em {property.atualizado}</span>
        </div>

        {/* Hide from listing switch */}
        <div className="flex items-center justify-between mb-4">
          <Text className="text-sm text-gray-600">Ocultar na listagem</Text>
          <Switch size="small" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            type="default" 
            size="middle"
            className="flex-1 h-10"
            onClick={(e) => {
              e.stopPropagation();
              // Handle view details
            }}
          >
            Ver detalhes
          </Button>
          <Button 
            type="text" 
            size="middle"
            className="flex-1 h-10"
            onClick={(e) => {
              e.stopPropagation();
              // Handle exclude
            }}
          >
            Excluir
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* Fixed Header Section */}
        <div className="bg-white px-6 py-6">
          {/* Title and Settings */}
          <div className="flex items-center justify-between mb-6">
            <Title level={2} className="!mb-0 !mt-0">
              Catálogo de Imóveis
            </Title>
            <Button
              icon={<SettingOutlined />}
              onClick={() => router.push('/configuracoes/xml')}
              className="h-10 px-4"
            >
              Configurações XML
            </Button>
          </div>

          {/* Search and Filter Row */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Pesquisar imóvel por endereço, tipo ou código"
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

          {/* Tabs */}
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: 'Venda',
                label: 'Venda',
              },
              {
                key: 'Locação',
                label: 'Locação',
              },
            ]}
            className="mb-0"
          />
        </div>

        {/* Scrollable Properties Grid */}
        <div className="flex-1 overflow-auto bg-gray-50 px-6 py-6">
          <Row gutter={[24, 24]}>
            {filteredProperties.map((property) => (
              <Col key={property.id} xs={24} sm={12} lg={8} xl={6}>
                <PropertyCard property={property} />
              </Col>
            ))}
          </Row>
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
              defaultActiveKey={['tipo']}
              ghost
              expandIcon={({ isActive }) => 
                isActive ? <UpOutlined /> : <DownOutlined />
              }
              className="filter-collapse"
            >
              {/* Tipo Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Tipo de Imóvel</span>} 
                key="tipo"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  {['Apartamento', 'Casa', 'Cobertura', 'Sobrado', 'Kitnet', 'Loft'].map(tipo => (
                    <Checkbox
                      key={tipo}
                      checked={selectedTipo.includes(tipo)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTipo([...selectedTipo, tipo]);
                        } else {
                          setSelectedTipo(selectedTipo.filter(t => t !== tipo));
                        }
                      }}
                    >
                      <span className="text-gray-700">{tipo}</span>
                    </Checkbox>
                  ))}
                </div>
              </Collapse.Panel>

              {/* Finalidade Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Finalidade</span>} 
                key="finalidade"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  {['Venda', 'Locação'].map(finalidade => (
                    <Checkbox
                      key={finalidade}
                      checked={selectedFinalidade.includes(finalidade)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFinalidade([...selectedFinalidade, finalidade]);
                        } else {
                          setSelectedFinalidade(selectedFinalidade.filter(f => f !== finalidade));
                        }
                      }}
                    >
                      <span className="text-gray-700">{finalidade}</span>
                    </Checkbox>
                  ))}
                </div>
              </Collapse.Panel>

              {/* Preço Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Faixa de Preço</span>} 
                key="preco"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  <Input
                    placeholder="Preço mínimo"
                    value={precoMin}
                    onChange={(e) => setPrecoMin(e.target.value)}
                  />
                  <Input
                    placeholder="Preço máximo"
                    value={precoMax}
                    onChange={(e) => setPrecoMax(e.target.value)}
                  />
                </div>
              </Collapse.Panel>

              {/* Quartos Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Quartos</span>} 
                key="quartos"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  {['1', '2', '3', '4', '5+'].map(quartos => (
                    <Checkbox
                      key={quartos}
                      checked={selectedQuartos.includes(quartos)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedQuartos([...selectedQuartos, quartos]);
                        } else {
                          setSelectedQuartos(selectedQuartos.filter(q => q !== quartos));
                        }
                      }}
                    >
                      <span className="text-gray-700">{quartos} quarto{quartos !== '1' ? 's' : ''}</span>
                    </Checkbox>
                  ))}
                </div>
              </Collapse.Panel>

              {/* Banheiros Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Banheiros</span>} 
                key="banheiros"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  {['1', '2', '3', '4+'].map(banheiros => (
                    <Checkbox
                      key={banheiros}
                      checked={selectedBanheiros.includes(banheiros)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBanheiros([...selectedBanheiros, banheiros]);
                        } else {
                          setSelectedBanheiros(selectedBanheiros.filter(b => b !== banheiros));
                        }
                      }}
                    >
                      <span className="text-gray-700">{banheiros} banheiro{banheiros !== '1' ? 's' : ''}</span>
                    </Checkbox>
                  ))}
                </div>
              </Collapse.Panel>

              {/* Vagas Filter */}
              <Collapse.Panel 
                header={<span className="text-base font-medium text-gray-700">Vagas de Garagem</span>} 
                key="vagas"
                className="!border-0"
              >
                <div className="space-y-3 pl-0">
                  {['0', '1', '2', '3', '4+'].map(vagas => (
                    <Checkbox
                      key={vagas}
                      checked={selectedVagas.includes(vagas)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVagas([...selectedVagas, vagas]);
                        } else {
                          setSelectedVagas(selectedVagas.filter(v => v !== vagas));
                        }
                      }}
                    >
                      <span className="text-gray-700">{vagas} vaga{vagas !== '1' ? 's' : ''}</span>
                    </Checkbox>
                  ))}
                </div>
              </Collapse.Panel>
            </Collapse>

            {/* Filter Actions */}
            <div className="pt-6 border-t border-gray-200">
              <Space className="w-full justify-between">
                <Button 
                  type="text" 
                  onClick={() => {
                    setSelectedTipo([]);
                    setSelectedFinalidade([]);
                    setSelectedQuartos([]);
                    setSelectedBanheiros([]);
                    setSelectedVagas([]);
                    setPrecoMin('');
                    setPrecoMax('');
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

export default CatalogoImoveisPage;