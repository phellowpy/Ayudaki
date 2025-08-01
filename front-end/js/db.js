window.db = {
    contas: [
        { email: 'admin@doacoes.com', senha: '123', nome: 'Admin', tipo: 'admin' },
        { email: 'joao@email.com', senha: 'abc', nome: 'João da Silva', tipo: 'normal' },
        { email: 'ong@doacoes.com', senha: 'xyz', nome: 'ONG da Cidadania', tipo: 'ong' },
    ],
    campanhas: [
        { id: 1, nome: 'Campanha de Agasalho', descricao: 'Arrecadação de roupas para moradores de rua.', meta: 5000, arrecadado: 3500, criadorEmail: 'ong@doacoes.com', criadorNome: 'ONG da Cidadania' },
        { id: 2, nome: 'Doação de Cestas Básicas', descricao: 'Ajude famílias carentes com doações de alimentos.', meta: 10000, arrecadado: 8000, criadorEmail: 'ong@doacoes.com', criadorNome: 'ONG da Cidadania' },
    ],
    eventos: [
        { id: 1, nome: 'Feira de Adoção de Pets', descricao: 'Venha adotar um amigo de quatro patas!', data: '15/12/2025', local: 'Parque da Cidade' },
        { id: 2, nome: 'Mutirão de Limpeza', descricao: 'Vamos limpar a orla da praia juntos!', data: '22/12/2025', local: 'Praia Central' },
    ],
};