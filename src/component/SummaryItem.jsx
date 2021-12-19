export default function SummaryItem({ name, bg, amount }) {
  return (
    <div className="col-sm-4">
      <div className={`bg-${bg} rounded-2 p-3`}>
        <p className="text-black-50">{name}</p>
        <h5 className="text-white">{amount.toFixed(2)}</h5>
      </div>
    </div>
  );
}
