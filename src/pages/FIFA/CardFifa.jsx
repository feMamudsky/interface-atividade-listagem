import styles from './FIFA.module.css';
import NavBar from "../../components/NavBar";
import ListarJogadoresFifa from '../../components/Card/CardFIFA/CardFIFA';

function CardFifa() {
    return (
        <>
            <NavBar />
            <h1>Card FIFA</h1>
            <ListarJogadoresFifa />
        </>
    );
}

export default CardFifa;