# MongoDB + Express + Node.js Learning Path

A comprehensive guide to master MongoDB with Express and Node.js development.

## Phase 1: MongoDB Fundamentals (Week 1-2)

### MongoDB Basics
- **Installation and Setup**
  - Install MongoDB Community Server
  - Set up MongoDB Compass (GUI tool)
  - Configure MongoDB service
  - Understanding MongoDB file structure

- **NoSQL Concepts**
  - NoSQL vs SQL differences
  - Document-oriented database concepts
  - BSON (Binary JSON) format
  - Collections vs Tables
  - Documents vs Rows

- **Basic CRUD Operations**
  - Creating databases and collections
  - Inserting documents (`insertOne`, `insertMany`)
  - Reading documents (`find`, `findOne`)
  - Updating documents (`updateOne`, `updateMany`)
  - Deleting documents (`deleteOne`, `deleteMany`)

### MongoDB Shell Commands
```javascript
// Database operations
use myDatabase
show dbs
db.dropDatabase()

// Collection operations
db.createCollection("users")
show collections
db.users.drop()

// Basic queries
db.users.find()
db.users.find({name: "John"})
db.users.find({age: {$gt: 18}})
```

### Query Operators
- **Comparison**: `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`
- **Logical**: `$and`, `$or`, `$not`, `$nor`
- **Element**: `$exists`, `$type`
- **Array**: `$all`, `$elemMatch`, `$size`

## Phase 2: Node.js + MongoDB Integration (Week 3-4)

### MongoDB Drivers
- **Native MongoDB Driver**
  ```bash
  npm install mongodb
  ```
  
- **Mongoose ODM (Recommended)**
  ```bash
  npm install mongoose
  ```

### Connection Setup
```javascript
// Using Mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});
```

### Schemas and Models
```javascript
// User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
```

### Basic Operations with Node.js
```javascript
// Create
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
});
await newUser.save();

// Read
const users = await User.find();
const user = await User.findById(userId);

// Update
await User.findByIdAndUpdate(userId, { age: 26 });

// Delete
await User.findByIdAndDelete(userId);
```

## Phase 3: Express + MongoDB (Week 5-6)

### RESTful API Setup
```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### Advanced Features
- **Pagination**
  ```javascript
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  ```

- **Search Functionality**
  ```javascript
  const searchTerm = req.query.search;
  const users = await User.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { email: { $regex: searchTerm, $options: 'i' } }
    ]
  });
  ```

- **Validation Middleware**
  ```javascript
  const validateUser = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    next();
  };
  ```

## Phase 4: Advanced MongoDB (Week 7-8)

### Database Design Patterns
- **Embedded Documents**
  ```javascript
  const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments: [{
      text: String,
      author: String,
      createdAt: { type: Date, default: Date.now }
    }]
  });
  ```

- **Referenced Documents**
  ```javascript
  const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  });
  ```

### Indexing
```javascript
// Single field index
userSchema.index({ email: 1 });

// Compound index
userSchema.index({ name: 1, age: -1 });

// Text index for search
userSchema.index({ name: 'text', email: 'text' });
```

### Aggregation Pipeline
```javascript
const userStats = await User.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: {
    _id: '$department',
    averageAge: { $avg: '$age' },
    count: { $sum: 1 }
  }},
  { $sort: { averageAge: -1 } }
]);
```

### Security Best Practices
- **Environment Variables**
  ```javascript
  // .env file
  MONGODB_URI=mongodb://localhost:27017/myapp
  JWT_SECRET=your-secret-key
  
  // Usage
  mongoose.connect(process.env.MONGODB_URI);
  ```

- **Data Sanitization**
  ```bash
  npm install express-mongo-sanitize
  ```

- **Rate Limiting**
  ```bash
  npm install express-rate-limit
  ```

## Practical Projects

### Project 1: Blog API (Week 3-4)
**Features:**
- User registration/login
- Create, read, update, delete posts
- Comment system
- Basic authentication

**Learning Focus:**
- Basic CRUD operations
- Schema relationships
- Error handling

### Project 2: E-commerce Backend (Week 5-6)
**Features:**
- Product catalog
- Shopping cart
- Order management
- User profiles

**Learning Focus:**
- Complex data relationships
- Aggregation queries
- Transaction handling

### Project 3: Social Media API (Week 7-8)
**Features:**
- User posts and feeds
- Following/followers system
- Like and comment functionality
- Real-time notifications

**Learning Focus:**
- Advanced aggregation
- Performance optimization
- Scalability considerations

### Project 4: Real-time Chat Application (Week 8)
**Features:**
- Real-time messaging
- Chat rooms
- Message history
- Online status

**Learning Focus:**
- Socket.io integration
- Real-time data updates
- Connection pooling

## Tools and Resources

### Development Tools
- **MongoDB Compass** - GUI for MongoDB
- **Robo 3T** - Alternative MongoDB GUI
- **Postman** - API testing
- **MongoDB Atlas** - Cloud database service

### Useful Packages
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "validator": "^13.7.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.0.0",
    "supertest": "^6.2.0"
  }
}
```

### Learning Resources
- [MongoDB University](https://university.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express.js Guide](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

## Progress Tracking

### Week 1-2 Checklist
- [ ] Install MongoDB and Node.js
- [ ] Complete basic MongoDB shell operations
- [ ] Understand document structure
- [ ] Practice CRUD operations
- [ ] Learn query operators

### Week 3-4 Checklist
- [ ] Set up Node.js project with MongoDB
- [ ] Create first Mongoose schema
- [ ] Implement basic CRUD with Mongoose
- [ ] Handle errors and validation
- [ ] Build simple CLI application

### Week 5-6 Checklist
- [ ] Create Express REST API
- [ ] Connect API routes to MongoDB
- [ ] Implement authentication
- [ ] Add pagination and search
- [ ] Write API tests

### Week 7-8 Checklist
- [ ] Design complex schemas
- [ ] Implement aggregation queries
- [ ] Optimize database performance
- [ ] Deploy to production
- [ ] Complete final project

## Next Steps After Mastery
- Learn MongoDB Realm for mobile sync
- Explore MongoDB Atlas Search
- Study MongoDB change streams
- Learn about sharding and replication
- Explore other NoSQL databases (Redis, CouchDB)

---

**Remember:** Practice consistently, build real projects, and don't hesitate to experiment with different approaches. The key to mastering MongoDB is hands-on experience combined with understanding the underlying concepts.