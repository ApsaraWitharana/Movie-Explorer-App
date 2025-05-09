import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';

import Footer from './components/Footer';

function App() {
    return (

            <AuthProvider>
                <MovieProvider>
                    <Router>
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/" element={
                                        <ProtectedRoute>
                                            <Home />
                                        </ProtectedRoute>
                                    } />

                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </Router>
                </MovieProvider>
            </AuthProvider>

    );
}

export default App;