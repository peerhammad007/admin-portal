import { useEffect, useState } from "react"
import { Policy } from "../types/Policy";
import axios from 'axios'
import DataTable, { Column } from "../components/DataTable";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import PolicyDetailsModal from "../components/PolicyDetailsModal";
import { useNavigate } from 'react-router-dom'


const PolicyDashboard = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [status, setStatus] = useState<'all' | 'active' | 'pending' | 'expired'>('all')
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPolicies();
        // eslint-disable-next-line
    }, [page, searchTerm, status])

    useEffect(() => {
        setPage(1);
    }, [searchTerm, status])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(searchInput);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchInput])

    const params: any = {
        page,
        limit,
    };
    if (searchTerm) params.search = searchTerm;
    if (status !== 'all') params.status = status;


    const fetchPolicies = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/policy`, { params });
            const data = res.data;
            setPolicies(data.policies);
            setTotalPages(data.pagination.pages)
        } catch (err: any) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleAddPolicy = () => {
        navigate('/addPolicy');
    }

    const columns: Column<Policy>[] = [
        { header: "Policy Number", accessor: "policyNumber" },
        { header: "Customer Name", accessor: "customerName" },
        { header: "Premium", accessor: "premiumAmount" },
        { header: "Status", accessor: "status" },
    ];

    return (
        <div>
            <h2>Policy</h2>
            <button onClick={handleAddPolicy}>Add Policy</button>
            <SearchFilter searchTerm={searchInput} onSearchTermChange={setSearchInput} status={status} onStatusChange={setStatus} />
            <DataTable columns={columns} data={policies} loading={loading} onRowClick={(row) => setSelectedPolicyId(row._id)} />
            <Pagination totalPages={totalPages} current={page} onPageChange={setPage} />
            {selectedPolicyId && (
                <PolicyDetailsModal selectedPolicyId={selectedPolicyId} onClose={() => setSelectedPolicyId(null)} />
            )}
        </div>
    )

}

export default PolicyDashboard;