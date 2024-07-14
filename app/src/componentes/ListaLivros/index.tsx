import { ICategoria } from "../../interfaces/ICategoria";
import CardLivro from "../CardLivro";

import "./ListaLivros.css";
import { AbCampoTexto } from "ds-alurabooks";
import { useEffect, useState } from "react";
import { useLivros } from "../../graphql/livros/hooks";
import { useReactiveVar } from "@apollo/client";
import { filtroLivrosVar, livrosVar } from "../../graphql/livros/state";

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [textoBusca, setTextoBusca] = useState("");

  let listaLivros: JSX.Element | JSX.Element[] | undefined;

  useEffect(() => {
    filtroLivrosVar({
      ...filtroLivrosVar(),
      titulo: textoBusca.length >= 3 ? textoBusca : "",
    });
  }, [textoBusca]);

  filtroLivrosVar({ ...filtroLivrosVar(), categoria });

  const livros = useReactiveVar(livrosVar);

  useLivros();

  if (livros.length === 0) {
    listaLivros = <h2>Não há livros desta categoria!</h2>;
  } else {
    listaLivros = livros.map((livro) => (
      <CardLivro livro={livro} key={livro.id} />
    ));
  }

  return (
    <section>
      <form style={{ maxWidth: "80%", margin: "0 auto", textAlign: "center" }}>
        <AbCampoTexto
          value={textoBusca}
          onChange={setTextoBusca}
          placeholder="Digite o título..."
        />
      </form>
      <div className="livros">{listaLivros}</div>
    </section>
  );
};

export default ListaLivros;
