import { Routes, Route } from 'react-router-dom';
import IssuesPage from './pages/IssuesPage';

// In your router configuration:
<Routes>
  {/* Your other routes */}
  <Route path="/issues" element={<IssuesPage />} />
</Routes>