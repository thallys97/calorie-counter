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
            resultItem.textContent = `${item.Display_Name} - Portion: ${item.Portion_Amount} ${item.Portion_Display_Name}; Calories: ${item.Calories}`;
            resultsPanel.appendChild(resultItem);
        });

        // Atualiza o contador de itens mostrados
        itemsShownCount += itemsToShow.length;

        // Exibe o botão Load More se ainda houver mais itens para mostrar
        if (itemsShownCount < filteredItems.length) {
            loadMoreBtn.classList.remove('hidden');
        } else {
            loadMoreBtn.classList.add('hidden');
        }
    }

    searchBtn.addEventListener('click', function() {
        const searchTerm = foodSearch.value.trim().toLowerCase();
        warningMessage.textContent = '';
        itemsShownCount = 0; // Reseta o contador de itens mostrados

        if (searchTerm.length === 0) {
            warningMessage.textContent = 'Please enter a search term.';
            return;
        }

        currentFilteredItems = allFoodItems.filter(item => item.Display_Name.toLowerCase().includes(searchTerm));

        if (currentFilteredItems.length === 0) {
            warningMessage.textContent = 'No matches found.';
        } else {
            showResults(currentFilteredItems);
        }
    });

    // Adiciona funcionalidade ao botão Load More
    loadMoreBtn.addEventListener('click', function() {
        showResults(currentFilteredItems);
    });

    // Clear button functionality
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', function() {
        foodSearch.value = '';
        resultsPanel.innerHTML = '';
        warningMessage.textContent = '';
        loadMoreBtn.classList.add('hidden');
        itemsShownCount = 0; // Reseta o contador de itens mostrados
    });
});
