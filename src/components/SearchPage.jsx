import React, { useState, useMemo } from 'react';
import DetailModal from './DetailModal.jsx';
import './SearchPage.css';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedMissions, setSelectedMissions] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedResult, setSelectedResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for the search results
  const mockResults = [
    {
      id: 1,
      title: 'Effects of Microgravity on Plant Cell Wall Formation and Root Growth',
      type: 'Research Papers',
      authors: 'Dr. Sarah Martinez, Dr. Chen Liu, Dr. Robert Anderson',
      date: '2024-08-15',
      journal: 'Life Sciences in Space Research',
      abstract: 'This comprehensive study investigates how microgravity environments affect cellular development in Arabidopsis roots, with implications for sustainable agriculture during long-duration space missions to Mars.',
      tags: ['Microgravity', 'Plant Biology', 'Mars Mission', 'Cell Biology'],
      osdrId: 'GLDS-394',
      grantId: 'NNX19AH54G',
      doi: '10.1016/j.lssr.2024.08.001',
      missions: ['mars']
    },
    {
      id: 2,
      title: 'Radiation Protection Strategies for Human Deep Space Exploration',
      type: 'OSDR Data',
      authors: 'NASA Ames Research Center, Johnson Space Center',
      date: '2024-07-22',
      journal: 'NASA Open Science Data Repository',
      abstract: 'Comprehensive analysis of radiation exposure patterns and biological responses during simulated Mars transit missions.',
      tags: ['Radiation Biology', 'Human Health', 'Mars Mission'],
      osdrId: 'GLDS-401',
      missions: ['mars', 'deep-space']
    },
    {
      id: 3,
      title: 'Bone Density Changes in Astronauts: Long-term Implications',
      type: 'Task Book Grants',
      authors: 'Dr. Jennifer Kim, Dr. Michael Torres',
      date: '2024-06-18',
      journal: 'NASA Task Book',
      abstract: 'Analysis of bone density changes in astronauts during extended space missions and implications for Moon base operations.',
      tags: ['Bone Health', 'Human Physiology', 'Moon Mission'],
      grantId: 'NNX20AB15H',
      missions: ['moon', 'iss']
    }
  ];

  // Filter options
  const filters = {
    contentTypes: [
      { id: 'research-papers', label: 'Research Papers', count: 608 },
      { id: 'osdr-data', label: 'OSDR Data', count: 234 },
      { id: 'task-book-grants', label: 'Task Book Grants', count: 89 }
    ],
    missions: [
      { id: 'mars', label: 'Mars Missions', count: 45 },
      { id: 'moon', label: 'Lunar Missions', count: 32 },
      { id: 'iss', label: 'International Space Station', count: 156 },
      { id: 'deep-space', label: 'Deep Space Missions', count: 23 }
    ]
  };

  // Filter the results based on user input
  const filteredResults = useMemo(() => {
    let results = mockResults;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(result => 
        result.title.toLowerCase().includes(query) ||
        result.abstract.toLowerCase().includes(query) ||
        result.authors.toLowerCase().includes(query) ||
        result.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by content types
    if (selectedFilters.length > 0) {
      results = results.filter(result => 
        selectedFilters.includes(result.type.toLowerCase().replace(/\s+/g, '-'))
      );
    }

    // Filter by missions
    if (selectedMissions.length > 0) {
      results = results.filter(result => 
        result.missions && result.missions.some(mission => selectedMissions.includes(mission))
      );
    }

    // Filter by date range
    if (dateRange.start || dateRange.end) {
      results = results.filter(result => {
        const resultDate = new Date(result.date);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;
        
        return (!startDate || resultDate >= startDate) && 
               (!endDate || resultDate <= endDate);
      });
    }

    return results;
  }, [searchQuery, selectedFilters, selectedMissions, dateRange]);

  // Event handlers
  const handleFilterChange = (filterId) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const handleMissionChange = (missionId) => {
    setSelectedMissions(prev => 
      prev.includes(missionId) 
        ? prev.filter(m => m !== missionId)
        : [...prev, missionId]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSelectedMissions([]);
    setDateRange({ start: '', end: '' });
    setSearchQuery('');
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
  };

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-layout">
          {/* Sidebar with filters */}
          <aside className="search-sidebar">
            <div className="sidebar-section">
              <div className="filter-header">
                <h3>Filter Results</h3>
                <button className="clear-filters-btn" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>
              
              <div className="filter-group">
                <h4>Content Type</h4>
                <div className="filter-options">
                  {filters.contentTypes.map(filter => (
                    <label key={filter.id} className="filter-option">
                      <input 
                        type="checkbox" 
                        value={filter.id}
                        checked={selectedFilters.includes(filter.id)}
                        onChange={() => handleFilterChange(filter.id)}
                      />
                      <span className="checkmark"></span>
                      <span className="filter-label">{filter.label}</span>
                      <span className="filter-count">({filter.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Mission Type</h4>
                <div className="filter-options">
                  {filters.missions.map(mission => (
                    <label key={mission.id} className="filter-option">
                      <input 
                        type="checkbox" 
                        value={mission.id}
                        checked={selectedMissions.includes(mission.id)}
                        onChange={() => handleMissionChange(mission.id)}
                      />
                      <span className="checkmark"></span>
                      <span className="filter-label">{mission.label}</span>
                      <span className="filter-count">({mission.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Date Range</h4>
                <div className="date-inputs">
                  <input 
                    type="date" 
                    className="date-input"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    placeholder="Start date"
                  />
                  <input 
                    type="date" 
                    className="date-input"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    placeholder="End date"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main content area */}
          <main className="search-main">
            {/* Search header */}
            <div className="search-header">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search NASA space biology publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button className="search-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </button>
              </div>
              <div className="search-stats">
                <p>Found <strong>{filteredResults.length}</strong> results {searchQuery && `for "${searchQuery}"`}</p>
              </div>
            </div>

            {/* Active filters display */}
            {(selectedFilters.length > 0 || selectedMissions.length > 0 || dateRange.start || dateRange.end) && (
              <div className="active-filters">
                <div className="active-filters-header">
                  <h4>Active Filters:</h4>
                  <button className="clear-all-btn" onClick={clearAllFilters}>Clear All</button>
                </div>
                <div className="filter-tags">
                  {selectedFilters.map(filter => {
                    const filterObj = filters.contentTypes.find(f => f.id === filter);
                    return (
                      <span key={filter} className="filter-tag">
                        {filterObj?.label || filter}
                        <button onClick={() => handleFilterChange(filter)}>×</button>
                      </span>
                    );
                  })}
                  {selectedMissions.map(mission => {
                    const missionObj = filters.missions.find(m => m.id === mission);
                    return (
                      <span key={mission} className="filter-tag">
                        {missionObj?.label || mission}
                        <button onClick={() => handleMissionChange(mission)}>×</button>
                      </span>
                    );
                  })}
                  {dateRange.start && (
                    <span className="filter-tag">
                      From: {dateRange.start}
                      <button onClick={() => setDateRange(prev => ({ ...prev, start: '' }))}>×</button>
                    </span>
                  )}
                  {dateRange.end && (
                    <span className="filter-tag">
                      To: {dateRange.end}
                      <button onClick={() => setDateRange(prev => ({ ...prev, end: '' }))}>×</button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="search-results">
              {filteredResults.length === 0 ? (
                <div className="no-results">
                  <h3>No results found</h3>
                  <p>Try adjusting your search terms or filters</p>
                  <button className="btn btn-primary" onClick={clearAllFilters}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                filteredResults.map(result => (
                  <article 
                    key={result.id} 
                    className="result-card clickable"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="result-header">
                      <h3 className="result-title">{result.title}</h3>
                      <span className="result-type">{result.type}</span>
                    </div>
                    <div className="result-meta">
                      <span className="result-authors">{result.authors}</span>
                      <span className="result-date">{result.date}</span>
                      {result.journal && <span className="result-journal">{result.journal}</span>}
                    </div>
                    {result.tags && (
                      <div className="result-tags">
                        {result.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <p className="result-abstract">{result.abstract}</p>
                    <div className="result-ids">
                      {result.osdrId && <span className="data-id">OSDR: {result.osdrId}</span>}
                      {result.grantId && <span className="data-id">Grant: {result.grantId}</span>}
                    </div>
                    <div className="result-actions" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleResultClick(result)}
                      >
                        View Details
                      </button>
                      <button className="btn btn-primary">Access Data</button>
                      {result.osdrId && <button className="btn btn-secondary">View in OSDR</button>}
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
      
      {/* Detail Modal */}
      <DetailModal 
        result={selectedResult}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SearchPage;