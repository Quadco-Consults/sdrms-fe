# Testing Guide - Frontend Only (No Backend)

This guide helps you test the complete application flow without a backend.

## Setup

### 1. Enable Demo Mode

The `.env.local` file is already configured with demo mode enabled:

```env
NEXT_PUBLIC_DEMO_MODE=true
```

This bypasses authentication and allows you to access all pages directly.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at: http://localhost:3000

## Testing Flows

### 🏠 Landing Page
**URL**: http://localhost:3000

**What to Test**:
- ✅ NNPC logo displays correctly
- ✅ Header shows "Sign In" and "Sign Up" buttons
- ✅ Hero section with "Get Started" and "Sign In" CTAs
- ✅ Three feature cards display properly
- ✅ Footer links are visible
- ✅ All buttons navigate correctly

**Expected Behavior**:
- Click "Sign Up" → Go to `/auth/signup`
- Click "Sign In" → Go to `/auth/signin`
- Click "Get Started" → Go to `/auth/signup`

---

### 🔐 Authentication Flow

#### Sign Up Page
**URL**: http://localhost:3000/auth/signup

**What to Test**:
- ✅ Form fields: Full name, Email, Password, Confirm Password
- ✅ Password strength indicator updates as you type
- ✅ Form validation works (try submitting empty form)
- ✅ Green "Sign Up" button
- ✅ "Already have an account? Sign In" link works
- ✅ Background image displays on the right

**Form Fields to Fill**:
```
Full Name: John Doe
Email: john.doe@nnpc.com
Password: Test@1234
Confirm Password: Test@1234
```

