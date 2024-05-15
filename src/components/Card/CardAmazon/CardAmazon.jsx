import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import AmazonRequests from '../../fetch/TableAmazonRequests'; // Importe o módulo correto
import './CardAmazon.css'; // Importe o arquivo CSS correto

function ListarProdutosAmazon() {
    const [produtos, setProdutos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const produtosData = await AmazonRequests.listarProdutos(); // Ajuste o método conforme necessário
            setProdutos(produtosData);
            setTotalPages(Math.ceil(produtosData.length / itemsPerPage));
        };

        fetchData();
    }, [itemsPerPage]);

    const deletarProduto = async (id) => {
        const confirma = window.confirm(`Deseja deletar o produto com o ID ${id}?`);
        if (confirma) {
            await AmazonRequests.deletarProduto(id); // Ajuste o método conforme necessário
            window.location.reload();
        } else {
            window.alert('Erro ao deletar o produto');
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProdutos = produtos.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div className='pagina-amazon'>
            <h1 className='titulo-amazon'>Lista de Produtos da Amazon</h1>
            <div className='amazon-card-container'>
                {currentProdutos.map((produto) => (
                    <div key={produto.id} className='amazon-card'>
                        <h3>{produto.nome}</h3>
                        <p>Categoria: {produto.categoria}</p>
                        <p>Preço: {produto.preco}</p>
                        <button onClick={() => deletarProduto(produto.id)}>
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

export default ListarProdutosAmazon;
