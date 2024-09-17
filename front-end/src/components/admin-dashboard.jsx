import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Coffee, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialItems = [
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

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        id: '',
        title: '',
        description: '',
        image: '',
        price: ''
    });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts && storedProducts.length > 0) {
            setProducts(storedProducts);
        } else {
            setProducts(initialItems);
            localStorage.setItem('products', JSON.stringify(initialItems));
        }
    }, []);

    const saveProducts = (updatedProducts) => {
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    };

    const handleEdit = (product) => {
        setEditingProduct({ ...product });
    };

    const handleSave = () => {
        const updatedProducts = products.map(p => 
            p.id === editingProduct.id ? editingProduct : p
        );
        saveProducts(updatedProducts);
        setEditingProduct(null);
    };

    const handleDelete = (id) => {
        const updatedProducts = products.filter(p => p.id !== id);
        saveProducts(updatedProducts);
    };

    const handleAdd = () => {
        const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
        saveProducts(updatedProducts);
        setNewProduct({ id: '', title: '', description: '', image: '', price: '' });
        setShowAddForm(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#034c52] to-[#023c41]">
            <header className="bg-[#023c41] text-[#ECDFCC] p-4 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center">
                        <Coffee className="mr-2" /> ACafe Admin
                    </h1>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-[#ECDFCC] text-[#034c52] py-2 px-4 rounded-full hover:bg-[#d8c9b3] transition-colors flex items-center"
                    >
                        <Plus className="mr-2" size={18} />
                        Add New Product
                    </button>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-[#ECDFCC] text-center mb-8">Product Management</h2>

                {/* Add New Product Form */}
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-[#023c41] p-6 rounded-lg shadow-lg mb-8"
                        >
                            <h3 className="text-xl font-bold text-[#ECDFCC] mb-4 flex items-center">
                                <ShoppingBag className="mr-2" /> Add New Product
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[#ECDFCC]">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Product title"
                                        value={newProduct.title}
                                        onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                                        className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#ECDFCC]">Description</label>
                                    <textarea
                                        placeholder="Product description"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                        className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#ECDFCC]">Image URL</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/image.jpg"
                                        value={newProduct.image}
                                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                                        className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#ECDFCC]">Price</label>
                                    <input
                                        type="number"
                                        placeholder="9.99"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                                        className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="bg-[#ECDFCC] text-[#034c52] py-2 px-4 rounded hover:bg-[#d8c9b3] transition-colors"
                                >
                                    <Plus className="inline-block mr-2" size={18} />
                                    Add Product
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Product List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#023c41] rounded-lg shadow-lg overflow-hidden"
                            >
                                {editingProduct && editingProduct.id === product.id ? (
                                    <div className="p-4 space-y-4">
                                        <input
                                            type="text"
                                            value={editingProduct.title}
                                            onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                                            className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                        />
                                        <textarea
                                            value={editingProduct.description}
                                            onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                                            className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                            rows="3"
                                        ></textarea>
                                        <input
                                            type="text"
                                            value={editingProduct.image}
                                            onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                                            className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                        />
                                        <input
                                            type="number"
                                            value={editingProduct.price}
                                            onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                                            className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                            step="0.01"
                                        />
                                        <div className="flex justify-between">
                                            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
                                                <Save className="inline-block mr-2" size={18} />
                                                Save
                                            </button>
                                            <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors">
                                                <X className="inline-block mr-2" size={18} />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                                        <div className="p-4">
                                            <h3 className="text-xl font-bold text-[#ECDFCC]">{product.title}</h3>
                                            <p className="text-[#ECDFCC] mb-2">{product.description}</p>
                                            <p className="text-[#ECDFCC] font-bold mb-4">${product.price.toFixed(2)}</p>
                                            <div className="flex justify-between">
                                                <button onClick={() => handleEdit(product)} className="bg-[#ECDFCC] text-[#034c52] p-2 rounded hover:bg-[#d8c9b3] transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            <footer className="bg-[#023c41] text-[#ECDFCC] p-4 mt-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 ACafe Admin. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminPage;