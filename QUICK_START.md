# Quick Start Guide - Fix 404 Errors

If you're getting 404 errors on auth pages, follow these steps:

## Step 1: Stop the Development Server

Press `Ctrl + C` in your terminal to stop the current dev server.

## Step 2: Clear Next.js Cache

```bash
cd /Users/mac/right-click/sdrms-fe

# Remove .next directory and node_modules cache
rm -rf .next
rm -rf .turbopack

# Optional: Clear npm cache if issues persist
# npm cache clean --force
```

## Step 3: Reinstall Dependencies (if needed)

```bash
npm install
```

## Step 4: Start Fresh Development Server

```bash
npm run dev
```

## Step 5: Test the Routes

Open your browser and try these URLs:

1. **Landing Page**: http://localhost:3000
   - Should show the landing page with NNPC logo

2. **Sign Up**: http://localhost:3000/auth/signup
   - Should show the signup form

3. **Sign In**: http://localhost:3000/auth/signin
   - Should show the signin form

4. **Dashboard** (Direct Access): http://localhost:3000/dashboard
   - Should show the dashboard with sidebar

5. **Settings** (Direct Access): http://localhost:3000/settings
   - Should show the settings page

## Troubleshooting

### Still Getting 404?

1. **Check the Terminal Output**
   - Look for any build errors in the terminal
   - Make sure the server says "Ready" before testing

2. **Check Browser Console**
   - Open DevTools (F12)
   - Look for any JavaScript errors
   - Check the Network tab for failed requests

3. **Verify File Structure**
   ```bash
   ls -la src/app/auth/
   ```
   You should see:
   - signin/
   - signup/
   - verify-email/
   - forgot-password/
   - reset-password/
   - layout.tsx

4. **Check Environment Variables**
   ```bash
   cat .env.local
   ```
   Should contain:
   ```
   NEXT_PUBLIC_DEMO_MODE=true
   NEXT_PUBLIC_API_BASE_URL=/api/proxy
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=development-secret-key-change-in-production
   ```

### Port Already in Use?

If you see "Port 3000 is already in use":

```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

Then access at: http://localhost:3001

## Expected Behavior

### Working Routes:
- ✅ `/` - Landing page
- ✅ `/auth/signup` - Sign up form
- ✅ `/auth/signin` - Sign in form
- ✅ `/auth/forgot-password` - Forgot password form
- ✅ `/auth/verify-email` - OTP verification
- ✅ `/auth/reset-password` - Reset password form
- ✅ `/dashboard` - Main dashboard
- ✅ `/settings` - User settings

### Not Implemented (Will show 404):
- ❌ `/dashboard/environment`
- ❌ `/dashboard/operations`
- ❌ `/dashboard/analytics`
- ❌ Other dashboard sub-pages

## Quick Test Commands

```bash
# Check if server is running
curl http://localhost:3000

# Check specific route
curl http://localhost:3000/auth/signup

# Should return HTML, not 404
```

## Still Having Issues?

Run this diagnostic script:

```bash
# Check file structure
echo "=== Checking Auth Pages ==="
ls -la src/app/auth/*/page.tsx

echo "=== Checking Dashboard ==="
ls -la src/app/\(dashboard\)/

echo "=== Checking Environment ==="
cat .env.local

echo "=== Checking Next.js Config ==="
cat next.config.ts
```

Share the output if you need help debugging.
