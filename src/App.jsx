import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Navbar que só aparece após o login */}
      {!isLoginPage && (
        <nav className="flex justify-between items-center bg-[#161b22] py-4 px-10 border-b border-[#30363d]">
          <div className="font-bold text-[#f0f6fc]">🛡️ InfraInv</div>
          <button 
            onClick={() => window.location.href = '/'} 
            className="text-[#f85149] text-sm font-medium"
          >
            Sair
          </button>
        </nav>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;