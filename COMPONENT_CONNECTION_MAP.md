# Project Component Connection Map

## 🔗 How Everything Connects

This document shows how all the components, services, and files work together in the NASA Space Biology Knowledge Graph project.

## 📊 Component Hierarchy

```
App.jsx (Root Component)
├── Header.jsx (Navigation)
├── Hero.jsx (Landing Section)
├── KnowledgeGraph.jsx (Main Visualization)
├── SearchPage.jsx (Search Interface)
│   ├── Uses: useSearch.js hook
│   ├── Calls: searchService.js
│   └── Renders: Search results with filters
├── Welcome.jsx (Welcome Section)
└── Footer.jsx (Site Footer)
```

## 🔄 Data Flow

### 1. Search Functionality Flow
```
User Input (SearchPage.jsx) 
    ↓
useSearch.js (Custom Hook)
    ↓
searchService.js (API Service)
    ↓
apiService.js (Base Service)
    ↓
api.js (Endpoint Configuration)
    ↓
Backend API (Future Integration)
```

### 2. Authentication Flow
```
User Login (Future Component)
    ↓
useAuth.js (Custom Hook)
    ↓
userService.js (User Service)
    ↓
apiService.js (Base Service)
    ↓
JWT Token Storage
```

## 🗂️ File Relationships

### Core Components
- `App.jsx` → Imports all main components
- `App.css` → Global component styles
- `index.css` → CSS variables and root styles

### Search System
- `SearchPage.jsx` → Main search interface
- `SearchPage.css` → Search-specific styles
- `useSearch.js` → Search state management
- `searchService.js` → Search API calls
- `dataModels.js` → Data structure definitions

### Service Layer
- `api.js` → Base URL and endpoint definitions
- `apiService.js` → Core API communication class
- `searchService.js` → Search-specific API methods
- `userService.js` → Authentication methods
- `nasaDataService.js` → NASA data integration

### Custom Hooks
- `useSearch.js` → Search functionality
- `useAuth.js` → Authentication state

## 🔌 Integration Points

### Frontend to Backend
1. **API Configuration** (`src/services/api.js`)
   - Contains all endpoint URLs
   - Configurable base URL
   - HTTP method definitions

2. **Service Classes** (`src/services/`)
   - Handle all backend communication
   - Error handling and retries
   - Mock data fallbacks

3. **Data Models** (`src/models/dataModels.js`)
   - Define expected data structures
   - Type safety for development
   - Backend contract definitions

### Component Communication
1. **Props Down, Events Up**
   - Parent components pass data as props
   - Child components emit events to parents
   - State management in appropriate levels

2. **Custom Hooks**
   - Shared logic across components
   - Centralized state management
   - Reusable API calls

## 🎯 Key Integration Patterns

### 1. Service Layer Pattern
```javascript
// Component uses hook
const { results, loading, error } = useSearch(query);

// Hook uses service
const searchService = new SearchService();
const data = await searchService.search(query);

// Service uses API
const response = await APIService.get('/search', params);
```

### 2. Error Handling Pattern
```javascript
// Service level
try {
  const data = await api.call();
  return { data, error: null };
} catch (error) {
  return { data: null, error: error.message };
}

// Component level
if (error) {
  return <ErrorComponent message={error} />;
}
```

### 3. Loading State Pattern
```javascript
// Hook manages loading state
const [loading, setLoading] = useState(false);

// Component shows loading UI
if (loading) {
  return <LoadingSpinner />;
}
```

## 🔧 Development Workflow

### Adding New Features
1. **Define Data Model** in `dataModels.js`
2. **Create Service** in `services/` directory
3. **Add API Endpoints** to `api.js`
4. **Create Custom Hook** in `hooks/`
5. **Build Component** in `components/`
6. **Add Styles** with corresponding CSS file
7. **Integrate** into main `App.jsx`

### Backend Integration Steps
1. **Review** `BACKEND_INTEGRATION_GUIDE.md`
2. **Implement** endpoints matching `api.js`
3. **Follow** data models in `dataModels.js`
4. **Test** with frontend service layer
5. **Update** environment variables

## 📦 Dependency Map

### Direct Dependencies
- React → All components
- Vite → Build system
- CSS Variables → All styling

### Internal Dependencies
- Components → Services → API
- Hooks → Services → Models
- Styles → CSS Variables

### External Dependencies (Future)
- Backend API → Service Layer
- Database → Backend API
- Authentication → JWT Tokens

## 🔍 Search Feature Deep Dive

### Component Breakdown
```
SearchPage.jsx
├── Search Input (Real-time)
├── Filter Sidebar
│   ├── Content Type Filters
│   ├── Date Range Picker
│   └── Mission Filters
├── Active Filters Display
├── Results List
│   ├── Loading States
│   ├── Error States
│   └── Result Cards
└── NASA Resources Section
```

### Data Flow
1. User types in search input
2. `useSearch` hook captures input
3. Debounced search triggers service call
4. `searchService` formats request
5. `apiService` makes HTTP request
6. Results update component state
7. UI re-renders with new data

## 🔐 Security Considerations

### Frontend Security
- Input validation in components
- XSS prevention in rendering
- Secure token storage in hooks
- HTTPS enforcement in services

### API Security
- JWT token validation
- Request rate limiting
- Input sanitization
- CORS configuration

## 📈 Performance Optimization

### Component Level
- React.memo for expensive components
- useCallback for stable functions
- useMemo for computed values
- Lazy loading for large datasets

### Service Level
- Request debouncing
- Response caching
- Retry mechanisms
- Connection pooling

## 🔮 Future Connections

### Planned Integrations
1. **Real Backend API** → Service layer ready
2. **User Authentication** → Hooks prepared
3. **Advanced Visualizations** → Component structure supports
4. **Mobile App** → Service layer reusable
5. **AI Features** → Data models extensible

### Scalability Considerations
- Modular component architecture
- Separation of concerns
- Configurable API endpoints
- Extensible data models
- Flexible styling system

---

This connection map helps developers understand how all pieces fit together and guides both frontend and backend development efforts.