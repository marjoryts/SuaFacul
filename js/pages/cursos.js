// --- dados dos cursos ---
// Você pode expandir esta lista com todos os seus 128 cursos ou mais
const allCourses = [
    {
        name: "Engenharia de Software",
        institution: "USP - Universidade de São Paulo",
        modality: "presencial",
        description: "Curso focado no desenvolvimento de sistemas complexos e aplicações de software de alta qualidade.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Tecnologia",
        type: "Pública"
    },
    {
        name: "Medicina",
        institution: "UNIFESP - Universidade Federal de São Paulo",
        modality: "presencial",
        description: "Formação de médicos generalistas com sólida base científica, técnica e humanística.",
        duration: "6 anos",
        degree: "Bacharelado",
        area: "Saúde",
        type: "Pública"
    },
    {
        name: "Psicologia",
        institution: "UMC - Universidade Mogi das Cruzes",
        modality: "presencial",
        description: "Estudo do comportamento humano e processos mentais, preparando para atuação clínica e organizacional.",
        duration: "5 anos",
        degree: "Bacharelado",
        area: "Saúde",
        type: "Privada"
    },
    {
        name: "Educação Física",
        institution: "Unipiaget - Centro Universitário Piaget",
        modality: "presencial",
        description: "Forma profissionais para atuar com promoção da saúde, esporte e lazer.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Saúde",
        type: "Privada"
    },
    {
        name: "Direito",
        institution: "PUC-SP - Pontifícia Universidade Católica de São Paulo",
        modality: "presencial",
        description: "Desenvolve o raciocínio jurídico para atuação em diversas áreas do direito.",
        duration: "5 anos",
        degree: "Bacharelado",
        area: "Direito",
        type: "Privada"
    },
    {
        name: "Administração",
        institution: "FGV - Fundação Getulio Vargas",
        modality: "presencial",
        description: "Prepara líderes e gestores para os desafios do mercado corporativo.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Negócios",
        type: "Privada"
    },
    {
        name: "Ciência da Computação",
        institution: "UFMG - Universidade Federal de Minas Gerais",
        modality: "presencial",
        description: "Estudo aprofundado de algoritmos, estruturas de dados e inteligência artificial.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Tecnologia",
        type: "Pública"
    },
    {
        name: "Nutrição",
        institution: "UNIFOR - Universidade de Fortaleza",
        modality: "semipresencial",
        description: "Foca na relação entre alimentação, saúde e qualidade de vida.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Saúde",
        type: "Privada"
    },
    {
        name: "Engenharia Civil",
        institution: "UERJ - Universidade do Estado do Rio de Janeiro",
        modality: "presencial",
        description: "Projetos e construção de infraestruturas como edifícios, pontes e estradas.",
        duration: "5 anos",
        degree: "Bacharelado",
        area: "Engenharias", // Adicionando nova área
        type: "Pública"
    },
    {
        name: "Jornalismo",
        institution: "Cásper Líbero - Faculdade Cásper Líbero",
        modality: "presencial",
        description: "Forma comunicadores para produzir e disseminar informações em diversas plataformas.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Comunicação", // Adicionando nova área
        type: "Privada"
    },
    // --- Nova Página de Cursos (Exemplo) ---
    {
        name: "Arquitetura e Urbanismo",
        institution: "Mackenzie - Universidade Presbiteriana Mackenzie",
        modality: "presencial",
        description: "Planejamento e concepção de espaços urbanos e edificações.",
        duration: "5 anos",
        degree: "Bacharelado",
        area: "Artes e Design",
        type: "Privada"
    },
    {
        name: "Design Gráfico",
        institution: "ESPM - Escola Superior de Propaganda e Marketing",
        modality: "presencial",
        description: "Criação visual para publicidade, mídias digitais e identidade de marcas.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Artes e Design",
        type: "Privada"
    },
    {
        name: "Marketing Digital",
        institution: "Digital House",
        modality: "ead",
        description: "Especialização em estratégias e ferramentas de marketing no ambiente online.",
        duration: "2 anos",
        degree: "Tecnólogo",
        area: "Negócios",
        type: "Privada"
    },
    {
        name: "Ciências Biológicas",
        institution: "UNESP - Universidade Estadual Paulista",
        modality: "presencial",
        description: "Estudo da vida em suas diversas formas e níveis de organização.",
        duration: "4 anos",
        degree: "Bacharelado/Licenciatura",
        area: "Ciências Exatas e da Terra", // Nova área
        type: "Pública"
    },
    {
        name: "Fisioterapia",
        institution: "USP - Universidade de São Paulo",
        modality: "presencial",
        description: "Reabilitação e prevenção de disfunções do movimento humano.",
        duration: "5 anos",
        degree: "Bacharelado",
        area: "Saúde",
        type: "Pública"
    },
    {
        name: "Gestão de Recursos Humanos",
        institution: "Estácio",
        modality: "ead",
        description: "Planejamento e gestão de pessoas dentro das organizações.",
        duration: "2 anos",
        degree: "Tecnólogo",
        area: "Negócios",
        type: "Privada"
    },
    {
        name: "Relações Internacionais",
        institution: "UnB - Universidade de Brasília",
        modality: "presencial",
        description: "Análise das relações políticas, econômicas e sociais entre países.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Humanas", // Nova área
        type: "Pública"
    },
    {
        name: "Odontologia",
        institution: "FOP-Unicamp - Faculdade de Odontologia de Piracicaba (Unicamp)",
        modality: "presencial",
        description: "Diagnóstico e tratamento de problemas relacionados à saúde bucal.",
        duration: "5 anos",
        degree: "Bacharelado",
        area: "Saúde",
        type: "Pública"
    },
    {
        name: "Engenharia de Produção",
        institution: "ITA - Instituto Tecnológico de Aeronáutica",
        modality: "presencial",
        description: "Otimização de sistemas produtivos e logísticos em indústrias.",
        duration: "5 anos",
        degree: "Bacharelado",
        area: "Engenharias",
        type: "Pública"
    },
    {
        name: "Ciências Contábeis",
        institution: "FEA-USP - Faculdade de Economia, Administração e Contabilidade (USP)",
        modality: "presencial",
        description: "Registro e análise de transações financeiras e patrimoniais de empresas.",
        duration: "4 anos",
        degree: "Bacharelado",
        area: "Negócios",
        type: "Pública"
    },
    // Adicione mais cursos para simular a paginação
    { name: "Sistemas de Informação", institution: "PUC Minas", modality: "ead", description: "Desenvolvimento e gestão de sistemas de informação.", duration: "4 anos", degree: "Bacharelado", area: "Tecnologia", type: "Privada" },
    { name: "Publicidade e Propaganda", institution: "ESPM", modality: "presencial", description: "Criação e execução de campanhas publicitárias.", duration: "4 anos", degree: "Bacharelado", area: "Comunicação", type: "Privada" },
    { name: "Física", institution: "USP", modality: "presencial", description: "Estudo das leis fundamentais do universo.", duration: "4 anos", degree: "Bacharelado/Licenciatura", area: "Ciências Exatas e da Terra", type: "Pública" },
    { name: "Matemática", institution: "UNICAMP", modality: "presencial", description: "Desenvolvimento do raciocínio lógico-matemático.", duration: "4 anos", degree: "Bacharelado/Licenciatura", area: "Ciências Exatas e da Terra", type: "Pública" },
    { name: "Engenharia Mecânica", institution: "ITA", modality: "presencial", description: "Projeta e otimiza sistemas mecânicos.", duration: "5 anos", degree: "Bacharelado", area: "Engenharias", type: "Pública" },
    { name: "Agronomia", institution: "ESALQ-USP", modality: "presencial", description: "Estudo da produção agrícola e gestão rural.", duration: "5 anos", degree: "Bacharelado", area: "Agrárias", type: "Pública" },
    { name: "Veterinária", institution: "USP", modality: "presencial", description: "Saúde e bem-estar animal.", duration: "5 anos", degree: "Bacharelado", area: "Saúde", type: "Pública" },
    { name: "Serviço Social", institution: "PUC-Rio", modality: "presencial", description: "Atuação em políticas sociais e direitos humanos.", duration: "4 anos", degree: "Bacharelado", area: "Humanas", type: "Privada" },
    { name: "Biblioteconomia", institution: "USP", modality: "presencial", description: "Organização e gestão de informação.", duration: "4 anos", degree: "Bacharelado", area: "Humanas", type: "Pública" },
    { name: "Geografia", institution: "UFRJ", modality: "presencial", description: "Análise do espaço geográfico e suas interações.", duration: "4 anos", degree: "Bacharelado/Licenciatura", area: "Ciências da Terra", type: "Pública" },
    // Mais para preencher 3 ou 4 páginas
    { name: "Engenharia de Alimentos", institution: "UNICAMP", modality: "presencial", description: "Processamento e conservação de alimentos.", duration: "5 anos", degree: "Bacharelado", area: "Engenharias", type: "Pública" },
    { name: "Design de Interiores", institution: "Belas Artes", modality: "presencial", description: "Criação de ambientes funcionais e estéticos.", duration: "3 anos", degree: "Bacharelado", area: "Artes e Design", type: "Privada" },
    { name: "Ciências Políticas", institution: "USP", modality: "presencial", description: "Estudo de sistemas políticos e poder.", duration: "4 anos", degree: "Bacharelado", area: "Humanas", type: "Pública" },
    { name: "Pedagogia", institution: "UFSC", modality: "ead", description: "Formação para atuação em educação e gestão pedagógica.", duration: "4 anos", degree: "Licenciatura", area: "Educação", type: "Pública" },
    { name: "Teatro", institution: "UNIRIO", modality: "presencial", description: "Formação de artistas e pesquisadores teatrais.", duration: "4 anos", degree: "Bacharelado/Licenciatura", area: "Artes e Design", type: "Pública" },
    { name: "Cinema e Audiovisual", institution: "FAAP", modality: "presencial", description: "Produção de filmes e conteúdo audiovisual.", duration: "4 anos", degree: "Bacharelado", area: "Artes e Design", type: "Privada" },
    { name: "Ciências Econômicas", institution: "Unicamp", modality: "presencial", description: "Análise e formulação de políticas econômicas.", duration: "4 anos", degree: "Bacharelado", area: "Negócios", type: "Pública" },
    { name: "Engenharia Ambiental", institution: "UNESP", modality: "presencial", description: "Soluções para problemas ambientais e sustentabilidade.", duration: "5 anos", degree: "Bacharelado", area: "Engenharias", type: "Pública" },
    { name: "Zootecnia", institution: "USP", modality: "presencial", description: "Produção e manejo animal sustentável.", duration: "5 anos", degree: "Bacharelado", area: "Agrárias", type: "Pública" },
    { name: "Museologia", institution: "UNIRIO", modality: "presencial", description: "Gestão e curadoria de acervos culturais.", duration: "4 anos", degree: "Bacharelado", area: "Humanas", type: "Pública" },
    { name: "Turismo", institution: "USP", modality: "presencial", description: "Planejamento e gestão de atividades turísticas.", duration: "4 anos", degree: "Bacharelado", area: "Negócios", type: "Pública" },
    { name: "Hotelaria", institution: "Senac", modality: "presencial", description: "Gestão e operação de empreendimentos hoteleiros.", duration: "2 anos", degree: "Tecnólogo", area: "Negócios", type: "Privada" },
    { name: "Gastronomia", institution: "Senac", modality: "presencial", description: "Técnicas culinárias e gestão de restaurantes.", duration: "2 anos", degree: "Tecnólogo", area: "Alimentos", type: "Privada" },
    { name: "Ciência de Dados", institution: "USP", modality: "presencial", description: "Análise e interpretação de grandes volumes de dados.", duration: "4 anos", degree: "Bacharelado", area: "Tecnologia", type: "Pública" },
    { name: "Inteligência Artificial", institution: "USP", modality: "presencial", description: "Estudo e desenvolvimento de sistemas inteligentes.", duration: "4 anos", degree: "Bacharelado", area: "Tecnologia", type: "Pública" },
    { name: "Jogos Digitais", institution: "Anhembi Morumbi", modality: "presencial", description: "Criação e desenvolvimento de jogos eletrônicos.", duration: "2 anos", degree: "Tecnólogo", area: "Tecnologia", type: "Privada" },
    { name: "Comércio Exterior", institution: "FGV", modality: "presencial", description: "Operações de importação e exportação.", duration: "4 anos", degree: "Bacharelado", area: "Negócios", type: "Privada" },
    { name: "Logística", institution: "Fatec", modality: "presencial", description: "Gestão da cadeia de suprimentos e transporte.", duration: "2 anos", degree: "Tecnólogo", area: "Negócios", type: "Pública" },
    { name: "Recursos Hídricos", institution: "USP", modality: "presencial", description: "Gestão sustentável dos recursos hídricos.", duration: "4 anos", degree: "Bacharelado", area: "Engenharias", type: "Pública" },
    { name: "Geologia", institution: "UFRJ", modality: "presencial", description: "Estudo da Terra e seus processos.", duration: "5 anos", degree: "Bacharelado", area: "Ciências da Terra", type: "Pública" },
];

