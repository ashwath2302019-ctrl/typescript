200 OK
Meaning: The request was successful, and the server returned the requested data.
When is it used? Whenever a request is completed successfully.
Real-world example: A user opens an online shopping website and requests the list of products. The server successfully sends back the product list, so it responds with 200 OK.

201 Created
Meaning: The request was successful, and a new resource was created on the server.
When is it used? After creating new data using a POST request.
Real-world example: A user fills out a registration form and clicks Sign Up. The server creates a new account in the database and responds with 201 Created.

400 Bad Request
Meaning: The server cannot process the request because the client sent invalid or incomplete data.
When is it used? When the request has missing fields, incorrect data, or invalid syntax.
Real-world example: A user submits a registration form without entering an email address. Since the email is required, the server responds with 400 Bad Request.

401 Unauthorized
Meaning: The user is not authenticated or has provided invalid login credentials.
When is it used? When the user must log in before accessing a protected resource.
Real-world example: A user tries to access their bank account page without logging in. The server responds with 401 Unauthorized, asking the user to authenticate first.

403 Forbidden
Meaning: The user is authenticated, but they do not have permission to access the requested resource.
When is it used? When the server understands the request but refuses to allow access.
Real-world example: An employee logs into a company website and tries to access the admin dashboard. Although they are logged in, they do not have admin privileges, so the server returns 403 Forbidden.

404 Not Found
Meaning: The requested resource or URL does not exist on the server.
When is it used? When the requested page, file, or API endpoint cannot be found.
Real-world example: A user types www.example.com/products/9999, but no product with ID 9999 exists. The server responds with 404 Not Found.

500 Internal Server Error
Meaning: The server encountered an unexpected problem while processing the request.
When is it used? When something goes wrong on the server that prevents it from completing the request.
Real-world example: A user tries to log in, but the server cannot connect to the database due to a technical issue. Instead of completing the login, the server responds with 500 Internal Server Error.

Difference among various content types
text/plain
Sends normal text.
Browser displays it as plain text.

text/html
Sends HTML content.
Browser reads tags like <h1>, <p>, <button>.

application/json
Sends JSON data.
Used mostly in APIs.