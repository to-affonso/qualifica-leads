'use client';

import { useState } from 'react';
import { Modal, Select, DatePicker, Button } from 'antd';
import { CloseOutlined, CalendarOutlined } from '@ant-design/icons';

// Estilos customizados para os selects e posicionamento do modal
const customSelectStyles = `
  .custom-multi-select .ant-select-selector {
    display: flex !important;
    align-items: center !important;
    min-height: 46px !important;
    height: auto !important;
    padding: 6px 11px !important;
  }
  
  .custom-multi-select .ant-select-selection-overflow {
    display: flex !important;
    align-items: center !important;
    flex-wrap: wrap !important;
  }
  
  .custom-multi-select .ant-select-selection-item {
    display: inline-flex !important;
    align-items: center !important;
    margin: 2px !important;
    padding: 4px 8px !important;
    background-color: #F3F4F6 !important;
    border: 1px solid #E5E7EB !important;
    border-radius: 6px !important;
    font-size: 14px !important;
    color: #374151 !important;
  }
  
  .filter-modal-right .ant-modal {
    position: fixed !important;
    right: 24px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    margin: 0 !important;
    max-width: none !important;
  }
`;

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  statusOptions: Array<{ label: string; value: string; count: number }>;
  businessTypeOptions: Array<{ label: string; value: string; count: number }>;
  sourceOptions: Array<{ label: string; value: string; count: number }>;
}

export interface FilterValues {
  status: string[];
  tipoNegocio: string[];
  tipoImovel: string[];
  interesseVisita: string[];
  origem: string[];
  dataPrimeiroContato: [any, any] | null;
  dataUltimoContato: [any, any] | null;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  onApply,
  statusOptions,
  businessTypeOptions,
  sourceOptions
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    status: [],
    tipoNegocio: [],
    tipoImovel: [],
    interesseVisita: [],
    origem: [],
    dataPrimeiroContato: null,
    dataUltimoContato: null
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleCancel = () => {
    // Reset filters
    setFilters({
      status: [],
      tipoNegocio: [],
      tipoImovel: [],
      interesseVisita: [],
      origem: [],
      dataPrimeiroContato: null,
      dataUltimoContato: null
    });
    onClose();
  };

  // Opções para os selects
  const tipoImovelOptions = [
    { label: 'Apartamento', value: 'apartamento' },
    { label: 'Casa', value: 'casa' },
    { label: 'Terreno', value: 'terreno' },
    { label: 'Comercial', value: 'comercial' }
  ];

  const interesseVisitaOptions = [
    { label: 'Sim', value: 'sim' },
    { label: 'Não', value: 'nao' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customSelectStyles }} />
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        width={520}
        wrapClassName="filter-modal-right"
        style={{ maxHeight: '100vh' }}
        closeIcon={<CloseOutlined style={{ fontSize: '16px', color: '#697077' }} />}
        styles={{
          header: { 
            padding: '24px 0 20px 0',
            borderBottom: 'none',
            minHeight: '72px',
            display: 'flex',
            alignItems: 'center'
          },
          body: { 
            padding: '0',
            maxHeight: 'calc(100vh - 120px)',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
        title={
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            color: '#121619',
            lineHeight: '28px',
            margin: 0
          }}>
            Filtrar atendimentos por
          </div>
        }
      >
        {/* Área scrollável dos filtros */}
        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '0 0 24px 0',
            maxHeight: 'calc(100vh - 200px)'
          }}
        >
          <div className="space-y-6">
          {/* Status do atendimento */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6B7280' }}>
              Status do atendimento
            </label>
            <Select
              mode="multiple"
              placeholder=""
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              className="w-full custom-multi-select"
              size="large"
              style={{ 
                minHeight: '48px',
                height: 'auto'
              }}
              options={statusOptions.map(option => ({
                label: `${option.label} (${option.count})`,
                value: option.value
              }))}
            />
          </div>

          {/* Tipo de negócio */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6B7280' }}>
              Tipo de negócio
            </label>
            <Select
              mode="multiple"
              placeholder=""
              value={filters.tipoNegocio}
              onChange={(value) => setFilters({ ...filters, tipoNegocio: value })}
              className="w-full custom-multi-select"
              size="large"
              style={{ 
                minHeight: '48px',
                height: 'auto'
              }}
              options={businessTypeOptions.map(option => ({
                label: `${option.label} (${option.count})`,
                value: option.value
              }))}
            />
          </div>

          {/* Tipo de imóvel */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6B7280' }}>
              Tipo de imóvel
            </label>
            <Select
              mode="multiple"
              placeholder=""
              value={filters.tipoImovel}
              onChange={(value) => setFilters({ ...filters, tipoImovel: value })}
              className="w-full custom-multi-select"
              size="large"
              style={{ 
                minHeight: '48px',
                height: 'auto'
              }}
              options={tipoImovelOptions}
            />
          </div>

          {/* Interesse em visita */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6B7280' }}>
              Interesse em visita
            </label>
            <Select
              mode="multiple"
              placeholder=""
              value={filters.interesseVisita}
              onChange={(value) => setFilters({ ...filters, interesseVisita: value })}
              className="w-full custom-multi-select"
              size="large"
              style={{ 
                minHeight: '48px',
                height: 'auto'
              }}
              options={interesseVisitaOptions}
            />
          </div>

          {/* Origem */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6B7280' }}>
              Origem
            </label>
            <Select
              mode="multiple"
              placeholder=""
              value={filters.origem}
              onChange={(value) => setFilters({ ...filters, origem: value })}
              className="w-full custom-multi-select"
              size="large"
              style={{ 
                minHeight: '48px',
                height: 'auto'
              }}
              options={sourceOptions.map(option => ({
                label: `${option.label} (${option.count})`,
                value: option.value
              }))}
            />
          </div>

          {/* Data do primeiro contato */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6B7280' }}>
              Data do primeiro contato
            </label>
            <DatePicker.RangePicker
              value={filters.dataPrimeiroContato}
              onChange={(dates) => setFilters({ ...filters, dataPrimeiroContato: dates })}
              className="w-full"
              size="large"
              style={{ height: '48px' }}
              suffixIcon={<CalendarOutlined style={{ color: '#6B7280' }} />}
              format="DD/MM/YYYY"
            />
          </div>

          {/* Data do último contato */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#6B7280' }}>
              Data do último contato
            </label>
            <DatePicker.RangePicker
              value={filters.dataUltimoContato}
              onChange={(dates) => setFilters({ ...filters, dataUltimoContato: dates })}
              className="w-full"
              size="large"
              style={{ height: '48px' }}
              suffixIcon={<CalendarOutlined style={{ color: '#6B7280' }} />}
              format="DD/MM/YYYY"
            />
          </div>
        </div>
        </div>

        {/* Linha divisória e botões fixos no rodapé */}
        <div 
          style={{ 
            borderTop: '1px solid #E5E7EB',
            padding: '24px 0 8px 0',
            backgroundColor: '#fff'
          }}
        >
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleCancel}
              size="large"
              style={{
                height: '48px',
                padding: '0 24px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                color: '#374151'
              }}
            >
              Cancelar
            </Button>
            <Button
              type="primary"
              onClick={handleApply}
              size="large"
              style={{
                height: '48px',
                padding: '0 24px',
                backgroundColor: '#EA580C',
                borderColor: '#EA580C',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500
              }}
            >
              Aplicar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FilterModal;