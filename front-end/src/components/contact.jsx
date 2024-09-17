import React, { useState } from 'react';
import { Coffee, Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactUsPage = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        setFormSubmitted(true);
    };

    const pageVariants = {
        initial: { opacity: 0, y: 50 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -50 }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen bg-[#034c52] text-[#ECDFCC]"
        >
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
                            onClick={() => {/* Add navigation logic */ }}
                        >
                            Sign In
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <motion.section
                className="py-20 px-4 bg-[url('https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="container mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl mb-8"
                    >
                        We'd love to hear from you!
                    </motion.p>
                </div>
            </motion.section>

            {/* Contact Information */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                            <ul className="space-y-4">
                                <motion.li
                                    className="flex items-center"
                                    whileHover={{ scale: 1.05, originX: 0 }}
                                >
                                    <Mail className="mr-4" />
                                    <span>info@acafe.com</span>
                                </motion.li>
                                <motion.li
                                    className="flex items-center"
                                    whileHover={{ scale: 1.05, originX: 0 }}
                                >
                                    <Phone className="mr-4" />
                                    <span>+1 (555) 123-4567</span>
                                </motion.li>
                                <motion.li
                                    className="flex items-center"
                                    whileHover={{ scale: 1.05, originX: 0 }}
                                >
                                    <MapPin className="mr-4" />
                                    <span>123 Coffee Street, Brew City, BC 12345</span>
                                </motion.li>
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
                            <AnimatePresence>
                                {!formSubmitted ? (
                                    <motion.form
                                        className="space-y-4"
                                        onSubmit={handleSubmit}
                                        exit={{ opacity: 0, y: -50 }}
                                    >
                                        <motion.input
                                            whileFocus={{ scale: 1.02 }}
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                            required
                                        />
                                        <motion.input
                                            whileFocus={{ scale: 1.02 }}
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                            required
                                        />
                                        <motion.textarea
                                            whileFocus={{ scale: 1.02 }}
                                            placeholder="Your Message"
                                            rows="5"
                                            className="w-full p-2 rounded bg-[#ECDFCC] text-[#034c52]"
                                            required
                                        ></motion.textarea>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-[#ECDFCC] text-[#034c52] px-6 py-2 rounded-full font-semibold hover:bg-[#d8c9b3] transition-colors flex items-center"
                                            type="submit"
                                        >
                                            Send Message
                                            <Send className="ml-2" size={18} />
                                        </motion.button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center"
                                    >
                                        <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                                        <p>Your message has been sent. We'll get back to you soon!</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#023c41] text-[#ECDFCC] py-8 px-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">ACafe</h3>
                        <p className="text-sm">Brewing perfection since 2010</p>
                    </div>
                    <div className="container mx-auto mt-8 text-center text-sm">
                        <p>&copy; 2024 ACafe. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={24} /></a>
                    </div>
                </div>
            </footer>
        </motion.div>
    );
};

export default ContactUsPage;