const coursesPerPage = 10; // Quantidade de cursos por página
let currentPage = 1;
let filteredCourses = [...allCourses]; // Inicia com todos os cursos, será filtrado

// Referências aos elementos HTML
const coursesGrid = document.querySelector('.courses-grid');
const paginationContainer = document.querySelector('.pagination');
const coursesCountElement = document.querySelector('.courses-count');
const areaButtons = document.querySelectorAll('.filter-options button');
const modalityCheckboxes = document.querySelectorAll('.filter-group:nth-child(2) input[type="checkbox"]');
const institutionCheckboxes = document.querySelectorAll('.filter-group:nth-child(3) input[type="checkbox"]');
const applyFiltersButton = document.querySelector('.btn-apply');
const searchInput = document.querySelector('.search-box input[type="text"]');
const searchButton = document.querySelector('.btn-search');


// Função para renderizar os cursos na grade
function renderCourses(page) {
    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const coursesToRender = filteredCourses.slice(startIndex, endIndex);

    coursesGrid.innerHTML = ''; // Limpa a grade atual

    if (coursesToRender.length === 0) {
        coursesGrid.innerHTML = '<p class="no-results">Nenhum curso encontrado com os filtros aplicados.</p>';
        coursesCountElement.textContent = `0-0 de 0 cursos`;
        return;
    }

    coursesToRender.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        // Determina a classe da tag de modalidade
        let tagClass = '';
        if (course.modality === 'presencial') {
            tagClass = 'presencial';
        } else if (course.modality === 'ead') {
            tagClass = 'ead';
        } else if (course.modality === 'semipresencial') {
            tagClass = 'semipresencial';
        }

        courseCard.innerHTML = `
            <div class="course-header">
                <h3>${course.name}</h3>
                <span class="tag ${tagClass}">${course.modality.charAt(0).toUpperCase() + course.modality.slice(1)}</span>
            </div>
            <p class="institution">
                <i class="fas fa-university"></i> ${course.institution}
            </p>
            <p class="description">
                ${course.description}
            </p>
            <div class="course-footer">
                <div class="course-info">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-graduation-cap"></i> ${course.degree}</span>
                </div>
                <a href="#" class="course-link">
                    Ver detalhes <i class="fas fa-chevron-right"></i>
                </a>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });

    // Atualiza o contador de cursos
    const startDisplay = startIndex + 1;
    const endDisplay = Math.min(endIndex, filteredCourses.length);
    coursesCountElement.textContent = `${startDisplay}-${endDisplay} de ${filteredCourses.length} cursos`;
}

// Função para renderizar os botões de paginação
function renderPagination() {
    paginationContainer.innerHTML = ''; // Limpa a paginação existente
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // Botão "Anterior"
    const prevButton = document.createElement('a');
    prevButton.href = "#";
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    if (currentPage === 1) {
        prevButton.classList.add('disabled'); // Adiciona classe 'disabled'
    }
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updatePaginationAndCourses();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Limita o número de botões de página visíveis
    const maxPageButtons = 5; // Ex: 1 2 3 4 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }


    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = "#";
        pageLink.textContent = i;
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            updatePaginationAndCourses();
        });
        paginationContainer.appendChild(pageLink);
    }

    // Botão "Próximo"
    const nextButton = document.createElement('a');
    nextButton.href = "#";
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    if (currentPage === totalPages || totalPages === 0) { // Desabilita se for a última página ou não houver cursos
        nextButton.classList.add('disabled');
    }
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            updatePaginationAndCourses();
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Função para aplicar os filtros
function applyFilters() {
    const selectedArea = document.querySelector('.filter-options button.active').textContent.trim();
    const selectedModalities = Array.from(modalityCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.nextSibling.textContent.trim().toLowerCase());
    const selectedInstitutions = Array.from(institutionCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.nextSibling.textContent.trim());

    // Obter o termo de busca
    const searchTerm = searchInput.value.toLowerCase().trim();

    filteredCourses = allCourses.filter(course => {
        let matchesArea = true;
        if (selectedArea !== 'Todas as áreas') {
            matchesArea = course.area === selectedArea;
        }

        let matchesModalities = true;
        if (selectedModalities.length > 0) {
            matchesModalities = selectedModalities.includes(course.modality);
        }

        let matchesInstitutions = true;
        if (selectedInstitutions.length > 0) {
            matchesInstitutions = selectedInstitutions.includes(course.type);
        }

        // Filtro pela barra de busca
        let matchesSearch = true;
        if (searchTerm) {
            matchesSearch = course.name.toLowerCase().includes(searchTerm) ||
                course.institution.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm) ||
                course.area.toLowerCase().includes(searchTerm);
        }

        return matchesArea && matchesModalities && matchesInstitutions && matchesSearch;
    });

    currentPage = 1; // Volta para a primeira página após aplicar filtros
    updatePaginationAndCourses();
}


// Função para atualizar cursos e paginação
function updatePaginationAndCourses() {
    renderCourses(currentPage);
    renderPagination();
}


// --- Lógica para o menu mobile ---
const mobileMenuButton = document.querySelector('.mobile-menu');
const navbar = document.querySelector('.navbar');

mobileMenuButton.addEventListener('click', () => {
    navbar.classList.toggle('active'); // Adiciona/remove a classe 'active' para mostrar/esconder
});

// Opcional: fechar o menu ao clicar em um link
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        }
    });
});


// --- Event Listeners para os filtros ---

// Área de Conhecimento
areaButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' de todos os botões de área
        areaButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona 'active' ao botão clicado
        button.classList.add('active');
        // Não aplica os filtros imediatamente, espera o botão 'Aplicar Filtros'
    });
});

// Modalidade e Tipo de Instituição (checkboxes)
modalityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Não aplica os filtros imediatamente, espera o botão 'Aplicar Filtros'
    });
});

institutionCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Não aplica os filtros imediatamente, espera o botão 'Aplicar Filtros'
    });
});

// Botão "Aplicar Filtros"
applyFiltersButton.addEventListener('click', applyFilters);

// Busca por texto
searchButton.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que a página recarregue
    applyFilters(); // A função applyFilters já incorpora a busca
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        applyFilters();
    }
});


// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o botão 'Todas as áreas' esteja ativo por padrão ao carregar a página
    document.querySelector('.filter-options button.active').classList.add('active');
    updatePaginationAndCourses(); // Renderiza a primeira página e a paginação ao carregar
});