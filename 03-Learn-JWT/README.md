# JWT API 🚀

### Requirements

NodeJS, MongoDB, React, npm

### Installation

#### Install backend dependencies

```bash
cd backend
npm Install
```

#### Install frontend dependencies

```bash
cd frontend
npm Install
```

#### Create .env file

```env
MONGODB_URL=mongodb+srv:your mongodb url
JWT_ACCESS_KEY=your access key
JWT_REFRESH_KEY=your refresh key
```

#### Run frontend & backend

```bash
npm start
```

### API Design

| Endpoint               |                   Output                    |                                  Additional Note |
| :--------------------- | :-----------------------------------------: | -----------------------------------------------: |
| POST/ v1/auth/register |                Add new user                 |                                               No |
| POST/ v1/auth/login    | Login into homepage, return an access token |                     Private route, require login |
| POST/ v1/auth/refresh  |         Refresh Token after 40 days         |                                               No |
| POST/ v1/auth/logout   |        Logout and clear access token        |                                               No |
| POST/ v1/user          |                Get all users                |                                               No |
| POST/ v1/user/:id      |                 Delete user                 | Admin delete everyone, user just delete yourself |
