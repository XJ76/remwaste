# REMWaste Skip Hire Frontend Challenge

## Overview
This project is a redesign of the skip hire selection page for REMWaste, focusing on creating a modern and responsive interface while maintaining the core functionality. The implementation uses React as requested in the role requirements.

## Technical Implementation
- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **State Management**: React Context API
- **Type Safety**: TypeScript

## Key Features

### 1. Responsive Design
- Mobile-first approach with responsive breakpoints
- Fluid typography and spacing
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

### 2. Modern UI/UX
- Clean, minimalist design
- Smooth transitions and animations
- Clear visual hierarchy
- Accessible color contrast
- Interactive hover and focus states

### 3. Skip Selection Process
- Step-by-step booking flow
- Real-time price calculations
- Clear skip size comparisons
- Visual representation of skip dimensions
- Detailed skip specifications

## Project Structure
```
src/
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
├── context/           # React context providers
└── pages/             # Page components
```

## Development Approach

### 1. Planning Phase
- Analyzed existing functionality from wewantwaste.co.uk
- Identified key user flows
- Designed component hierarchy
- Planned state management strategy

### 2. Implementation
- Set up project with Vite and TypeScript
- Implemented core components
- Added responsive styling
- Implemented state management

### 3. Testing & Refinement
- Cross-browser testing
- Mobile responsiveness testing
- Performance optimization
- Accessibility improvements

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Design Decisions

### 1. Framework Choice
- Selected React as specified in the role requirements
- Implemented TypeScript for type safety and better developer experience

### 2. Styling Approach
- Used Tailwind CSS for rapid development and consistent styling
- Implemented custom components for complex UI elements
- Created responsive design system

### 3. State Management
- Used React Context for global state
- Implemented local state for component-specific data
- Created custom hooks for reusable logic

## Performance Considerations
- Optimized bundle size
- Implemented code splitting
- Used lazy loading for images
- Optimized re-renders
- Implemented proper caching strategies

## Accessibility
- Semantic HTML structure
- ARIA labels where necessary
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- Progressive enhancement approach

