
# COLLAPP: Project Demo Notes

## I. Preparation

*   **Ensure Application is Running:**
    *   Run `npm install` (if first time or dependencies changed).
    *   Run `npm run dev` (starts on `http://localhost:9002` by default).
*   **Open Firebase Console:** Have tabs open for:
    *   Firebase Authentication > Users
    *   Firestore Database (`users` collection)
    *   Cloudinary Media Library (to see uploaded files)
*   **Hardcoded Credentials Ready:**
    *   Admin: `admin@collapp.app` / `AdminPass123!`
    *   School Rep: `schoolrep@collapp.app` / `RepPass123!`
*   **Clear Browser Cache/Incognito (Optional):** For a clean demo session.

## II. Demo Flow & Script

**(START) Introduce COLLAPP**

"Welcome to the demo of COLLAPP, a platform designed to simplify the college application process. Today, we'll walk through the full student journey, from registration and onboarding to managing their profile."
"The platform uses a simple, clean black and white theme for clarity. The landing page is built with Next.js and React components like ShadCN UI for interactive elements such as cards and forms."

---

### A. Landing Page (`http://localhost:9002`) & Student Signup

1.  **Showcase Landing Page:** Briefly scroll through the landing page sections (Hero, Featured Universities, etc.).
    *   "This is our main landing page. At the top, we have clear **Login** and **Sign Up** buttons."

2.  **Navigate to Signup:** Click "Sign Up Now".
    *   "Let's start by registering a new student."

3.  **Successful Student Signup:**
    *   Enter valid details for a new student:
        *   Full Name: "Demo Student"
        *   Email: `newstudent_[timestamp]@collapp.app` (use a unique email)
        *   Password: `Password123!`
        *   Confirm Password: `Password123!`
    *   Click "Create Account".
    *   "Upon successful registration, the user is shown a confirmation and prompted to check their email for verification. This step is currently mocked for the demo, so we'll proceed as if verified."
    *   Navigate back to the homepage and log in with the new student credentials.

---

### B. Student Login & Onboarding

1.  **Login as New Student:** Use the credentials just created. Select "Student" type.
    *   "Now, let's log in as our new student for the first time."
    *   Upon login, the user is redirected to their dashboard.

2.  **Show Onboarding Prompt:**
    *   Point out the "Complete Your Profile" prompt on the Student Dashboard.
    *   "The system recognizes this is a new user and prompts them to complete their onboarding to unlock all features."
    *   Click "Start Onboarding".

3.  **Complete Onboarding Form (`/student/onboarding`):**
    *   "This is our comprehensive onboarding form where students provide their personal details, address, parent information, and required documents."
    *   Fill out the form with sample data.
    *   Upload placeholder files for the Birth Certificate and School ID.
    *   Click "Review & Submit" and confirm.
    *   "The form uses client-side validation. On submission, the documents are uploaded to Cloudinary, and the profile data is securely saved to their user document in Firestore, referenced by their unique Firebase UID."
    *   After submission, the app redirects to the Student Dashboard.

---

### C. Student Dashboard & Profile Settings

1.  **Show Updated Dashboard:**
    *   "Now that onboarding is complete, you'll notice the 'Complete Your Profile' prompt is gone. The dashboard is now fully active."

2.  **Navigate to Settings:** Use the sidebar to go to the "Settings" page.
    *   "Let's check the new Settings page, where students can manage their profile."

3.  **Review Settings Page (`/student/settings`):**
    *   **Personal Information:** "Here, we can see all the data entered during onboarding is correctly displayed, including their name and email from signup."
    *   **Uploaded Documents:** "The links to the uploaded Birth Certificate and School ID are available here. These files are stored on Cloudinary with public access."
    *   **Security:** "Students can also request a password reset link from this panel."

4.  **Update Profile Picture:**
    *   "A key feature is the ability to upload a profile picture."
    *   Upload a new image file.
    *   "The new picture is uploaded to Cloudinary and immediately reflected in both the settings page and the user avatar in the top-right header, providing a consistent experience across the app."

5.  **Test Logout:**
    *   Click the user avatar in the header and select "Logout".
    *   "The logout function correctly clears the user's session, and they are returned to the homepage. Notice the developer status bar in the corner also disappears."

---

### D. Admin / School Rep Login

1.  **Login as Admin:**
    *   Email: `admin@collapp.app`, Password: `AdminPass123!`
    *   "Logging in as an admin takes us to the Admin Dashboard."
    *   Show the dashboard and the status bar indicating the admin user.

2.  **Login as School Rep:**
    *   Email: `schoolrep@collapp.app`, Password: `RepPass123!`, User Type: "School Representative"
    *   "Similarly, the school rep login directs to their specific dashboard."

---

### E. Conclusion & Key Fixes

*   "This concludes the demo of the core student lifecycle in COLLAPP, from registration to profile management. We've also shown the role-based access for admins and school reps."
*   **Key Fixes Implemented:**
    *   "We resolved a critical authentication issue by moving to a client-side login flow, ensuring user sessions are stable."
    *   "We fixed data-fetching bugs so that user information from Firestore is now correctly displayed after onboarding."
    *   "The logout process and UI state (like the status bar) are now properly synchronized."

**(END) Q&A**
"Thank you. Are there any questions?"
