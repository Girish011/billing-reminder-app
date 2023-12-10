import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillList = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get('http://localhost:5000/bills'); // Replace with your backend URL
                setBills(response.data);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        fetchBills();
    }, []);

    const handleEdit = (billId) => {
        // Logic to navigate to the edit page or open an edit modal
        console.log('Edit bill with id:', billId);
    };

    const handleDelete = async (billId) => {
        try {
            await axios.delete(`http://localhost:5000/bills/${billId}`); // Replace with your backend URL
            setBills(bills.filter(bill => bill._id !== billId));
        } catch (error) {
            console.error('Error deleting bill:', error);
        }
    };

    return (
        <div>
            <h2>Bills List</h2>
            <ul>
                {bills.map(bill => (
                    <li key={bill._id}>
                        {bill.billerName} - ${bill.amount}
                        <button onClick={() => handleEdit(bill._id)}>Edit</button>
                        <button onClick={() => handleDelete(bill._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BillList;