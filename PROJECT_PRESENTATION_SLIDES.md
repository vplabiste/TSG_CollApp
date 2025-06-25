
# COLLAPP: Project Presentation

---

## Slide 1: Title Slide

**COLLAPP: Streamlining College Applications**

*   Connecting Students, Schools, and Administrators
*   [Your Name/Team Name]
*   [Date]

---

## Slide 2: Project Overview

**The Problem:**
*   College application process can be fragmented and overwhelming for students.
*   Schools need efficient ways to manage applications and engage prospective students.
*   Administrators require oversight of the platform.

**The Solution: COLLAPP**
*   A centralized platform to simplify college discovery, application, and management for all stakeholders.
*   Theme: Simple, clean black and white interface for clarity and ease of use.

---

## Slide 3: Core Functionalities (Student Journey)

*   **Student Lifecycle:**
    *   **Registration:** New students can create a secure account.
    *   **Onboarding:** A comprehensive form to collect detailed student profiles and documents.
    *   **Profile Management:** A dedicated settings page to view profile data, update profile picture, and manage account security.
*   **Role-Based Access:**
    *   **School Representatives & Administrators:** Can log in to their respective dashboards using demo credentials.
*   **Key Features:**
    *   Secure User Authentication (Client-Side Firebase Auth).
    *   Secure Document Uploads to Cloudinary.
    *   Role-based dashboards.

---

## Slide 4: Technology Stack - Frontend

*   **Next.js 14/15:** React framework for modern web applications. App Router used.
*   **React 18:** Component-based UI library.
*   **TypeScript:** For stabler JavaScript.
*   **ShadCN UI & Tailwind CSS:** For a consistent, modern, and responsive UI with a simple Black & White theme.
*   **React Hook Form & Zod:** For robust client-side form validation.

---

## Slide 5: Technology Stack - Backend

*   **Firebase:**
    *   **Firebase Authentication:** Secure user sign-up and sign-in. (Now fully client-side for web).
    *   **Cloud Firestore:** NoSQL database for storing user profiles, referenced by UID.
*   **Next.js Server Actions:** For secure server-side logic like data fetching and form processing.
*   **Cloudinary:** For scalable cloud-based storage of user-uploaded documents and images.

---

## Slide 6: COLLAPP Onboarding & Profile Management

*   **Student Onboarding (`/student/onboarding`):**
    *   Triggered for new users after first login.
    *   Collects personal data, address, parent info, and documents.
    *   Data is saved to a user-specific document in Firestore.
    *   Documents are uploaded to Cloudinary with public access controls.

*   **Settings Page (`/student/settings`):**
    *   **View Profile:** Displays all data submitted during onboarding.
    *   **Update Profile Picture:** Allows users to upload a formal profile picture, which is reflected across the app.
    *   **Security:** Provides account management features like password reset.
*   **Key Files:** `src/app/student/onboarding/page.tsx`, `src/app/student/settings/page.tsx`, `src/app/actions/student.ts`

---

## Slide 7: Authentication Flow (FIXED)

*   **Client-Side Login:**
    *   The login form now uses the Firebase SDK directly in the browser.
    *   **FIX:** This resolved a major bug where the user's session was not being correctly maintained, causing "No authenticated user" errors.
*   **Server Actions for Data:**
    *   Once logged in, the app uses secure Server Actions (`getUserProfile`) to fetch the user's data from Firestore.
    *   **FIX:** This prevents client-side code from trying to access the database directly, fixing permission errors.
*   **Logout:** The logout process is also now handled client-side to ensure the session is properly cleared.
*   **Key Files:** `src/components/auth/login-form.tsx`, `src/app/actions/auth.ts`

---

## Slide 8: Demo Highlights

1.  **New Student Registration:** Create a fresh student account.
2.  **Login & Onboarding:**
    *   Log in as the new student.
    *   Show the onboarding prompt on the dashboard.
    *   Complete the onboarding form and submit.
3.  **Profile Management:**
    *   Show the updated dashboard (no more prompt).
    *   Navigate to Settings and review the displayed onboarding data.
    *   Upload a new profile picture and show it updated in the header.
4.  **Logout & Admin Login:**
    *   Log out successfully (show status bar disappears).
    *   Log in as Admin/School Rep to show role-based access.

---

## Slide 9: Development & Debugging Summary

*   **Authentication Overhaul:** The most critical fix was refactoring the login/logout logic to be client-side, creating a stable and predictable user session.
*   **Secure Data Fetching:** Implemented a server action `getUserProfile` to act as a secure bridge between the client and Firestore, resolving permission issues.
*   **Configuration Fixes:** Corrected `next.config.js` to allow Cloudinary images and fixed Firebase Admin SDK initialization to prevent server crashes.
*   **UI/UX Polish:** Added and fixed a developer status bar for easy user tracking and ensured UI elements like the profile picture update in real-time.

---

## Slide 10: Q&A

*   Thank you!
*   Questions?

---
