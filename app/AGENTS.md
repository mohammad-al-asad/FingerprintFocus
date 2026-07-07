Expo App Folder structure

src
│
app
│
├──(onboarding)
│
├──(auth)
│   ├──signin.tsx
│   ├──signup.tsx
│   ├──forgot-password.tsx
│   ├──otp-verification.tsx
│   └──reset-password.tsx
│
├──(tabs)
│   └──index.tsx
│
├──_layout.tsx
├──index.tsx
│
├──components
│ └──ui
│   ├──Header.tsx
│   ├──Input.tsx
│   └──Button.tsx
│
├──redux
│ ├──api
│ │ └──baseApi.ts
│ ├──slices
│ │ └──authSlice.ts
│ │ 
│ └──store.ts
│
└──utils
  └──useTheme.ts

