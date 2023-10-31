interface HistoryTableHeaderProps {
  column: IEventColumnsData;
}

export const HistoryTableHeader: React.FC<HistoryTableHeaderProps> = ({
  column,
}) => {
  const { name, speaker, date, totaluser, place, maxseats, cancel } = column;

  return (
    <thead className="bg-gray-200 border-b">
      <tr className="text-sm font-medium text-gray-900 text-center">
        <th className="px-6 py-4">{name}</th>
        <th className="px-6 py-4">{speaker}</th>
        <th className="px-6 py-4">{date}</th>
        <th className="px-6 py-4">{place}</th>
        <th className="px-6 py-4">{totaluser}</th>
        <th className="px-6 py-4">{maxseats}</th>
        <th className="px-6 py-4">{cancel}</th>
      </tr>
    </thead>
  );
};
