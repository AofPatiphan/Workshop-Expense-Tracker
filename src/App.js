import axios from 'axios';
import { useState, useEffect } from 'react';
import Create from './component/Create';
import Summary from './component/Summary';
import TransactionList from './component/TransactionList';

function App() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/transactions').then((res) => {
            setData(res.data.transactions);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/categories').then((res) => {
            setCategories(res.data.categories);
        });
    }, [setCategories]);

    const createTransaction = async ({
        payee,
        amount,
        date,
        categoryId,
        comment,
    }) => {
        const res = await axios.post('http://localhost:8080/transactions', {
            payee: payee,
            amount: +amount,
            date: date,
            categoryId: categoryId,
            comment: comment,
        });
        const newData = [res.data.transaction, ...data];
        setData(newData);
    };

    const deleteTransection = async (id) => {
        const res = await axios.delete(
            `http://localhost:8080/transactions/${id}`
        );

        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    return (
        <div className="container mw-md">
            <Create
                categories={categories}
                createTransaction={createTransaction}
            />

            <Summary data={data} categories={categories} />

            <div className="mt-4">
                <div className="row g-3">
                    <div className="col-sm-6">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Enter to search"
                            />
                            <button className="btn btn-sm btn-outline-light">
                                x
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="input-group">
                            <select className="form-select form-select-sm">
                                <option value="">Month</option>
                                <option value="">Jan</option>
                                <option value="">Feb</option>
                                <option value="">Mar</option>
                                <option value="">Apr</option>
                                <option value="">May</option>
                                <option value="">Jun</option>
                                <option value="">Jul</option>
                                <option value="">Aug</option>
                                <option value="">Sep</option>
                                <option value="">Oct</option>
                                <option value="">Nov</option>
                                <option value="">Dec</option>
                            </select>
                            <button className="btn btn-sm btn-outline-light">
                                x
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="input-group">
                            <select className="form-select form-select-sm">
                                <option value="">Year</option>
                                <option value="">2021</option>
                                <option value="">2020</option>
                            </select>
                            <button className="btn btn-sm btn-outline-light">
                                x
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 d-flex justify-content-between">
                <div className="d-flex align-items-center mb-3">
                    <div>
                        <select
                            type="text"
                            className="form-select form-select-sm"
                        >
                            <option value="">10</option>
                            <option value="">25</option>
                            <option value="">50</option>
                            <option value="">100</option>
                        </select>
                    </div>
                    <span className="text-white-50 mx-2 fs-7">
                        Showing 1 to 10 of 20 transactions
                    </span>
                </div>
                <nav>
                    <ul className="pagination pagination-sm">
                        <li className="page-item disabled">
                            <a href="/" className="page-link">
                                <span>&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item active">
                            <a href="/" className="page-link">
                                <span>1</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a href="/" className="page-link">
                                <span>2</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a href="/" className="page-link">
                                <span>3</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a href="/" className="page-link">
                                <span>&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <TransactionList
                data={data}
                categories={categories}
                deleteTransection={deleteTransection}
            />

            <footer className="text-white-50 text-center py-3 fs-7">
                Copyright © 2021 Flyinggiraffe. All rights reserved.
            </footer>
        </div>
    );
}

export default App;
