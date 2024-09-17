import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingCart, Star, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = () => {
            const storedProducts = JSON.parse(localStorage.getItem('products'));
            if (storedProducts && storedProducts.length > 0) {
                setProducts(storedProducts);
            }
        };

        fetchProducts();
        // Set up an interval to check for product updates every 5 seconds
        const intervalId = setInterval(fetchProducts, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleProductClick = () => {
        navigate('/auth'); // Redirect to login page
    };

    return (
        <div className="min-h-screen bg-[#034c52] text-[#ECDFCC]">
            {/* Header */}
            <header className="bg-[#023c41] p-4 shadow-md">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Coffee size={32} />
                        <h1 className="text-2xl font-bold">ACafe</h1>
                    </div>
                    <nav className="mb-4 md:mb-0">
                        <ul className="flex flex-wrap justify-center space-x-4">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/menu" className="hover:text-white transition-colors">Menu</a></li>
                            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </nav>
                    <div className="flex space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#ECDFCC] text-[#034c52] px-4 py-2 rounded-full hover:bg-[#d8c9b3] transition-colors"
                            onClick={() => navigate('/auth')}
                        >
                            Sign In
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Menu Section */}
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-[#ECDFCC] text-center mb-8">Our Menu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#023c41] rounded-lg shadow-lg overflow-hidden cursor-pointer"
                            onClick={handleProductClick}
                        >
                            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-[#ECDFCC] mb-2">{product.title}</h3>
                                <p className="text-[#ECDFCC] mb-2">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#ECDFCC] font-bold">${product.price.toFixed(2)}</span>
                                    <div className="flex items-center">
                                        <Star className="text-yellow-400 mr-1" size={16} />
                                        <span className="text-[#ECDFCC]">{product.rating || 4.5}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#023c41] text-[#ECDFCC] py-8 px-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">ACafe</h3>
                        <p className="text-sm">Brewing perfection since 2010</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={24} /></a>
                    </div>
                </div>
                <div className="container mx-auto mt-8 text-center text-sm">
                    <p>&copy; 2024 ACafe. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MenuPage;