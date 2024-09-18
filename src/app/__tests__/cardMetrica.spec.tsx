import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CardMetrica from '../components/CardMetrica'; // ajuste o caminho se necessário
import { EMetricas, IMetrica } from '../interfaces/metricas.interface';
import database from '../db';

// Mock da função de consulta ao banco de dados
jest.mock('../db', () => ({
  get: jest.fn(() => ({
    query: jest.fn().mockReturnValue({
      fetch: jest.fn(() => Promise.resolve([{ valor: 80, dataHora: '2024-09-18T12:00:00Z' }])),
    }),
  })),
}));

describe('CardMetrica Component', () => {
  const mockItemFrequencia: IMetrica = {
    id: 1,
    idIdoso: 123,
    categoria: EMetricas.FREQ_CARDIACA,
    // outras propriedades que o item pode ter
  };

  const mockItemGlicemia: IMetrica = {
    id: 1,
    idIdoso: 123,
    categoria: EMetricas.GLICEMIA,
    // outras propriedades que o item pode ter
  };

  const mockItemPeso: IMetrica = {
    id: 1,
    idIdoso: 123,
    categoria: EMetricas.PESO,
    // outras propriedades que o item pode ter
  };

  const mockItemPressao: IMetrica = {
    id: 1,
    idIdoso: 123,
    categoria: EMetricas.PRESSAO_SANGUINEA,
    // outras propriedades que o item pode ter
  };

  const mockItemSaturacao: IMetrica = {
    id: 1,
    idIdoso: 123,
    categoria: EMetricas.SATURACAO_OXIGENIO,
    // outras propriedades que o item pode ter
  };

  const mockItemTemperatura: IMetrica = {
    id: 1,
    idIdoso: 123,
    categoria: EMetricas.TEMPERATURA,
    // outras propriedades que o item pode ter
  };

  it('renderiza corretamente com um valor de métrica FREQ_CARDIACA', async () => {
    const { getByText } = render(<CardMetrica item={mockItemFrequencia} />);
    
    await waitFor(() => {
      expect(getByText('80')).toBeTruthy(); // Verifica se o valor da métrica é exibido
      expect(getByText('bpm')).toBeTruthy(); // Verifica se a unidade de medida está correta
    });
  });

  it('renderiza corretamente com um valor de métrica GLICEMIA', async () => {
    const { getByText } = render(<CardMetrica item={mockItemGlicemia} />);
    
    await waitFor(() => {
      expect(getByText('80')).toBeTruthy(); // Verifica se o valor da métrica é exibido
      expect(getByText('mg/dL')).toBeTruthy(); // Verifica se a unidade de medida está correta
    });
  });

  it('renderiza corretamente com um valor de métrica PESO', async () => {
    const { getByText } = render(<CardMetrica item={mockItemPeso} />);
    
    await waitFor(() => {
      expect(getByText('80')).toBeTruthy(); // Verifica se o valor da métrica é exibido
      expect(getByText('kg')).toBeTruthy(); // Verifica se a unidade de medida está correta
    });
  });

  it('renderiza corretamente com um valor de métrica PRESSAO_SANGUINEA', async () => {
    const { getByText } = render(<CardMetrica item={mockItemPressao} />);
    
    await waitFor(() => {
      expect(getByText('80')).toBeTruthy(); // Verifica se o valor da pressão é exibido
      expect(getByText('mmHg')).toBeTruthy(); // Verifica se a unidade de medida está correta
    });
  });

  it('renderiza corretamente com um valor de métrica SATURACAO_OXIGENIO', async () => {
    const { getByText } = render(<CardMetrica item={mockItemSaturacao} />);
    
    await waitFor(() => {
      expect(getByText('80')).toBeTruthy(); // Verifica se o valor da saturação é exibido
      expect(getByText('%')).toBeTruthy(); // Verifica se a unidade de medida está correta
    });
  });

  it('mostra a data e a hora corretas', async () => {
    const { getByText } = render(<CardMetrica item={mockItemFrequencia} />);

    await waitFor(() => {
      expect(getByText('18/09/2024 às 09:00')).toBeTruthy(); // Verifica a formatação correta de data e hora
    });
  });
});
