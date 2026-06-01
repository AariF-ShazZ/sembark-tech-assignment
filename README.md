# Meesho — E-Commerce Web Application

A fully-featured e-commerce web application built as part of a frontend assignment. Users can browse products, filter by categories, view product details, and manage a shopping cart.

---

## Tech Stack

- **React.js** — CRA with TypeScript template
- **TypeScript** — strict mode throughout
- **React Router v6** — all navigation + `useSearchParams` for URL-based filters
- **Context API + useReducer** — cart state management
- **axios** — API data fetching
- **Tailwind CSS** — styling and mobile responsiveness
- **Cypress** — E2E testing
- **localStorage** — cart persistence across sessions

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AariF-ShazZ/sembark-tech-assignment.git
cd sembark-tech-assignment
git checkout aarif
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run E2E tests

```bash
npm run cypress:open    # interactive mode
npm run cypress:run     # headless mode
```

---

## Features Implemented

### Home Page
- Product grid showing name, price and thumbnail for each product
- Filters by category — multiple categories can be selected at once
- Sort by price (low to high / high to low)
- Filters are URL-based using `useSearchParams` — survive page refresh and back button navigation
- Shareable links with filters already applied
- When filters change, data is always re-fetched from the API — never filtered locally

### Product Detail Page
- Dynamic routing at `/product/:id/details`
- Product data fetched from API based on the ID in the URL
- Displays title, description, price and an "Add to Cart" button

### Cart
- Add items from the Product Detail Page
- Remove items or adjust quantity from the Cart Page
- Total cart value and item count shown in the footer on every page
- Cart persisted in `localStorage` — survives page refresh

### Navigation
- Navbar with links to Home and Cart
- Back button on Product Detail Page to return to Home
- React Router v6 handles all routing

### Accessibility
- Semantic HTML elements throughout (`nav`, `main`, `article`, `footer`)
- ARIA roles and labels on interactive elements
- Keyboard navigable product cards (`tabIndex`, `onKeyDown`)
- `aria-live` on cart summary in footer

### Animations (Bonus)
- Staggered `fadeInUp` animation on product cards
- Button state transition when item is added to cart

---

## Folder Structure

src/
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   └── Loader.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   └── CartPage.tsx
├── context/
│   └── CartContext.tsx
├── reducer/
│   └── CartReducer.ts
├── hooks/
│   └── useFetchProducts.ts
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── App.tsx
├── index.tsx