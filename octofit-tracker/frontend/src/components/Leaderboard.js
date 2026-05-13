import { useEffect, useState } from 'react';

function rankBadgeClass(rank) {
  if (rank === 1) return 'rank-badge gold';
  if (rank === 2) return 'rank-badge silver';
  if (rank === 3) return 'rank-badge bronze';
  return 'rank-badge';
}

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      const endpoint = process.env.REACT_APP_CODESPACE_NAME
        ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
        : 'http://localhost:8000/api/leaderboard/';
      console.log('Leaderboard endpoint:', endpoint);
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed with status ${response.status}`);
        const data = await response.json();
        console.log('Leaderboard fetched data:', data);
        const normalized = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
        // Sort descending by score
        setItems([...normalized].sort((a, b) => b.score - a.score));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header">🏆 Leaderboard</div>
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
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-3">No leaderboard data found.</td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.id ?? index}>
                      <td><span className={rankBadgeClass(index + 1)}>{index + 1}</span></td>
                      <td>{item.user}</td>
                      <td><strong>{item.score}</strong></td>
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

export default Leaderboard;
