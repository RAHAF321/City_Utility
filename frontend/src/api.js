import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// User Authentication
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Set up a base URL for API requests
const API_URL_REPORTS = 'http://localhost:5001/api/reports'; // Utility Reporting Service
const API_URL_LOCATION = 'http://localhost:5002/api/location'; // Location Service

// Utility Reporting Service
export const createReport = async (reportData) => {
  const token = localStorage.getItem('token'); // Fetch token from local storage
  const response = await axios.post(API_URL_REPORTS, reportData, {
    headers: {
      Authorization: `Bearer ${token}`, // Set the token in the headers
    },
  });
  return response.data;
};

export const getReports = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL_REPORTS, {
    headers: {
      Authorization: `Bearer ${token}`, // Set the token in the headers
    },
  });
  return response.data;
};

// Delete a report by ID
export const deleteReport = async (reportId) => {
  const token = localStorage.getItem('token'); // Authorization token
  const response = await axios.delete(`${API_URL_REPORTS}/${reportId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// New function to get all reports for admin dashboard
export const getAllReports = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_URL_REPORTS}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data; // Return the full list of reports
    } else {
      throw new Error(`Error fetching reports: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};



// New function to assign a report to an employee
export const assignReportToEmployee = async (reportId, employeeId) => {
  const token = localStorage.getItem('token'); // Authorization token
  const response = await axios.put(
    `${API_URL_REPORTS}/assign`, 
    { reportId, employeeId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Location Service
export const getLocation = async (address) => {
  const url = address
    ? `${API_URL_LOCATION}?address=${encodeURIComponent(address)}`
    : `${API_URL_LOCATION}`; // If no address, call without query params

  const response = await axios.get(url);
  return response.data;
};


// New function to get all employees (assuming there's a user endpoint for employees)
export const getEmployees = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error.response || error.message);
    throw error; // Rethrow the error to handle in UI if needed
  }
};


// Fetch reports assigned to the employee
export const getAssignedReports = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL_REPORTS}/assigned`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update report status
export const updateReportStatus = async (reportId, status) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL_REPORTS}/status`, { reportId, status }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


const API_URL_public = 'http://localhost:5004/api/announcements'; // Point this to your announcement microservice

// Fetch all announcements
export const fetchAnnouncements = async () => {
  const response = await axios.get(`${API_URL_public}`);
  return response.data;
};

// Create a new announcement (Admin only)
export const createAnnouncement = async (announcementData, token) => {
  const response = await axios.post(
    `${API_URL_public}`,
    announcementData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Update an announcement
export const updateAnnouncement = async (announcementId, announcementData, token) => {
  const response = await axios.put(
    `${API_URL_public}/${announcementId}`,
    announcementData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Delete an announcement
export const deleteAnnouncement = async (announcementId, token) => {
  const response = await axios.delete(
    `${API_URL_public}/${announcementId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};