# NASA Space Biology Knowledge Graph

A modern React.js website for NASA's Space Biology Knowledge Graph with dark blue theme, bright yellow-green accents, and smooth animations. This project provides a comprehensive search interface for NASA space biology research data, publications, and resources.

## 🚀 Project Overview

This website serves as a centralized platform for accessing NASA's space biology research data, including:
- Research publications and papers
- OSDR (Open Science Data Repository) datasets
- NASA Task Book grants information
- Space Life Sciences Library resources
- Mission-specific data

## 🎨 Design System

### Color Scheme
- **Dark Blue**: `#0A2463` (Header & Background Sections)
- **Bright Yellow-Green**: `#E6F400` (Buttons & Highlights)
- **Black/Near Black**: `#0E0E0E` or `#111111` (Main Content Background)
- **White**: `#FFFFFF` (Main Text)
- **Light Gray**: `#F5F5F5` / `#E0E0E0` (Tab Backgrounds)

### Typography
- Modern, clean fonts with professional appearance
- Consistent spacing and sizing throughout
- Accessible contrast ratios

## 📁 Project Structure

```
e:\Nasa\
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Header.css
│   │   ├── Hero.jsx            # Landing section with space imagery
│   │   ├── Hero.css
│   │   ├── KnowledgeGraph.jsx  # Main knowledge graph visualization
│   │   ├── KnowledgeGraph.css
│   │   ├── SearchPage.jsx      # Comprehensive search interface
│   │   ├── SearchPage.css
│   │   ├── Welcome.jsx         # Welcome section
│   │   ├── Welcome.css
│   │   ├── Footer.jsx          # Site footer
│   │   └── Footer.css
│   ├── services/               # Backend integration layer
│   │   ├── api.js              # API configuration and endpoints
│   │   ├── apiService.js       # Base API service class
│   │   ├── searchService.js    # Search-specific API calls
│   │   ├── userService.js      # Authentication and user management
│   │   └── nasaDataService.js  # NASA data sources integration
│   ├── hooks/                  # Custom React hooks
│   │   ├── useSearch.js        # Search functionality hook
│   │   └── useAuth.js          # Authentication hook
│   ├── models/                 # Data models and interfaces
│   │   └── dataModels.js       # TypeScript-like data structures
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Global styles
│   ├── index.css               # Root styles and CSS variables
│   └── main.jsx                # Application entry point
├── .github/
│   └── copilot-instructions.md # Project guidance and requirements
├── BACKEND_INTEGRATION_GUIDE.md # Backend team integration guide
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **Frontend**: React.js 18+ with Vite
- **Styling**: CSS3 with CSS Variables
- **Build Tool**: Vite (Fast HMR and optimized builds)
- **Package Manager**: npm
- **State Management**: React useState and useEffect hooks
- **API Integration**: Fetch API with service layer architecture

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd e:\Nasa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173/`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🔍 Key Features

### 1. Hero Section
- Professional space-themed imagery
- Text-based icons for Research, AI, and Mission
- Clean, modern design without excessive animations
- Responsive layout

### 2. Search Interface
- **Real-time search** across 608+ NASA publications
- **Advanced filtering** by:
  - Content Type (Research Papers, OSDR Data, Grants, etc.)
  - Date Range
  - Mission/Project
- **Active filter display** with easy removal
- **Loading states** with spinner animations
- **Error handling** with retry functionality
- **No results state** with helpful suggestions

### 3. Knowledge Graph Visualization
- Interactive data visualization
- Node-based representation of research connections
- Smooth animations and transitions

### 4. Backend Integration Ready
- Complete service layer architecture
- API configuration with endpoints
- Custom React hooks for data fetching
- Error handling and loading states
- Mock data fallbacks for development

## 🔌 Backend Integration

This project is designed to seamlessly integrate with a backend API. The frontend includes:

