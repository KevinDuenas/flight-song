# Deploying Kevin's Flight to Vercel

This guide will help you deploy your Kevin's Flight landing page to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Google Drive File**: Ensure your MP3 file is publicly accessible

## Step-by-Step Deployment

### 1. Prepare Your Repository

First, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Kevin's Flight landing page"
git branch -M main
git remote add origin https://github.com/yourusername/kevins-flight.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `.` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

#### Option B: Using Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

### 3. Configure Environment Variables

In your Vercel dashboard, add these environment variables:

- `NODE_ENV` = `production`

### 4. Custom Domain (Optional)

1. In your project dashboard, go to "Settings" > "Domains"
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## Project Configuration

The `vercel.json` file is already configured with:

- **Static Files**: Served from `dist/public`
- **API Routes**: Handled by the Express server
- **Audio Proxy**: Routes audio requests through the server
- **Build Settings**: Optimized for Node.js 20.x

## Important Notes

### Google Drive Audio Files
The current setup proxies Google Drive files through the server to avoid CORS issues. This works well for Vercel's serverless functions.

### Build Process
The build process:
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Deployment**: Vercel serves static files and runs the server as a function

### Serverless Function Limits
- **Execution Time**: 10 seconds for Hobby plan, 60 seconds for Pro
- **Memory**: 1024MB default
- **File Size**: Audio streaming works well within limits

## Troubleshooting

### Build Failures
- Check that all dependencies are in `package.json`
- Ensure TypeScript compiles without errors
- Verify file paths are correct

### Audio Not Playing
- Check Google Drive file permissions (should be publicly viewable)
- Verify the Google Drive file ID in the server code
- Test the audio URL directly in browser

### API Routes Not Working
- Ensure `vercel.json` routes are configured correctly
- Check server logs in Vercel dashboard
- Verify Express routes match the expected paths

## Alternative Audio Hosting

For better performance, consider hosting the MP3 file directly:

1. **Vercel Blob**: Upload to Vercel's blob storage
2. **Cloudinary**: Use for audio CDN
3. **AWS S3**: Host files in S3 bucket

Update the `audioUrl` in `server/storage.ts` to point to the new location.

## Performance Optimization

- Enable Vercel Analytics for performance monitoring
- Use Vercel Edge Network for global distribution
- Consider implementing audio file caching headers

## Deployment Commands Summary

```bash
# Build the project locally (optional)
npm run build

# Deploy with Vercel CLI
npx vercel

# Deploy to production
npx vercel --prod
```

## Support

If you encounter issues:
1. Check Vercel's deployment logs
2. Review the project's build output
3. Test locally with `npm run build && npm start`
4. Verify all file paths and dependencies

Your Kevin's Flight landing page should now be live on Vercel! 🎵