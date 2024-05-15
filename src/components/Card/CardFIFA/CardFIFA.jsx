import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import FIFARequests from '../../fetch/TableFIFARequests';
import './CardFIFA.css'; // Estilo da tabela FIFA

function ListarJogadoresFifa() {
    const [jogadores, setJogadores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, ] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const jogadoresData = await FIFARequests.listarJogadores();
            setJogadores(jogadoresData);
            setTotalPages(Math.ceil(jogadoresData.length / itemsPerPage));
        };

        fetchData();
    }, [itemsPerPage]);

    const deletarJogador = async (id) => {
        const confirma = window.confirm(`Deseja deletar o jogador com o ID ${id}?`);
        if (confirma) {
            await FIFARequests.deletarJogador(id);
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
        <div className='pagina-fifa'>
            <div className='alinhar'>
                <div className='Titulo-FIFA'>
                    <h1>Lista de Jogadores FIFA</h1>
                </div>
                <div className='fifa-card-container'>
                    {currentJogadores.length > 0 ? (
                        currentJogadores.map((jogador) => (
                            <Card key={jogador.playerid} className='fifa-card'>
                                <Card.Body>
                                    <Card.Title>{jogador.playername}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{jogador.playerposition}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Pontuação Geral:</strong> {jogador.ovr}
                                        <br />
                                        <strong>Pé Preferido:</strong> {jogador.foot}
                                    </Card.Text>
                                    <Button variant="danger" onClick={() => deletarJogador(jogador.playerid)}>
                                        Deletar <FaTrash />
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <div>Nenhum jogador encontrado</div>
                    )}
                </div>
                <div className='pagination-fifa'>
                    <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                    <button onClick={nextPage} disabled={currentPage === totalPages}>Próxima</button>
                </div>
            </div>
        </div>
    );
}

export default ListarJogadoresFifa;
