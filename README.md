# Todo List REST API

A comprehensive Todo List REST API built with Node.js and Express.js that supports full CRUD operations with proper error handling and input validation.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete todos
- 🗂️ **In-Memory Storage**: Uses an in-memory array for data persistence during runtime
- 📅 **DateTime Handling**: Proper ISO 8601 datetime parsing and formatting
- ✔️ **Boolean Status**: Complete/incomplete status tracking
- 🛡️ **Input Validation**: Comprehensive validation for all inputs
- 🚨 **Error Handling**: Proper HTTP status codes and error messages
- 🔍 **ID Validation**: Automatic ID generation and validation
- 📋 **API Documentation**: Clear endpoint documentation

## Todo Structure

Each todo contains the following fields:
- `id` (number): Unique identifier (auto-generated)
- `task` (string): The todo task description
- `datetime` (string): ISO 8601 formatted datetime
- `completed` (boolean): Completion status

## Installation

### Prerequisites
- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Setup Steps

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd todo-api-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Verify the API is running**
   - The server will start on `http://localhost:3000`
   - You should see the message: "🚀 Todo API is running on http://localhost:3000"

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint |
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get a specific todo by ID |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update an existing todo |
| DELETE | `/api/todos/:id` | Delete a todo |

## API Usage Examples

### 1. Health Check
**Request:**
```bash
GET /api/health
```
**Response:**
```json
{
  "success": true,
  "message": "Todo API is running",
  "timestamp": "2025-08-27T10:00:00.000Z"
}
```

### 2. Get All Todos
**Request:**
```bash
GET /api/todos
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "task": "Learn Node.js",
      "datetime": "2025-08-27T10:00:00.000Z",
      "completed": false
    }
  ],
  "count": 1
}
```

### 3. Create a New Todo
**Request:**
```bash
POST /api/todos
Content-Type: application/json

{
  "task": "Learn Node.js",
  "datetime": "2025-08-27T10:00:00.000Z",
  "completed": false
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "task": "Learn Node.js",
    "datetime": "2025-08-27T10:00:00.000Z",
    "completed": false
  },
  "message": "Todo created successfully"
}
```

### 4. Update a Todo
**Request:**
```bash
PUT /api/todos/1
Content-Type: application/json

{
  "task": "Master Node.js and Express",
  "completed": true
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "task": "Master Node.js and Express",
    "datetime": "2025-08-27T10:00:00.000Z",
    "completed": true
  },
  "message": "Todo updated successfully"
}
```

### 5. Delete a Todo
**Request:**
```bash
DELETE /api/todos/1
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "task": "Master Node.js and Express",
    "datetime": "2025-08-27T10:00:00.000Z",
    "completed": true
  },
  "message": "Todo deleted successfully"
}
```

## Testing the API

### Using Postman (Recommended)

Postman is the best way to test this REST API. It provides a user-friendly interface and automated testing capabilities.

#### Quick Start with Postman

1. **Start the API server:**
   ```bash
   npm start
   ```

2. **Import the Postman collection:**
   - Open Postman
   - Click "Import" button
   - Select "Upload Files"
   - Choose the `Todo-API-Postman-Collection.json` file from this project

3. **Run all tests automatically:**
   - Click the three dots next to "Todo API Tests" collection
   - Select "Run collection"
   - Click "Run Todo API Tests"
   - Watch all 12 tests execute with pass/fail results

#### Manual Testing in Postman

1. **Download and Install Postman**
   - Visit [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
   - Download and install Postman for your operating system

2. **Import the Collection (Easy Method)**
   - Open Postman
   - Click "Import" button
   - Select "Upload Files"
   - Choose the `Todo-API-Postman-Collection.json` file from this project
   - The collection will be imported with all test cases and environment variables

3. **Manual Collection Setup (Alternative)**
   - Create a New Collection: Click "New" → "Collection"
   - Name it "Todo API Tests"
   - Set Base URL as variable: `{{baseUrl}}` = `http://localhost:3000/api`

#### Postman Test Requests

**1. Health Check**
- **Method:** GET
- **URL:** `{{baseUrl}}/health`
- **Expected Response:** Status 200
```json
{
  "success": true,
  "message": "Todo API is running",
  "timestamp": "2025-08-27T10:00:00.000Z"
}
```

**2. Get All Todos (Empty)**
- **Method:** GET
- **URL:** `{{baseUrl}}/todos`
- **Expected Response:** Status 200
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

**3. Create First Todo**
- **Method:** POST
- **URL:** `{{baseUrl}}/todos`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "task": "Learn Node.js",
  "datetime": "2025-08-27T10:00:00.000Z",
  "completed": false
}
```
- **Expected Response:** Status 201
```json
{
  "success": true,
  "data": {
    "id": 1,
    "task": "Learn Node.js",
    "datetime": "2025-08-27T10:00:00.000Z",
    "completed": false
  },
  "message": "Todo created successfully"
}
```

**4. Create Second Todo**
- **Method:** POST
- **URL:** `{{baseUrl}}/todos`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "task": "Build REST API",
  "datetime": "2025-08-27T14:30:00.000Z",
  "completed": true
}
```

**5. Get All Todos (Should have 2)**
- **Method:** GET
- **URL:** `{{baseUrl}}/todos`
- **Expected Response:** Status 200 with 2 todos

