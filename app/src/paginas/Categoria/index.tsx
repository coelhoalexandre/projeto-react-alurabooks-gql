import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ListaLivros from "../../componentes/ListaLivros";
import Loader from "../../componentes/Loader";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import { obterCategoriaPorSlug } from "../../http";

const Categoria = () => {
  const params = useParams();
  const {
    data: categoria,
    isLoading,
    error,
  } = useQuery(["categoriaPorSlug", params.slug], () =>
    obterCategoriaPorSlug(params.slug || "")
  );

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <h1>Ops! Erro inesperado ocorreu na busca pelas categorias.</h1>;
  }

  return (
    <section>
      <TituloPrincipal texto={categoria?.nome ?? ""} />
      <ListaLivros categoria={categoria!} />
    </section>
  );
};

export default Categoria;
