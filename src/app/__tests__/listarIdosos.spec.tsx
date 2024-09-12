// listarIdosos.spec.tsx
import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native"; // Adicionado fireEvent
import ListarIdosos from "../private/pages/listarIdosos";
import { getAllIdoso } from "../services/idoso.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Mockando o expo-router
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn().mockReturnValue({
    id: "123",
    nome: "Nome Teste",
    foto: null,
  }),
  router: {
    push: jest.fn(), // Mocka o método push para verificações de navegação
    back: jest.fn(), // Mocka o método back para o caso de não haver a prop route
    canGoBack: jest.fn().mockReturnValue(true), // Mocka o método canGoBack
  },
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(), // Mocka novamente o push no caso do uso da função useRouter
    back: jest.fn(),
    canGoBack: jest.fn().mockReturnValue(true),
  }),
}));


// Mockando o módulo dos serviços para substituir as implementações
jest.mock("../services/idoso.service");

describe("ListarIdosos", () => {
  
/*
  it("deve exibir a lista de idosos após a conclusão da chamada da API", async () => {
    // Simula uma resposta fictícia da API
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });
    (getAllIdoso as jest.Mock).mockResolvedValueOnce({
      data: [
        { id: 1, nome: "Idoso 1" },
        { id: 2, nome: "Idoso 2" },
      ],
    });

    const { getByText } = render(<ListarIdosos />);

    // Aguarda a resolução da promessa
    await waitFor(() => expect(getAllIdoso).toHaveBeenCalled());

    // Verifica se os elementos esperados são renderizados
    expect(getByText("Idoso 1")).toBeTruthy();
    expect(getByText("Idoso 2")).toBeTruthy();
  });
  /*it("deve exibir uma mensagem de erro se a chamada da API falhar", async () => {
    const errorMessage = "Erro ao buscar idosos";
  
    // Simula um erro na chamada da API
    (getAllIdoso as jest.Mock).mockRejectedValueOnce({ message: errorMessage });
  
    const { queryByText } = render(<ListarIdosos />);
  
    // Aguarda a resolução da promessa
    await waitFor(() => expect(getAllIdoso).toHaveBeenCalled(), { timeout: 5000 });
  
    // Verifica se a mensagem de erro não está presente
    expect(queryByText(errorMessage)).toBeNull();
  });*/

    // Novo teste para verificar a navegação ao clicar no botão de voltar na tela de cadastrar idoso
   test("Navega para a tela anterior ao clicar no botão de voltar", async () => {
    // Renderiza o componente EditarPerfil
    const { getByTestId } = render(<ListarIdosos />);

    // Obtendo o botão de voltar
    const backButton = getByTestId("back-button-pressable");

    // Simula o clique no botão de voltar
    fireEvent.press(backButton);

    // Verifica se a função de navegação foi chamada corretamente e se ele navega pra tela de listar idosos
    await waitFor(() => {
      // expect(router.push).toHaveBeenCalledWith("/private/pages/listarIdosos");
      expect(router.push).toHaveBeenCalledWith("/private/tabs/perfil");
    });
  });
});
