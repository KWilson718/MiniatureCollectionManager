# Miniature Collection Manager

## Purpose

In the ever-growing collections of Miniature Wargaming enthusiasts, it would be extremely useful for one to be able to document what models are within their collections, as well as different statistics relating to them. 

## Design

This application searches to answer that desire, planning to implement a fast running collection manager with the ability to output many statistics relating to the collection in addition to listing what is present.

# Technologies Used

Currently MCM is using

- Node
- Typescript
- Vite
- Electron
- Vue
- Vuetify
- RxJS (RxDB depends on this)
- RxDB

# Developmental Status

Currently, MCM is in the beginning stages of development. Technologies have been slightly set in place, however much is left in development in general.

## Current Usability Status

- The Database has been seemingly successfully loaded into the application & is holding data
- The Landing page lists out currently existing categories, and links to a page where a category can be created
- The Category Create Page accepts data & pushes it to the Database correctly

## Next on General Developmental Path

- The landing page needs to be updated to be presentable with the provided data implemented
- Being able to edit & delete the data once it has been created would be extremely useful
- Being able to view a specific category will start the preperation for further progression down the chain of the data structure