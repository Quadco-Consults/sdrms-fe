# SDRMS Frontend

This is a Next.js project created with the same folder structure as dgtool_fe.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js App Router pages and routes
├── components/       # Shared components
│   ├── ui/          # UI components (shadcn/ui)
│   ├── auth/        # Auth-related components
│   ├── providers/   # Context providers
│   ├── shared/      # Shared components
│   └── icons/       # Icon components
├── modules/         # Feature-based modules
│   └── [module]/
│       ├── types/
│       ├── components/
│       ├── controllers/
│       ├── data/
│       ├── views/
│       └── lib/
├── hooks/           # Custom React hooks
├── lib/             # Library utilities
├── services/        # API services
├── types/           # Global TypeScript types
├── utils/           # Utility functions
└── constants/       # Constants and configuration
```

## Learn More ###

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
