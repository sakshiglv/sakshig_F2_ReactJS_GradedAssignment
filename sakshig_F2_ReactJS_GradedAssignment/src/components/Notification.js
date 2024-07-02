import React from 'react';
import { motion } from 'framer-motion';
import './Notification.css';

const Notification = ({ message, type, visible }) => {
    return (
        <motion.div
            className={`notification ${type} ${visible ? 'show' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {message}
        </motion.div>
    );
};

export default Notification;
