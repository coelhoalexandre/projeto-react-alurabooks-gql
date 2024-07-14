import { AbBotao } from "ds-alurabooks";
import { Link } from "react-router-dom";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import { formatador } from "../../utils/formatador-moeda";

import "./Carrinho.css";
import ItemCarrinho from "./ItemCarrinho";
import { useCarrinhoContext } from "../../contextApi/carrinho";
import Loader from "../../componentes/Loader";
import LoadingCarrinho from "./LoadingCarrinho";

const Carrinho = () => {
  const { carrinho, carregando } = useCarrinhoContext();

  let itens: JSX.Element | JSX.Element[] | undefined;

  if (!carrinho) {
    itens = <Loader />;
  } else if (carrinho.itens.length === 0) {
    itens = <h2>Carrinho vazio!</h2>;
  } else {
    itens = carrinho?.itens.map((item, index) => (
      <ItemCarrinho key={index} item={item} />
    ));
  }

  return (
    <>
      {carregando ? <LoadingCarrinho /> : ""}
      <section className="pagina-carrinho">
        <TituloPrincipal texto="Minha sacola" />
        <div className="conteudo">
          <h4>Itens selecionados</h4>
          <div className="itens">{itens}</div>
          <div>
            <Link to="/">Continuar comprando</Link>
          </div>
          <footer>
            <ul>
              <li>Total da compra</li>
              <li>
                <strong>{formatador.format(carrinho?.total || 0)}</strong>
              </li>
              <li>
                <AbBotao texto="Finalizar compra" />
              </li>
            </ul>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Carrinho;
