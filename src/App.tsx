import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

import Footer from './components/Footer';
import Favorites from "./pages/Favorites.tsx";
import { ThemeProvider } from './contexts/ThemeContext.tsx';

function App() {
    return (
        <ThemeProvider>
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
                                    <Route path="/movie/:id" element={
                                        <ProtectedRoute>
                                            <MovieDetail />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/favorites" element={
                                        <ProtectedRoute>
                                            <Favorites />
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
        </ThemeProvider>
    );
}

export default App;

/**
 #* @author : sachini apsara
 #* @date : 2024-05-10
 #* @project : Movie Explorer (Loons Lab)
 #**/