export default function PageNumber({ el, index, setPage, page }) {
    return (
        <li className={`page-item  ${index === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setPage(index)}>
                <span>{index + 1}</span>
            </button>
        </li>
    );
}
