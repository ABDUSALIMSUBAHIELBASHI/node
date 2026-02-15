// API Configuration and Functions
const API_BASE_URL = 'http://localhost:5000/api';

// Set authentication token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// ============================================
// AUTHENTICATION API
// ============================================

const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

// ============================================
// PORTFOLIO API
// ============================================

const portfolioAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio`);
      return await response.json();
    } catch (error) {
      console.error('Portfolio fetch error:', error);
      return [];
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/category/${category}`);
      return await response.json();
    } catch (error) {
      console.error('Portfolio category fetch error:', error);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Portfolio detail fetch error:', error);
      return null;
    }
  },

  create: async (projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(projectData)
      });
      return await response.json();
    } catch (error) {
      console.error('Portfolio create error:', error);
      throw error;
    }
  },

  update: async (id, projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(projectData)
      });
      return await response.json();
    } catch (error) {
      console.error('Portfolio update error:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Portfolio delete error:', error);
      throw error;
    }
  }
};

// ============================================
// BLOG API
// ============================================

const blogAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`);
      return await response.json();
    } catch (error) {
      console.error('Blog fetch error:', error);
      return [];
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/category/${category}`);
      return await response.json();
    } catch (error) {
      console.error('Blog category fetch error:', error);
      return [];
    }
  },

  search: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/search/${query}`);
      return await response.json();
    } catch (error) {
      console.error('Blog search error:', error);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Blog detail fetch error:', error);
      return null;
    }
  },

  create: async (postData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(postData)
      });
      return await response.json();
    } catch (error) {
      console.error('Blog create error:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Blog delete error:', error);
      throw error;
    }
  }
};

// ============================================
// TEAM API
// ============================================

const teamAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/team`);
      return await response.json();
    } catch (error) {
      console.error('Team fetch error:', error);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Team member fetch error:', error);
      return null;
    }
  },

  create: async (memberData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(memberData)
      });
      return await response.json();
    } catch (error) {
      console.error('Team create error:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Team delete error:', error);
      throw error;
    }
  }
};

// ============================================
// CONTACT API
// ============================================

const contactAPI = {
  submit: async (contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
        timeout: 5000 // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Contact API error:', error);
      
      // Fallback: Save to localStorage if API is unavailable
      try {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
          ...contactData,
          id: Date.now(),
          timestamp: new Date().toISOString(),
          status: 'pending'
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Return success response to simulate successful submission
        return {
          message: 'Message saved locally. It will be sent once the connection is restored.',
          data: contactData,
          offline: true
        };
      } catch (storageError) {
        console.error('Storage error:', storageError);
        throw error;
      }
    }
  },

  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Contact fetch error:', error);
      return [];
    }
  },

  // Get messages from local storage (offline messages)
  getLocalMessages: () => {
    try {
      return JSON.parse(localStorage.getItem('contactMessages') || '[]');
    } catch (error) {
      console.error('Error reading local messages:', error);
      return [];
    }
  },

  // Clear local messages after successful sync
  clearLocalMessages: () => {
    try {
      localStorage.removeItem('contactMessages');
    } catch (error) {
      console.error('Error clearing local messages:', error);
    }
  }
};

// ============================================
// NAMES API (Existing)
// ============================================

const namesAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/names`);
      return await response.json();
    } catch (error) {
      console.error('Names fetch error:', error);
      return [];
    }
  },

  addName: async (nameData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/names`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(nameData)
      });
      return await response.json();
    } catch (error) {
      console.error('Name add error:', error);
      throw error;
    }
  },

  deleteName: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/names/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Name delete error:', error);
      throw error;
    }
  }
};

// Export all APIs
const API = {
  auth: authAPI,
  portfolio: portfolioAPI,
  blog: blogAPI,
  team: teamAPI,
  contact: contactAPI,
  names: namesAPI
};
