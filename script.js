// script.js

// Garante que o script só execute depois que o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores de Elementos HTML ---
    // Seletores para os elementos principais da UI de login/registro
    const container = document.getElementById('container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginAlert = document.getElementById('login-alert');
    const registerAlert = document.getElementById('register-alert');

    // Seletores para os botões de alternância
    // Usamos querySelector para selecionar os botões de classe 'register-btn' e 'login-btn'
    // que estão dentro dos painéis de transição.
    const regiserBtn = document.querySelector('.toggle-left .register-btn');
    const loginBtn = document.querySelector('.toggle-right .login-btn');

    // Seletores para os elementos do dashboard (se existirem no HTML)
    // É importante que esses IDs existam no seu HTML quando o dashboard for visível.
    const dashboard = document.getElementById('dashboard');
    const welcomeUser = document.getElementById('welcome-user');
    const usersList = document.getElementById('users-list');
    const usersAlert = document.getElementById('users-alert');
    const usersLoading = document.getElementById('users-loading');
    const searchInput = document.getElementById('search-input');
    const usersPagination = document.getElementById('users-pagination');

    // Seletores para o modal de edição (se existirem no HTML)
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editUserId = document.getElementById('edit-user-id');
    const editUsername = document.getElementById('edit-username');
    const editEmail = document.getElementById('edit-email');
    const editPassword = document.getElementById('edit-password');
    const editAlert = document.getElementById('edit-alert');

    // Seletores para o modal de confirmação customizado (NOVO - para substituir o confirm())
    const customConfirmModal = document.getElementById('custom-confirm-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYesBtn = document.getElementById('confirm-yes-btn');
    const confirmNoBtn = document.getElementById('confirm-no-btn');

    // --- Variáveis de Estado ---
    let currentPage = 1; // Página atual para paginação de usuários
    let currentSearchTerm = ''; // Termo de busca atual
    let deleteUserId = null; // Armazena o ID do usuário a ser excluído para o modal

    // --- Event Listeners para Alternância de Formulário ---
    // Estes listeners são os responsáveis por alternar a classe 'active'
    // e já estavam funcionando corretamente. Apenas removemos o onclick do HTML
    // para evitar conflitos.
    if (regiserBtn) { // Verifica se o botão existe antes de adicionar o listener
        regiserBtn.addEventListener('click', () => {
            container.classList.add('active'); // Adiciona a classe 'active' para exibir o formulário de registro
            loginAlert.textContent = ''; // Limpa alertas do formulário de login
            registerAlert.textContent = ''; // Limpa alertas do formulário de registro
            loginForm.reset(); // Reseta o formulário de login
            registerForm.reset(); // Reseta o formulário de registro
        });
    }

    if (loginBtn) { // Verifica se o botão existe antes de adicionar o listener
        loginBtn.addEventListener('click', () => {
            container.classList.remove('active'); // Remove a classe 'active' para exibir o formulário de login
            loginAlert.textContent = ''; // Limpa alertas do formulário de login
            registerAlert.textContent = ''; // Limpa alertas do formulário de registro
            loginForm.reset(); // Reseta o formulário de login
            registerForm.reset(); // Reseta o formulário de registro
        });
    }

    // A função window.toggleForm foi removida pois os listeners acima já lidam com a alternância
    // e os botões no HTML chamavam essa função em conflito.

    // --- Funções de Alerta ---
    // Exibe uma mensagem de alerta temporária em um elemento específico
    const showAlert = (element, message, type) => {
        if (!element) {
            console.warn(`Elemento de alerta não encontrado: ${element}`);
            return; // Garante que o elemento existe
        }
        element.textContent = message;
        element.className = `alert ${type}`; // Adiciona classes de estilo (success, error, info)
        element.style.display = 'block'; // Torna o alerta visível
        setTimeout(() => {
            element.style.display = 'none'; // Esconde o alerta após 5 segundos
            element.textContent = ''; // Limpa o texto
        }, 5000);
    };

    // --- Lógica de Registro (Create) ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Previne o comportamento padrão de envio do formulário
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            // Validação básica (pode ser expandida)
            if (!username || !email || !password) {
                showAlert(registerAlert, 'Por favor, preencha todos os campos.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);

            try {
                // Requisição AJAX para o backend de registro
                const response = await fetch('backend/registrar_usuario.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json(); // Analisa a resposta JSON

                if (data.success) {
                    showAlert(registerAlert, data.message, 'success');
                    registerForm.reset(); // Reseta o formulário após o sucesso
                    container.classList.remove('active'); // Volta para a tela de login
                } else {
                    showAlert(registerAlert, data.message, 'error');
                }
            } catch (error) {
                console.error('Erro ao registrar:', error);
                showAlert(registerAlert, 'Erro de conexão com o servidor. Tente novamente mais tarde.', 'error');
            }
        });
    }

    // --- Lógica de Login (Read - Acesso) ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Previne o comportamento padrão de envio do formulário
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            try {
                // Requisição AJAX para o backend de login
                const response = await fetch('backend/login_usuario.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json(); // Analisa a resposta JSON

                if (data.success) {
                    showAlert(loginAlert, data.message, 'success');
                    loginForm.reset(); // Reseta o formulário após o login
                    showDashboard(data.username); // Mostra o dashboard após o login bem-sucedido
                } else {
                    showAlert(loginAlert, data.message, 'error');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                showAlert(loginAlert, 'Erro de conexão com o servidor. Tente novamente mais tarde.', 'error');
            }
        });
    }

    // --- Lógica do Dashboard ---
    // Torna o dashboard visível e esconde a tela de login/registro
    const showDashboard = (username) => {
        if (container) container.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';
        if (welcomeUser) welcomeUser.textContent = `Olá, ${username}!`;
        loadUsers(); // Carrega os usuários ao entrar no dashboard
    };

    // Esconde o dashboard e mostra a tela de login/registro
    window.hideDashboard = () => {
        if (dashboard) dashboard.style.display = 'none';
        // Usamos 'flex' aqui, pois o CSS original do container usa display:flex
        if (container) container.style.display = 'flex';
        if (welcomeUser) welcomeUser.textContent = '';
        if (usersList) usersList.innerHTML = ''; // Limpa a lista de usuários
    };

    // Lógica para logout (apenas esconde o dashboard e mostra a tela de login)
    window.handleLogout = async () => {
        try {
            hideDashboard();
            showAlert(loginAlert, 'Você foi desconectado.', 'info');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    // --- Listar Usuários (Read) ---
    // Carrega e exibe a lista de usuários, com paginação e busca
    window.loadUsers = async (page = 1, searchTerm = '') => {
        if (usersLoading) usersLoading.style.display = 'flex'; // Mostra indicador de carregamento
        if (usersAlert) usersAlert.textContent = ''; // Limpa alertas anteriores
        if (usersList) usersList.innerHTML = ''; // Limpa a lista de usuários
        currentPage = page;
        currentSearchTerm = searchTerm;

        try {
            // Requisição AJAX para o backend de listagem de usuários
            const response = await fetch(`backend/listar_usuarios.php?page=${currentPage}&search=${encodeURIComponent(currentSearchTerm)}`);
            const data = await response.json(); // Analisa a resposta JSON

            if (usersLoading) usersLoading.style.display = 'none'; // Esconde indicador de carregamento

            if (data.success) {
                if (data.users && data.users.length > 0) {
                    data.users.forEach(user => {
                        const userCard = document.createElement('div');
                        userCard.className = 'user-card';
                        userCard.innerHTML = `
                            <h3>${user.nome_usuario}</h3>
                            <p>Email: ${user.email}</p>
                            <p>Cadastro: ${new Date(user.data_cadastro).toLocaleDateString()}</p>
                            <div class="user-actions">
                                <button class="btn-edit" onclick="openEditModal(${user.id}, '${user.nome_usuario.replace(/'/g, "\\'")}', '${user.email.replace(/'/g, "\\'")}')">
                                    <i class='bx bx-edit'></i> Editar
                                </button>
                                <button class="btn-delete" onclick="showCustomConfirm(${user.id})">
                                    <i class='bx bx-trash'></i> Excluir
                                </button>
                            </div>
                        `;
                        if (usersList) usersList.appendChild(userCard);
                    });
                    renderPagination(data.total_pages, data.current_page);
                } else {
                    if (usersList) usersList.innerHTML = '<p class="info-message">Nenhum usuário encontrado.</p>';
                    if (usersPagination) usersPagination.innerHTML = ''; // Limpa botões de paginação
                }
            } else {
                showAlert(usersAlert, data.message, 'error');
            }
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            if (usersLoading) usersLoading.style.display = 'none';
            showAlert(usersAlert, 'Erro ao carregar usuários. Verifique sua conexão.', 'error');
        }
    };

    // Lógica de busca de usuários com debounce para evitar muitas requisições
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('keyup', () => {
            clearTimeout(searchTimeout); // Limpa o timeout anterior
            searchTimeout = setTimeout(() => {
                loadUsers(1, searchInput.value); // Recarrega usuários com o termo de busca após 500ms
            }, 500); // 500ms de atraso
        });
    }

    // --- Paginação ---
    // Renderiza os botões de paginação
    const renderPagination = (totalPages, currentPage) => {
        if (!usersPagination) return;
        usersPagination.innerHTML = ''; // Limpa a paginação existente
        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.className = `page-btn ${i === currentPage ? 'active' : ''}`; // Adiciona classe 'active' para a página atual
                button.onclick = () => loadUsers(i, currentSearchTerm); // Define o evento de clique para carregar a página
                usersPagination.appendChild(button);
            }
        }
    };

    // --- Modal de Edição (Update) ---
    // Abre o modal de edição com os dados do usuário preenchidos
    window.openEditModal = (id, username, email) => {
        if (!editModal || !editUserId || !editUsername || !editEmail || !editAlert) return;
        editUserId.value = id;
        editUsername.value = username;
        editEmail.value = email;
        editPassword.value = ''; // Limpa o campo de senha
        editAlert.textContent = ''; // Limpa alertas anteriores
        editModal.style.display = 'flex'; // Exibe o modal (display flex para centralizar)
    };

    // Fecha o modal de edição
    window.closeEditModal = () => {
        if (editModal) editModal.style.display = 'none';
    };

    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Previne o envio padrão do formulário
            const id = editUserId.value;
            const username = editUsername.value;
            const email = editEmail.value;
            const password = editPassword.value;

            // Validação básica
            if (!username || !email) {
                showAlert(editAlert, 'Nome de usuário e email são obrigatórios.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('id', id);
            formData.append('username', username);
            formData.append('email', email);
            if (password) { // Adiciona a senha apenas se não estiver vazia
                formData.append('password', password);
            }

            try {
                // Requisição AJAX para o backend de edição de usuário
                const response = await fetch('backend/editar_usuario.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json(); // Analisa a resposta JSON

                if (data.success) {
                    showAlert(editAlert, data.message, 'success');
                    closeEditModal(); // Fecha o modal após o sucesso
                    loadUsers(currentPage, currentSearchTerm); // Recarrega a lista de usuários
                } else {
                    showAlert(editAlert, data.message, 'error');
                }
            } catch (error) {
                console.error('Erro ao editar usuário:', error);
                showAlert(editAlert, 'Erro de conexão ao editar usuário. Tente novamente.', 'error');
            }
        });
    }

    // --- Excluir Usuário (Delete) com Modal Customizado ---
    // Abre o modal de confirmação customizado
    window.showCustomConfirm = (id) => {
        if (!customConfirmModal || !confirmMessage || !confirmYesBtn || !confirmNoBtn) return;

        deleteUserId = id; // Armazena o ID do usuário para a exclusão
        confirmMessage.textContent = 'Tem certeza que deseja excluir este usuário?';
        customConfirmModal.style.display = 'flex'; // Exibe o modal

        // Garante que listeners antigos não se acumulem
        confirmYesBtn.onclick = null;
        confirmNoBtn.onclick = null;

        confirmYesBtn.onclick = () => {
            customConfirmModal.style.display = 'none'; // Esconde o modal
            deleteUser(deleteUserId); // Chama a função de exclusão
        };

        confirmNoBtn.onclick = () => {
            customConfirmModal.style.display = 'none'; // Esconde o modal
            deleteUserId = null; // Limpa o ID
        };
    };

    // Função que realmente realiza a exclusão
    window.deleteUser = async (id) => {
        const formData = new FormData();
        formData.append('id', id);

        try {
            // Requisição AJAX para o backend de exclusão de usuário
            const response = await fetch('backend/deletar_usuario.php', {
                method: 'POST',
                body: formData
            });
            const data = await response.json(); // Analisa a resposta JSON

            if (data.success) {
                showAlert(usersAlert, data.message, 'success');
                loadUsers(currentPage, currentSearchTerm); // Recarrega a lista de usuários
            } else {
                showAlert(usersAlert, data.message, 'error');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            showAlert(usersAlert, 'Erro de conexão ao excluir usuário. Tente novamente.', 'error');
        }
    };
});
