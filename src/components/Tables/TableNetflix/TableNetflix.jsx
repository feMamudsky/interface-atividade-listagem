// ListarShowsTable.jsx

import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';
import NetflixRequests from '../../fetch/TableNetflix';
import './TableNetflix.css'; // Estilo da tabela

function ListarShowsTable() {
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
        <div className='pagina preto'>
            <div className='alinhar'>
                <div className='Titulo-Netflix'>
                    <h1 className='Titulo-Netflix-h1'>Lista de shows da </h1> <h1 className='Titulo-Netflix-h1 NetNet'>Netflix</h1>
                </div>
                <div className="table-container Netflix-table-container">
                    <Table striped bordered hover size="bg" variant="dark" className='Netflix-table'>
                        <thead>
                            <tr>
                                <th className='Netflix-th'>ID</th>
                                <th className='Netflix-th'>Tipo</th>
                                <th className='Netflix-th'>Título</th>
                                <th className='Netflix-th'>Diretor</th>
                                <th className='Netflix-th'>País</th>
                                <th className='Netflix-th'>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentShows.length > 0 ? (
                                currentShows.map((show) => (
                                    <tr key={show.show_id} className='Netflix-tr'>
                                        <td className='Netflix-td'>{show.show_id}</td>
                                        <td className='Netflix-td'>{show.tipo}</td>
                                        <td className='Netflix-td'>{show.titulo}</td>
                                        <td className='Netflix-td'>{show.diretor}</td>
                                        <td className='Netflix-td'>{show.pais}</td>
                                        <td className='Netflix-td Netflix-td-action' onClick={() => deletarShow(show.show_id)}>
                                            <FaTrash className="trash-iconNet" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhum show encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <div className="pagination pagination-Netflix">
                    <button onClick={prevPage} disabled={currentPage === 1} className='Netflix-pagination-button'>Anterior</button>
                    <button onClick={nextPage} disabled={currentPage === totalPages} className='Netflix-pagination-button'>Próxima</button>
                </div>
            </div>
        </div>
    );
}

export default ListarShowsTable;
