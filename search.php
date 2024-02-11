<?php

$dbPath = __DIR__ . '/database/food_dataBase.sqlite';
$db = new PDO("sqlite:$dbPath");

// Função para buscar itens de comida correspondentes ao termo de pesquisa
function searchFoodItems($db, $searchTerm) {
    $query = "SELECT * FROM Food_Display_Table WHERE Display_Name LIKE :searchTerm";
    $stmt = $db->prepare($query);
    // Usando o operador LIKE para busca parcial, % indica qualquer sequência de caracteres
    $stmt->execute([':searchTerm' => '%' . $searchTerm . '%']);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $results;
}

// Handle the AJAX request
$searchTerm = $_GET['search'] ?? '';
if (!empty($searchTerm)) {
    $foundItems = searchFoodItems($db, $searchTerm);

    if (empty($foundItems)) {
        http_response_code(404);
        echo json_encode(['error' => 'No matches found.']);
    } else {
        echo json_encode($foundItems);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No search terms were entered.']);
}

?>

