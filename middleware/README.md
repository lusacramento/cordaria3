# Middleware Documentation

This folder contains middleware functions used in the application. Below is a brief description of each middleware file:

## Contents

### admin.ts
Middleware to restrict access to admin users only.

- **Description**: Checks if the user is authenticated and has the username 'admin'. If not, it redirects the user to the home page with an alert message.

### guest.ts
Middleware to restrict access to guest users only.

- **Description**: Checks if the user is authenticated. If so, it redirects the user to the 'a-pratica' page.
