
<?php

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

function importDataFromXlsx($filePath, $tableName, $db) {
    $reader = new Xlsx();
    $spreadsheet = $reader->load($filePath);
    $sheet = $spreadsheet->getActiveSheet();
    
    // Preparar a query SQL com base no nome da tabela
    if ($tableName == 'Food_Display_Table') {
        $insertQuery = "INSERT INTO $tableName (Food_Code, Display_Name, Portion_Default, Portion_Amount, Portion_Display_Name, Factor, Increment, Multiplier, Grains, Whole_Grains, Vegetables, Orange_Vegetables, Drkgreen_Vegetables, Starchy_vegetables, Other_Vegetables, Fruits, Milk, Meats, Soy, Drybeans_Peas, Oils, Solid_Fats, Added_Sugars, Alcohol, Calories, Saturated_Fats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    } elseif ($tableName == 'lu_Condiment_Food_Table') {
        $insertQuery = "INSERT INTO $tableName (survey_food_code, display_name, condiment_portion_size, condiment_portion_code, condiment_grains, condiment_whole_grains, condiment_vegetables, condiment_dkgreen, condiment_orange, condiment_starchy_vegetables, condiment_other_vegetables, condiment_fruits, condiment_milk, condiment_meat, condiment_soy, condiment_drybeans_peas, condiment_oils, condiment_solid_fats, condiment_added_sugars, condiment_alcohol, condiment_calories, condiment_saturated_fats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    } elseif ($tableName == 'Foods_Needing_Condiments_Table') {
        $insertQuery = "INSERT INTO $tableName (Survey_Food_Code, display_name, cond_1_code, cond_1_name, cond_2_code, cond_2_name, cond_3_code, cond_3_name, cond_4_code, cond_4_name, cond_5_code, cond_5_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    }

    $stmt = $db->prepare($insertQuery);

    // Inserir dados na tabela
    foreach ($sheet->getRowIterator(2) as $row) {
        $cellIterator = $row->getCellIterator();
        $cellIterator->setIterateOnlyExistingCells(false); // Importante para células vazias
        $rowData = [];
        foreach ($cellIterator as $cell) {
            $rowData[] = $cell->getValue();
        }
        
        // Executar a query para cada linha do arquivo .xlsx
        $stmt->execute($rowData);
    }
}

$dbPath = __DIR__ . '/database/food_dataBase.sqlite';
$db = new PDO("sqlite:$dbPath");

// Substitua 'caminho_para_seu_arquivo.xlsx' pelo caminho real do arquivo e 'TableName' pelo nome da tabela
importDataFromXlsx('food_data/Food_Display_Table.xlsx', 'Food_Display_Table', $db);
importDataFromXlsx('food_data/lu_Condiment_Food_Table.xlsx', 'lu_Condiment_Food_Table', $db);
importDataFromXlsx('food_data/Foods_Needing_Condiments_Table.xlsx', 'Foods_Needing_Condiments_Table', $db);

?>
