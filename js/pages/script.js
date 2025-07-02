document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginAlert = document.getElementById('login-alert');
    const registerAlert = document.getElementById('register-alert');

    const regiserBtn = document.querySelector('.toggle-left .register-btn');
    const loginBtn = document.querySelector('.toggle-right .login-btn');

  
    const dashboard = document.getElementById('dashboard');
    const welcomeUser = document.getElementById('welcome-user');
    const usersList = document.getElementById('users-list');
    const usersAlert = document.getElementById('users-alert');
    const usersLoading = document.getElementById('users-loading');
    const searchInput = document.getElementById('search-input');
    const usersPagination = document.getElementById('users-pagination');

    
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editUserId = document.getElementById('edit-user-id');
    const editUsername = document.getElementById('edit-username');
    const editEmail = document.getElementById('edit-email');
    const editPassword = document.getElementById('edit-password');
    const editAlert = document.getElementById('edit-alert');

    
    const customConfirmModal = document.getElementById('custom-confirm-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYesBtn = document.getElementById('confirm-yes-btn');
    const confirmNoBtn = document.getElementById('confirm-no-btn');

    
    let currentPage = 1; 
    let currentSearchTerm = ''; 
    let deleteUserId = null; 

    if (regiserBtn) { 
        regiserBtn.addEventListener('click', () => {
            container.classList.add('active'); 
            loginAlert.textContent = ''; 
            registerAlert.textContent = '';
            loginForm.reset();
            registerForm.reset();
        });
    }

    if (loginBtn) { 
        loginBtn.addEventListener('click', () => {
            container.classList.remove('active'); 
            loginAlert.textContent = ''; 
            registerAlert.textContent = ''; 
            loginForm.reset(); 
            registerForm.reset(); 
        });
    }

    const showAlert = (element, message, type) => {
        if (!element) {
            console.warn(`Elemento de alerta não encontrado: ${element}`);
            return; 
        }
        element.textContent = message;
        element.className = `alert ${type}`; 
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none'; 
            element.textContent = ''; 
        }, 5000);
    };

    // --- Lógica de Registro (Create) ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            
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
                const data = await response.json(); 

                if (data.success) {
                    showAlert(registerAlert, data.message, 'success');
                    registerForm.reset(); 
                    container.classList.remove('active'); 
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
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            try {
                const response = await fetch('backend/login_usuario.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json(); 

                if (data.success) {
                    showAlert(loginAlert, data.message, 'success');
                    loginForm.reset(); 
                    showDashboard(data.username); 
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
    const showDashboard = (username) => {
        if (container) container.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';
        if (welcomeUser) welcomeUser.textContent = `Olá, ${username}!`;
        loadUsers(); 
    };

    
    window.hideDashboard = () => {
        if (dashboard) dashboard.style.display = 'none';
        if (container) container.style.display = 'flex';
        if (welcomeUser) welcomeUser.textContent = '';
        if (usersList) usersList.innerHTML = '';
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
    window.loadUsers = async (page = 1, searchTerm = '') => {
        if (usersLoading) usersLoading.style.display = 'flex'; 
        if (usersAlert) usersAlert.textContent = ''; 
        if (usersList) usersList.innerHTML = ''; 
        currentPage = page;
        currentSearchTerm = searchTerm;

        try {
            // Requisição AJAX para o backend de listagem de usuários
            const response = await fetch(`backend/listar_usuarios.php?page=${currentPage}&search=${encodeURIComponent(currentSearchTerm)}`);
            const data = await response.json();

            if (usersLoading) usersLoading.style.display = 'none'; 

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
                    if (usersPagination) usersPagination.innerHTML = ''; 
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
            clearTimeout(searchTimeout); 
            searchTimeout = setTimeout(() => {
                loadUsers(1, searchInput.value); 
            }, 500);
        });
    }

    // --- Paginação ---
    const renderPagination = (totalPages, currentPage) => {
        if (!usersPagination) return;
        usersPagination.innerHTML = ''; 
        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.className = `page-btn ${i === currentPage ? 'active' : ''}`; 
                button.onclick = () => loadUsers(i, currentSearchTerm); 
                usersPagination.appendChild(button);
            }
        }
    };

    // --- Modal de Edição (Update) ---
    window.openEditModal = (id, username, email) => {
        if (!editModal || !editUserId || !editUsername || !editEmail || !editAlert) return;
        editUserId.value = id;
        editUsername.value = username;
        editEmail.value = email;
        editPassword.value = ''; 
        editAlert.textContent = ''; 
        editModal.style.display = 'flex'; 
    };

    // Fecha o modal de edição
    window.closeEditModal = () => {
        if (editModal) editModal.style.display = 'none';
    };

    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
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
            if (password) {
                formData.append('password', password);
            }

            try {
                // Requisição AJAX para o backend de edição de usuário
                const response = await fetch('backend/editar_usuario.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json(); 

                if (data.success) {
                    showAlert(editAlert, data.message, 'success');
                    closeEditModal(); 
                    loadUsers(currentPage, currentSearchTerm); 
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
    
    window.showCustomConfirm = (id) => {
        if (!customConfirmModal || !confirmMessage || !confirmYesBtn || !confirmNoBtn) return;

        deleteUserId = id; 
        confirmMessage.textContent = 'Tem certeza que deseja excluir este usuário?';
        customConfirmModal.style.display = 'flex'; 

        
        confirmYesBtn.onclick = null;
        confirmNoBtn.onclick = null;

        confirmYesBtn.onclick = () => {
            customConfirmModal.style.display = 'none'; 
            deleteUser(deleteUserId); 
        };

        confirmNoBtn.onclick = () => {
            customConfirmModal.style.display = 'none'; 
            deleteUserId = null; 
        };
    };


    window.deleteUser = async (id) => {
        const formData = new FormData();
        formData.append('id', id);

        try {
            const response = await fetch('backend/deletar_usuario.php', {
                method: 'POST',
                body: formData
            });
            const data = await response.json(); 

            if (data.success) {
                showAlert(usersAlert, data.message, 'success');
                loadUsers(currentPage, currentSearchTerm); 
            } else {
                showAlert(usersAlert, data.message, 'error');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            showAlert(usersAlert, 'Erro de conexão ao excluir usuário. Tente novamente.', 'error');
        }
    };
});
