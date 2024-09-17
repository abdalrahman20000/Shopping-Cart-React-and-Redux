import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, X, Trash2, Plus, Minus, Facebook, Instagram, Twitter } from 'lucide-react';
import { addToCart, removeFromCart, updateQuantity, clearDeletedProducts } from '../redux/cartSlice';

const ShoppingMarket = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchProducts = () => {
            const storedProducts = JSON.parse(localStorage.getItem('products'));
            if (storedProducts && storedProducts.length > 0) {
                setItems(storedProducts);
                
                // Check if any products in the cart have been deleted
                const deletedProductIds = cart.filter(cartItem => 
                    !storedProducts.some(product => product.id === cartItem.id)
                ).map(item => item.id);
                
                if (deletedProductIds.length > 0) {
                    dispatch(clearDeletedProducts(deletedProductIds));
                }
            }
        };

        fetchProducts();
        // Set up an interval to check for product updates every 5 seconds
        const intervalId = setInterval(fetchProducts, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex flex-col min-h-screen bg-[#034c52]">
            {/* Fixed Cart Button */}
            <button
                className="fixed top-4 right-4 z-50 p-2 bg-[#ECDFCC] text-[#034c52] rounded-full shadow-lg hover:bg-[#d8c9b3] transition-colors"
                onClick={() => setIsCartOpen(true)}
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Header */}
            <header className="bg-[#023c41] text-[#ECDFCC] p-4 shadow-md">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold mb-2 sm:mb-0">ACafe</h1>
                    <p className="text-center text-sm sm:text-base italic">"Brew your day with a perfect cup of joy"</p>
                    <div className="w-24"></div> {/* Empty space for balance */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-[#ECDFCC] text-center mb-8">Our Menu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="relative h-64 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-[#ECDFCC]">{item.title}</h3>
                                    <p className="text-[#ECDFCC] text-sm">{item.description}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-[#ECDFCC]">${item.price.toFixed(2)}</span>
                                    <button
                                        className="bg-[#ECDFCC] text-[#034c52] py-2 px-4 rounded hover:bg-[#d8c9b3] transition-colors"
                                        onClick={() => dispatch(addToCart(item))}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#023c41] text-[#ECDFCC] p-4 mt-8">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-4 sm:mb-0">
                        <h3 className="text-xl font-bold">About Us</h3>
                        <p className="mt-2 text-sm">Serving the finest coffee since 2010</p>
                    </div>
                    <p className="text-sm">&copy; 2024 ACafe. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={24} /></a>
                    </div>
                </div>
            </footer>

            {/* Cart Sidebar */}
            <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-[#034c52] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    <div className="p-6 bg-[#023c41] text-[#ECDFCC]">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Your Cart</h2>
                            <button
                                className="text-[#ECDFCC] hover:text-white"
                                onClick={() => setIsCartOpen(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <p className="text-[#ECDFCC] text-center">Your cart is empty</p>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li key={item.id} className="bg-[#ECDFCC] rounded-lg shadow-md overflow-hidden">
                                        <div className="relative h-40">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-[#ECDFCC] text-lg">{item.title}</h3>
                                                    <p className="text-[#ECDFCC]">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-[#034c52] rounded-full">
                                                        <button onClick={() => dispatch(updateQuantity({ id: item.id, change: -1 }))} className="text-[#ECDFCC] p-2">
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="mx-2 text-[#ECDFCC]">{item.quantity}</span>
                                                        <button onClick={() => dispatch(updateQuantity({ id: item.id, change: 1 }))} className="text-[#ECDFCC] p-2">
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="text-red-500 hover:text-red-700 bg-[#ECDFCC] p-2 rounded-full"
                                                        onClick={() => dispatch(removeFromCart(item.id))}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="p-6 bg-[#023c41]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-[#ECDFCC]">Total:</span>
                            <span className="text-xl font-bold text-[#ECDFCC]">
                                ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                            </span>
                        </div>
                        <button className="w-full bg-[#ECDFCC] text-[#034c52] py-3 rounded-lg hover:bg-[#d8c9b3] transition-colors">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingMarket;