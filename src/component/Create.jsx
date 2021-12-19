import axios from 'axios';
import { useState } from 'react';

export default function Create({ categories, createTransaction }) {
    const [toggle, setToggle] = useState(false);
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [comment, setComment] = useState('');
    const [type, setType] = useState('EXPENSE');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (categoryId === '') {
            return setError('Category must be selected');
        }
        createTransaction({
            payee: payee,
            amount: +amount,
            date: date,
            categoryId: categoryId,
            comment: comment,
        });
        // console.log(result);
        setPayee('');
        setAmount('');
        setDate('');
        setCategoryId('');
        setComment('');
        setType('EXPENSE');
        setToggle(!toggle);
    };

    return (
        <div>
            <div className="d-grid mt-3">
                <button
                    className="btn btn-outline-warning"
                    onClick={() => setToggle(!toggle)}
                >
                    Create Transaction
                </button>
            </div>
            {toggle ? (
                <div className="border bg-white rounded-2 p-3 mt-3">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <input
                                type="radio"
                                className="btn-check"
                                id="cbx-expense"
                                name="type"
                                defaultChecked
                                onClick={() => setType('EXPENSE')}
                            />
                            <label
                                className="btn btn-outline-danger rounded-0 rounded-start"
                                htmlFor="cbx-expense"
                            >
                                Expense
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                id="cbx-income"
                                name="type"
                                onClick={() => setType('INCOME')}
                            />
                            <label
                                className="btn btn-outline-success rounded-0 rounded-end"
                                htmlFor="cbx-income"
                            >
                                Income
                            </label>
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Payee</label>
                            <input
                                type="text"
                                className="form-control"
                                value={payee}
                                onChange={(e) => setPayee(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Category</label>
                            <select
                                className={`form-select ${
                                    error && 'is-invalid'
                                }`}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                    setError('');
                                }}
                            >
                                <option value={''}>SELECT</option>
                                {categories.map((el) => {
                                    if (el.type === type) {
                                        return (
                                            <option value={el.id} key={el.id}>
                                                {el.name}
                                            </option>
                                        );
                                    }
                                    return null;
                                })}
                            </select>
                            {error && (
                                <div className="invalid-feedback">{error}</div>
                            )}
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Amount</label>
                            <input
                                type="text"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Comment</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="col-12">
                            <div className="d-grid mt-3">
                                <button className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : null}
        </div>
    );
}
