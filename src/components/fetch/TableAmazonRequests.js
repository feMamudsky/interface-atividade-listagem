class TableAmazonRequests {

    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeListarLivros = '/vendas';
        this.routeCadastrarLivro = '/novo/livro';
        this.routeDeletarLivro = '/remover/livro';
        this.routeAlterarLivro = '/atualizar/livro';
    }

    async listarLivros() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarLivros}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    async deletarLivro(idLivro) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarLivro}?idLivro=${idLivro}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao deletar livro');
            return null;
        }
    }
}

export default new TableAmazonRequests();
