import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Transaction({
    el,
    categories,
    deleteTransection,
    selectTransaction,
}) {
    const formatDate = (date) => {
        const d = new Date(date).toString();
        const month = d.slice(4, 7);
        const year = d.slice(13, 15);
        return month + ' ' + year;
    };

    const category = categories.find((item) => item.id === el.category.id);

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-danger">
            <div
                className="transaction-detail d-flex flex-fill me-4"
                onClick={() => selectTransaction(el)}
            >
                <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
                    <p className="p-0 m-0 fs-7 text-black-50">
                        {formatDate(el.date)}
                    </p>
                    <p className="p-0 m-0">{new Date(el.date).getDate()}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
                    <div>
                        <p className="mb-1 f-5 fw-bold">{el.payee}</p>
                        <p className="mb-0 text-black-50 fs-7">
                            {category ? category.name : 'not found'}
                        </p>
                    </div>
                    <span
                        className={`badge bg-${
                            el.category.type === 'EXPENSE'
                                ? 'danger'
                                : 'success'
                        }`}
                    >
                        ฿{Number(el.amount).toLocaleString('en')}
                    </span>
                </div>
            </div>
            <button className="btn btn-link text-secondary p-0 border-0">
                <i
                    className="bi-x-circle"
                    onClick={() => deleteTransection(el.id)}
                />
            </button>
        </li>
    );
}
