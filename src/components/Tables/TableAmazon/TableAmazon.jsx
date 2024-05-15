import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';
import TableAmazonRequests from '../../fetch/TableAmazonRequests';
import './TableAmazon.css';

function ListarLivrosTable() {
    const [livros, setLivros] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const livroData = await TableAmazonRequests.listarLivros();
            setLivros(livroData);
            setTotalPages(Math.ceil(livroData.length / itemsPerPage));
        };

        fetchData();
    }, [itemsPerPage]);

    const deletarLivro = async (id) => {
        const confirma = window.confirm(`Deseja deletar o livro com o ID ${id}?`);
        if (confirma) {
            await TableAmazonRequests.deletarLivro(id);
            window.location.reload();
        } else {
            window.alert('Erro ao deletar o livro');
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLivros = livros.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div className='pagina-amazon'>
            <div className='alinhar'>
                <h1>Lista de livros</h1>
                <div className="table-container">
                    <Table striped bordered hover size="sm" className="amazon-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data Venda</th>
                                <th>Rank Venda</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentLivros.length > 0 ? (
                                currentLivros.map((livro) => (
                                    <tr key={livro.id_livro}>
                                        <td>{livro.id_livro}</td>
                                        <td>{livro.nome_produto}</td>
                                        <td>{livro.data_venda}</td>
                                        <td>{livro.rank_venda}</td>
                                        <td onClick={() => deletarLivro(livro.id_livro)}>
                                            <FaTrash className="trash-iconAma" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Carregando... Ou não servidor não encontrado!</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <div className="pagination-amazon">
                    <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                    <button onClick={nextPage} disabled={currentPage === totalPages}>Próxima</button>
                </div>
            </div>
        </div>
    );
}

export default ListarLivrosTable;
