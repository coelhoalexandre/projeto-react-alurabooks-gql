import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Rotas from "./rotas";
import ABApolloClient from "./ABApolloClient";
import CarrinhoProvider from "./contextApi/carrinho";

const queryClient = new QueryClient();

function App() {
  return (
    <ABApolloClient>
      <CarrinhoProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
        </QueryClientProvider>
      </CarrinhoProvider>
    </ABApolloClient>
  );
}

export default App;
