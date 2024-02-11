<?php

$dbPath = __DIR__ . '/database/food_dataBase.sqlite';
$db = new PDO("sqlite:$dbPath");

// Função para buscar todos os itens de comida e gerar um JSON
function fetchAllFoodItems($db) {
    $query = "SELECT * FROM Food_Display_Table";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $results;
}

$allFoodItems = fetchAllFoodItems($db);

// Gera o JSON com todos os alimentos
header('Content-Type: application/json');
echo json_encode($allFoodItems);


