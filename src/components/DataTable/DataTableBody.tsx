interface DataTableHeaderProps {
  row: IEventRowsData;
}

export const DataTableBody: React.FC<DataTableHeaderProps> = ({ row }) => {
  const { startTime, place, title, speaker, maxuser, maxseats } = row;

  return (
    <tbody>
      <tr
        onClick={() => console.log("모달클릭")}
        className="border-b text-sm text-gray-900 text-center"
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">{speaker}</td>
        <td className="px-6 py-4 whitespace-nowrap">{startTime}</td>
        <td className="px-6 py-4 whitespace-nowrap">{place}</td>
        <td className="px-6 py-4 whitespace-nowrap">{maxuser}</td>
        <td className="px-6 py-4 whitespace-nowrap">{maxseats}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="border">취소하기</button>
        </td>
      </tr>
    </tbody>
  );
};
