# Future Plan

This document outlines the completion of Phase 1 and the proposed features for Phase 2 of NaruSearch.

## Phase 1: Foundation (Completed)

Phase 1 focused on building the core infrastructure and authentication system.

-   **Backend Setup**: Node.js/Express server with MongoDB connection.
-   **Authentication**:
    -   User registration with Joi validation.
    -   User login with JWT generation.
    -   Password hashing using Bcrypt.
    -   Middleware for protected routes.
-   **Frontend Setup**: React application using Create React App.
-   **Pages**:
    -   Login Page
    -   Register Page
    -   Home Page (Protected, displays user data)
    -   404 Page
-   **Documentation**:
    -   Comprehensive JSDoc for all backend and frontend code.
    -   Updated README with setup and usage instructions.

## Phase 2: Enhancements (Proposed)

Phase 2 will focus on adding more functionality, improving user experience, and robustness.

### 1. User Profile Management
-   **Edit Profile**: Allow users to update their first name, last name, and password.
-   **Profile Picture**: specific ability to upload and update a profile picture.
-   **Delete Account**: Option for users to delete their account.

### 2. Search Functionality (Core Feature)
-   **Search Bar**: Implement a search bar on the Home page (delivering on the "NaruSearch" name).
-   **Search API**: Create a backend endpoint to search for items (or other users) in the database.
-   **Filtering/Sorting**: Add options to filter and sort search results.

### 3. Testing
-   **Backend Tests**: Implement unit and integration tests using Jest and Supertest.
-   **Frontend Tests**: Add component testing using React Testing Library.
-   **E2E Tests**: Implement End-to-End testing with Cypress or Playwright.

### 4. UI/UX Improvements
-   **Responsive Design**: Ensure the application looks good on all device sizes (mobile, tablet, desktop).
-   **Loading States**: Add spinners or skeletons while data is fetching.
-   **Better Error Handling**: Display more user-friendly error messages (e.g., toast notifications).

### 5. Deployment
-   **Docker**: Containerize the application for easier deployment.
-   **CI/CD**: Set up a CI/CD pipeline (e.g., GitHub Actions) for automated testing and deployment.
-   **Hosting**: Deploy the application to a cloud provider (e.g., Heroku, Vercel, AWS).

### 6. Security Enhancements
-   **Rate Limiting**: Prevent abuse of the API.
-   **Input Sanitization**: Further protect against XSS and injection attacks.
-   **CSRF Protection**: Add CSRF tokens if cookies are used for authentication in the future.
