# Modules

This directory contains feature-based modules. Each module should follow this structure:

```
moduleName/
├── types/          # TypeScript type definitions for this module
├── components/     # Module-specific components
├── controllers/    # API controllers and data fetching logic
├── data/          # Static data, constants, mock data
├── views/         # Page-level components
└── lib/           # Module-specific utilities and helpers
```

## Example Module Structure

```
auth/
├── types/
│   └── index.ts
├── components/
│   ├── LoginForm.tsx
│   └── SignupForm.tsx
├── controllers/
│   └── authController.ts
├── data/
│   └── constants.ts
├── views/
│   └── LoginView.tsx
└── lib/
    └── helpers.ts
```

## Best Practices

1. Keep modules self-contained and independent
2. Export public APIs through index files
3. Use the module's types folder for module-specific TypeScript definitions
4. Place shared types in the global `src/types` directory
5. Controllers should handle all API interactions for the module
6. Views are page-level components that compose smaller components
