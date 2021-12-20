import Transaction from './Transaction';

export default function TransactionList({
    data,
    categories,
    deleteTransection,
}) {
    // const [data]
    const handleChangeNumberList = (e) => {
        if (e.target.value === 10) {
        }
    };

    // console.log(data);
    return (
        <ul className="list-group">
            {data.map((el, index) => (
                <Transaction
                    el={el}
                    categories={categories}
                    key={el.id}
                    deleteTransection={deleteTransection}
                />
            ))}
        </ul>
    );
}