### Service Layer
- **APIService**: Base class for all API communications
- **SearchService**: Handles search queries and filtering
- **UserService**: Authentication and user management
- **NASADataService**: NASA-specific data source integration

### Custom Hooks
- **useSearch**: Manages search state, queries, and results
- **useAuth**: Handles authentication state and JWT tokens

### Data Models
- Defined interfaces for all data structures
- Consistent typing across components
- Easy to extend and modify

### Environment Configuration
Set up your environment variables in `.env`:
```env
VITE_API_BASE_URL=https://your-backend-api.com
VITE_ENVIRONMENT=development
```

## 📊 Data Sources

The platform integrates with multiple NASA data sources:

1. **NASA Open Science Data Repository (OSDR)**
   - Primary datasets from space biology experiments
   - Metadata and experimental details

2. **NASA Space Life Sciences Library**
   - Research publications and papers
   - Historical space biology literature

3. **NASA Task Book**
   - Grant information and funding details
   - Research project descriptions

4. **Mission-Specific Data**
   - Data from specific space missions
   - Experiment results and findings

## 🎯 Search Functionality

### Features
- **Text Search**: Search across titles, abstracts, and content
- **Content Type Filters**: Research Papers, OSDR Data, Task Book Grants, etc.
- **Date Range Filtering**: Custom date range selection
- **Mission Filtering**: Filter by specific NASA missions
- **Real-time Results**: Instant search as you type
- **Result Count**: Live count of filtered results

### Search Results Include
- Title and type classification
- Author information and publication date
- Abstract/description
- Relevant tags and keywords
- OSDR IDs and Grant IDs
- Direct links to data sources

## 🔧 Customization

### Adding New Components
1. Create component file in `src/components/`
2. Add corresponding CSS file
3. Import and use in `App.jsx`
4. Follow existing naming conventions

### Modifying Styles
- Global styles: `src/index.css`
- Component styles: Individual CSS files
- CSS variables defined in `index.css` for consistency

### Extending API Integration
1. Add new service in `src/services/`
2. Create custom hook in `src/hooks/`
3. Define data models in `src/models/dataModels.js`
4. Update API endpoints in `src/services/api.js`

## 🤝 Contributing

### For Frontend Developers
1. Follow the existing component structure
2. Use CSS variables for consistent styling
3. Implement proper loading and error states
4. Write descriptive component and function names

### For Backend Developers
1. Review `BACKEND_INTEGRATION_GUIDE.md`
2. Implement endpoints matching `src/services/api.js`
3. Follow data models defined in `src/models/dataModels.js`
4. Support the search and filtering requirements

## 📱 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interface elements
- Optimized for tablets and desktops

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build outputs to the `dist/` directory and can be deployed to any static hosting service.

## 🔒 Security Considerations

- JWT token handling in authentication
- Secure API communications
- Input validation and sanitization
- CORS configuration ready
- Environment variable protection

## 📈 Performance

- Vite for fast development and optimized builds
- Component-based architecture for efficient re-rendering
- Lazy loading considerations for large datasets
- CSS optimization and minimal bundle size
- Image optimization for space-themed assets

## 🐛 Troubleshooting

### Common Issues

1. **Development server won't start**
   - Check Node.js version (16+)
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall

2. **Search not working**
   - Check console for API errors
   - Verify backend connection
   - Check environment variables

3. **Styling issues**
   - Clear browser cache
   - Check CSS variable definitions
   - Verify import statements

## 📞 Support

For technical support or questions:
- Review the `BACKEND_INTEGRATION_GUIDE.md`
- Check component documentation in individual files
- Review the project structure and naming conventions

## 🔮 Future Enhancements

- Advanced data visualization features
- User personalization and saved searches
- Real-time collaboration features
- Enhanced mobile experience
- Integration with additional NASA data sources
- AI-powered search suggestions

---

**NASA Space Biology Knowledge Graph** - Connecting space biology research for the future of exploration. 🚀

*Last updated: October 2025*
#   n a s a  
 