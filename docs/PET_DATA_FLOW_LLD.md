
# Pet Management Module – Low-Level Design (LLD)

## 1. Project Overview

The Pet Management module allows users to view,
search, filter and manage pet information.

The existing module contains:
- Pet Listings
- Pet Cards
- Pet Details
- Search and Filtering
- Existing Mock Pet Data

A REST API feature is integrated without replacing
the existing pet data or changing the current UI.

## 2. Technology Used

- React.js
- JavaScript
- REST API
- Fetch API
- React Hooks (useState, useEffect, useRef)
- Dog CEO Public API

## 3. API Integration

API Provider: Dog CEO API

API Endpoint:

GET https://dog.ceo/api/breeds/image/random/6

Purpose:

Fetch random dog images from the public REST API.

The API returns image URLs which are displayed
in the pet discovery feature.

No API key is required.

## 4. File Structure

src/
|
|-- components/
|   |-- pets/
|       |-- PetCard.jsx
|       |-- PetList.jsx
|       |-- PetDetails.jsx
|
|-- services/
|   |-- petApi.js
|
|-- pages/
|   |-- pets/
|       |-- PetHome.jsx
|
|-- data/
|   |-- petData.js

docs/
|
|-- PET_DATA_FLOW_LLD.md

## 5. API Service Layer

The petApi.js file contains reusable API functions.

Responsibilities:

- Send HTTP GET requests.
- Handle network errors.
- Handle HTTP errors.
- Validate API responses.
- Return JSON data.
- Support request cancellation using AbortController.

## 6. Data Flow

1. User opens the Pet Management page.
2. PetHome.jsx renders the existing pet listing.
3. The API discovery feature starts loading.
4. DogDiscovery component calls fetchRandomDogImages().
5. petApi.js sends a GET request to the REST API.
6. The API returns dog image URLs.
7. React state stores the returned image URLs.
8. The UI displays the API results.

## 7. Loading and Error Handling

The application supports the following states:

Loading State:
Displays a loading message while fetching data.

Success State:
Displays dog images returned by the API.

Empty State:
Displays a message when no images are available.

Error State:
Displays a readable error message if the API
request fails.

Retry:
Users can refresh and retry the API request.

## 8. useRef Implementation

The useRef hook is used to focus the existing
pet search input.

When the user clicks the Focus Search button,
the search input receives focus.

This improves the search experience without
changing the existing search functionality.

## 9. Existing Pet Data Management

The existing petData.js file remains unchanged.

Existing functionality includes:

- Pet listings
- Pet cards
- Pet details
- Search functionality
- Category filters
- Favourite pets
- Add pet functionality

The REST API feature does not replace
the existing mock pet records.

## 10. Error Handling and API Safety

- Network errors are handled gracefully.
- HTTP errors are checked using response.ok.
- Invalid JSON responses are handled.
- Empty API responses are handled.
- API requests are cancelled when the component
  unmounts.
- Existing pet data remains available if the
  API request fails.

## 11. Future Enhancements

Future backend integration can support:

- GET /api/pets
- GET /api/pets/:id
- POST /api/pets
- PUT /api/pets/:id
- DELETE /api/pets/:id

These endpoints can be used for complete
pet record management with a backend database.

## 12. Conclusion

The Pet Management module now supports an
additional REST API integration.

Reusable API services, asynchronous loading,
error handling and useRef functionality improve
the module while preserving the existing UI
and pet management functionality.
