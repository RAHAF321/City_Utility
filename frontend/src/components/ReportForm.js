import React, { useState } from 'react';
import { createReport, getLocation } from '../api';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import './ReportForm.css';

const ReportForm = () => {
  const { user, logout } = useAuth();
  const [type, setType] = useState('water');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    coordinates: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();

  if (!user || user.role !== 'citizen') {
    return (
      <div className="error-message-container">
        <p>You do not have permission to view this page. Please log in as a citizen.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportData = { userId: user._id, type, description, location };
    setLoading(true);
    try {
      await createReport(reportData);
      setShowPopup(true);
      resetForm();
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error submitting report');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setType('water');
    setDescription('');
    setLocation({ address: '', city: '', postalCode: '', country: '', coordinates: [] });
    setError('');
  };

  const fetchLocation = async () => {
    try {
      const locData = await getLocation();
      const cleanedAddress = locData.address ? locData.address.replace(/^,/, '').trim() : '';
      const cityFromAddress = cleanedAddress.split(',').pop().trim();
      setLocation({
        address: cleanedAddress,
        city: cityFromAddress || '',
        postalCode: locData.postalCode || '',
        country: locData.country || '',
        coordinates: locData.coordinates || [],
      });
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error fetching location');
    }
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div className="report-form-container">
      <header className="report-form-header">
        <h2>Report Utility Issue</h2>
        <div className="user-info">
          <p>{user.name}</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Submitting your report...</p>}
      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-section">
          <label>
            Issue Type:
            <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="waste">Waste Management</option>
            </select>
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              required
              className="form-textarea"
            />
          </label>
        </div>
        <div className="form-section">
          <label>
            Street Address:
            <input type="text" value={location.address} placeholder="Street Address" readOnly className="form-input" />
          </label>
          <label>
            City:
            <input type="text" value={location.city} placeholder="City" readOnly className="form-input" />
          </label>
          <label>
            Postal Code:
            <input type="text" value={location.postalCode} placeholder="Postal Code" readOnly className="form-input" />
          </label>
          <label>
            Country:
            <input type="text" value={location.country} placeholder="Country" readOnly className="form-input" />
          </label>
          <div className="coordinates">
            <h4>Coordinates:</h4>
            {location.coordinates.length > 0 ? (
              <p>Latitude: {location.coordinates[1]}, Longitude: {location.coordinates[0]}</p>
            ) : (
              <p>No coordinates available</p>
            )}
          </div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={fetchLocation} className="fill-location-button">Fill Location</button>
          <button type="submit" className="submit-report-button" disabled={loading}>Submit Report</button>
        </div>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Report Submitted</h3>
            <p>Your report has been submitted successfully.</p>
            <button onClick={() => history.push('/my-reports')} className="go-to-reports-button">Go to Reports</button>
            <button onClick={() => setShowPopup(false)} className="close-popup-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportForm;