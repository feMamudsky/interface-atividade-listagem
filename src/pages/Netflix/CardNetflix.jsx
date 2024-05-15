import styles from './Netflix.module.css';
import NavBar from "../../components/NavBar";
import ListarShowsNetflix from '../../components/Card/CardNetflix/CardNetflix';

function CardNetflix() {
    return (
        <>
            <NavBar />
            <h1>Card Netflix</h1>
            <ListarShowsNetflix />
        </>
    );
}

export default CardNetflix;