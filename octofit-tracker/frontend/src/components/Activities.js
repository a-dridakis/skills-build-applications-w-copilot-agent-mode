import { useEffect, useState } from 'react';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchActivities() {
      const baseUrl = process.env.REACT_APP_CODESPACE_NAME
        ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
        : 'http://localhost:8000';
      const endpoint = `${baseUrl}/api/activities/`;
      console.log('Activities endpoint:', endpoint);
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed with status ${response.status}`);
        const data = await response.json();
        console.log('Activities fetched data:', data);
        setItems(Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header">🏃 Activities</div>
      <div className="card-body p-0">
        {loading && (
          <div className="d-flex justify-content-center align-items-center p-4">
            <div className="spinner-border text-primary octofit-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger m-3" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 octofit-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Activity</th>
                  <th scope="col">Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">No activities found.</td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.id ?? index}>
                      <td>{index + 1}</td>
                      <td>{item.user}</td>
                      <td>{item.activity}</td>
                      <td>{item.duration}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
