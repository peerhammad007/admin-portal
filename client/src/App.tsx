import './App.css';
import AddPolicyWizard from './pages/AddPolicyWizard';
// import AddServiceForm from './pages/AddServiceForm';
import PolicyDashboard from './pages/PolicyDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/addPolicy' element={<AddPolicyWizard />} />
        <Route path='/' element={<PolicyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
