import axios from 'axios';
import { useState, useEffect } from 'react';
import Create from './component/Create';
import Summary from './component/Summary';
import TransactionFilter from './component/TransactionFilter';
import TransactionList from './component/TransactionList';

function App() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [textFilter, setTextFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');

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

    const selectTransaction = (transaction) => {
        setToggle(true);
        setEditingTransaction(transaction);
    };

    const edit = async ({ payee, amount, date, categoryId, comment, id }) => {
        const res = await axios.put(
            `http://localhost:8080/transactions/${id}`,
            {
                payee: payee,
                amount: +amount,
                date: date,
                categoryId: categoryId,
                comment: comment,
            }
        );

        const newData = data.map((el) => {
            if (el.id === res.data.transaction.id) {
                return res.data.transaction;
            }
            return el;
        });
        console.log(res.data);
        setData(newData);
    };

    return (
        <div className="container mw-md">
            <Create
                categories={categories}
                createTransaction={createTransaction}
                editingTransaction={editingTransaction}
                toggle={toggle}
                setToggle={setToggle}
                setEditingTransaction={setEditingTransaction}
                edit={edit}
            />

            <Summary data={data} categories={categories} />

            <TransactionFilter
                setTextFilter={setTextFilter}
                setMonthFilter={setMonthFilter}
                setYearFilter={setYearFilter}
                textFilter={textFilter}
                monthFilter={monthFilter}
                yearFilter={yearFilter}
            />

            <TransactionList
                data={data}
                categories={categories}
                deleteTransection={deleteTransection}
                selectTransaction={selectTransaction}
                textFilter={textFilter}
                monthFilter={monthFilter}
                yearFilter={yearFilter}
            />

            <footer className="text-white-50 text-center py-3 fs-7">
                Copyright © 2021 Flyinggiraffe. All rights reserved.
            </footer>
        </div>
    );
}

export default App;
