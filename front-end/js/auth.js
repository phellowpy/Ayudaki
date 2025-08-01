// front-end/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    // Referências para os elementos de navegação
    const navLogin = document.getElementById('nav-login');
    const navCadastro = document.getElementById('nav-cadastro');
    const navVerCampanhas = document.getElementById('nav-ver-campanhas');
    const navEventos = document.getElementById('nav-eventos');
    const navCriarCampanha = document.getElementById('nav-criar-campanha');
    const navMinhasCampanhas = document.getElementById('nav-minhas-campanhas');
    const navDashboardAdmin = document.getElementById('nav-dashboard-admin');
    const navLogout = document.getElementById('nav-logout');
    const loggedInUserSpan = document.getElementById('loggedInUser');
    const logoutButton = document.getElementById('logoutButton');

    function updateNavigation() {
        const userType = sessionStorage.getItem('user_type');
        const userName = sessionStorage.getItem('user_name');

        // Oculta todos os itens de navegação primeiro
        const allNavItems = [navLogin, navCadastro, navVerCampanhas, navEventos, navCriarCampanha, navMinhasCampanhas, navDashboardAdmin, navLogout];
        allNavItems.forEach(item => {
            if (item) item.style.display = 'none';
        });

        // Mostra os itens básicos para todos
        if (navVerCampanhas) navVerCampanhas.style.display = 'list-item';
        if (navEventos) navEventos.style.display = 'list-item';

        if (userType) {
            // Usuário logado
            if (navLogout) {
                navLogout.style.display = 'list-item';
                if (loggedInUserSpan) loggedInUserSpan.textContent = userName || 'Usuário';
            }
            if (userType === 'ong') {
                if (navCriarCampanha) navCriarCampanha.style.display = 'list-item';
                if (navMinhasCampanhas) navMinhasCampanhas.style.display = 'list-item';
            } else if (userType === 'admin') {
                if (navDashboardAdmin) navDashboardAdmin.style.display = 'list-item';
                // Admins têm acesso a tudo
                if (navCriarCampanha) navCriarCampanha.style.display = 'list-item';
                if (navMinhasCampanhas) navMinhasCampanhas.style.display = 'list-item';
            }
        } else {
            // Não logado
            if (navLogin) navLogin.style.display = 'list-item';
            if (navCadastro) navCadastro.style.display = 'list-item';
        }
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            sessionStorage.clear();
            alert('Sessão encerrada com sucesso.');
            window.location.href = '/index.html';
        });
    }

    // Proteção de rotas (páginas restritas)
    const currentPage = window.location.pathname.split('/').pop();
    const userType = sessionStorage.getItem('user_type');

    const ongPages = ['criar_campanha.html', 'campanhas_ong.html'];
    const adminPages = ['dashboard_admin.html'];
    const authPages = ['login.html', 'cadastro.html'];

    if (ongPages.includes(currentPage) && userType !== 'ong' && userType !== 'admin') {
        alert('Acesso negado. Você precisa ser uma ONG ou Administrador.');
        window.location.href = 'login.html';
    } else if (adminPages.includes(currentPage) && userType !== 'admin') {
        alert('Acesso negado. Apenas Administradores podem acessar esta página.');
        window.location.href = 'login.html';
    } else if (authPages.includes(currentPage) && userType) {
        alert('Você já está logado.');
        window.location.href = '../index.html';
    }

    updateNavigation();
});

// Funções para tema claro/escuro
function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const lightIcon = themeToggle?.querySelector('.light-icon');
    const darkIcon = themeToggle?.querySelector('.dark-icon');
    
    if (body) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (lightIcon) lightIcon.style.display = 'none';
            if (darkIcon) darkIcon.style.display = 'inline';
        } else {
            body.classList.remove('dark-mode');
            if (lightIcon) lightIcon.style.display = 'inline';
            if (darkIcon) darkIcon.style.display = 'none';
        }
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
    // Aplica o tema salvo ao carregar a página
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});