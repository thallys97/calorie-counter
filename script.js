document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const foodSearch = document.getElementById('food-search');
    const resultsPanel = document.getElementById('results-panel');
    const warningMessage = document.getElementById('warning-message'); // Referência ao elemento da mensagem de aviso
    let allFoodItems = [];
  
    // Carrega todos os itens de comida na inicialização
    fetch('search.php')
        .then(response => response.json())
        .then(data => {
            allFoodItems = data; // Armazena os dados para uso futuro
        })
        .catch(error => {
            console.error('Error loading food items:', error);
        });
  
    searchBtn.addEventListener('click', function() {
        const searchTerm = foodSearch.value.trim().toLowerCase();
        warningMessage.textContent = ''; // Limpa a mensagem de aviso anterior
  
        if (searchTerm.length === 0) {
            warningMessage.textContent = 'Please enter a search term.';
            return;
        }
  
        // Filtra os itens localmente
        const filteredItems = allFoodItems.filter(item => 
            item.Display_Name.toLowerCase().includes(searchTerm)
        );
  
        // Atualiza a UI com os resultados filtrados
        resultsPanel.innerHTML = '';
        if (filteredItems.length === 0) {
            warningMessage.textContent = 'No matches found.';
        } else {
            filteredItems.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.textContent = `${item.Display_Name} - Portion: ${item.Portion_Amount} ${item.Portion_Display_Name}; Calories: ${item.Calories}`;
                resultsPanel.appendChild(resultItem);
            });
        }
    });
  
    // Clear button functionality
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', function() {
        foodSearch.value = '';
        resultsPanel.innerHTML = '';
        warningMessage.textContent = ''; // Limpa a mensagem de aviso ao limpar
    });
  });
  