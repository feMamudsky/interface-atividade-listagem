// ListarJogadoresFifaTable.jsx

import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';
import TableFIFARequests from '../../fetch/TableFIFARequests'; // Importa as requisições da FIFA
import './TableFIFA.css'; // Estilo da tabela FIFA

function ListarJogadoresFifaTable() {
    const [jogadores, setJogadores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const jogadoresData = await TableFIFARequests.listarJogadores(); // Utiliza as requisições da FIFA
            setJogadores(jogadoresData);
            setTotalPages(Math.ceil(jogadoresData.length / itemsPerPage));
        };

        fetchData();
    }, [itemsPerPage]);

    const deletarJogador = async (id) => {
        const confirma = window.confirm(`Deseja deletar o jogador com o ID ${id}?`);
        if (confirma) {
            await TableFIFARequests.deletarJogador(id); // Utiliza as requisições da FIFA
            window.location.reload();
        } else {
            window.alert('Erro ao deletar o jogador');
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJogadores = jogadores.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div className='pagina fifa'>
            <div className='alinhar'>
                <div className='Titulo-FIFA'>
                    <h1>Lista de jogadores FIFA</h1>
                </div>
                <div className="table-container fifa-table-container">
                    <Table striped bordered hover size="bg" className='fifa-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Posição</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentJogadores.length > 0 ? (
                                currentJogadores.map((jogador) => (
                                    <tr key={jogador.playerid} className='fifa-tr'>
                                        <td>{jogador.playerid}</td>
                                        <td>{jogador.playername}</td>
                                        <td>{jogador.playerposition}</td>
                                        <td onClick={() => deletarJogador(jogador.playerid)}>
                                            <FaTrash className="trash-icon-fifa" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Nenhum jogador encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <div className="pagination pagination-fifa">
                    <button onClick={prevPage} disabled={currentPage === 1} className='fifa-pagination-button'>Anterior</button>
                    <button onClick={nextPage} disabled={currentPage === totalPages} className='fifa-pagination-button'>Próxima</button>
                </div>
            </div>
        </div>
    );
}

export default ListarJogadoresFifaTable;
