import Transaction from "./Transaction";

export default function TransactionList({
  data,
  categories,
  deleteTransection,
}) {
  // console.log(data)
  return (
    <ul className="list-group">
      {data.map((el) => (
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
