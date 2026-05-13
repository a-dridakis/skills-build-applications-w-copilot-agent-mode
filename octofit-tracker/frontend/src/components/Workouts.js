import { useEffect, useState } from 'react';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWorkouts() {
      const endpoint = process.env.REACT_APP_CODESPACE_NAME
        ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
        : 'http://localhost:8000/api/workouts/';
      console.log('Workouts endpoint:', endpoint);
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed with status ${response.status}`);
        const data = await response.json();
        console.log('Workouts fetched data:', data);
        setItems(Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header">💪 Workouts</div>
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
            <p className="text-muted text-center">No workouts found.</p>
          ) : (
            <div className="row g-3">
              {items.map((workout, index) => {
                const suggested = Array.isArray(workout.suggested_for)
                  ? workout.suggested_for.map(s => String(s).replace(/^['\s\[]+|['\s\]]+$/g, '').trim())
                  : typeof workout.suggested_for === 'string'
                  ? workout.suggested_for
                      .replace(/^\[|\]$/g, '')
                      .split(',')
                      .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
                      .filter(Boolean)
                  : [];
                return (
                  <div className="col-sm-6 col-lg-4" key={workout.id ?? index}>
                    <div className="card h-100 border-success">
                      <div className="card-body">
                        <h5 className="card-title text-success fw-bold">{workout.name}</h5>
                        <p className="card-subtitle mb-2 text-muted small">Suggested for:</p>
                        <div>
                          {suggested.length === 0
                            ? <span className="text-muted">—</span>
                            : suggested.map((s, i) => (
                                <span className="suggestion-chip" key={i}>{s}</span>
                              ))
                          }
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

export default Workouts;
