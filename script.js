document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const foodSearch = document.getElementById('food-search');
    const resultsPanel = document.getElementById('results-panel');
    const warningMessage = document.getElementById('warning-message');
    const loadMoreBtn = document.getElementById('load-more-btn'); // Referência ao botão Load More
    let allFoodItems = [];
    let currentFilteredItems = []; // Armazena os itens filtrados atualmente
    let itemsShownCount = 0; // Contador para itens já mostrados

    // Carrega todos os itens de comida na inicialização
    fetch('search.php')
        .then(response => response.json())
        .then(data => {
            allFoodItems = data;
        })
        .catch(error => {
            console.error('Error loading food items:', error);
        });

        function showResults(filteredItems) {
            // Limpa os resultados anteriores e esconde o botão Load More
            if (itemsShownCount === 0) {
                resultsPanel.innerHTML = '';
                loadMoreBtn.classList.add('hidden');
            }
        
            // Determina quantos itens devem ser mostrados nesta iteração
            let itemsToShow = filteredItems.slice(itemsShownCount, itemsShownCount + 25);
            itemsToShow.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'mb-2'; // Adiciona uma margem na parte inferior de cada item
                resultItem.textContent = `${item.Display_Name} - Portion: ${item.Portion_Amount} ${item.Portion_Display_Name}; Calories: ${item.Calories}`;
                resultsPanel.appendChild(resultItem);
            });
        
            // Atualiza o contador de itens mostrados
            itemsShownCount += itemsToShow.length;
        
            // Atualiza a contagem de resultados acima do painel de resultados
            const resultsCount = document.getElementById('results-count');
            resultsCount.textContent = `Showing ${itemsShownCount} of ${currentFilteredItems.length} results`;
        
            // Exibe o botão Load More se ainda houver mais itens para mostrar
            if (itemsShownCount < filteredItems.length) {
                loadMoreBtn.classList.remove('hidden');
            } else {
                loadMoreBtn.classList.add('hidden');
            }
        }
        

    searchBtn.addEventListener('click', function() {
        let searchTerm = foodSearch.value.trim().toLowerCase();
        warningMessage.textContent = '';
        itemsShownCount = 0; // Reseta o contador de itens mostrados

        if (searchTerm.length === 0) {
            warningMessage.textContent = 'Please enter a search term.';
            return;
        }

        // Converte wildcard characters para regex, incluindo a alternância '|'
        searchTerm = searchTerm.replace(/\*/g, '.*').replace(/\?/g, '.').replace(/\|/g, '|');

        // Verifica se a entrada é segura para evitar expressões regulares complexas
        if (isSearchTermSafe(searchTerm)) {
            // Cria uma expressão regular a partir do termo de busca
            const searchRegex = new RegExp(searchTerm, 'i'); // 'i' para case-insensitive

            // Filtra os itens usando a expressão regular
            currentFilteredItems = allFoodItems.filter(item => searchRegex.test(item.Display_Name.toLowerCase()));

            if (currentFilteredItems.length === 0) {
                warningMessage.textContent = 'No matches found.';
            } else {
                showResults(currentFilteredItems);
            }
        } else {
            warningMessage.textContent = 'Invalid search term.';
        }
    });


     // Implemente esta função para verificar a segurança do termo de busca
     function isSearchTermSafe(term) {
        // Exemplo simples de verificação: limita o comprimento da entrada
        // e verifica caracteres ou padrões específicos que você deseja excluir
        return term.length <= 100; // Ajuste conforme necessário
    }


    // Adiciona funcionalidade ao botão Load More
    loadMoreBtn.addEventListener('click', function() {
        const lastItem = resultsPanel.lastElementChild;
        showResults(currentFilteredItems);
    
        // Rola suavemente para o último item visível antes de carregar mais
        if (lastItem) {
            lastItem.scrollIntoView({ behavior: "smooth" });
        }
    });

    // Clear button functionality
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', function() {
        foodSearch.value = '';
        resultsPanel.innerHTML = '';
        warningMessage.textContent = '';
        loadMoreBtn.classList.add('hidden');
        itemsShownCount = 0; // Reseta o contador de itens mostrados
        document.getElementById('results-count').textContent = ''; // Limpa a contagem de resultados
    });
    
});
