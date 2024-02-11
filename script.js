document.addEventListener('DOMContentLoaded', function() {
  const searchBtn = document.getElementById('search-btn');
  const foodSearch = document.getElementById('food-search');
  const resultsPanel = document.getElementById('results-panel');
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
      if (searchTerm.length === 0) {
          alert('Please enter a search term.');
          return;
      }

      // Filtra os itens localmente
      const filteredItems = allFoodItems.filter(item => 
          item.Display_Name.toLowerCase().includes(searchTerm)
      );

      // Atualiza a UI com os resultados filtrados
      resultsPanel.innerHTML = '';
      filteredItems.forEach(item => {
          const resultItem = document.createElement('div');
          resultItem.textContent = `${item.Display_Name} - Portion: ${item.Portion_Amount} ${item.Portion_Display_Name}; Calories: ${item.Calories}`;
          resultsPanel.appendChild(resultItem);
      });

      if (filteredItems.length === 0) {
          alert('No matches found.');
      }
  });

  // Clear button functionality
  const clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', function() {
      foodSearch.value = '';
      resultsPanel.innerHTML = '';
  });
});


