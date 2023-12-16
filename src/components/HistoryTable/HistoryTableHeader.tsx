interface HistoryTableHeaderProps {
  column: IEventHistoryTableReserverType;
}

export const HistoryTableHeader = ({ column }: HistoryTableHeaderProps) => {

  return (
    <tr className="text-sm font-medium text-center text-gray-900">
      {column.eventName && <th className="px-6 py-4">{column.eventName}</th>
      }
      {column.casting && <th className="px-6 py-4">{column.casting}</th>}
      {column.startEvent && <th className="px-6 py-4">{column.startEvent}</th>}
      {column.place && <th className="px-6 py-4">{column.place}</th>}
      {column.payment && <th className="px-6 py-4">{column.payment}</th>}
      {column.seatInfo && <th className="px-6 py-4">{column.seatInfo}</th>}
      {column.paymentId && <th className="px-6 py-4">{column.paymentId}</th>}
      {column.isCancelled && <th className="px-6 py-4">{column.isCancelled}</th>
      }
      {column.ticketHolderCounts &&
        <th className="px-6 py-4">{column.ticketHolderCounts}</th>
      }
      <th className="px-6 py-4">취소</th>
    </tr>
  );
};
