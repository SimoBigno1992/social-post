# social-post

Post Office web app built using React and https://gorest.co.in. The app provides features like user login, registration, backoffice dashboard, post creation, comments, accounts mangaement.

You can find the web application deployed on vercel https://social-post-ycud.vercel.app/

## Features

The app offers the following features:

1. **User Authentication:**

-   Login: Existing users can log in using their credentials. Password is fake, you can type any password.
-   Login Admin: If you want to access to the backoffice page, you can access with any existing email just checking the swith button.
-   Register: New users can create an account by providing necessary information. Password will not be registered, is just for simulate a real flow.

2. **Homepage:**

-   Users can create new posts, comment them and manage their account (edit informations or delete account).

2. **Backoffice:**

-   Admin can see any users, apply filters and pagination to manage datatable, manage any users (changing status or deleting accounts)

## Prerequisites

Before setting up the app, make sure you have the following prerequisites installed:

-   **Node.js**: Install Node.js from the official website (https://nodejs.org) or use a package manager like Homebrew (macOS) or Chocolatey (Windows). VNode vesions suggested v20.12.2
-   **yarn**: Install yarn globally by running the following command:

```shell
npm install --global yarn

```

## Getting Started

To get started with the app, follow these steps:

1. **Clone the repository:**

```shell
git https://github.com/SimoBigno1992/social-post.git

cd social-post
```

2. **Install dependencies:**

```shell
yarn
```

5. **Start the app:**

```shell
yarn dev
```