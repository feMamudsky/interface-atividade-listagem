import styles from './Amazon.module.css';
import NavBar from '../../components/NavBar';
import ListaAnimais from '../../components/Tables/TableAmazon/TableAmazon';

function TabelaAmazon() {
    return (
        <>
            <NavBar />
            <div className=''>
                
            </div>
            <h1>Tabela Amazon</h1>
            <ListaAnimais />
        </>
    );
}

export default TabelaAmazon;