# Miniature Collection Manager

Miniature Collection Manager aims to organize and display information about a hobbyist's wargaming collection of miniatures

## Organized Relational Storage for Hobbyist Miniature Collections for Wargaming Miniatures

- Store data pertaining to the condition of miniatures in your collection
  - Organize by Brand, Game, Faction, etc
- Read statistics about how many models you have
  - Ratios regarding how many are built & painted

# Technical Specifics

Miniature Collection Manager is an example of a simple CRUD Application to further grow upon my learning experience

## Data Model

Brands, Games, Factions, and Miniatures are all different SQL Tables, in order to promote a form of normalization, as well as ease of access of details

Most data is stored in a miniature data row, but chains up using foreign keys

## Technologies Used

- NPM
- React using NextJS
- Material UI
- MUI - X for DataGrid
- SQLite