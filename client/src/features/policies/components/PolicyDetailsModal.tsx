import { useEffect, useState } from "react";
import { Policy } from "../types/Policy";
import axios from "axios";

interface PolicyDetailsModalProps {
    selectedPolicyId: string,
    onClose: () => void,
}
const PolicyDetailsModal = ({ selectedPolicyId, onClose }: PolicyDetailsModalProps) => {
    const [policy, setPolicy] = useState<Policy | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/policy/${selectedPolicyId}`);
                const data = res.data;
                setPolicy(data);
            } catch (error: any) {
                console.log(error.message)
            } finally {
                setLoading(false);
            }
        };
        fetchPolicy();
    }, [selectedPolicyId])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                background: '#fff',
                padding: '16px',
                minWidth: '300px'
            }}>
                <p>{policy?.customerName}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )

}

export default PolicyDetailsModal;