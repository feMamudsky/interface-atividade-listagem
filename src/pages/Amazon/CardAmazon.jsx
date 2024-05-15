import styles from './Amazon.module.css';
import NavBar from '../../components/NavBar';
import ListarProdutosAmazon from '../../components/Card/CardAmazon/CardAmazon';

function CardAmazon() {
    return (
        <>
            <NavBar />
            <h1>Card Amazon</h1>
            <ListarProdutosAmazon />
        </>
    );
}

export default CardAmazon;