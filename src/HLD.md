# PawConnect — High-Level Design (HLD)

## 1. Project Overview

PawConnect is an animal adoption and shelter support application built using React.

This document describes the application's state-management architecture, focusing on Context API, Redux Toolkit, and local component state.

## 2. State Management Architecture

PawConnect uses three approaches to manage state:

- Context API for shared pet favorites.
- Redux Toolkit for centralized shelter records.
- React `useState` for component-specific UI state.

## 3. Context API

The existing `FavoritesContext` manages the user's favorite pets.

### Implementation

- `FavoritesProvider` provides the favorites state to its child components.
- `useState` stores the list of favorite pet IDs.
- `toggleFavorite` adds a pet ID to favorites or removes it if already present.
- `useFavorites` accesses the context and throws an error if used outside `FavoritesProvider`.

### State Classification

Favorites are shared state because multiple components can access and update them through the Context API.

The existing `FavoritesContext` is retained rather than migrated to Redux.

## 4. Redux Toolkit

Redux Toolkit manages the shelter records used by the `ShelterList` page.

### Store

The Redux store is configured using `configureStore` in `src/redux/store.js`.

The shelter reducer is registered under the `shelters` key.

### Shelter Slice

The shelter slice is located at `src/redux/slices/shelterSlice.js`.

It manages the following state:

- `list`: shelter records.
- `loading`: loading status.
- `error`: error information.

### Actions

- `addShelter` adds a shelter record to the Redux state.
- `removeShelter` removes a shelter by ID from the Redux state.
- `fetchShelters` is an asynchronous thunk that requests shelter data from `/shelter.json`.

### Selectors

The shelter slice provides selectors to access Redux state:

- `selectShelters` reads the shelter list.
- `selectShelterLoading` reads the loading status.
- `selectShelterError` reads the error information.

The `ShelterList` component uses `useSelector` to access these values and `useDispatch` to dispatch actions.

### Async Data Flow

1. The `ShelterList` component dispatches `fetchShelters` when it mounts.
2. `fetchShelters` requests data from `/shelter.json`.
3. The pending reducer sets `loading` to `true` and clears the previous error.
4. The fulfilled reducer stores the fetched shelter records and sets `loading` to `false`.
5. If the request fails, the rejected reducer stores an error message and sets `loading` to `false`.
6. The component displays the loading message, error message, or shelter records based on the Redux state.

The shelter data is stored in `public/shelter.json` and served as a static JSON asset by Vite.

### Dispatch Flow for Removing a Shelter

1. The user clicks **Remove Shelter**.
2. The component dispatches `removeShelter` with the shelter ID.
3. The reducer updates the shelter list in Redux state.
4. Redux publishes the updated state.
5. `useSelector` provides the updated list to the component.
6. React re-renders the shelter cards.

The removal currently affects the in-memory Redux state. A subsequent fetch or page refresh reloads the original records from the JSON file.

## 5. Local Component State

Local state is used for temporary UI interactions.

Examples:

- `ShelterList` uses `useState` to track the selected shelter.
- `ShelterDashboard` uses `useState` for component-specific medical reminder interactions.

These states remain local because they control component-specific UI behaviour.

## 6. State Architecture Diagram

### Redux State Flow

User Interaction or Component Mount  
↓  
React Component  
↓  
Dispatch Redux Action or Async Thunk  
↓  
Shelter Slice Reducer  
↓  
Redux Store  
↓  
`useSelector`  
↓  
Updated Shelter List UI

### Context API Flow

`FavoritesProvider`  
↓  
`FavoritesContext`  
↓  
`useFavorites`  
↓  
Components Accessing or Updating Favorites

## 7. Design Decisions

- Context API is retained for the existing favorites functionality.
- Redux Toolkit is used for centralized shelter record management.
- `createAsyncThunk` handles asynchronous shelter data fetching.
- Loading and error states provide feedback during data fetching.
- Local state is used for temporary UI interactions.
- The entire application is not migrated to Redux.
- Existing shelter dashboard styling and rehabilitation visualizations are preserved.

## 8. Current Limitations and Future Work

- Shelter records are loaded from a static JSON file rather than a production backend.
- Adding or removing shelters updates the Redux state but does not persist changes to the JSON file or a database.
- Refreshing the page reloads the original shelter records.
- A backend API and database can be integrated in the future for persistent shelter management.
- Additional selectors and actions can be introduced as shelter management requirements grow.

## 9. Conclusion

PawConnect demonstrates the use of Context API, Redux Toolkit, asynchronous data fetching, and local React state for different state-management requirements.

This approach keeps shared favorites, shelter records, and temporary UI state organized without requiring a complete application migration.
