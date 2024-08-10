<!-- Admin Role -->

Grand Admin:
  email: akrama@gmail.com
  password: 12345678

SuperAdmin: 
  email: akramsakib@gmail.com
  password: 12345678

Admin: 
  email: aitqur@gmail.com
  password: 12345678

member: 
  email: rakibhasan@gmail.com
  password: 12345678

Super Admin
Admin


## API Endpoints

### User

- `POST /users/create-super-admin`
- `POST /users/create-admin`
- `POST /users/create-member`

### Profile

- `GET /profile/`
- `PATCH /profile/:id`

### Category

- `POST /categories/create-category`
- `GET /categories/`
- `GET /categories/?searchTerm=john`
- `GET /categories/?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /categories/:id`
- `PATCH /categories/:id`
- `DELETE /categories/:id`

### Post

- `POST /posts/create-post`
- `GET /posts/`
- `GET /posts/?searchTerm=john`
- `GET /posts/?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /posts/:id`
- `PATCH /posts/:id`
- `DELETE /posts/:id`

### Project

- `POST /projects/create-post`
- `GET /projects/`
- `GET /projects/?searchTerm=john`
- `GET /projects/?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `DELETE /projects/:id`

### Cloudinary

- `POST /cloudinary/create-post`

### Gallery

- `POST /gallery/create-gallery`
- `GET /gallery/`
- `GET /gallery/?searchTerm=john`
- `GET /gallery/?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /gallery/:id`
- `PATCH /gallery/:id`
- `DELETE /gallery/:id`

### Super Admin

- `POST /super-admins/create-super-admin`
- `GET /super-admins/`
- `GET /super-admins/?searchTerm=john`
- `GET /super-admins/?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /super-admins/:id`
- `PATCH /super-admins/:id`
- `DELETE /super-admins/:id`

### Admin

- `POST /admins/create-admin`
- `GET /admins/`
- `GET /admins/?searchTerm=john`
- `GET /admins/?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /admins/:id`
- `PATCH /admins/:id`
- `DELETE /admins/:id`

### Member

- `POST /members/create-super-admin`
- `GET /members/`
- `GET /members/?searchTerm=john`
- `GET /members/?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /members/:id`
- `PATCH /members/:id`
- `DELETE /members/:id`

### Membership

- `POST /membership/create-membership`
- `GET /membership/`
- `GET /membership/?searchTerm=john`
- `GET /membership/?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /membership/:id`
- `PATCH /membership/:id`
- `DELETE /membership/:id`
