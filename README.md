
# Online Wallet Management Web App

## Description

The Online Wallet Management Web App is a comprehensive platform designed to streamline the management of personal finances. It offers users a secure and efficient way to handle their money through features such as money transfer, deposit, request handling, and transaction tracking. For administrators, the app provides tools to verify and manage user accounts effectively.

## Features

### User Features

- **Transfer Money**: Easily send money to other users within the platform.
- **Deposit Funds**: Add money to your wallet from linked bank accounts or credit cards.
- **Request Money**: Send requests to other users for money.
- **Accept or Reject Money Requests**: Manage incoming requests by either accepting or rejecting them.
- **Check Balance**: View current wallet balance in real-time.
- **Transaction History**: Access detailed logs of all past transactions for tracking and management.

### Admin Features

- **Verify Users**: Admins can verify new users to ensure compliance and security.
- **Suspend Users**: Temporarily or permanently disable user accounts in case of any discrepancies or breaches.

## Target Audience

This app is suited for:
- Individuals seeking efficient, digital solutions for financial management.
- Students, professionals, and families who need to manage their finances effectively and securely.

## Working Project

- **Frontend:** Access the live version of the frontend application by clicking the link below. It demonstrates the user interface and interactions with the application.
  [Frontend Application](https://sssf-project-3834f9021ba7.herokuapp.com/home "Frontend")

- **Backend (Sandbox):** Explore the backend functionalities through the GraphQL sandbox. This allows you to run queries and mutations directly against the backend services.
  [GraphQL Sandbox](https://studio.apollographql.com/public/Noppanun-Pornwattanayingkul/variant/current/explorer "Graphql Sandbox")

## Getting Started

### Installing

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ninenpn/SSSF-project.git
cd SSSF-project
npm install
```

### Configuring

Set up the necessary environment variables in a `.env` file in the project root:

```plaintext
DATABASE_URL=mongodb://localhost:27017/yourDatabase
JWT_SECRET=yourSecretKey
stripe_key = sk_test_ExAMPLEKEY
```

### Running the Application

Start the server with:

```bash
nodemon server/server
```

Start the frontend with:

```bash
cd client
npm start
```

Access the application through your web browser at `http://localhost:3000`.

## Testing

To test the application, follow the steps below:

### For Users
1. **Registration and Login:** Start by registering a new account on the platform. After registration, log in using your credentials.
2. **Deposit Funds:** To deposit funds, navigate to the 'Deposit' section. Use the following test card details from Stripe for testing payments  [Stripe Testing Documentation](https://docs.stripe.com/testing?testing-method=card-numbers):
   - **Card Number:** `4242 4242 4242 4242`
   - **CVV:** Any 3 digits
   - **Expiration Date:** Any future date
3. **Transfer Money:** Once you have funds, you can transfer money to other users by navigating to the 'Transfer' section.
4. **Request Money:** Use the 'Request' feature to ask other users for money.

### For Admins
1. **Admin Login:** Use the following credentials to log in as an administrator:
   - **Email:** `admin@mail.com`
   - **Password:** `123456`
2. **Verify and Suspend Users:** As an admin, you can verify new users and suspend accounts as needed.

This setup allows you to thoroughly test both user and admin functionalities within the application.

## Demo
[Watch the Demo Video](https://drive.google.com/file/d/11r02jRe2L5AnlWeFPXOlb6ljco9tTuLW/view?usp=sharing "Watch the Demo")

## Usage

### For Users

- **Transfer Money**: Navigate to the 'Transfer' section to send money to other users.
- **Deposit Funds**: Use the 'Deposit' tab to add funds to your wallet.

### For Admins

- **Verify Users**: Check the 'Admin' section under 'User Management' to verify new sign-ups.
- **Suspend Users**: In the 'Admin' panel, select users to suspend their access if necessary.


