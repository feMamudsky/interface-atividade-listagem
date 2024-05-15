import NavBar from "../../components/NavBar";
import ListarShowsTable from "../../components/Tables/TableNetflix/TableNetflix";
import './Netflix.module.css'; // Importe o arquivo de estilo CSS

function TabelaNetflix() {
    return (
        <>
            <div className="pagina-preta">
                <NavBar />
                    <h1>Tabela Netflix</h1>
                <ListarShowsTable />
            </div>
        </>

    );
}

export default TabelaNetflix;
