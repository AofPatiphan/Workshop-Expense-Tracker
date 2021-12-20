import Transaction from './Transaction';
import { useState } from 'react';

export default function TransactionList({
    data,
    categories,
    deleteTransection,
    selectTransaction,
    textFilter,
    monthFilter,
    yearFilter,
}) {
    const [amountPage, setAmountPage] = useState('10');
    const [page, setPage] = useState(0);

    const totalLength = data.length;

    const paginationData = data.filter((el, idx) => {
        if (amountPage * page <= idx && amountPage * (page + 1) > idx) {
            return true;
        }
        return false;
    });

    return (
        <>
            <div className="mt-3 d-flex justify-content-between">
                <div className="d-flex align-items-center mb-3">
                    <div>
                        <select
                            type="text"
                            className="form-select form-select-sm"
                            onChange={(e) => setAmountPage(e.target.value)}
                        >
                            <option value="10" defaultChecked>
                                10
                            </option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <span className="text-white-50 mx-2 fs-7">
                        {`Showing 1 to ${
                            amountPage > totalLength ? totalLength : amountPage
                        } of ${totalLength} transactions`}
                    </span>
                </div>
                <nav>
                    <ul className="pagination pagination-sm">
                        <li
                            className={`page-item ${
                                page > 0 ? '' : 'disabled'
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => {
                                    console.log(page);
                                    setPage(page > 0 ? page - 1 : page);
                                }}
                            >
                                <span>&laquo;</span>
                            </button>
                        </li>

                        {Array(Math.ceil(totalLength / amountPage))
                            .fill(0)
                            .map((el, index) => {
                                return (
                                    <li
                                        className={`page-item  ${
                                            index === page ? 'active' : ''
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(index)}
                                        >
                                            <span>{index + 1}</span>
                                        </button>
                                    </li>
                                );
                            })}

                        <li
                            className={`page-item ${
                                page >= Math.ceil(totalLength / amountPage) - 1
                                    ? 'disabled'
                                    : ''
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setPage(page + 1)}
                            >
                                <span>&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <ul className="list-group">
                {paginationData.map((el) => {
                    // console.log(new Date(el.date).getMonth());
                    if (el.payee.toLowerCase().indexOf(textFilter) === -1) {
                        return null;
                    }
                    if (
                        monthFilter !== '' &&
                        new Date(el.date).getMonth() !== +monthFilter
                    ) {
                        return null;
                    }
                    if (
                        yearFilter !== '' &&
                        new Date(el.date).getFullYear() !== +yearFilter
                    ) {
                        return null;
                    }
                    return (
                        <Transaction
                            el={el}
                            categories={categories}
                            key={el.id}
                            deleteTransection={deleteTransection}
                            selectTransaction={selectTransaction}
                        />
                    );
                })}
            </ul>
        </>
    );
}
