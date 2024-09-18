import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SuperAdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      const response = await axios.get('http://localhost:5000/api/auth/pending-requests');
      setRequests(response.data);
    };
    fetchPendingRequests();
  }, []);

  const handleUpdateStatus = async (userId, status) => {
    await axios.post('http://localhost:5000/api/auth/update-status', { userId, status });
    setRequests(requests.filter((req) => req._id !== userId));
  };

  return (
    <div>
      <h2>Super Admin Dashboard</h2>
      <h3>Pending Requests</h3>
      {requests.map((req) => (
        <div key={req._id}>
          <p>{req.name} ({req.role})</p>
          <button onClick={() => handleUpdateStatus(req._id, 'Accepted')}>Accept</button>
          <button onClick={() => handleUpdateStatus(req._id, 'Rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default SuperAdminDashboard;
