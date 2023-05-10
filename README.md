# Credit Allocation Site

The Credit Allocation module is a web application that allows employees of a fictional bank -- Neptune --

1.  to process customer applications for commercial loans,
2.  automatically calculate the credit score for each customer by taking into account parameters such as occupation, sector and work experience,
3.  allocate a priority for each application, and
4.  send processed customer application data to Pipedrive.

Employees of the fictional Neptune bank may also add/remove sector and occupations and edit sector and occupation scores, which in turn determine the credit score and the priority for each customer to be contacted by the customer support team, who may reach loan application data from Pipedrive.

Besides, users who are authorized as admins may also add custom prioritization logics, which would supersede existing credit score calculations.

## Installation

To run the Credit Allocation Site on your local machine, follow these steps:

1. Clone this repository: `git clone https://github.com/yigitzarbun/credit-allocation.git`
2. Install dependencies: `npm install`
3. Set up environment variables by creating a `.env` file in the root directory of the project. The file should include the following variables:
   ```
   TYPEFORM_API_KEY=<typeform API key>
   PIPELINE_ID=<Pipedrive pipeline ID>
   PIPEDRIVE_API_KEY=<Pipedrive API key>
   ```
4. Start the app: `npm start`
5. Start the server: `npm run server` (which runs on PORT: 9000)
6. Open your browser and go to `http://localhost:3000`

## Usage

Initially send a post request to `http://localhost:9000/api/users/register` with the following body details:

{
"email": "YOUR EMAIL",
"fname": "FIRST NAME",
"lname": "LAST NAME",
"password": "PASSWORD",
"role_name": "admin"
}

As a result, the account holder will be authenticated and authorized as an admin upon signing in. Next, the admin may add other employees, who'd be regarded as "analyst" and will have view-only permissions.

Here's how to use the Credit Allocation Site:

1. Employees log in to the site using their credentials.
2. They may retreive applications from Typeform via `/unprocessed-loan-requests`.
3. After obtaining applications from Typeform, the data is displayed on the site, where the employee can allocate a priority for the application.
4. The site calculates the credit score and priority based on the sector and occupation scores, which can be edited by the user.
5. The employee can then send the processed customer application data to Pipedrive.

## Contributing

If you want to contribute to the Credit Allocation Site, please submit a pull request. Make sure your code passes the tests before submitting.
