# Retro Pocket Blog

Welcome to the Retro Pocket Blog! This project is a modern web application dedicated to all things retro gaming, including classic consoles, hardware, and games. Built with React.js for the frontend and Firebase for data storage, this blog aims to provide a nostalgic trip down memory lane for retro gaming enthusiasts.

## Features

- **React.js**: A powerful JavaScript library for building user interfaces.
- **Tailwind Css**: CSS framework that provides low-level utility classes to build custom designs without writing CSS from scratch.
- **Firebase**: Utilized for data storage, user authentication, and hosting.
- **Vite**: A fast and modern build tool for an optimized development experience.
- **Responsive Design**: Accessible on both desktop and mobile devices.
- **CRUD Functionality**: Create, read, update, and delete blog posts.
- **User Authentication**: Secure user login and registration with Firebase Auth.
- **Real-time Updates**: Experience instant updates and changes with Firebase's real-time database.

## Tech Stack

- **React.js**: For building the user interface.
- **Firebase**: For real-time data storage, authentication, and hosting.
- **CSS Modules**: For styling components with scoped styles.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/Allucard79/retro-pocket-blog.git
   cd retro-pocket-blog
   ```

2. **Install dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Setup Firebase**

   - Go to the Firebase Console and create a new project.
   - Add a new web app to your Firebase project.
   - Copy the Firebase configuration and add it to a `.env` file in the root of your project:
     ```
     REACT_APP_API_KEY=your_api_key
     REACT_APP_AUTH_DOMAIN=your_auth_domain
     REACT_APP_PROJECT_ID=your_project_id
     REACT_APP_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_APP_ID=your_app_id
     ```

4. **Start the development server**

   ```sh
   npm start
   # or
   yarn start
   ```

   Your application should now be running on `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Happy retro gaming!
