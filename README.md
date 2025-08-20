# WTWR (What to Wear?): Back End

Back-end API project focused on creating a server for the WTWR application.

## Overveiw

The WTWR API lets users manage clothing items, including:

- Create items
- Get all items
- Delete items (only if the user is the owner)
- Like or dislike items
- User sign up and login with JWT authentication
- Get and update user profile information

### Tech Stack

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing

### API

Authentication

- POST /signup — Register a new user. Requires email, password, name, and avatar.
- POST /signin — Login as an existing user. Returns a JWT.

Users

- GET /users/me — Get the profile of the currently logged-in user.
- PATCH /users/me — Update the profile of the currently logged-in user.

Clothing Items

- POST /items — Create a new clothing item
- GET /items — Get a list of all items
- DELETE /items/:itemId — Delete an item
- PUT /items/:itemId/likes — Like an item
- DELETE /items/:itemId/likes — Remove a like
