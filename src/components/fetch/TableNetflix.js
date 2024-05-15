class NetflixRequests {
    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeListarShows = '/titulos';
        this.routeDeletarShow = '/remover/show';
    }

    async listarShows() {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarShows}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar servidor');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    async deletarShow(idShow) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeDeletarShow}?idShow=${idShow}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            return true;
        } catch (error) {
            console.error('Erro: ', error);
            window.alert('Erro ao deletar show');
            return null;
        }
    }
}

export default new NetflixRequests();
