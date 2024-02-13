# Calorie Counter App

## Introduction

The Calorie Counter App is designed to assist users in managing their dietary needs by providing calorie counts for various food items. By leveraging the U.S. Department of Agriculture MyPyramid Food Raw Data, the app offers an intuitive interface for users to search for food types and obtain corresponding calorie information. This project not only serves as a practical tool for individuals focusing on diet and weight management but also offers developers experience in manipulating and transforming raw data for enhanced usability.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Video](#video)
- [Screenshots](#screenshots)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Installation

To set up the Calorie Counter App on your system, follow these detailed steps:

### Prerequisites

Ensure you have PHP and Composer installed on your system. PHP is required for running the server and executing the scripts, while Composer is necessary for managing the PHP dependencies.

PHP 8.1 was used to develop this application

### Steps

1. **Clone the Repository**: Clone the project repository to your local machine using `git clone <repository-url>`.
2. **Install PHP Dependencies**: Navigate to the project directory and run `composer install` to install the required PHP packages.
3. **Database Setup**:
   - Create a new directory named `database` in the root directory of the project if it does not already exist.
   - Inside the `database` directory, create a new SQLite database file named `food_dataBase.sqlite`. 
4. **Create Database Tables**: Execute the `create-tables.php` script to create the necessary tables in the database. This can be done by running `php create-tables.php` from the root directory of the project.
5. **Import Data**: Run the `insert-data.php` script to import data from the .xlsx files into the database tables. Execute this by running `php insert-data.php`.

### Start the Server

After completing the installation and database setup, you can start the app by running the PHP built-in server:

- Open a terminal, navigate to the root directory of the project, and run: `php -S localhost:8000`.
- Open your web browser and visit `http://localhost:8000` to access the Calorie Counter App.


## Usage

To use the Calorie Counter App, follow these steps after installation:

1. Use the food description input box to search for specific food items. You can also use wildcard characters for broader searches, like `*` for any string of characters, `?` for a single character, or `|` to separate multiple search terms.
2. The app will display calorie information in the results panel based on your search criteria.



## Features

- **Food Search**: Users can search for food items to find their calorie counts.
- **Json File**: Json file containing all the food items to be searched is loaded when the app is started.
- **Warning Messages**: Alerts users when no search terms are entered or no matches are found.
- **Results Panel**: Displays matching food items, portion sizes, and calories in a scrollable list limited to 25 entries.
- **Wildcard Support**: Enhances search functionality by allowing the use of wildcard characters.
- **Clear Button**: User can click on the 'Clear' button to clear the search terms and results list.
- **Load More Button**: User can see more than 25 entries from a search by clicking a Load More button to add more matching food items to the search results list.


## Video

- **Click on the image below to be redirected to Youtube and see a video demonstration of the calorie counting app's features**:

[![Calorie Counting App Demonstration](https://i.imgur.com/5tj89BS.png)](http://www.youtube.com/watch?v=jnPGSzirA7M "Calorie Counting App Demonstration")


## Screenshots

- **Calorie counting app before food search**:
![calorie counting app before food search](https://i.imgur.com/5tj89BS.png)
- **Calorie counting app after food search**:
![calorie counting app after food search](https://i.imgur.com/h3f5I6X.png)
- **Calorie counting app on mobile device screen**: 
<br/>
![calorie counting app on mobile device screen](https://i.imgur.com/Trdxcu4.png)



## Dependencies

- [phpoffice/phpspreadsheet](https://packagist.org/packages/phpoffice/phpspreadsheet) for handling Excel files.


## Documentation

For detailed documentation on the APIs and libraries used, refer to:

- [PHP Documentation](https://www.php.net/docs.php)
- [PhpSpreadsheet Documentation](https://phpspreadsheet.readthedocs.io/en/latest/)


## Troubleshooting

If you encounter any issues with loading data or searching for food items, ensure the database file is correctly located and accessible by the PHP scripts. Check server logs for any PHP errors that might indicate misconfigurations or missing files.

## Contributors

This project is open for contributions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
