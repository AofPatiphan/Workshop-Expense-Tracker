import axios from 'axios';
import { useState, useEffect } from 'react';
import Transaction from './Transaction';

export default function Create({
    categories,
    createTransaction,
    editingTransaction,
    toggle,
    setToggle,
    setEditingTransaction,
    edit,
}) {
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [comment, setComment] = useState('');
    const [type, setType] = useState('EXPENSE');
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (categoryId === '') {
            return setError(true);
        }
        if (payee === '') {
            return setError(true);
        }
        if (amount === '') {
            return setError(true);
        }
        if (date === '') {
            return setError(true);
        }
        if (editingTransaction !== null) {
            edit({
                payee: payee,
                amount: +amount,
                date: date,
                categoryId: categoryId,
                comment: comment,
                id: editingTransaction.id,
            });
        } else {
            createTransaction({
                payee: payee,
                amount: +amount,
                date: date,
                categoryId: categoryId,
                comment: comment,
            });
        }
        // console.log(result);
        setPayee('');
        setAmount('');
        setDate('');
        setCategoryId('');
        setComment('');
        setType('EXPENSE');
        setToggle(!toggle);
        setError(false);
    };

    const hangleClickCreate = () => {
        setPayee('');
        setAmount('');
        setDate('');
        setCategoryId('');
        setComment('');
        setType('EXPENSE');
        setToggle(!toggle);
        setError(false);
        setEditingTransaction(null);
    };

    const handleClickIncome = () => {
        setType('INCOME');
        setPayee('');
        setAmount('');
        setDate('');
        setCategoryId('');
        setComment('');
        setError(false);
    };

    const handleClickExpense = () => {
        setType('EXPENSE');
        setPayee('');
        setAmount('');
        setDate('');
        setCategoryId('');
        setComment('');
        setError(false);
    };

    useEffect(() => {
        if (editingTransaction !== null) {
            setPayee(editingTransaction.payee);
            setAmount(editingTransaction.amount);
            setDate(editingTransaction.date.split('T')[0]);
            setCategoryId(editingTransaction.category.id);
            setComment(editingTransaction.comment);
            setType(editingTransaction.category.type);
        }
    }, [toggle, editingTransaction]);

    return (
        <div>
            <div className="d-grid mt-3">
                <button
                    className="btn btn-outline-warning"
                    onClick={hangleClickCreate}
                >
                    {toggle ? 'Cancel' : 'Create Transaction'}
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
                                checked={type === 'EXPENSE' ? 'checked' : ''}
                                onChange={handleClickExpense}
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
                                checked={type === 'INCOME' ? 'checked' : ''}
                                onChange={handleClickIncome}
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
                                className={`form-control ${
                                    error && !payee && 'is-invalid'
                                }`}
                                value={payee}
                                onChange={(e) => {
                                    setPayee(e.target.value);
                                    setError('');
                                }}
                            />
                            {payee ? null : (
                                <div className="invalid-feedback">
                                    {error && 'Please enter payee'}
                                </div>
                            )}
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Category</label>
                            <select
                                className={`form-select ${
                                    error && !categoryId && 'is-invalid'
                                }`}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                    setError('');
                                }}
                                value={categoryId}
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
                            {categoryId ? null : (
                                <div className="invalid-feedback">
                                    {error && 'Please select category'}
                                </div>
                            )}
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Amount</label>
                            <input
                                type="text"
                                className={`form-control ${
                                    error && !amount && 'is-invalid'
                                }`}
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setError('');
                                }}
                            />
                            <div className="invalid-feedback">
                                {error && 'Please enter amount'}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className={`form-control ${
                                    error && !date && 'is-invalid'
                                }`}
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    console.log(date);
                                    console.log(typeof e.target.value);
                                    setError('');
                                }}
                            />

                            {date ? null : (
                                <div className="invalid-feedback">
                                    {error && 'Please select date'}
                                </div>
                            )}
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
