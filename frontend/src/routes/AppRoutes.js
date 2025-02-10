import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import GoogleButton from '../components/login/GoogleButton';
import AdminDashboard from '../components/admin/AdminDashboard';
import OrphanRecords from '../components/admin/OrphanRecordList';
import UsersList from '../components/admin/UsersList';

const AppRoutes = ({ isLogged, isAdmin }) => {
  return (
    <Router>
    <Routes>
      {/* Authenticated Routes */}
      {isLogged ? (
        isAdmin ? (
          // Admin Routes
          <>
            <Route path="/login" element={<Navigate to="/admin" />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<OrphanRecords />} />
              <Route path="users" element={<UsersList />} />
              <Route path="*" element={<Navigate to="dashboard" />} />
            </Route>
          </>
        ) : (
          // User Routes
          <>
            <Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )
      ) : (
        // Unauthenticated Routes
        <>
          <Route path="/login" element={<GoogleButton />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
    </Router>
  );
};

export default AppRoutes;
