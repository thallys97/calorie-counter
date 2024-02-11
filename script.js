
  document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const foodSearch = document.getElementById('food-search');
    const resultsPanel = document.getElementById('results-panel'); // You need to add this to HTML

    searchBtn.addEventListener('click', function() {
      const searchTerm = foodSearch.value.trim();
      if (searchTerm.length === 0) {
        alert('Please enter a search term.');
        return;
      }

      // Send an AJAX request to the PHP script
      fetch('search.php?search=' + encodeURIComponent(searchTerm))
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            // Clear existing results
            resultsPanel.innerHTML = '';
            // Update the UI with the search results
            data.forEach(item => {
              const resultItem = document.createElement('div');
              resultItem.textContent = `${item.Display_Name} - Portion: ${item.Portion_Amount} ${item.Portion_Display_Name}; Calories: ${item.Calories}`;
              resultsPanel.appendChild(resultItem);
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });

    // Clear button functionality
    const clearBtn = document.getElementById('clear-btn'); // You need to add this to HTML
    clearBtn.addEventListener('click', function() {
      foodSearch.value = '';
      resultsPanel.innerHTML = '';
    });
  });

