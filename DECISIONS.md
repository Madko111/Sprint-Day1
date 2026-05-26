# Technical Decisions — Stacklet Landing Page

## Technology Stack

### Frontend Framework: React 18 + TypeScript
**Decision:** Use React 18 with TypeScript for type safety and modern React features.

**Reasoning:**
- React is industry standard for building interactive UIs
- TypeScript catches errors at compile time
- Excellent tooling and IDE support
- Large ecosystem of libraries

**Alternatives Considered:**
- Vue.js: Less familiar, smaller ecosystem
- Svelte: Smaller bundle but less mature ecosystem
- Plain JavaScript: No type safety

---

### Build Tool: Vite
**Decision:** Use Vite instead of Create React App or Webpack.

**Reasoning:**
- Extremely fast hot module replacement (HMR)
- Modern ES modules support
- Optimized production builds
- Better developer experience

**Alternatives Considered:**
- Create React App: Slower, deprecated
- Webpack: More complex configuration
- Parcel: Less ecosystem support

---

### Styling: Tailwind CSS v4
**Decision:** Use Tailwind CSS v4 with custom theme configuration.

**Reasoning:**
- Utility-first approach speeds up development
- Consistent design system
- Excellent responsive design utilities
- Custom gradients and colors easy to configure
- No CSS file bloat with purging

**Alternatives Considered:**
- CSS Modules: More boilerplate
- Styled Components: Runtime overhead
- Plain CSS: Harder to maintain consistency

---

### UI Components: shadcn/ui
**Decision:** Use shadcn/ui component library.

**Reasoning:**
- Copy-paste components, not npm dependencies
- Full control over component code
- Built on Radix UI primitives (accessible)
- Tailwind CSS integration
- Easy to customize

**Alternatives Considered:**
- Material UI: Too opinionated, large bundle
- Chakra UI: Runtime CSS-in-JS overhead
- Ant Design: Not modern enough

---

### Backend: Supabase
**Decision:** Use Supabase for database and authentication.

**Reasoning:**
- PostgreSQL database with real-time capabilities
- Built-in Row Level Security (RLS)
- Simple JavaScript client
- Free tier sufficient for MVP
- No backend code needed

**Alternatives Considered:**
- Firebase: NoSQL not ideal for structured data
- Custom Node.js backend: Too much overhead for MVP
- Airtable API: Not production-grade

---

### Deployment: Vercel
**Decision:** Deploy to Vercel instead of other platforms.

**Reasoning:**
- Zero-config deployment for Vite projects
- Automatic HTTPS and CDN
- Environment variables management
- Preview deployments for PRs
- Excellent performance

**Alternatives Considered:**
- Netlify: Similar but less optimized for React
- AWS S3 + CloudFront: Too complex for MVP
- GitHub Pages: No environment variables support

---

## Design Decisions

### Color Scheme: Dark Theme
**Decision:** Use dark background (#0a0e27) with subtle gradients.

**Reasoning:**
- Modern, premium look
- Reduces eye strain
- Makes colors pop
- Common in SaaS products

---

### Gradients: Subtle and Local
**Decision:** Use very subtle gradients (white/5 to transparent) only on cards, not background.

**Reasoning:**
- Adds depth without overwhelming
- Clean background prevents harsh boundaries
- Hover effects add interactivity
- Premium feel without being flashy

---

### Spacing: Generous Whitespace
**Decision:** Use large padding (py-32, px-20) and max-width (1400px).

**Reasoning:**
- Premium design principle
- Improves readability
- Focuses attention on content
- Modern web design trend

---

### Typography: Clear Hierarchy
**Decision:** Large headings (text-6xl) with constrained width (max-w-3xl).

**Reasoning:**
- Clear visual hierarchy
- Optimal line length for reading
- Draws attention to key messages

---

## Security Decisions

### Supabase RLS Policy: Insert-Only
**Decision:** Anonymous users can only insert to waitlist table, no read/update/delete.

**Reasoning:**
- Prevents data leaks
- Users can't see other submissions
- Prevents spam by reading existing emails
- Follows principle of least privilege

---

### Environment Variables: Public Keys Only
**Decision:** Only use VITE_SUPABASE_ANON_KEY, never service role key.

**Reasoning:**
- Anon key is safe to expose in browser
- Service role key would allow bypassing RLS
- Follows Supabase security best practices

---

## Performance Decisions

### Code Splitting: Vite Default
**Decision:** Use Vite's automatic code splitting.

**Reasoning:**
- Smaller initial bundle
- Faster page loads
- Better caching

---

### Image Optimization: None (No Images)
**Decision:** Use icons only, no images.

**Reasoning:**
- Faster load times
- No image optimization needed
- Scalable vector icons
- Smaller bundle size

---

## Development Workflow

### Version Control: Git + GitHub
**Decision:** Use Git with clear commit messages.

**Reasoning:**
- Industry standard
- Easy collaboration
- Vercel auto-deploys from GitHub

---

### Code Quality: TypeScript Strict Mode
**Decision:** Enable strict TypeScript checking.

**Reasoning:**
- Catches bugs early
- Better IDE autocomplete
- Self-documenting code

---

## Trade-offs

### No Backend API
**Pro:** Faster development, no server costs
**Con:** Limited to Supabase features

### No Authentication
**Pro:** Simpler user flow
**Con:** Can't prevent duplicate submissions per user

### No Analytics
**Pro:** Faster page load, no privacy concerns
**Con:** Can't track user behavior

---

## Future Improvements

1. **Add loading states** for better UX during form submission
2. **Add email verification** to prevent fake signups
3. **Add analytics** (Vercel Analytics or Google Analytics)
4. **Add animations** (Framer Motion) for smoother transitions
5. **Add SEO meta tags** for better search visibility
6. **Add favicon** for brand identity
7. **Add error boundary** for graceful error handling

---

**Last Updated:** May 26, 2026