**Expected Behavior** (Without Backend):
- Form validates correctly
- Shows error messages for invalid inputs
- Password requirements update in real-time
- Will show toast notification (won't actually register)

---

#### Sign In Page
**URL**: http://localhost:3000/auth/signin

**What to Test**:
- ✅ Email and Password fields
- ✅ "Remember me" checkbox
- ✅ "Forgot password?" link works
- ✅ Green "Sign In" button
- ✅ "New here? Sign Up" link works
- ✅ Background image on the right

**Test Credentials** (Mock):
```
Email: test@nnpc.com
Password: Test@1234
```

**Expected Behavior** (Without Backend):
- Form validation works
- Shows error for empty fields
- Will show error toast (no backend to validate)

**To Access Dashboard Directly**:
Since demo mode is enabled, just navigate to: http://localhost:3000/dashboard

---

#### Forgot Password Page
**URL**: http://localhost:3000/auth/forgot-password

**What to Test**:
- ✅ Email input field
- ✅ "Send Reset Link" button
- ✅ Form validation

---

### 📊 Dashboard

#### Main Dashboard
**URL**: http://localhost:3000/dashboard

**What to Test**:
- ✅ Dark sidebar (100px wide) displays on the left
- ✅ All navigation icons are visible
- ✅ Active state highlighting works
- ✅ Hover effects on sidebar icons
- ✅ Header shows breadcrumb: "Dashboard"
- ✅ User profile in header (name: "Chinedu Igwe", role: "CHO Sustainability")
- ✅ Notification bell icon with red dot
- ✅ User avatar with initials "CI"

**Sidebar Navigation**:
Try clicking each icon:
- Dashboard
- Environment
- Operations
- Analytics
- Reports
- Calendar
- Trends
- Tags
- Settings (scroll down)
- Help (bottom)
- Logout (bottom)

**Expected Behavior**:
- Icons highlight when active
- Hover effects work
- Only Dashboard and Settings pages are implemented
- Others will show "404" or route error (expected)

---

### ⚙️ Settings Page
**URL**: http://localhost:3000/settings

**What to Test**:

#### Profile Tab (Default)
- ✅ Profile picture placeholder with initials "CI"
- ✅ "Changed Picture" button (green)
- ✅ "Delete Picture" button (red outline, disabled initially)
- ✅ File upload works (PNG, JPEG, GIF under 5MB)
- ✅ Preview uploaded image
- ✅ Delete picture button becomes enabled after upload

**Profile Form Fields** (Pre-filled with mock data):
```
First Name: Chinedu
Last Name: Igwe
Email: chinedu.igwe@nnpc.com
Phone: +234 123 456 7890
Role Name: CHO Sustainability
```

**Actions to Test**:
1. Upload a profile picture
   - Click "Changed Picture"
   - Select an image file
   - See preview
   - Click "Delete Picture" to remove

2. Edit form fields
   - Change any field value
   - Click "Save Changes" → Shows success toast
   - Click "Cancel" → Resets to original values

3. Search and Filter
   - Try typing in search box
   - Click "Filter" button

#### Account Security Tab
**What to Test**:
- ✅ Tab switches correctly
- ✅ Password change form displays
- ✅ Three password fields: Current, New, Confirm
- ✅ "Update Password" button shows toast notification

#### Appearance Tab
**What to Test**:
- ✅ Tab switches correctly
- ✅ Theme selection buttons (Light, Dark, System)
- ✅ "Reset to Default" and "Save Preferences" buttons
- ✅ Buttons show toast notifications

---

## Testing Checklist

### Visual/UI Testing
- [ ] All pages match Figma design
- [ ] NNPC logo displays correctly
- [ ] Green color (#4CAF50) is used consistently
- [ ] Background images load properly
- [ ] Forms are properly styled
- [ ] Buttons have correct colors and hover states
- [ ] Typography is consistent
- [ ] Responsive design works (try different screen sizes)

### Functionality Testing
- [ ] Navigation works between all pages
- [ ] Form validation shows error messages
- [ ] Password strength indicator works
- [ ] File upload preview works
- [ ] Tab switching works in Settings
- [ ] Toast notifications appear
- [ ] Breadcrumbs display correctly
- [ ] Active states work in sidebar
- [ ] Logout button shows confirmation

### Responsive Testing
Test on different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## Known Limitations (No Backend)

### What Won't Work:
- ❌ Actual user registration
- ❌ Actual login authentication
- ❌ OTP/Email verification
- ❌ Password reset emails
- ❌ Saving user data to database
- ❌ Loading real user data
- ❌ API calls will fail

### What WILL Work:
- ✅ All UI/UX interactions
- ✅ Form validations
- ✅ Navigation between pages
- ✅ File uploads (client-side preview)
- ✅ Form state management
- ✅ Toast notifications
- ✅ Tab switching
- ✅ Responsive design
- ✅ Visual feedback (hover, active states)

---

## Quick Access Links

- Landing: http://localhost:3000
- Sign Up: http://localhost:3000/auth/signup
- Sign In: http://localhost:3000/auth/signin
- Forgot Password: http://localhost:3000/auth/forgot-password
- Dashboard: http://localhost:3000/dashboard
- Settings: http://localhost:3000/settings

---

## When Backend is Ready

### Steps to Connect:

1. **Update Environment Variables**:
```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api/v1
NEXT_PUBLIC_DEMO_MODE=false
```

2. **Configure Next.js Proxy** (Optional):
Edit `next.config.ts` to add API proxy if needed.

3. **Update API Routes**:
Check `src/constants/api-routes.ts` and ensure endpoints match your backend.

4. **Test Real Authentication**:
- Sign up with real email
- Verify email/OTP
- Login and access dashboard
- Update profile with real data

---

## Troubleshooting

### Issue: Can't access dashboard
**Solution**: Make sure `NEXT_PUBLIC_DEMO_MODE=true` in `.env.local`

### Issue: Images not loading
**Solution**: Add images to `/public/images/` folder

### Issue: Toast notifications not showing
**Solution**: Check browser console for errors

### Issue: Forms not submitting
**Solution**: This is expected without backend - check browser console for logs

---

## Report Issues

If you find any bugs or issues:
1. Check browser console for errors
2. Note which page/component has the issue
3. Document steps to reproduce
4. Check if it's a demo mode limitation or actual bug
