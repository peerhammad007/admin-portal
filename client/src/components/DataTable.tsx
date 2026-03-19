
export interface Column<T> {
    header: string,
    accessor: keyof T
}

interface DataTableProps<T> {
    columns: Column<T>[],
    data: T[],
    loading?: boolean,
    onRowClick?: (row: T) => void
}

const DataTable = <T,>({columns, data, loading, onRowClick}: DataTableProps<T>) => {
    if(loading) {
        return (
            <div>Loading...</div>
        )
    }
    if(data.length === 0) {
        <div>No records found</div>
    }
    return (
        <table>
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={String(col.accessor)}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row: any, index) => (
                    <tr key={index} onClick={() => onRowClick?.(row)}>
                        {columns.map(col => (
                            <td key={String(col.accessor)}>{row[col.accessor]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DataTable;