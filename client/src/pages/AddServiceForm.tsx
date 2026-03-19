import axios from "axios";
import { useState } from "react";

const AddServiceForm = () => {
    const [form, setForm] = useState({
        policyNumber: "",
        customerName: "",
        email: "",
        vehicleType: "",
        vehicleYear: "",
        premiumAmount: "",
        status: "pending",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(`http://localhost:5000/policy`, {
                ...form,
                vehicleYear: Number(form.vehicleYear),
                premiumAmount: Number(form.premiumAmount)
            });
            console.log('Policy created');
        } catch (err: any) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="policyNumber">Policy Number</label>
            <input type="text" id="policyNumber" name="policyNumber" value={form.policyNumber} onChange={handleChange} />

            <label htmlFor="customerName">Customer Name</label>
            <input type="text" id="customerName" name="customerName" value={form.customerName} onChange={handleChange} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />

            <label htmlFor="vehicleType">Vehicle Type</label>
            <input type="text" id="vehicleType" name="vehicleType" value={form.vehicleType} onChange={handleChange} />

            <label htmlFor="vehicleYear">Vehicle Year</label>
            <input type="number" id="vehicleYear" name="vehicleYear" value={form.vehicleYear} onChange={handleChange} />

            <label htmlFor="premiumAmount">Premium Amount</label>
            <input type="number" id="premiumAmount" name="premiumAmount" value={form.premiumAmount} onChange={handleChange} />

            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
            </select>

            <button type="submit">{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
    )
}

export default AddServiceForm;