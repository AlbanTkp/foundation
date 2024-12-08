# GETESFONDATION

## Introduction
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.

## Prerequisites
Make sure you have the following installed on your machine:
- PHP >= 8.1
- Composer
- Node.js with npm

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://gitlab.com/tokponto11057/fondation-farid-danko.git
    cd fondation-farid-danko
    ```

2. **Install PHP dependencies:**
    ```bash
    composer install
    ```

3. **Copy the `.env.example` file to `.env` and edit it with your environment settings:**
    ```bash
    cp .env.example .env
    ```
    Make sure to set up your database credentials and other environment variables.

4. **Generate the application key:**
    ```bash
    php artisan key:generate
    ```

5. **Run migrations and seeders (if any):**
    ```bash
    php artisan migrate --seed
    ```

6. **Install Node.js dependencies:**
    ```bash
    npm install
    ```

## Running the Project

1. **Start the Laravel development server:**
    ```bash
    php artisan serve
    ```

2. **Start the frontend development server:**
    ```bash
    npm run dev
    ```

Now you can access your application at `http://localhost:8000`.

## Additional Commands

- **Compile assets for production:**
    ```bash
    npm run build
    ```

- **Run tests:**
    ```bash
    php artisan test
    ```

## Contributing

Brief guidelines on how to contribute to the project.

## License

Specify the license under which the project is distributed.

---
