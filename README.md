# Blog App Frontend

Live build https://blogposter.netlify.app/new_post

This repository contains the frontend code for a simple and user-friendly Blog App. The application is designed to provide an intuitive and engaging platform for users to read and interact with blog posts.

## Features

### 1. **Blog Post Listing**

- The app presents a clean and organized layout to display a list of blog posts.
- Each post is presented with its title, a brief excerpt, and the number of comments.

### 2. **Individual Post View**

- Users can click on a blog post to view the full content along with details such as the author, publication date, and the number of comments.
- The layout ensures readability and easy navigation within the post.

### 3. **Commenting System**

- Users can engage with the content by leaving comments on each blog post.
- The comment section includes user avatars, usernames, and timestamps for a personalized and dynamic experience.

### 4. **Navigation**

- The app features smooth navigation between different views using React Router.
- Users can easily switch between the blog post listing and individual post views.

### 5. **Responsive Design**

- The frontend is designed to be responsive, providing an optimal viewing experience across a variety of devices, including desktops, tablets, and mobile phones.
- Utilizes Tailwind CSS for a responsive and mobile-first approach to styling.

### 6. **API Integration**

- The frontend communicates with a backend API to fetch and display blog post data dynamically.
- API calls are made asynchronously to ensure a seamless user experience.

### 7. **TypeScript Integration**

- The app is built using TypeScript, adding static typing to enhance code readability and maintainability.
- TypeScript enables better collaboration in larger teams and catches potential errors during development.

### 8. **User Authentication**
- Users can create accounts to personalize their experience and leave comments on blog posts.
- Passport is integrated to provide secure and efficient user authentication.
- Certain features, such as commenting and creating new posts, may be protected, requiring users to log in.


## Technologies Used

- **React with TypeScript**: The app is built using React with TypeScript, combining the power of React for UI components with TypeScript for static typing.
- **React Router**: Navigation within the app is handled by React Router, enabling a single-page application experience.
- **Tailwind CSS**: Utilizes Tailwind CSS for efficient and responsive styling.
- **Fetch API**: Asynchronous communication with the backend API is facilitated through the Fetch API.
- **Passport**: Integrated Passport for secure user authentication.

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/tim-graupe/blogfrontend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npm start
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

Feel free to explore and enhance the app based on your requirements. Happy blogging!