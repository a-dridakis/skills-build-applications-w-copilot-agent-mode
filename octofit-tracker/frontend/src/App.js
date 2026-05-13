import './App.css';
import octofitLogo from './octofit-logo.png';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg octofit-navbar mb-4">
        <div className="container">
          <span className="navbar-brand">
            <img
              src={octofitLogo}
              alt="OctoFit Tracker"
              className="octofit-brand-logo"
            />
          </span>
          <button
            className="navbar-toggler border-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto gap-1">
              {[
                { to: '/activities',  label: 'Activities' },
                { to: '/leaderboard', label: 'Leaderboard' },
                { to: '/teams',       label: 'Teams' },
                { to: '/users',       label: 'Users' },
                { to: '/workouts',    label: 'Workouts' },
              ].map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link px-3' + (isActive ? ' active' : '')
                    }
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="octofit-page">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

