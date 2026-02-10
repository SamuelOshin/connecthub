# ConnectHub Frontend

Next.js frontend for the ConnectHub dating application. Built with React 19, Tailwind CSS v4, and Shadcn UI.

## Prerequisites

-   **Node.js 18+**
-   **npm** (Node Package Manager)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd connecthub/connecthub_fe
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Configuration:**

    Copy the example environment file:

    ```bash
    cp .env.example .env.local
    ```

    Update `.env.local` with your API URL and other configuration settings.

## Running the Application

### Development Server

Run the development server with hot-reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Linting

Run the linter to catch errors and enforce code style:

```bash
npm run lint
```

## Key Technologies

-   **Next.js 15 (App Router)**
-   **React 19**
-   **Tailwind CSS v4**
-   **Shadcn UI**
-   **Framer Motion**
-   **React Query**
-   **Zustand** (State Management)
