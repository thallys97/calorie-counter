<?php
function convertXmlToJson($xmlFilePath) {
    $xmlContent = simplexml_load_file($xmlFilePath);
    if ($xmlContent === false) {
        // Handle the error appropriately
        die('Error loading XML file.');
    }

    $jsonContent = json_encode($xmlContent);
    return json_decode($jsonContent, true);
}

function normalizeData($allFoodData) {
    $normalizedData = [];
    foreach ($allFoodData as $data) {
        foreach ($data as $key => $value) {
            // Normalize and extract the relevant pieces of information
            $foodItem = [
                'food_description' => $value['Display_Name'] ?? $value['display_name'] ?? null,
                // ... add other relevant fields
            ];
            if ($foodItem['food_description']) {
                $normalizedData[] = $foodItem;
            }
        }
    }
    return $normalizedData;
}

$xmlFilesPath = __DIR__ . '/food_data/';
$allFoodData = [];

foreach (glob($xmlFilesPath . "*.xml") as $xmlFile) {
    $foodData = convertXmlToJson($xmlFile);
    // Merge while preserving keys
    $allFoodData = array_merge_recursive($allFoodData, $foodData);
}

$normalizedData = normalizeData($allFoodData);




// Search function to find matching food items
function searchFoodItems($data, $searchTerm) {
    $results = [];
    $searchTerm = strtolower($searchTerm);
    foreach ($data as $item) {
        if (strpos(strtolower($item['food_description']), $searchTerm) !== false) {
            $results[] = $item;
        }
    }
    return $results;
}

// Handle the AJAX request
$searchTerm = $_GET['search'] ?? '';
if (!empty($searchTerm)) {
    $foundItems = searchFoodItems($normalizedData, $searchTerm);

     // Consider adding HTTP response codes for better error handling
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
