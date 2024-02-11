<?php
$dbPath = __DIR__ . '/database/food_dataBase.sqlite';
$db = new PDO("sqlite:$dbPath");

// Cria as tabelas
$commands = [
    'CREATE TABLE IF NOT EXISTS Food_Display_Table (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Food_Code INTEGER,
        Display_Name TEXT,
        Portion_Default INTEGER,
        Portion_Amount REAL,
        Portion_Display_Name TEXT,
        Factor Real,
        Increment Real,
        Multiplier Real,
        Grains Real,
        Whole_Grains Real,
        Vegetables Real,
        Orange_Vegetables Real,
        Drkgreen_Vegetables Real,
        Starchy_vegetables Real,
        Other_Vegetables Real,
        Fruits Real,
        Milk Real,
        Meats Real,
        Soy Real,
        Drybeans_Peas Real,
        Oils Real,
        Solid_Fats Real,
        Added_Sugars Real,
        Alcohol Real,
        Calories Real,
        Saturated_Fats Real
    )',
    'CREATE TABLE IF NOT EXISTS lu_Condiment_Food_Table (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        survey_food_code INTEGER,
        display_name TEXT,
        condiment_portion_size TEXT,
        condiment_portion_code INTEGER,
        condiment_grains REAL,
        condiment_whole_grains REAL,
        condiment_vegetables REAL,
        condiment_dkgreen REAL,
        condiment_orange REAL,
        condiment_starchy_vegetables REAL,
        condiment_other_vegetables REAL,
        condiment_fruits REAL,
        condiment_milk REAL,
        condiment_meat REAL,
        condiment_soy REAL,
        condiment_drybeans_peas REAL,
        condiment_oils REAL,
        condiment_solid_fats REAL,
        condiment_added_sugars REAL,
        condiment_alcohol REAL,
        condiment_calories REAL,
        condiment_saturated_fats REAL
        
    )',
    'CREATE TABLE IF NOT EXISTS Foods_Needing_Condiments_Table (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Survey_Food_Code INTEGER,
        display_name TEXT,
        cond_1_code INTEGER NULL,
        cond_1_name TEXT NULL,
        cond_2_code INTEGER NULL,
        cond_2_name TEXT NULL,
        cond_3_code INTEGER NULL,
        cond_3_name TEXT NULL,
        cond_4_code INTEGER NULL,
        cond_4_name TEXT NULL,
        cond_5_code INTEGER NULL,
        cond_5_name TEXT NULL
        
    )'
];

foreach ($commands as $command) {
    $db->exec($command);
}
?>
