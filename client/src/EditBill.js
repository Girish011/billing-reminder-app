import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBill = () => {
    const [billData, setBillData] = useState({
        billerName: '',
        amount: '',
        dueDate: '',
        category: '',
        status: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBillData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/bills/${id}`);
                setBillData(response.data);
            } catch (error) {
                console.error('Error fetching bill data:', error);
            }
        };

        fetchBillData();
    }, [id]);

    const handleChange = (e) => {
        setBillData({ ...billData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/bills/${id}`, billData);
            navigate('/bills');
        } catch (error) {
            console.error('Error updating bill:', error);
        }
    };

    return (
        <div>
            <h2>Edit Bill</h2>
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
                        value={billData.dueDate.split('T')[0]} // Format the date for the date input
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
                <button type="submit">Update Bill</button>
            </form>
        </div>
    );
};

export default EditBill;
