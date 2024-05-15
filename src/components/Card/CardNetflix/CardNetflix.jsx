import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import NetflixRequests from '../../fetch/TableNetflix';
import './CardNetflix.css';

function ListarShowsNetflix() {
    const [shows, setShows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, ] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const showsData = await NetflixRequests.listarShows();
            setShows(showsData);
            setTotalPages(Math.ceil(showsData.length / itemsPerPage));
        };

        fetchData();
    }, [itemsPerPage]);

    const deletarShow = async (id) => {
        const confirma = window.confirm(`Deseja deletar o show com o ID ${id}?`);
        if (confirma) {
            await NetflixRequests.deletarShow(id);
            window.location.reload();
        } else {
            window.alert('Erro ao deletar o show');
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentShows = shows.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div className='pagina-netflix'>
            <h1 className='titulo-netflix'>Lista de Shows da Netflix</h1>
            <div className='netflix-card-container'>
                {currentShows.map((show) => (
                    <div key={show.show_id} className='netflix-card'>
                        <h3>{show.titulo}</h3>
                        <p>Tipo: {show.tipo}</p>
                        <p>Diretor: {show.diretor}</p>
                        <p>País: {show.pais}</p>
                        <button onClick={() => deletarShow(show.show_id)}>
                            <FaTrash className='trash-icon' />
                        </button>
                    </div>
                ))}
            </div>
            <div className='pagination'>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Próxima</button>
            </div>
        </div>
    );
}

export default ListarShowsNetflix;
