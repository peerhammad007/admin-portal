
interface SearchFilterProps {
    searchTerm: string,
    onSearchTermChange: (value: string) => void,
    status: 'active' | 'pending' | 'expired' | 'all',
    onStatusChange: (value: 'active' | 'pending' | 'expired') => void
}

const SearchFilter = ({ searchTerm, onSearchTermChange, status, onStatusChange }: SearchFilterProps) => {
    return (
        <div>
            <input type="text" value={searchTerm} onChange={(e) => onSearchTermChange(e.target.value)} />
            <select value={status} onChange={(e) => onStatusChange(e.target.value as any)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
            </select>
        </div>
    )
}

export default SearchFilter;