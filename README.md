# Watchlist (quasar-watchlist)

A Quasar Project for tracking stocks in a personal watchlist.

## Application Overview

This application allows users to create and manage a personal stock watchlist with the following features:

- **View all watchlist items**: See your tracked stocks in a clean, organized list
- **Add new stocks**: Easily add stocks to your watchlist with symbol, company name, and notes
- **Remove stocks**: Delete stocks you no longer want to track
- **Responsive design**: Works well on both desktop and mobile devices

## Technical Stack

- **Frontend Framework**: Vue 3 with Quasar v2
- **State Management**: Pinia
- **Routing**: Vue Router
- **TypeScript**: Fully typed for better development experience
- **Notifications**: Quasar Notify plugin

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

## Project Structure

The application follows a standard Quasar project structure with these key components:

- **Pages**: Main view components (WatchlistPage, CreateWatchlistItem)
- **Stores**: Pinia store for state management
- **Services**: API service for backend communication
- **Layouts**: Main application layout

## API Integration

The application connects to a backend API with the following endpoints:

- `GET /watchlist` - Fetch all watchlist items
- `POST /watchlist` - Create a new watchlist item
- `DELETE /watchlist/:symbol` - Remove a watchlist item

## Data Model

Each watchlist item includes:

- `id`: Unique identifier (backend-generated)
- `user_id`: Owner's user ID (backend-generated)
- `symbol`: Stock ticker symbol
- `company_name`: Full company name
- `notes`: Personal notes about the stock
- `created_at`: Timestamp when the item was added
