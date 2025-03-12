# Server Documentation

This folder contains server-side code for the application. Below is a brief description of each file and subfolder:

## Contents

### api folder
Contains API endpoint handlers for various functionalities.

#### auth folder
Contains authentication-related API endpoints.

- **[...].ts**: Handles authentication using credentials.
- **register/index.post.ts**: Handles user registration.

#### lessons folder
Contains API endpoints related to lessons.

- **[id].ts**: Fetches a lesson by its ID.
- **lesson.get.ts**: Fetches a lesson based on query parameters.
- **lessons.delete.ts**: Deletes all lessons.
- **lessons.get.ts**: Fetches all lessons.
- **lessons.post.ts**: Inserts multiple lessons into the database.

#### progress folder
Contains API endpoints related to user progress.

- **index.get.ts**: Fetches user progress based on query parameters.
- **index.post.ts**: Creates a new progress entry.
- **index.put.ts**: Updates an existing progress entry.
- **last/index.get.ts**: Fetches the most recent progress entry for a user.

#### ranking folder
Contains API endpoints related to user rankings.

- **index.get.ts**: Fetches user rankings.

#### scores folder
Contains API endpoints related to user scores.

- **index.get.ts**: Fetches a user's score based on query parameters.
- **index.post.ts**: Creates a new score entry.

#### settings folder
Contains API endpoints related to user settings.

- **index.get.ts**: Fetches user settings based on query parameters.
- **index.post.ts**: Creates new user settings.
- **index.put.ts**: Updates existing user settings.

#### statistics folder
Contains API endpoints related to user statistics.

- **index.get.ts**: Fetches user statistics.

#### upload-image folder
Contains API endpoints related to image uploads.

- **index.post.ts**: Handles image uploads.

#### user folder
Contains API endpoints related to user management.

#### userdetails folder
Contains API endpoints related to user details.

### models folder
Contains Mongoose models for various data structures.

- **deletedUser.ts**: Model for deleted users.
- **Lesson.ts**: Model for lessons.
- **progress.ts**: Model for user progress.
- **score.ts**: Model for user scores.
- **Settings.ts**: Model for user settings.
- **User.ts**: Model for users.
- **UserDetails.ts**: Model for user details.

### index.ts
Initializes the server and connects to the database.

### tsconfig.json
TypeScript configuration file for the server.