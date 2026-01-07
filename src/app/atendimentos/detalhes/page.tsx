'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Typography, 
  Button, 
  Tabs, 
  Card,
  Tag,
  Breadcrumb,
  Input,
  Dropdown,
  Tooltip
} from 'antd';
import { 
  ArrowLeftOutlined,
  WarningOutlined,
  SendOutlined,
  AudioOutlined,
  ThunderboltOutlined,
  PaperClipOutlined,
  SmileOutlined,
  CheckOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text } = Typography;

// Mock data for the lead details
const mockLeadData = {
  '1': {
    nome: 'Aparecida Silva',
    telefone: '(11) 96547-8974',
    email: 'aparecida.silva@gmail.com',
    status: 'Novo',
    origem: 'WhatsApp',
    tipoNegocio: 'Locação',
    mensagemInicial: 'Gostaria de ajuda para encontrar um apartamento para alugar',
    contatoInicial: '15/08/2024 • 13:35',
    ultimoContato: '15/08/2024 • 14:30',
    integracaoCRM: 'Não pronto',
    corretorResponsavel: 'Não atribuído',
    resumoGeral: 'Aparecida entrou em contato pelo WhatsApp, buscando um apartamento para alugar o mais rápido possível. Ela precisa se mudar em 30 dias e busca opções. O contato inicial foi promissor, com grande potencial de locação.',
    avisoIA: 'Resumo gerado por IA e pode ter informações errôneas ou faltantes. Revise os dados analisando os dados de origem.',
    // Dados de interesse do lead
    interesse: {
      tipoNegocio: 'Locação',
      cidade: 'São Paulo',
      bairros: 'Vila Mariana, Paraíso, Bela Vista',
      tipoImovel: 'Apartamento',
      quartos: '+2',
      suites: '-',
      banheiros: '+1',
      vagas: '+1',
      mobiliado: 'Não',
      petFriendly: 'Sim',
      valorLocacao: 'R$ 3.000,00',
      valorTotal: 'R$ 4.500,00'
    }
  }
};

// Mock data for properties of interest
const mockImoveisInteresse = [
  {
    id: '1',
    tipo: 'Apartamento',
    finalidade: 'Locação',
    preco: 'R$ 1.240.000',
    endereco: 'Rua João Moura, Bela Vista',
    area: '118m²',
    quartos: 4,
    banheiros: 2,
    vagas: 2,
    status: 'Principal',
    imagem: '/images/photos/banner_thumbnail (6).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    visualizado: '00/00/0000',
    isPrincipal: true
  },
  {
    id: '2',
    tipo: 'Apartamento',
    finalidade: 'Locação',
    preco: 'R$ 1.240.000',
    endereco: 'Rua João Moura, Bela Vista',
    area: '118m²',
    quartos: 4,
    banheiros: 2,
    vagas: 2,
    status: null,
    imagem: '/images/photos/banner_thumbnail (7).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    visualizado: '00/00/0000',
    isPrincipal: false
  }
];

// Mock data for other properties with same profile
const mockOutrosImoveis = [
  {
    id: '3',
    tipo: 'Apartamento',
    finalidade: 'Locação',
    preco: 'R$ 1.150.000',
    endereco: 'Rua Augusta, Bela Vista',
    area: '110m²',
    quartos: 3,
    banheiros: 2,
    vagas: 1,
    status: null,
    imagem: '/images/photos/banner_thumbnail (1).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    visualizado: '00/00/0000'
  },
  {
    id: '4',
    tipo: 'Apartamento',
    finalidade: 'Locação',
    preco: 'R$ 1.350.000',
    endereco: 'Av. Paulista, Paraíso',
    area: '125m²',
    quartos: 4,
    banheiros: 3,
    vagas: 2,
    status: null,
    imagem: '/images/photos/banner_thumbnail (2).jpg',
    cadastrado: '00/00/0000',
    atualizado: '00/00/0000',
    visualizado: '00/00/0000'
  }
];

// Mock data for chat messages
const mockChatMessages = [
  {
    id: 1,
    sender: 'client',
    message: 'Gostaria de ajuda para encontrar um apartamento para alugar',
    time: '12:24 PM',
    type: 'text'
  },
  {
    id: 2,
    sender: 'client',
    message: 'Preciso me mudar em um mês e tenho urgência em encontrar um apartamento novo',
    time: '12:25 PM',
    type: 'text'
  },
  {
    id: 3,
    sender: 'bot',
    senderName: 'Fê da Foxter',
    message: 'Olá! Eu sou a Fê da Foxter, assistente da imobiliária e vou ajudar no seu atendimento. Para começar, como posso te chamar?',
    time: '12:28 PM',
    type: 'text'
  },
  {
    id: 4,
    sender: 'client',
    message: 'Meu nome é Aparecida Silva. Obrigado por me atender, Fê da Foxter.',
    time: '12:35 PM',
    type: 'text'
  },
  {
    id: 5,
    sender: 'agent',
    senderName: 'Corretor Loft',
    message: 'Oi Aparecida! Eu serei o corretor responsável pelo seu atendimento a partir de agora. Como posso te ajudar?',
    time: '12:28 PM',
    type: 'text'
  }
];

const AtendimentoDetalhesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('detalhes');
  const [messageText, setMessageText] = useState('');
  
  const leadId = searchParams.get('id') || '1'; // Default to '1' if no ID provided
  const leadData = mockLeadData[leadId as keyof typeof mockLeadData];

  // Property Card Component for Interest Tab
  const PropertyInterestCard = ({ property, isOtherProperty = false }: { property: any, isOtherProperty?: boolean }) => (
    <Card
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid #C1C7CD', marginBottom: '16px' }}
    >
      <div className="flex h-full">
        {/* Property Image */}
        <div className="w-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
          <img 
            src={property.imagem} 
            alt={`${property.tipo} - ${property.endereco}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center absolute inset-0" style={{ display: 'none' }}>
            <HomeOutlined className="text-2xl text-gray-400" />
          </div>
          {property.status && (
            <div className="absolute top-2 left-2">
              <Tag 
                style={{ backgroundColor: '#20A483', color: '#ffffff' }}
                className="rounded-full px-2 py-1 border-0 text-xs font-medium"
              >
                {property.status}
              </Tag>
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start h-full">
            <div className="flex-1">
              {/* Property Type and Purpose */}
              <div className="flex items-center gap-2 mb-1">
                <Text className="text-sm text-gray-600">{property.finalidade}</Text>
                <Text className="text-sm text-gray-600">•</Text>
                <Text className="text-sm text-gray-600">{property.tipo}</Text>
              </div>

              {/* Price */}
              <Title level={4} className="!mb-2 !mt-0 text-lg font-bold">
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
                  <img src="/images/icons/iconSize.svg" alt="Área" className="w-4 h-4 opacity-60" />
                  <Text className="text-sm text-gray-600">{property.area}</Text>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/icons/iconBed.svg" alt="Quartos" className="w-4 h-4 opacity-60" />
                  <Text className="text-sm text-gray-600">{property.quartos}</Text>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/icons/iconShower.svg" alt="Banheiros" className="w-4 h-4 opacity-60" />
                  <Text className="text-sm text-gray-600">{property.banheiros}</Text>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/icons/iconCar.svg" alt="Vagas" className="w-4 h-4 opacity-60" />
                  <Text className="text-sm text-gray-600">{property.vagas}</Text>
                </div>
              </div>
            </div>

            {/* Right side info and buttons */}
            <div className="text-right text-xs text-gray-500 ml-4 flex flex-col justify-between h-full">
              <div>
                <div>Cadastrado em {property.cadastrado}</div>
                <div>Atualizado em {property.atualizado}</div>
                {!isOtherProperty && <div>Visualizado pelo lead em {property.visualizado}</div>}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <Button 
                  type="default" 
                  size="middle"
                  style={{ height: '40px' }}
                >
                  Ver detalhes
                </Button>
                {isOtherProperty && (
                  <Tooltip title="Enviar para WhatsApp do lead">
                    <Button 
                      type="default" 
                      size="middle"
                      style={{ height: '40px', width: '40px', color: '#25D366', borderColor: '#25D366' }}
                      icon={<WhatsAppOutlined />}
                      onClick={() => {
                        // Logic to send to WhatsApp would go here
                        console.log('Enviando imóvel para WhatsApp:', property.id);
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  if (!leadData) {
    return (
      <MainLayout>
        <div className="p-6">
          <Text>Atendimento não encontrado</Text>
        </div>
      </MainLayout>
    );
  }

  // Tab items
  const tabItems = [
    {
      key: 'detalhes',
      label: 'Detalhes',
    },
    {
      key: 'interesse',
      label: 'Interesse',
    },
    {
      key: 'conversa',
      label: 'Conversa',
    },
    {
      key: 'anotacoes',
      label: 'Anotações',
    },
  ];

  // Shortcuts menu items
  const shortcutsMenuItems = [
    {
      key: '1',
      label: 'Agendar visita',
    },
    {
      key: '2',
      label: 'Enviar proposta',
    },
    {
      key: '3',
      label: 'Solicitar documentos',
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Logic to send message would go here
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const renderChatMessage = (msg: any) => {
    const isClient = msg.sender === 'client';
    const isBot = msg.sender === 'bot';
    const isAgent = msg.sender === 'agent';

    return (
      <div key={msg.id} className={`mb-4 ${isClient ? 'flex justify-start' : 'flex justify-end'}`}>
        <div 
          className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl"
          style={{
            backgroundColor: isClient ? '#e5e7eb' : '#FFAB8F',
            color: isClient ? '#374151' : '#121619'
          }}
        >
          {(isBot || isAgent) && (
            <div className="text-xs font-semibold mb-1">
              {msg.senderName}
            </div>
          )}
          <div className="text-sm leading-relaxed">
            {msg.message}
          </div>
          <div 
            className="flex items-center justify-between text-xs mt-2"
            style={{
              color: isClient ? '#6b7280' : '#121619'
            }}
          >
            <span>{msg.time}</span>
            <div className="flex items-center ml-2">
              <CheckOutlined className="text-xs" />
              <CheckOutlined className="text-xs -ml-1" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col bg-white">
        {/* Header Section */}
        <div className="px-6 py-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item>
              <Button 
                type="link" 
                className="!p-0 !h-auto hover:opacity-80"
                style={{ color: '#697077' }}
                onClick={() => router.push('/atendimentos')}
              >
                Atendimentos
              </Button>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="text-gray-600">{leadData.nome}</span>
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Title and Back Button */}
          <div className="flex items-center gap-3 mb-2">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push('/atendimentos')}
              className="!p-2 !w-auto !h-auto text-gray-600 hover:text-gray-800"
            />
            <Title level={2} className="!mb-0 !mt-0">
              {leadData.nome}
            </Title>
            <Tag 
              className="ml-2 px-3 py-1 rounded-full border-0"
              style={{ backgroundColor: '#697077', color: '#ffffff' }}
            >
              {leadData.status}
            </Tag>
          </div>

          {/* Last Update */}
          <Text className="text-gray-500 text-sm">
            Última atualização: {leadData.ultimoContato}
          </Text>

          {/* Tabs */}
          <div className="mt-6">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              className="custom-tabs-spacing"
            />
          </div>
        </div>

        {/* Content Section */}
        {activeTab === 'detalhes' && (
          <div className="flex-1 px-6 pb-6">
            {/* Resumo Geral */}
            <Card style={{ border: '1px solid #C1C7CD', boxShadow: 'none' }}>
              <div className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  RESUMO GERAL
                </Text>
              </div>
              <div className="mb-6">
                <Text className="text-gray-700 leading-relaxed">
                  {leadData.resumoGeral}
                </Text>
              </div>
              <div style={{ 
                fontSize: '10px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                color: '#6b7280'
              }}>
                <WarningOutlined style={{ color: '#6b7280', fontSize: '16px' }} />
                <span>{leadData.avisoIA}</span>
              </div>
            </Card>

            {/* Informações do Lead */}
            <div className="mt-6">
              <Card style={{ border: '1px solid #C1C7CD', boxShadow: 'none' }}>
              <div className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  INFORMAÇÕES DO LEAD
                </Text>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primeira Coluna */}
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Nome:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.nome}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Telefone:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.telefone}</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium text-gray-600">E-mail:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.email}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Origem do lead:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.origem}</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Mensagem de contato inicial:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.mensagemInicial}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Tipo de negócio:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.tipoNegocio}</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Contato inicial:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.contatoInicial}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Último contato:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.ultimoContato}</Text>
                    </div>
                  </div>
                 
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Corretor responsável:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.corretorResponsavel}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Integração CRM:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.integracaoCRM}</Text>
                    </div>
                  </div>
                </div>
              </div>
              </Card>
            </div>
          </div>
        )}

        {/* Chat Conversation Tab */}
        {activeTab === 'conversa' && (
          <div className="flex-1 relative" style={{ minHeight: 0 }}>
            {/* Chat Messages Area */}
            <div 
              className="absolute inset-0 overflow-y-auto px-6" 
              style={{ bottom: '88px' }}
            >
              <div className="py-4">
                {mockChatMessages.map(renderChatMessage)}
              </div>
            </div>

            {/* Fixed Chat Input Area - Fixed to bottom of conversation tab only */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4" style={{ height: '88px' }}>
              <div className="flex items-center gap-3">
                {/* Emoji Button */}
                <Button
                  type="text"
                  icon={<SmileOutlined />}
                  className="text-gray-500 hover:text-gray-700 !p-2"
                />

                {/* Message Input */}
                <div className="flex-1">
                  <Input
                    placeholder="Escreva uma mensagem..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onPressEnter={handleSendMessage}
                    className="rounded-full border-gray-300"
                    suffix={
                      <Button
                        type="text"
                        icon={<PaperClipOutlined />}
                        className="text-gray-500 hover:text-gray-700 !p-1"
                      />
                    }
                  />
                </div>

                {/* Send Button */}
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  className="!px-4 !py-2 !h-auto"
                >
                  Enviar
                </Button>

                {/* Audio Button */}
                <Button
                  type="text"
                  icon={<AudioOutlined />}
                  className="text-white bg-orange-500 hover:bg-orange-600 !p-3 rounded-full"
                />

                {/* Shortcuts Button */}
                <Dropdown
                  menu={{ items: shortcutsMenuItems }}
                  trigger={['click']}
                  placement="topRight"
                >
                  <Button
                    icon={<ThunderboltOutlined />}
                    className="!px-4 !py-2 !h-auto"
                  >
                    Atalhos
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
        )}

        {/* Interest Tab */}
        {activeTab === 'interesse' && (
          <div className="flex-1 px-6 pb-6">
            {/* Detalhes de Interesse */}
            <Card style={{ border: '1px solid #C1C7CD', boxShadow: 'none', marginBottom: '24px' }}>
              <div className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  DETALHES DE INTERESSE
                </Text>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primeira Coluna */}
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Tipo de negócio:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.tipoNegocio}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Quartos:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.quartos}</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Cidade:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.cidade}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Suítes:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.suites}</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Bairro(s):</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.bairros}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Banheiros:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.banheiros}</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Tipo de imóvel:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.tipoImovel}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Vagas:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.vagas}</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Valor de locação desejado:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.valorLocacao}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Mobiliado:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.mobiliado}</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Valor total desejado:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.valorTotal}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="text-sm font-medium text-gray-600">Pet-friendly:</Text>
                    <div className="mt-1">
                      <Text className="text-gray-900">{leadData.interesse.petFriendly}</Text>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Imóveis de Interesse */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Text className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  IMÓVEIS DE INTERESSE
                </Text>
              </div>
              <div>
                {mockImoveisInteresse.map((property) => (
                  <PropertyInterestCard 
                    key={property.id} 
                    property={property}
                  />
                ))}
              </div>
            </div>

            {/* Outros Imóveis que o Lead Pode Gostar */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Text className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  OUTROS IMÓVEIS QUE O LEAD PODE GOSTAR
                </Text>
                <InfoCircleOutlined className="text-gray-400" />
              </div>
              <div>
                {mockOutrosImoveis.map((property) => (
                  <PropertyInterestCard key={property.id} property={property} isOtherProperty={true} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'anotacoes' && (
          <div className="flex-1 px-6 pb-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title level={3} className="!mb-2 !mt-0 text-xl font-semibold">
                  Anotações
                </Title>
                <Text className="text-gray-600 text-sm">
                  Adicione informações sobre o lead adquiridas além do atendimento da plataforma.
                </Text>
              </div>
              <Button 
                type="primary"
                className="!px-6 !py-2 !h-auto rounded-lg"
                style={{ backgroundColor: '#FF6B47', borderColor: '#FF6B47' }}
              >
                + Adicionar
              </Button>
            </div>

            {/* Annotation Card */}
            <Card 
              className="rounded-lg"
              style={{ border: '1px solid #E5E7EB', boxShadow: 'none' }}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: 'url(/images/avatars/placeholder.svg)',
                      backgroundColor: '#F3F4F6'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Header with name and date */}
                  <div className="mb-3">
                    <Text className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      ADICIONADO EM:
                    </Text>
                    <br />
                    <Text className="text-sm text-gray-600">
                      00/00/0000
                    </Text>
                  </div>

                  {/* Annotation text */}
                  <div className="mb-4">
                    <Text className="text-gray-700 leading-relaxed">
                      Durante visita, marido do lead contou sobre a importância de uma área para as crianças brincarem dentro do condomínio.
                    </Text>
                  </div>

                  {/* Footer with actions */}
                  <div className="flex items-center justify-between">
                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        type="text"
                        size="small"
                        className="!p-1 !h-auto text-gray-500 hover:text-gray-700"
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        }
                      />
                      <Button
                        type="text"
                        size="small"
                        className="!p-1 !h-auto text-gray-500 hover:text-gray-700"
                        icon={
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                          </svg>
                        }
                      />
                    </div>

                    {/* Toggle switch */}
                    <div className="flex items-center gap-2">
                      <Text className="text-sm text-gray-600">
                        Incluir no resumo do caso
                      </Text>
                      <div className="relative">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only"
                          id="include-summary"
                        />
                        <label
                          htmlFor="include-summary"
                          className="flex items-center cursor-pointer"
                        >
                          <div className="relative">
                            <div 
                              className="w-11 h-6 rounded-full transition-colors duration-200"
                              style={{ backgroundColor: '#FF6B47' }}
                            />
                            <div 
                              className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200"
                              style={{ transform: 'translateX(20px)' }}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

const AtendimentoDetalhesPage = () => {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando detalhes do atendimento...</p>
          </div>
        </div>
      </MainLayout>
    }>
      <AtendimentoDetalhesContent />
    </Suspense>
  );
};

export default AtendimentoDetalhesPage;