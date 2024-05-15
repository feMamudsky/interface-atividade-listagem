import styles from './FIFA.module.css';
import NavBar from "../../components/NavBar";
import ListarJogadoresFifaTable from '../../components/Tables/TableFIFA/TableFIFA';

function TabelaFifa() {
    return (
        <>
            <NavBar />
            <h1>Tabela FIFA</h1>
            <ListarJogadoresFifaTable />
        </>
    );
}

export default TabelaFifa;