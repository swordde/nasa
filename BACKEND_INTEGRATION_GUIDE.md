# NASA Space Biology Backend Integration Guide

## 🚀 Quick Start for Backend Team

This frontend is ready for backend integration with a clean API layer. Here's everything you need to know:

## 📁 Project Structure

```
src/
├── config/
│   └── api.js              # API configuration & endpoints
├── models/
│   └── dataModels.js       # Data structure definitions
├── services/
│   ├── apiService.js       # Base API service class
│   ├── searchService.js    # Search-related API calls
│   ├── userService.js      # User authentication & management
│   └── nasaDataService.js  # NASA data sources integration
├── hooks/
│   ├── useSearch.js        # Search functionality hooks
│   └── useAuth.js          # Authentication hooks
└── components/             # React components (already implemented)
```

## 🔧 Configuration

### 1. Environment Variables
Create a `.env` file in the root directory:

```bash
# Backend API URL
REACT_APP_API_BASE_URL=http://localhost:3001/api

# Optional: Enable development mock data
NODE_ENV=development
```

### 2. API Endpoints Structure
All endpoints are defined in `src/config/api.js`:

```javascript
{
  // Search & Publications
  search: '/search',
  publications: '/publications',
  filters: '/filters',
  
  // User Management
  auth: '/auth',
  users: '/users',
  profile: '/profile',
  
  // NASA Data Sources
  osdr: '/osdr',
  taskBook: '/task-book',
  spaceLifeLibrary: '/space-life-library',
  
  // Knowledge Graph
  knowledgeGraph: '/knowledge-graph',
  insights: '/insights',
  
  // Analytics
  analytics: '/analytics',
  stats: '/stats'
}
```

## 📊 Required API Endpoints

### 1. Search API

#### `POST /api/search`
**Request:**
```json
{
  "query": "microgravity plant biology",
  "filters": {
    "contentTypes": ["research-papers", "datasets"],
    "missions": ["mars", "iss"],
    "dateRange": {
      "start": "2020-01-01",
      "end": "2024-12-31"
    },
    "tags": ["plant biology", "microgravity"],
    "authors": ["Dr. Smith"]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "sortBy": "date",
    "sortOrder": "desc"
  }
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "pub_123",
      "title": "Effects of Microgravity on Plant Cell Wall Formation",
      "type": "Research Papers",
      "authors": "Dr. Sarah Martinez, Dr. Chen Liu",
      "date": "2024-08-15",
      "journal": "Life Sciences in Space Research",
      "abstract": "This study investigates...",
      "tags": ["microgravity", "plant biology", "mars mission"],
      "osdrId": "GLDS-394",
      "missions": ["mars"],
      "metadata": {
        "doi": "10.1016/j.lssr.2024.08.001",
        "citations": 15,
        "downloads": 1250,
        "lastUpdated": "2024-08-15T10:30:00Z"
      }
    }
  ],
  "totalCount": 156,
  "page": 1,
  "totalPages": 8,
  "hasMore": true,
  "queryTime": 45
}
```

### 2. Filter Options API

#### `GET /api/filters`
**Response:**
```json
{
  "contentTypes": [
    { "id": "research-papers", "label": "Research Papers", "count": 608 },
    { "id": "datasets", "label": "OSDR Data", "count": 234 }
  ],
  "missions": [
    { "id": "moon", "label": "Moon Missions" },
    { "id": "mars", "label": "Mars Exploration" }
  ],
  "dateRange": {
    "min": "2000-01-01",
    "max": "2024-12-31"
  },
  "tags": ["microgravity", "plant biology", "radiation"],
  "authors": ["Dr. Smith", "Dr. Johnson"]
}
```

### 3. Authentication API

#### `POST /api/auth/login`
**Request:**
```json
{
  "email": "researcher@nasa.gov",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "email": "researcher@nasa.gov",
    "firstName": "Jane",
    "lastName": "Smith",
    "institution": "NASA Ames Research Center",
    "researchArea": "Plant Biology",
    "role": "scientist"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

## 🔌 Frontend Integration Points

### 1. Search Component Integration
The `SearchPage.jsx` component is ready to use the search API:

```javascript
// Current implementation in SearchPage.jsx
import { useSearch, useFilters } from '../hooks/useSearch.js';

const SearchPage = () => {
  const { searchResults, loading, search } = useSearch();
  const { filters } = useFilters();
  
  // Component automatically calls backend APIs
  // No changes needed when backend is connected
};
```

### 2. Authentication Integration
The `UserProfile.jsx` component uses auth hooks:

```javascript
import { useAuth } from '../hooks/useAuth.js';

const UserProfile = () => {
  const { user, login, register, logout } = useAuth();
  
  // Authentication flows already implemented
  // Just needs backend endpoints
};
```

## 🧪 Testing & Development

### 1. Mock Data
The system includes mock data for development. When backend is not available, it automatically returns sample data.

### 2. Error Handling
All services include comprehensive error handling and logging.

### 3. Authentication
JWT token management is implemented with automatic header injection.

## 🚀 Backend Implementation Priority

### Phase 1: Core Search (High Priority)
1. `POST /api/search` - Main search functionality
2. `GET /api/filters` - Filter options
3. `GET /api/publications` - Publication listing

### Phase 2: User Management (Medium Priority)
1. `POST /api/auth/login` - User authentication
2. `POST /api/auth/register` - User registration
3. `GET /api/profile` - User profile

### Phase 3: NASA Data Integration (Low Priority)
1. `GET /api/osdr/:id` - OSDR data integration
2. `GET /api/task-book/:id` - Task Book integration
3. `GET /api/stats` - Dashboard statistics

## 🔄 Switching from Mock to Real Data

1. Update `REACT_APP_API_BASE_URL` in `.env`
2. Implement backend endpoints with matching request/response formats
3. Remove mock data from `apiService.js` (optional)
4. Test with real data

## 📝 Database Schema Suggestions

Based on the data models, here's a suggested database structure:

### Publications Table
```sql
CREATE TABLE publications (
  id VARCHAR(50) PRIMARY KEY,
  title TEXT NOT NULL,
  type ENUM('Research Papers', 'OSDR Data', 'Task Book Grants', 'Space Life Sciences', 'Mission Data'),
  authors TEXT,
  publication_date DATE,
  journal VARCHAR(255),
  abstract TEXT,
  osdr_id VARCHAR(50),
  grant_id VARCHAR(50),
  doi VARCHAR(100),
  citations INT DEFAULT 0,
  downloads INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tags Table (Many-to-Many)
```sql
CREATE TABLE publication_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  publication_id VARCHAR(50),
  tag VARCHAR(100),
  FOREIGN KEY (publication_id) REFERENCES publications(id)
);
```

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  institution VARCHAR(255),
  research_area VARCHAR(255),
  role ENUM('scientist', 'manager', 'architect', 'admin') DEFAULT 'scientist',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
```

## 🤝 Need Help?

If you need assistance with:
- API endpoint implementation
- Data format clarification
- Frontend integration
- Testing strategies

Feel free to reach out! The frontend is designed to be backend-agnostic and easy to integrate.

## 📚 Additional Resources

- All data models are documented in `src/models/dataModels.js`
- API service examples in `src/services/`
- React hooks for easy integration in `src/hooks/`
- Frontend components ready to use the APIs