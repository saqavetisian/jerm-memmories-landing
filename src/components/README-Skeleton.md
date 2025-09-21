# Skeleton Loader Components

A collection of cool skeleton animation components for loading states throughout the application.

## Components

### Basic Skeleton Loader (`SkeletonLoader.tsx`)

The main skeleton component with multiple variants and customization options.

```tsx
import { SkeletonLoader } from './SkeletonLoader';

// Basic usage
<SkeletonLoader variant="rect" width="100%" height="40px" />

// With animation disabled
<SkeletonLoader variant="circle" width="60px" height="60px" animated={false} />

// Multiple items
<SkeletonLoader variant="text" count={3} />
```

**Props:**
- `variant`: 'card' | 'list' | 'text' | 'circle' | 'rect'
- `width`: string | number
- `height`: string | number
- `className`: string
- `count`: number (for multiple items)
- `animated`: boolean (default: true)

### Specialized Components

#### BouquetCardSkeleton
Perfect skeleton for bouquet cards with image, title, description, and button placeholders.

```tsx
import { BouquetCardSkeleton } from './SkeletonLoader';

<BouquetCardSkeleton />
```

#### BouquetListSkeleton
Grid of bouquet card skeletons for listing pages.

```tsx
import { BouquetListSkeleton } from './SkeletonLoader';

<BouquetListSkeleton count={6} />
```

#### FilterSkeleton
Complete filter component skeleton with header, controls, and buttons.

```tsx
import { FilterSkeleton } from './SkeletonLoader';

<FilterSkeleton />
```

#### TextSkeleton
Multiple lines of text skeleton.

```tsx
import { TextSkeleton } from './SkeletonLoader';

<TextSkeleton lines={3} />
```

#### TableSkeleton
Table structure skeleton with configurable rows and columns.

```tsx
import { TableSkeleton } from './SkeletonLoader';

<TableSkeleton rows={5} columns={4} />
```

### Page Section Skeletons (`PageSkeleton.tsx`)

#### HeroSkeleton
Full hero section skeleton with floating elements animation.

#### AboutSectionSkeleton
About section with content and image placeholders.

#### ServicesSectionSkeleton
Services grid skeleton with icons and descriptions.

#### DownloadSectionSkeleton
Download section with CTA buttons.

#### FullPageSkeleton
Complete page skeleton combining all sections.

### Mobile Components

#### MobileFilterSkeleton (`MobileFilterSkeleton.tsx`)
Mobile filter drawer skeleton with bottom sheet design.

## Usage Examples

### Loading States
```tsx
// In BouquetsSection.tsx
if (loading) return <BouquetListSkeleton count={4} />;

// In BouquetsClient.tsx
{loading && bouquets.length === 0 && (
  <BouquetListSkeleton count={12} />
)}

// In main page
if (isPageLoading) {
  return <FullPageSkeleton />;
}
```

### Filter Loading
```tsx
{loading && bouquets.length === 0 ? (
  <FilterSkeleton />
) : (
  <BouquetsFilter {...props} />
)}
```

## Features

- ✨ Smooth animations with Framer Motion
- 🎨 Multiple variants for different use cases
- 📱 Mobile-optimized components
- 🎯 Customizable dimensions and styling
- ⚡ Performance optimized
- 🌈 Gradient shimmer effects
- 📐 Responsive design

## Animation Details

- **Shimmer Effect**: Gradient overlay that moves across skeleton elements
- **Staggered Loading**: Multiple items animate in sequence
- **Smooth Transitions**: Fade in/out with scale effects
- **Hover Effects**: Interactive elements respond to user interaction

## Customization

All skeleton components accept standard Tailwind CSS classes and can be styled to match your design system.

```tsx
<SkeletonLoader 
  variant="card" 
  className="bg-blue-100 rounded-xl" 
  width="300px" 
  height="200px" 
/>
```
