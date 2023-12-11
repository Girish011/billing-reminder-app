import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BillList = () => {
    const [bills, setBills] = useState([]);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        billerName: '',
        dueDate: '',
        sequenceNumber: ''
    });

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get('http://localhost:5000/bills');
                setBills(response.data);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        fetchBills();
    }, []);

    const handleEdit = (billId) => {
        navigate(`/edit-bill/${billId}`);
    };

    const handleDelete = async (billId) => {
        try {
            await axios.delete(`http://localhost:5000/bills/${billId}`);
            setBills(bills.filter(bill => bill._id !== billId));
        } catch (error) {
            console.error('Error deleting bill:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredBills = bills.filter((bill, index) => {
        return (filters.billerName === '' || bill.billerName.toLowerCase().includes(filters.billerName.toLowerCase())) &&
               (filters.dueDate === '' || new Date(bill.dueDate).toLocaleDateString() === new Date(filters.dueDate).toLocaleDateString()) &&
               (filters.sequenceNumber === '' || (index + 1) === parseInt(filters.sequenceNumber));
    });

    return (
        <div>
            <h2>Bills List</h2>
            <div>
                <label>Biller Name: </label>
                <input type="text" name="billerName" value={filters.billerName} onChange={handleFilterChange} />
                
                <label>Due Date: </label>
                <input type="date" name="dueDate" value={filters.dueDate} onChange={handleFilterChange} />
                
                <label>Sequence Number: </label>
                <input type="number" name="sequenceNumber" value={filters.sequenceNumber} onChange={handleFilterChange} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Biller Name</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBills.map((bill, index) => (
                        <tr key={bill._id}>
                            <td>{index + 1}</td>
                            <td>{bill.billerName}</td>
                            <td>${bill.amount}</td>
                            <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                            <td>{bill.category}</td>
                            <td>{bill.status}</td>
                            <td>
                                <button onClick={() => handleEdit(bill._id)}>Edit</button>
                                <button onClick={() => handleDelete(bill._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillList;
