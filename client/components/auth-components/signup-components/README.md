# Signup Components

This folder contains modular signup step components using **react-hook-form**, **Zod validation**, and **sonner** for toast notifications.

## Components

### 1. EmailStep.tsx
- Validates email using `EmailSchema` from `@batiyoun/common`
- Calls `/api/auth/request-otp` to send OTP
- Shows success/error toasts
- Props:
  - `onSuccess: (email: string) => void` - Callback when OTP sent successfully

### 2. OtpStep.tsx
- 6-digit OTP input with paste support
- Auto-focus next input on digit entry
- Backspace navigation
- 5-minute countdown timer
- Resend OTP functionality with rate limiting
- Calls `/api/auth/verify-otp` to validate OTP
- Props:
  - `email: string` - User's email
  - `onSuccess: () => void` - Callback when OTP verified
  - `onBack: () => void` - Callback to go back to email step

### 3. UsernameStep.tsx
- Real-time username availability checking (debounced 500ms)
- Visual indicators (loading spinner, check mark, X)
- Calls `/api/auth/check-username`
- Validates using `UsernameSchema`
- Props:
  - `onSuccess: (username: string) => void` - Callback when username is available

### 4. CompleteStep.tsx
- Final profile completion form
- Fields: fullName, bio (optional, 160 char limit), password
- Password strength indicators
- Validates using `completeSignupUserSchema`
- Calls `/api/auth/signup` to create account
- Redirects to user profile on success
- Props:
  - `username: string` - Selected username

## Features

✅ **React Hook Form** - Efficient form state management  
✅ **Zod Validation** - Type-safe schema validation  
✅ **Sonner Toasts** - Beautiful toast notifications  
✅ **Error Handling** - Clear, actionable error messages  
✅ **Rate Limiting** - Shows remaining time when rate limited  
✅ **Resend OTP** - 5-minute countdown timer  
✅ **Debounced Checks** - Username availability with 500ms debounce  
✅ **Paste Support** - Copy-paste OTP from email  
✅ **Accessibility** - Proper labels, ARIA attributes

## Usage

```tsx
import { UserSignupForm } from '@/components/auth-components/UserSignupForm';

// In your page
export default function SignupPage() {
  return <UserSignupForm />;
}
```

The parent `UserSignupForm.tsx` orchestrates the flow:
- Manages step state (1-4)
- Passes email/username between steps
- Renders appropriate component for current step

## Toast Notifications

All components use `sonner` for consistent notifications:
- ✅ Success: Green toast with success message
- ❌ Error: Red toast with error message from API

Toaster is configured in [app/layout.tsx](../../app/layout.tsx):
```tsx
<Toaster richColors position="top-center" />
```

## API Integration

Each component calls the appropriate API route:
- EmailStep → `/api/auth/request-otp`
- OtpStep → `/api/auth/verify-otp` + `/api/auth/request-otp` (resend)
- UsernameStep → `/api/auth/check-username`
- CompleteStep → `/api/auth/signup`

All API routes return consistent format:
```ts
{ success: boolean, message: string }
```

## Error Messages

API error messages are displayed clearly:
- Rate limiting: "Try again in X minutes"
- Invalid OTP: "Invalid or expired OTP"
- Username taken: "This username is already taken. Please choose another one."
- Zod errors: Field-specific validation messages
