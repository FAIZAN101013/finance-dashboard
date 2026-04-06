# Finance Dashboard (Finora)

A clean and interactive finance dashboard built with React, Vite, and Tailwind CSS.

---

## Documentation

This README provides:

* Setup and development instructions
* Overview of the project architecture and approach
* Feature descriptions and how the UI works
* Notes on data persistence and mock data behavior

---

## Features

* Dashboard overview cards for Total Balance, Income, and Expenses
* Charts showing balance trend and spending breakdown
* Sidebar navigation with:
  * Portfolio
  * Activity
  * Banking
  * Insights
  * Vault
* Transactions table with:
  * Search by category
  * Filter by income or expense
  * Admin-only Add / Edit / Delete actions
* Insights section showing category metrics and monthly trends
* Responsive UI optimized for desktop and mobile
* LocalStorage persistence so transactions stay saved across refreshes
* Mock data seeded for balances, categories, and transactions

---

## Tech Stack

* React 19 + Vite
* Tailwind CSS for utility-first styling
* Recharts for chart visualizations
* React Icons for iconography

---

## Roles

* **Viewer** - View-only access to the dashboard data
* **Admin** - Can add, edit, and delete transactions

---

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app at the URL shown in the terminal, usually `http://localhost:5173`

---

## Project Structure

* `src/App.jsx` - Main app entry point
* `src/pages/Dashboard.jsx` - Dashboard page layout and composition
* `src/components/` - Reusable UI components
* `src/data/mockData.js` - Seed data for balances, categories, and transactions
* `src/utils/` - Utility functions for calculations and formatting

---

## Approach

This project was built using a component-driven approach:

* Reusable presentational components for cards, tables, charts, and modals
* Local state managed with React hooks (`useState`, `useEffect`)
* Data flows from mock data into components and is synchronized with `localStorage`
* Responsive layout uses Tailwind classes and mobile-friendly sidebar/menu behavior

---

## Notes

* The app uses `localStorage` to save transactions. If `transactions` already exists in the browser storage, the app will continue loading that data instead of the updated mock dataset.
* To refresh mock data, clear the `transactions` key in browser developer tools under Application → Local Storage.

---

## Future improvements

* Add real backend/API support
* Use global state management for larger data flows
* Add authentication and persistent user settings
