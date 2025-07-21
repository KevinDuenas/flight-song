# Kevin's Flight - Landing Page

A beautiful landing page showcasing the indie folk song "Kevin's Flight" - the story of a software engineer with vertigo who dreams of flying.

## Features

- 🎵 Custom audio player with full playback controls
- 📝 Structured lyrics display with verse/chorus formatting  
- 🎨 Beautiful indie folk-inspired design
- 📱 Fully responsive layout
- ⚡ Fast loading with optimized assets
- 🎧 Audio streaming from Google Drive

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui components
- TanStack Query for data fetching

**Backend:**
- Express.js with TypeScript
- In-memory data storage
- Audio proxy for CORS handling
- RESTful API design

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:5000
   ```

## Deployment

### Deploy to Vercel

1. **Quick Deploy:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Or connect GitHub:**
   - Push to GitHub repository
   - Connect to Vercel dashboard
   - Auto-deploy on push

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

### Deploy to Other Platforms

**Build for production:**
```bash
npm run build
npm start
```

The app will be built to `dist/` with:
- `dist/public/` - Static frontend files
- `dist/index.js` - Server bundle

## Song Information

**Title:** Kevin's Flight  
**Style:** Upbeat indie folk-pop with witty storytelling  
**Duration:** 3:42  
**Theme:** The story of Kevin, a software engineer from Laredo who works at Avero, loves sushi, and despite having vertigo, dreams of becoming a pilot.

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   └── lib/        # Utilities
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data layer
├── shared/          # Shared types
└── dist/           # Build output
```

## License

MIT License - Feel free to use this project as inspiration for your own landing pages!

---

*"Vertigo can't stop this coding guy from learning how to fly"* 🎵