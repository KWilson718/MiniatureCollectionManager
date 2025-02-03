# Miniature Collection Manager

Miniature Collection Manager aims to organize and display information about a hobbyist's wargaming collection of miniatures

## Organized Relational Storage for Hobbyist Miniature Collections for Wargaming Miniatures

- Store data pertaining to the condition of miniatures in your collection
  - Organize by Brand, Game, Faction, etc
- Read statistics about how many models you have
  - Ratios regarding how many are built & painted

## Progress Made

Miniature Collection Manager has full operation for Miniatures, as one can create all the parent objects to filter down to specific miniatures, as well as full Create, Read, Update, and Delete functionality on each miniature. The same is true for Factions, which is a milestone since it sets off deletion of children objects as well.

Currently, edit and delete functionality will be carried out to each form of entity within the data model (game and brand), in order to allow for the most basic viability of this project.

Once that has been done, there will likely be some rulesets placed on each field, as to prevent harmful data from being injected into them.

After that, work will be done to progress statistical readouts for the end user, in order to see what information can be extracted and displayed for a further understanding of an at scale collection.

Once all of those items have been completed, MCM will have reached its Minimally Viable Product, and production will slow as a few more ideas eventually get thrown at it, however it will be done with planned features. 

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