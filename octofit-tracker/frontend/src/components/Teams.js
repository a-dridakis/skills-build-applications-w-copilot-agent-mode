import { useEffect, useState } from 'react';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTeams() {
      const endpoint = process.env.REACT_APP_CODESPACE_NAME
        ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
        : 'http://localhost:8000/api/teams/';
      console.log('Teams endpoint:', endpoint);
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed with status ${response.status}`);
        const data = await response.json();
        console.log('Teams fetched data:', data);
        setItems(Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header">👥 Teams</div>
      <div className="card-body">
        {loading && (
          <div className="d-flex justify-content-center align-items-center p-4">
            <div className="spinner-border text-primary octofit-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
        {!loading && !error && (
          items.length === 0 ? (
            <p className="text-muted text-center">No teams found.</p>
          ) : (
            <div className="row g-3">
              {items.map((team, index) => {
                const members = Array.isArray(team.members)
                  ? team.members.map(m => String(m).replace(/^['\s\[]+|['\s\]]+$/g, '').trim())
                  : typeof team.members === 'string'
                  ? team.members
                      .replace(/^\[|\]$/g, '')          // remove outer [ ]
                      .split(',')
                      .map(m => m.trim().replace(/^['"]|['"]$/g, '')) // remove quotes
                      .filter(Boolean)
                  : [];
                return (
                  <div className="col-sm-6 col-lg-4" key={team.id ?? index}>
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <h5 className="card-title text-primary fw-bold">{team.name}</h5>
                        <p className="card-subtitle mb-2 text-muted small">
                          {members.length} member{members.length !== 1 ? 's' : ''}
                        </p>
                        <div>
                          {members.map((m, i) => (
                            <span className="member-chip" key={i}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Teams;
