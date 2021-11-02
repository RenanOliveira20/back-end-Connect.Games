# Back End Projeto 3 Connect game

Back end da rede social Connect games, projeto final 3 Irochanck

---

Demo [HERE](https://connect-games.herokuapp.com/) **CONNECT GAMES**
 
Front-End [HERE](https://github.com/RenanOliveira20/front-end-Connect.Games) **CONNECT GAMES**

---

## FEATURES:

- Create users;
- Login users;
- Authorized users can create, see, update and delete rooms and reviews;
- create post;
- create posts;
- favoritize games;
- follow other users;
- comment on posts;
- like and dislike;
and others.

---

## TECHNOLOGIES:

IronRooms server uses:

- nodejs;
- express;
- json web token;
- bcryptjs.

---

## USAGE:

Online: [API Connect Games](https://api-connect-games-2.herokuapp.com/)

-or-

Local:

- clone this repo;
- `npm i`;
- set your environment variables with:

```
PORT=         // use the one you prefer
DB_URI=       // your local mongoDB storage or AtlasDB
SECRET_JWT=   // your own secret
```

- Use `npm start` (node) or `npm run dev` (nodemon) to start application at:

```
http://localhost:<PORT>
```

---

## Endpoints:


| METHOD | ENDPOINT             | PAYLOAD                        | RESPONSE                | ACTION                                       |
|--------|----------------------|--------------------------------|-------------------------|----------------------------------------------|
| POST   | /auth/login          | { email, password }            | { user, token }         | authenticate user                            |
| POST   | /auth/signup         | { email, password }            | {message}               | user created (TOKEN)                         |
| GET    | /api-games           | {}                             | [ {}, {} ]              | get api information                          |
| GET    | /posts/folowing      | {}                             | [ {}, {} ]              | get posts from friends of the logged in user |
| GET    | /posts               | {}                             | [ {}, {} ]              | gets the posts from the logged in user       |
| POST   | /feed                | { posts: type, user: id ref, } | {message: created}      | add a post                                   |
| GET    | /perfil              | {}                             | [{ user }]              | get the user                                 |
| PUT    | /perfil              | {o que a gente vai editar}     | {informação atualizada} | change / edit own profile information        |
| DELETE | /perfil              | {}                             | {deleted}               | delete own profile                           |
| POST   | /new-game            | {Game-Schema}                  | {Solicitação criada}    | Add games for validation                     |
| GET    | /games/internal      | {}                             | [{},]                   | returns all games from the database          |
| GET    | /games/all           | {}                             | [{   }]                 | get all the games                            |
| GET    | /games/:id           | {}                             | {game}                  | pick a specific game                         |
| POST   | /games/:id/ comments | { user id, comment }           | { message }             | send feedback                                |
| GET    | /games/:id/ comments | {}                             | [{ }]                   | get the comments                             |
| PUT    | /follows             | {user id}                      | {follow}                | follow user                                  |
| PUT    | /follows             | {user id}                      | {unfollow}              | stop following user                          |
| POST   | /games/:id/ comments | { user id }                    | { 1 like}               | like a comment from the game                 |
| PUT    | /games/:id/ comments | {userid}                       | {-1 like}               | dislike a game comment                       |
| POST   | posts/:id            | {user id}                      | {1 like}                | Like a post                                  |
| PUT    | posts/:id            | {userid}                       | {-1 like}               | dislike a post                               |
| DELETE | feed/:id             | {}                             | {delete}                | delete post                                  |
| DELETE | post/:id/:commentId  | []                             | {delete}                | delete comments                              |
| GET    | /feed                | {}                             | [{}]                    | takes posts from users that it follows.      |
|--------|----------------------|--------------------------------|-------------------------|----------------------------------------------|

```
