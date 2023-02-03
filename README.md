# Chewier

Team:

* Adrien Chan
* Alexander McKelvey
* Hutch Rhees
* Lauren Lowe
* Suk Chung

## Overview

A pet food e-commerce site that includes the option to create your own customized pet food formula.

## DESIGN

[API Design](docs/api-design.md)

[GHI](docs/wireframes.md)

## Target Audience

Our target audience is pet owners who are looking for a customizable shopping experience.

## MVP and Functionality

Users can create an account and log into that account. While logged in, they can create and add a pet profile to their account, and they can also complete a form that creates a customized pet food formula and adds it to their cart. Logged in and non-logged in users can browse the site inventory by viewing the entire inventory or applying a filter option that displays a targeted inventory. Additionally, users can utilize a search bar to search for specific items in the inventory and checkout their shopping cart.

## Getting Started

1. Download Docker in terminal
    * MacOS
        ```
        brew install --cask docker
        ```
    * Windows
        ```
        winget install Docker.DockerDesktop
        ```
2. Start Docker application
3. Clone this [repository](https://github.com/sukchung/Chewier.git) to your local computer
4. Run the following commands on your computer
    ```
    docker volume create postgres-data
    docker volume create pg-admin
    docker volume create jwtdown-db-data

    docker-compose build
    docker-compose up
    ```
5. View Swagger UI to test the microservices' backends:
    * Accounts: http://localhost:8080/docs/
    * Inventory: http://localhost:8090/docs/
6. View the web application on your browser: http://localhost:3000/
7. That is it. You are good to go! 🏁
