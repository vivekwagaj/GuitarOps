# **Setting Up the Spring Boot Project:**

**Open IntelliJ IDEA:**

Open IntelliJ IDEA and ensure you have the latest version installed.

**Create a New Project:**

* Go to File -> New -> Project.
* Choose Spring Initializr from the left sidebar.
* Set up your project details (e.g., Group, Artifact, Project Name).
* Select the desired Spring Boot version.
* Add dependencies such as Spring Web, Spring Data JPA, Kafka, etc.
* Click Next and then Finish.

**Project Structure:**

Once the project is created, you'll see the basic project structure. IntelliJ will automatically download the dependencies.

**Create Controller, Service, and Model Classes:**

* Create the necessary controller, service, and model classes in the src/main/java package.
* Use annotations like @RestController, @Service, @Entity, etc.

**Database Configuration:**

* Set up your database configuration in application.properties or application.yml.
* Add the necessary configurations for Snowflake and Azure SQL.

**Kafka Configuration:**

Configure Kafka in 'application.properties' or 'application.yml'.

# **Setting Up the React Project:**

**Open a Terminal:**

Open a terminal within IntelliJ IDEA.

**Install Node.js and Create React App (CRA):**

Ensure Node.js is installed, then run the following command to create a new React project:

```
npx create-react-app frontend
```

**Navigate to the Frontend Directory and Run the React Development Server:**

```
cd frontend

npm start
```

**Install Dependencies:**

For better styling and API communication, install necessary dependencies:

```
npm install axios react-router-dom tailwindcss postcss autoprefixer
```

Then, initialize Tailwind:

```
npx tailwindcss init -p
```

Modify `tailwind.config.js` to include your React app's `src` folder:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Create Components:**

* Create React components inside the `src/components` directory.
* Implement UI components for buying, selling, repairing guitars, and user-related operations.

**Connect to the Spring Boot Backend:**

* Use **Axios** or **React Query** to make API calls to your Spring Boot backend.
* Configure CORS in your Spring Boot backend if needed.

**Integrate with Azure AD:**

Follow the Azure AD documentation to integrate authentication in your React application.

_**Additional Tips:**_

**Build and Run:**

1. Use IntelliJ to build and run your Spring Boot application.
2. Run the React application separately using `npm start`.

**Debugging:**

1. Set breakpoints in your Java code for debugging.
2. Use browser developer tools (Chrome DevTools) for debugging React code.

**Version Control:**

1. Initialize a version control system (e.g., Git) for your project.

**Integrate with Azure SQL and Snowflake:**

1. Implement the necessary data synchronization logic in your Spring Boot backend.