**6. Get Todo by ID**
- **Method:** GET
- **URL:** `{{baseUrl}}/todos/1`
- **Expected Response:** Status 200 with specific todo

**7. Update Todo**
- **Method:** PUT
- **URL:** `{{baseUrl}}/todos/1`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "task": "Master Node.js and Express",
  "completed": true
}
```

**8. Delete Todo**
- **Method:** DELETE
- **URL:** `{{baseUrl}}/todos/2`
- **Expected Response:** Status 200

#### Error Testing in Postman

**Test Invalid ID:**
- **Method:** GET
- **URL:** `{{baseUrl}}/todos/abc`
- **Expected Response:** Status 400
```json
{
  "success": false,
  "error": "Invalid ID format. ID must be a number."
}
```

**Test Invalid Date:**
- **Method:** POST
- **URL:** `{{baseUrl}}/todos`
- **Body:**
```json
{
  "task": "Test invalid date",
  "datetime": "invalid-date",
  "completed": false
}
```
- **Expected Response:** Status 400

**Test Missing Required Fields:**
- **Method:** POST
- **URL:** `{{baseUrl}}/todos`
- **Body:**
```json
{
  "completed": false
}
```
- **Expected Response:** Status 400

#### Running Tests in Postman

1. **Sequential Testing:**
   - Run requests in order (01 through 12)
   - Each request includes automated tests that verify responses
   - Check the "Test Results" tab after each request

2. **Collection Runner:**
   - Click the three dots next to the collection name
   - Select "Run collection"
   - This will run all tests automatically and show a summary

3. **Environment Variables:**
   - The collection automatically stores todo IDs in environment variables
   - This allows requests to reference previously created todos

#### Quick Start with Postman

1. Start your API server: `npm start`
2. Import the `Todo-API-Postman-Collection.json` file
3. Click "Runner" and select the imported collection
4. Click "Run Todo API Tests"
5. Watch all tests execute automatically with pass/fail results

The Postman collection provides the most user-friendly way to test the API, with automated verification and detailed documentation for each endpoint. Users can either run individual requests or execute the entire test suite with a single click!

## Alternative Testing Methods

<details>
<summary>Click to expand alternative testing methods (optional)</summary>

### Using PowerShell Commands (Windows)

1. **Health Check:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method GET
   ```

2. **Create a Todo:**
   ```powershell
   $todo = @{
       task = "Learn Node.js"
       datetime = "2025-08-27T10:00:00.000Z"
       completed = $false
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:3000/api/todos" -Method POST -Body $todo -ContentType "application/json"
   ```

3. **Get All Todos:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/api/todos" -Method GET
   ```

4. **Update a Todo:**
   ```powershell
   $update = @{
       completed = $true
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:3000/api/todos/1" -Method PUT -Body $update -ContentType "application/json"
   ```

5. **Delete a Todo:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:3000/api/todos/1" -Method DELETE
   ```

### Using curl Commands

See `test-examples.md` for comprehensive curl examples, or run the PowerShell script `.\test-api.ps1` for automated testing.

</details>

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes:

- **400 Bad Request**: Invalid input data, malformed JSON, or validation errors
- **404 Not Found**: Todo with specified ID not found or invalid route
- **500 Internal Server Error**: Unexpected server errors

### Common Error Responses

**Invalid ID Format:**
```json
{
  "success": false,
  "error": "Invalid ID format. ID must be a number."
}
```

**Todo Not Found:**
```json
{
  "success": false,
  "error": "Todo with ID 999 not found"
}
```

**Invalid Date Format:**
```json
{
  "success": false,
  "error": "Invalid datetime format. Please use ISO 8601 format (e.g., 2023-12-25T10:30:00.000Z)"
}
```

**Missing Required Fields:**
```json
{
  "success": false,
  "error": "Task is required and must be a non-empty string"
}
```

## Data Validation

### Required Fields for POST requests:
- `task`: Non-empty string
- `datetime`: Valid ISO 8601 datetime string
- `completed`: Boolean (optional, defaults to false)

### Valid Date Format:
- ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Example: `2025-08-27T10:30:00.000Z`

### Update Rules (PUT requests):
- All fields are optional
- Provided fields must meet the same validation rules as POST
- Non-provided fields remain unchanged

## Development

### Available Scripts
- `npm start`: Start the production server
- `npm run dev`: Start the development server with auto-reload (requires nodemon)

### Project Structure
```
todo-api-ai/
├── server.js                          # Main application file
├── package.json                       # Project dependencies and scripts
├── README.md                          # This documentation
├── Todo-API-Postman-Collection.json   # Postman collection for testing (recommended)
├── test-api.ps1                       # PowerShell test script (optional)
└── test-examples.md                   # Curl test examples (optional)
```

## Dependencies

- **express**: Web framework for Node.js
- **cors**: Enable Cross-Origin Resource Sharing

## Notes

- Data is stored in memory and will be lost when the server restarts
- The server runs on port 3000 by default (configurable via PORT environment variable)
- All datetime values are stored and returned in UTC ISO 8601 format
- IDs are auto-generated sequential numbers starting from 1

## License

MIT License - This project is for MEDcury assignment only.
