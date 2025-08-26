const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for todos
let todos = [];
let nextId = 1;

// Helper function to validate date format (ISO 8601)
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date) && dateString === date.toISOString();
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString();
};

// Helper function to find todo by ID
const findTodoById = (id) => {
  return todos.find(todo => todo.id === parseInt(id));
};

// Routes

// GET /api/todos - Get all todos
app.get('/api/todos', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: todos,
      count: todos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/todos/:id - Get a specific todo by ID
app.get('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format. ID must be a number.'
      });
    }

    const todo = findTodoById(id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: `Todo with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/todos - Create a new todo
app.post('/api/todos', (req, res) => {
  try {
    const { task, datetime, completed } = req.body;

    // Validation
    if (!task || typeof task !== 'string' || task.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Task is required and must be a non-empty string'
      });
    }

    if (!datetime) {
      return res.status(400).json({
        success: false,
        error: 'Datetime is required'
      });
    }

    if (!isValidDate(datetime)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid datetime format. Please use ISO 8601 format (e.g., 2023-12-25T10:30:00.000Z)'
      });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'Completed status must be a boolean value'
      });
    }

    // Create new todo
    const newTodo = {
      id: nextId++,
      task: task.trim(),
      datetime: formatDate(datetime),
      completed: completed || false
    };

    todos.push(newTodo);

    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { task, datetime, completed } = req.body;

    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format. ID must be a number.'
      });
    }

    const todo = findTodoById(id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: `Todo with ID ${id} not found`
      });
    }

    // Validation for updates
    if (task !== undefined) {
      if (typeof task !== 'string' || task.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Task must be a non-empty string'
        });
      }
      todo.task = task.trim();
    }

    if (datetime !== undefined) {
      if (!isValidDate(datetime)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid datetime format. Please use ISO 8601 format (e.g., 2023-12-25T10:30:00.000Z)'
        });
      }
      todo.datetime = formatDate(datetime);
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return res.status(400).json({
          success: false,
          error: 'Completed status must be a boolean value'
        });
      }
      todo.completed = completed;
    }

    res.status(200).json({
      success: true,
      data: todo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format. ID must be a number.'
      });
    }

    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Todo with ID ${id} not found`
      });
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];

    res.status(200).json({
      success: true,
      data: deletedTodo,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Todo API is running',
    timestamp: new Date().toISOString()
  });
});

// Handle 404 for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Todo API is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   GET    /api/todos     - Get all todos`);
  console.log(`   GET    /api/todos/:id - Get todo by ID`);
  console.log(`   POST   /api/todos     - Create new todo`);
  console.log(`   PUT    /api/todos/:id - Update todo`);
  console.log(`   DELETE /api/todos/:id - Delete todo`);
  console.log(`   GET    /api/health    - Health check`);
});

module.exports = app;
