// Tipos para os dados dos leads
export interface LeadData {
  leadId: string;
  agencyId: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  businessInterest: string;
  propertyType: string;
  visitInterest: string;
  sourceChannel: string;
  creationDate: string;
  lastUpdate: string;
}

export interface TransformedLead {
  key: string;
  nome: string;
  telefone: string;
  status: string;
  tipoNegocio: string;
  origem: string;
  ultimoContato: string;
}

// Mapeamento de status para normalizar inconsistências
const statusMapping: Record<string, string> = {
  'Sem retorno': 'Sem resposta',
  'Assumido pela imobiliária': 'Intervenção humana',
  // Manter os status existentes
  'Em atendimento': 'Em atendimento',
  'Concluído': 'Concluído',
  'Ajuda solicitada': 'Ajuda solicitada',
  'Número inválido': 'Número inválido',
  'Sem resposta': 'Sem resposta',
  'Intervenção humana': 'Intervenção humana',
};

// Função para formatar telefone no padrão brasileiro
export const formatPhone = (phone: string): string => {
  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos (padrão brasileiro com DDD)
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  
  // Se não tem 11 dígitos, retorna o original
  return phone;
};

// Função para formatar data ISO para formato brasileiro
export const formatDate = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    
    // Formatar data: DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Formatar hora: HH:mm
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year}\n${hours}:${minutes}`;
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return isoDate;
  }
};

// Função para transformar dados do JSON para o formato da tabela
export const transformLeadsData = (leadsData: LeadData[]): TransformedLead[] => {
  return leadsData.map((lead) => ({
    key: lead.leadId,
    nome: lead.name,
    telefone: formatPhone(lead.phone),
    status: statusMapping[lead.status] || lead.status,
    tipoNegocio: lead.businessInterest,
    origem: lead.sourceChannel,
    ultimoContato: formatDate(lead.lastUpdate),
  }));
};

// Função para carregar dados do arquivo JSON
export const loadLeadsData = async (): Promise<TransformedLead[]> => {
  try {
    const response = await fetch('/db/leads_mock.json');
    
    if (!response.ok) {
      throw new Error(`Erro ao carregar dados: ${response.status}`);
    }
    
    const leadsData: LeadData[] = await response.json();
    return transformLeadsData(leadsData);
  } catch (error) {
    console.error('Erro ao carregar dados dos leads:', error);
    throw error;
  }
};

// Função para contar leads por status
export const countLeadsByStatus = (leads: TransformedLead[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  leads.forEach((lead) => {
    counts[lead.status] = (counts[lead.status] || 0) + 1;
  });
  
  return counts;
};

// Função para contar leads por tipo de negócio
export const countLeadsByBusinessType = (leads: TransformedLead[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  leads.forEach((lead) => {
    counts[lead.tipoNegocio] = (counts[lead.tipoNegocio] || 0) + 1;
  });
  
  return counts;
};

// Função para contar leads por origem
export const countLeadsBySource = (leads: TransformedLead[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  leads.forEach((lead) => {
    counts[lead.origem] = (counts[lead.origem] || 0) + 1;
  });
  
  return counts;
};