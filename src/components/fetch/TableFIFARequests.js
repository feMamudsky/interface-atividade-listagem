// TableFIFARequests.js

class TableFIFARequests {
    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeListarJogadores = '/playercards';
        this.routeDeletarJogador = '/remover/jogador';
    }

    async listarJogadores() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarJogadores}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    async deletarJogador(idJogador) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarJogador}?idJogador=${idJogador}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao deletar jogador');
            return null;
        }
    }
}

export default new TableFIFARequests();
