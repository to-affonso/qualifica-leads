'use client';

import { useState } from 'react';
import { 
  Typography, 
  Input, 
  Button, 
  Card, 
  Form,
  Space,
  Alert,
  Divider
} from 'antd';
import { 
  ArrowLeftOutlined,
  LinkOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Text, Paragraph } = Typography;

const ConfiguracaoXMLPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [xmlUrl, setXmlUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTestConnection = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsConnected(true);
      setLoading(false);
    }, 2000);
  };

  const handleSaveConfiguration = async (values: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Show success message or redirect
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="h-full overflow-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.back()}
              className="mb-4 p-0 h-auto text-gray-600 hover:text-gray-800"
            >
              Voltar
            </Button>
            <Title level={2} className="!mb-2 !mt-0">
              Configuração do XML
            </Title>
            <Text className="text-gray-600">
              Configure a integração com o XML do seu CRM para sincronizar o catálogo de imóveis
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <Title level={4} className="!mb-4">
                  URL do XML
                </Title>
                
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSaveConfiguration}
                  initialValues={{
                    xmlUrl: xmlUrl
                  }}
                >
                  <Form.Item
                    name="xmlUrl"
                    label="URL do arquivo XML"
                    rules={[
                      { required: true, message: 'Por favor, insira a URL do XML' },
                      { type: 'url', message: 'Por favor, insira uma URL válida' }
                    ]}
                  >
                    <Input
                      placeholder="https://exemplo.com/catalogo-imoveis.xml"
                      prefix={<LinkOutlined className="text-gray-400" />}
                      className="h-10"
                      value={xmlUrl}
                      onChange={(e) => setXmlUrl(e.target.value)}
                    />
                  </Form.Item>

                  <Space className="w-full justify-between">
                    <Button
                      type="default"
                      onClick={handleTestConnection}
                      loading={loading}
                      disabled={!xmlUrl}
                    >
                      Testar Conexão
                    </Button>
                    
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      disabled={!isConnected}
                    >
                      Salvar Configuração
                    </Button>
                  </Space>
                </Form>

                {isConnected && (
                  <Alert
                    message="Conexão estabelecida com sucesso!"
                    description="O XML foi validado e está pronto para sincronização."
                    type="success"
                    icon={<CheckCircleOutlined />}
                    className="mt-4"
                    showIcon
                  />
                )}
              </Card>

              {/* Sync Settings */}
              <Card className="shadow-sm mt-6">
                <Title level={4} className="!mb-4">
                  Configurações de Sincronização
                </Title>
                
                <Form layout="vertical">
                  <Form.Item
                    name="syncFrequency"
                    label="Frequência de sincronização"
                  >
                    <Input
                      placeholder="A cada 30 minutos"
                      disabled
                      className="h-10"
                    />
                  </Form.Item>

                  <Form.Item
                    name="lastSync"
                    label="Última sincronização"
                  >
                    <Input
                      placeholder="Nunca sincronizado"
                      disabled
                      className="h-10"
                    />
                  </Form.Item>
                </Form>
              </Card>
            </div>

            {/* Information Panel */}
            <div className="lg:col-span-1">
              <Card className="shadow-sm">
                <Title level={4} className="!mb-4">
                  Como funciona?
                </Title>
                
                <div className="space-y-4">
                  <div>
                    <Text strong className="block mb-1">
                      1. Configure a URL
                    </Text>
                    <Paragraph className="text-sm text-gray-600 !mb-0">
                      Insira a URL do arquivo XML fornecida pelo seu CRM
                    </Paragraph>
                  </div>

                  <Divider className="!my-3" />

                  <div>
                    <Text strong className="block mb-1">
                      2. Teste a conexão
                    </Text>
                    <Paragraph className="text-sm text-gray-600 !mb-0">
                      Verificamos se o XML está acessível e válido
                    </Paragraph>
                  </div>

                  <Divider className="!my-3" />

                  <div>
                    <Text strong className="block mb-1">
                      3. Sincronização automática
                    </Text>
                    <Paragraph className="text-sm text-gray-600 !mb-0">
                      Os imóveis são atualizados automaticamente a cada 30 minutos
                    </Paragraph>
                  </div>
                </div>
              </Card>

              <Card className="shadow-sm mt-6">
                <Title level={4} className="!mb-4">
                  Formato do XML
                </Title>
                
                <Paragraph className="text-sm text-gray-600">
                  O XML deve seguir o padrão do mercado imobiliário com as seguintes informações:
                </Paragraph>

                <ul className="text-sm text-gray-600 space-y-1 pl-4">
                  <li>• Código do imóvel</li>
                  <li>• Tipo (casa, apartamento, etc.)</li>
                  <li>• Finalidade (venda/locação)</li>
                  <li>• Preço</li>
                  <li>• Endereço completo</li>
                  <li>• Área, quartos, banheiros</li>
                  <li>• Fotos do imóvel</li>
                  <li>• Descrição</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConfiguracaoXMLPage;