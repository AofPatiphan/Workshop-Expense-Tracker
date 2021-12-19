import { useState, useEffect } from 'react';
import SummaryItem from './SummaryItem';

export default function Summary({ data }) {
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    useEffect(() => {
        let summaryEx = 0;
        let summaryIn = 0;
        for (let item of data) {
            if (item.category.type === 'EXPENSE') {
                summaryEx += item.amount;
            } else {
                summaryIn += item.amount;
            }
        }
        setExpense(summaryEx);
        setIncome(summaryIn);
    }, [data]);
    return (
        <div className="row g-3 mt-2">
            <SummaryItem name="Net Worth" bg="info" amount={income - expense} />
            <SummaryItem name="Income" bg="success" amount={income} />
            <SummaryItem name="Expense" bg="danger" amount={expense} />
        </div>
    );
}
