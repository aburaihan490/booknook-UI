# BookNook 📚

**BookNook** is a small online library. Users can browse all books, add new books, borrow a book for a few days, see the books they have borrowed, and return them.

> **"Add a book, borrow a book, return a book."**

## 🔗 Live Links

- **Client (Live Site):** [ [ ] Add your client live URL ]
- **Server (Live API):** [ [ ] Add your server live URL ]
- **Client Repository:** https://github.com/aburaihan490/booknook-UI
- **Server Repository:** [ [ ] Add your server repo link ]

## ✨ Features

- **Authentication:** Email/password login and registration with Better Auth and the MongoDB adapter, plus Google sign-in. Passwords must contain an uppercase letter, a lowercase letter, and at least 6 characters.
- **Book Management:** Logged-in users can add books with an image upload (imgbb / postimage), and edit or delete the books they added. Deletion asks for confirmation in a custom modal.
- **Borrow System:** Users can borrow a book for a few days, see their borrows, and return them. Available copies go down on borrow and up on return. A book with no copies left shows "Not Available".
- **Protected Routes:** `/add-book`, `/my-books`, `/my-borrows`, and `/books/:id` require login. Logged-in users stay logged in after a page reload.
- **Home Page:** A Swiper.js banner slider, a "New Arrivals" section with the 6 latest books, and extra sections on how borrowing works and top categories.
- **User Feedback:** Toast messages for all success and error cases, with no default browser alerts. Loading spinners appear while data is loading, and a custom 404 page includes a "Back to Home" button.

## 🛠️ Tech Stack

**Client**

- Next.js 16 (App Router), React 19, TypeScript
- HeroUI v3, Tailwind CSS v4, Lucide Icons
- Swiper.js (banner slider)
- Better Auth (client and server, with the JWT plugin)

**Server**

- Express.js, MongoDB
- JWT verification for protected API routes

## 📁 Project Structure

```
booknook-UI/
├── src/
│   ├── app/          # App Router pages and layouts
│   ├── components/   # Reusable UI components
│   ├── lib/          # Better Auth configuration
│   ├── query/        # Server actions that call the backend API
│   ├── skeleton/     # Loading skeletons
│   └── proxy.ts      # Protects private routes
├── public/           # Static assets
├── next.config.ts
└── package.json
```

## 🔌 API Endpoints

| Method | Route          | Description                      | Access  |
| ------ | -------------- | -------------------------------- | ------- |
| GET    | `/books`       | Get all books                    | Public  |
| GET    | `/books/:id`   | Get one book                     | Private |
| POST   | `/books`       | Add a book                       | Private |
| PATCH  | `/books/:id`   | Update a book                    | Private |
| DELETE | `/books/:id`   | Delete a book                    | Private |
| POST   | `/borrows`     | Borrow a book                    | Private |
| GET    | `/borrows`     | Get the logged-in user's borrows | Private |
| DELETE | `/borrows/:id` | Return a book                    | Private |

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm (`npm install -g pnpm`)
- MongoDB (local or MongoDB Atlas)
- Google OAuth credentials (for Google sign-in)
- An imgbb or postimage API key (for image uploads)
- The BookNook server running (see the server repository)

### 1. Clone and install

```bash
git clone https://github.com/aburaihan490/booknook-UI.git
cd booknook-UI
pnpm install
```

### 2. Set environment variables

Create a `.env` file in the project root:

```env
MONGODB_URL=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> [ ] Add any image upload key variable your code uses (for example, the imgbb API key).

### 3. Run the server

Start the Express backend from its repository. It runs on port 5000 by default.

```bash
cd ../server
pnpm install
pnpm dev
```

### 4. Run the client

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command      | Description                  |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start the development server |
| `pnpm build` | Create a production build    |
| `pnpm start` | Start the production server  |
| `pnpm lint`  | Run ESLint                   |

## 🌐 Deployment

The client and server are both deployed on [ [ ] Vercel / Render ].

When you deploy, set these values in your hosting dashboard:

- On the client: set `BETTER_AUTH_URL` and `NEXT_PUBLIC_BACKEND_BASE_URL` to your production URLs.
- On the server: set the same MongoDB and auth variables used by the server.
- In Google Cloud Console, add your production callback URL to the OAuth client.

## 📄 License

[ ] Add a license (for example, MIT).
