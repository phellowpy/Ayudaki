// 1. Admin: e-mail: admin@doacoes.com, senha: 123
// 2. Usuário Normal: e-mail: joao@email.com, senha: abc
// 3. ONG: e-mail: ong@doacoes.com, senha: xyz

document.addEventListener('DOMContentLoaded', () => {

    // --- Configuração do Tema ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        if (lightIcon && darkIcon) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'inline';
        }
    } else {
        body.classList.remove('dark-mode');
        if (lightIcon && darkIcon) {
            lightIcon.style.display = 'inline';
            darkIcon.style.display = 'none';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
                if (lightIcon && darkIcon) {
                    lightIcon.style.display = 'inline';
                    darkIcon.style.display = 'none';
                }
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
                if (lightIcon && darkIcon) {
                    lightIcon.style.display = 'none';
                    darkIcon.style.display = 'inline';
                }
            }
        });
    }

    // --- Funções Utilitárias ---
    function showMessage(elementId, message, type) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.className = `message ${type}`;
            element.style.display = 'block';
        }
    }

    function clearMessage(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = '';
            element.className = 'message';
            element.style.display = 'none';
        }
    }
    
    // --- Lógica do Header (Menu de Navegação) ---
    const updateHeader = () => {
        const isLoggedIn = sessionStorage.getItem('user_email');
        const userType = sessionStorage.getItem('user_type');
        const userName = sessionStorage.getItem('user_name');

        const navLogin = document.getElementById('nav-login');
        const navCadastro = document.getElementById('nav-cadastro');
        const navLogout = document.getElementById('nav-logout');
        const navPerfil = document.getElementById('nav-perfil'); // Referência ao novo link de Perfil
        const navCriarCampanha = document.getElementById('nav-criar-campanha');
        const navMinhasCampanhas = document.getElementById('nav-minhas-campanhas');
        const navDashboardAdmin = document.getElementById('nav-dashboard-admin');

        if (navLogin) navLogin.style.display = isLoggedIn ? 'none' : 'block';
        if (navCadastro) navCadastro.style.display = isLoggedIn ? 'none' : 'block';
        if (navLogout) navLogout.style.display = isLoggedIn ? 'block' : 'none';
        
        // CORREÇÃO: Lógica para exibir o item de menu "Perfil" quando o usuário estiver logado
        if (navPerfil) navPerfil.style.display = isLoggedIn ? 'block' : 'none';
        
        if (navCriarCampanha) navCriarCampanha.style.display = (isLoggedIn && userType === 'ong') ? 'block' : 'none';
        if (navMinhasCampanhas) navMinhasCampanhas.style.display = (isLoggedIn && userType === 'ong') ? 'block' : 'none';
        if (navDashboardAdmin) navDashboardAdmin.style.display = (isLoggedIn && userType === 'admin') ? 'block' : 'none';

        const loggedInUserSpan = document.getElementById('loggedInUser');
        if (loggedInUserSpan && userName) {
            loggedInUserSpan.textContent = userName;
        }
    };
    window.updateHeader = updateHeader; // Torna a função global para ser chamada do perfil.js
    
    // --- Lógica do Logout ---
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.clear();
            alert('Você foi desconectado.');
            window.location.href = '../../index.html';
        });
    }

    updateHeader();

    // --- Lógica da Página de Login ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearMessage('loginMessage');
            const email = loginForm.email.value;
            const senha = loginForm.senha.value;
            const user = window.db.contas.find(c => c.email === email && c.senha === senha);

            if (user) {
                sessionStorage.setItem('user_type', user.tipo);
                sessionStorage.setItem('user_name', user.nome);
                sessionStorage.setItem('user_email', user.email);
                alert(`Bem-vindo, ${user.nome}!`);
                if (user.tipo === 'ong') {
                    window.location.href = 'campanhas_ong.html';
                } else if (user.tipo === 'admin') {
                    window.location.href = 'dashboard_admin.html';
                } else {
                    window.location.href = 'ver_campanhas.html';
                }
            } else {
                showMessage('loginMessage', 'E-mail ou senha incorretos.', 'error');
            }
        });
    }

    // --- Lógica da Página de Cadastro ---
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearMessage('cadastroMessage');
            
            const email = cadastroForm.email.value;
            if (window.db.contas.some(c => c.email === email)) {
                showMessage('cadastroMessage', 'Este e-mail já está cadastrado.', 'error');
                return;
            }

            const novaConta = {
                email: cadastroForm.email.value,
                senha: cadastroForm.senha.value,
                nome_usuario: cadastroForm.nome_usuario.value,
                nome: cadastroForm.nome.value,
                telefone: cadastroForm.telefone.value,
                tipo: 'normal',
                foto: '../../img/default-profile.png'
            };

            window.db.contas.push(novaConta);
            showMessage('cadastroMessage', 'Conta criada com sucesso! Redirecionando...', 'success');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
    
    // --- Funções de renderização de campanhas e eventos ---
    const renderCampanhas = (campanhas, containerId, userType) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        if (campanhas.length === 0) {
            container.innerHTML = '<p>Nenhuma campanha encontrada.</p>';
            return;
        }

        campanhas.forEach(campanha => {
            const card = document.createElement('div');
            card.classList.add('card-campanha');
            card.innerHTML = `
                <h3>${campanha.nome}</h3>
                <p>${campanha.descricao}</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${Math.min((campanha.arrecadado / campanha.meta) * 100, 100)}%;"></div>
                </div>
                <p>Arrecadado: R$ ${campanha.arrecadado.toFixed(2)} / Meta: R$ ${campanha.meta.toFixed(2)}</p>
                <a href="campanha_detalhe.html?id=${campanha.id}" class="btn">Ver Detalhes</a>
                ${userType === 'ong' || userType === 'admin' ? 
                `<div class="actions">
                    <button class="btn btn-excluir" data-id="${campanha.id}">Excluir</button>
                </div>` : ''}
            `;
            container.appendChild(card);
        });

        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-excluir')) {
                const id = parseInt(e.target.dataset.id);
                if (confirm('Tem certeza que deseja excluir esta campanha?')) {
                    const index = window.db.campanhas.findIndex(c => c.id === id);
                    if (index !== -1) {
                        window.db.campanhas.splice(index, 1);
                        alert('Campanha excluída!');
                        window.location.reload();
                    }
                }
            }
        });
    };

    const renderEventos = (eventos, containerId, userType) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        if (eventos.length === 0) {
            container.innerHTML = '<p>Nenhum evento encontrado.</p>';
            return;
        }

        eventos.forEach(evento => {
            const card = document.createElement('div');
            card.classList.add('card-evento');
            card.innerHTML = `
                <h3>${evento.nome}</h3>
                <p>${evento.descricao}</p>
                <p><strong>Data:</strong> ${evento.data}</p>
                <p><strong>Local:</strong> ${evento.local}</p>
                ${userType === 'admin' ? 
                `<div class="actions">
                    <button class="btn btn-excluir" data-id="${evento.id}">Excluir</button>
                </div>` : ''}
            `;
            container.appendChild(card);
        });
        
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-excluir')) {
                const id = parseInt(e.target.dataset.id);
                if (confirm('Tem certeza que deseja excluir este evento?')) {
                    const index = window.db.eventos.findIndex(e => e.id === id);
                    if (index !== -1) {
                        window.db.eventos.splice(index, 1);
                        alert('Evento excluído!');
                        window.location.reload();
                    }
                }
            }
        });
    };
    
    // --- Inicialização das páginas ---
    const verCampanhasPage = document.getElementById('verCampanhasPage');
    if (verCampanhasPage) {
        renderCampanhas(window.db.campanhas, 'campanhasGrid', sessionStorage.getItem('user_type'));
    }

    const minhasCampanhasPage = document.getElementById('minhasCampanhasPage');
    if (minhasCampanhasPage) {
        const criadorEmail = sessionStorage.getItem('user_email');
        const minhasCampanhas = window.db.campanhas.filter(c => c.criadorEmail === criadorEmail);
        renderCampanhas(minhasCampanhas, 'minhasCampanhasContainer', sessionStorage.getItem('user_type'));
    }

    const eventosPage = document.getElementById('eventosPage');
    if (eventosPage) {
        renderEventos(window.db.eventos, 'eventosGrid', sessionStorage.getItem('user_type'));
    }

    const adminDashboard = document.getElementById('adminDashboard');
    if (adminDashboard) {
        renderCampanhas(window.db.campanhas, 'adminCampanhasGrid', sessionStorage.getItem('user_type'));
        renderEventos(window.db.eventos, 'adminEventosGrid', sessionStorage.getItem('user_type'));
    }
    
    const criarCampanhaForm = document.getElementById('criarCampanhaForm');
    if (criarCampanhaForm) {
        criarCampanhaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const criadorEmail = sessionStorage.getItem('user_email');
            const criadorNome = sessionStorage.getItem('user_name');
            const novaCampanha = {
                id: window.db.campanhas.length > 0 ? Math.max(...window.db.campanhas.map(c => c.id)) + 1 : 1,
                nome: criarCampanhaForm.titulo.value,
                descricao: criarCampanhaForm.descricao.value,
                meta: parseFloat(criarCampanhaForm.meta.value),
                arrecadado: 0,
                criadorEmail,
                criadorNome,
            };
            window.db.campanhas.push(novaCampanha);
            alert('Campanha criada com sucesso!');
            window.location.href = 'campanhas_ong.html';
        });
    }
    
    const campanhaDetalhePage = document.getElementById('campanhaDetalhePage');
    if (campanhaDetalhePage) {
        const urlParams = new URLSearchParams(window.location.search);
        const campanhaId = parseInt(urlParams.get('id'));
        const campanha = window.db.campanhas.find(c => c.id === campanhaId);

        if (campanha) {
            const doacaoSection = document.getElementById('doacaoSection');
            const userType = sessionStorage.getItem('user_type');
            if (userType === 'normal' || userType === 'ong') {
                doacaoSection.style.display = 'block';
            }
            
            document.getElementById('detalheTitulo').textContent = campanha.nome;
            document.getElementById('detalheCriador').textContent = `Criado por: ${campanha.criadorNome}`;
            document.getElementById('detalheDescricao').textContent = campanha.descricao;
            document.getElementById('detalheArrecadado').textContent = `Arrecadado: R$ ${campanha.arrecadado.toFixed(2)}`;
            document.getElementById('detalheMeta').textContent = `Meta: R$ ${campanha.meta.toFixed(2)}`;
            const progressBar = document.getElementById('detalheProgresso');
            const percentual = (campanha.arrecadado / campanha.meta) * 100;
            progressBar.style.width = `${Math.min(percentual, 100)}%`;

            const doacaoForm = document.getElementById('doacaoForm');
            if (doacaoForm) {
                doacaoForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    clearMessage('doacaoMessage');
                    const valor = parseFloat(doacaoForm.valor.value);
                    if (isNaN(valor) || valor <= 0) {
                        showMessage('doacaoMessage', 'Por favor, insira um valor válido.', 'error');
                        return;
                    }
                    
                    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ChavePix-doacao-${valor}`;
                    const chavePix = `doacao-${campanha.id}@ayudaki.com`;
                    
                    document.getElementById('qrcode-image').src = qrCodeUrl;
                    document.getElementById('chavePix').textContent = chavePix;
                    document.getElementById('qrcode-container').style.display = 'block';
                    showMessage('doacaoMessage', 'QR Code gerado com sucesso! Após a doação, a campanha será atualizada.', 'success');

                    setTimeout(() => {
                        campanha.arrecadado += valor;
                        alert(`Doação de R$ ${valor.toFixed(2)} para "${campanha.nome}" registrada com sucesso!`);
                        window.location.reload();
                    }, 10000);
                });
            }
        }
    }
});