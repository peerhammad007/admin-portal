
interface PaginationProps {
    totalPages: number,
    current: number,
    onPageChange: (page: number) => void,
}
const Pagination = ({totalPages, current, onPageChange}: PaginationProps) => {
    return (
        <div>
            <button onClick={() => onPageChange(Math.max(1, current-1))}>Prev</button>
            {current}
            <button onClick={() => onPageChange(Math.min(totalPages, current+1))}>Next</button>
        </div>
    )
}

export default Pagination;