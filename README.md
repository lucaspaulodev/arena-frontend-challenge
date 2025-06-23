# Arena Frontend Challenge

A modern React + TypeScript application inspired by Product Hunt, built with Vite, Apollo Client, and TailwindCSS. This project demonstrates fetching and displaying posts from the Product Hunt GraphQL API, with infinite scrolling, tabbed navigation, and a clean, responsive UI.

---

## Features

- **React 19 + TypeScript**: Modern, type-safe frontend.
- **Vite**: Fast development and build tooling.
- **Apollo Client**: GraphQL data fetching and caching.
- **TailwindCSS**: Utility-first, customizable styling.
- **ShadcnUI**: Accessible, composable UI primitives.
- **Infinite Scrolling**: Efficiently loads more posts as you scroll.
- **Tabbed Navigation**: Switch between "Most Popular" and "Most Recent" posts.
- **Component-based Architecture**: Reusable UI and logic.
- **Testing**: Jest and React Testing Library setup.

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (or npm/yarn)

### Installation

```bash
pnpm install
# or
npm install
```

### Environment Variables

Create a `.env` file in the root with your Product Hunt API token:

```
VITE_PRODUCT_HUNT_TOKEN=your_product_hunt_api_token
```

> Get your token from [Product Hunt API docs](https://api.producthunt.com/v2/docs).

---

## Scripts

- `pnpm dev` – Start the development server
- `pnpm build` – Build for production
- `pnpm preview` – Preview the production build
- `pnpm lint` – Run ESLint

---

## Project Structure

```
src/
  App.tsx                # Main app with tab navigation
  components/
    PostList.tsx         # Infinite scrolling list of posts
    Product.tsx          # Product card component
    ui/                  # Reusable UI primitives (button, tabs)
  graphql/
    apolloClient.ts      # Apollo Client setup
    queries.ts           # GraphQL queries
  hooks/
    usePosts.ts          # Custom hook for fetching posts
  types/
    index.ts             # TypeScript types for data models
  assets/                # Static assets
  lib/                   # Utility functions
```

---

## How It Works

- **Apollo Client** connects to the Product Hunt GraphQL API using a bearer token.
- **Tabs** let users switch between "Most Popular" and "Most Recent" posts.
- **PostList** fetches posts using the `usePosts` hook and displays them with infinite scroll (using `react-window` for performance).
- **ProductCard** shows each product's name, tagline, thumbnail, and vote count.
- **ProductDetail Modal**: Clicking on a product opens a modal displaying detailed information about the selected product.

---

## Testing

- Tests are located in `src/components/__test__/`
- Run tests with:

```bash
pnpm test
# or
npm test
```

---

## Customization

- **Styling**: TailwindCSS is fully configured. Edit `index.css` or use utility classes.
- **GraphQL**: Modify queries in `src/graphql/queries.ts` as needed.
- **UI Components**: Extend or customize components in `src/components/`.

---

## License

This project is for demo purposes as part of the Arena Frontend Challenge.

---
