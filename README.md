# UserAuth & Notes API
A sample api that allows a client to sign up users and add drafts for notes and commit drafts to notes that belong to any registered user.

## Features
* User Authentication:
  * A user can signup with username and password
  * A user can login
  * A user can logout
* Notes
  * Unauthenticated users can post note drafts.
  * Any non-logged in user can retrieve all drafts he/she has created in the current session.
  * Authenticated users can commit a draft (turn a draft into a note).
  * Authenticated users can add a note.
  * Authenticated users can get the notes they have added.

## Root Endpoint: `http://localhost:3100/api`

## Resources
This API has users and notes resources represented as follows:

* User example
```json
  {
    "id": 3,
    "username": "alejo4373"
  }
```

* Draft Example
```json
  {
    "id": 1,
    "session_id": "89ehna88hdha9029847211bhbshhs",
    "text": "Draft of Welcome to Jamrock my friend",
  }
```

* Note Example
```json
  {
    "id": 1,
    "user_id": 1,
    "text": "Welcome to Jamrock my friend",
  }
```

## Endpoints

See Postman docs [here](https://documenter.getpostman.com/view/7650579/SzmiVFJs)

## Response Schema
Every response from this API has the following schema/structure with `payload`, `msg` and `err` properties.
```json
{
  "payload": <object or array>,
  "msg": <string>,
  "err": <boolean>
}
```

Example:
```json
{
  "payload": {
    "id": 3,
    "username": "alejo4373"
  },
  "msg": "User successfully signed up",
  "err": false
}
```
