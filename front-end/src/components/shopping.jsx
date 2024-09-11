// src/ShoppingMarket.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, X, Trash2, Plus, Minus, Facebook, Instagram, Twitter } from 'lucide-react';
import { addToCart, removeFromCart, updateQuantity } from '../redux/cartSlice';

const items = [
    { id: 1, title: "Espresso", description: "Rich and bold single shot", image: "https://i.pinimg.com/736x/cb/ee/ab/cbeeabf1e1eee5882e145f3465ada74d.jpg", price: 2.50 },
    { id: 2, title: "Cappuccino", description: "Espresso with steamed milk and foam", image: "https://i.pinimg.com/564x/4b/65/98/4b6598e5aac6d15608d1459f9a96cc79.jpg", price: 3.50 },
    { id: 3, title: "Latte", description: "Espresso with lots of steamed milk", image: "https://i.pinimg.com/564x/3b/de/66/3bde660eede0b425a992199c479556c2.jpg", price: 3.75 },
    { id: 4, title: "Mocha", description: "Espresso with chocolate and steamed milk", image: "https://img.freepik.com/free-photo/dark-chocolate-mocha-frothy-indulgence-saucer-generated-by-ai_188544-22903.jpg", price: 4.00 },
    { id: 5, title: "Croissant", description: "Buttery, flaky pastry", image: "https://i.pinimg.com/564x/8b/34/39/8b3439a82c12879719290dc04da5a05b.jpg", price: 2.25 },
    { id: 6, title: "Blueberry Muffin", description: "Moist muffin loaded with blueberries", image: "https://i.pinimg.com/564x/ac/ba/46/acba46775b46a9966d956cf524cd84b9.jpg", price: 2.75 },
    { id: 7, title: "Cheesecake", description: "Creamy New York style cheesecake", image: "https://i.pinimg.com/564x/92/f3/5e/92f35eaaf2ae0c0ca545e79e1f531516.jpg", price: 4.50 },
    { id: 8, title: "Iced Tea", description: "Refreshing black tea over ice", image: "https://img.pikbest.com/wp/202345/mint-leaves-cup-with-ice-tea-and-on-a-dark-background_9585688.jpg!bw700", price: 2.00 },
    { id: 9, title: "Fruit Smoothie", description: "Blend of seasonal fruits", image: "https://png.pngtree.com/background/20230610/original/pngtree-this-smoothie-shake-contains-blackberries-picture-image_3024300.jpg", price: 4.25 },
    { id: 10, title: "Pancakes", description: "Fluffy pancakes with maple syrup", image: "https://i.pinimg.com/564x/6d/e1/a8/6de1a8ddb5b3b0234cc21c1befafd7aa.jpg", price: 3.75 },
];

const ShoppingMarket = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [isCartOpen, setIsCartOpen] = React.useState(false);

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
