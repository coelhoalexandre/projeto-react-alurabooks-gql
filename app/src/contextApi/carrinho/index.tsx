import { createContext, ReactElement, useContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import {
  useAdicionarItem,
  useCarrinho,
  useRemoverItem,
} from "../../graphql/carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";

export interface ICarrinhoContext {
  carrinho?: ICarrinho;
  adicionarItemCarrinho: (item: IItemCarrinho) => void;
  removerItemCarrinho: (item: IItemCarrinho) => void;
  carregando: boolean;
}

interface CarrinhoProviderProps {
  children: ReactElement;
}
export const CarrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null,
  removerItemCarrinho: () => null,
  carregando: false,
});

const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
  const { data, loading: loadingCarrinho } = useCarrinho();

  const [adicionarItem, { loading: loadingAdiciona }] = useAdicionarItem();
  const [removerItem, { loading: loadingRemove }] = useRemoverItem();

  const adicionarItemCarrinho = (item: IItemCarrinho) => {
    adicionarItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade,
        },
      },
    });
  };

  const removerItemCarrinho = (item: IItemCarrinho) => {
    removerItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade,
        },
      },
    });
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho: data?.carrinho,
        adicionarItemCarrinho,
        removerItemCarrinho,
        carregando: loadingCarrinho || loadingAdiciona || loadingRemove,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  return useContext<ICarrinhoContext>(CarrinhoContext);
};
export default CarrinhoProvider;
