import React, { useState } from 'react';
import axios from 'axios';

const CreateBill = () => {
    const [billData, setBillData] = useState({
        billerName: '',
        amount: '',
        dueDate: '',
        category: '',
        status: 'Unpaid',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/bills', billData);
            console.log('Bill created:', response.data);
            setBillData({ billerName: '', amount: '', dueDate: '', category: '', status: 'Unpaid' });
        } catch (error) {
            console.error('Error creating bill:', error);
        }
    };

    const handleChange = (e) => {
        setBillData({ ...billData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create Bill</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Biller Name:</label>
                    <input
                        type="text"
                        name="billerName"
                        value={billData.billerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={billData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={billData.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={billData.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select name="status" value={billData.status} onChange={handleChange}>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
                <button type="submit">Create Bill</button>
            </form>
        </div>
    );
};

export default CreateBill;
