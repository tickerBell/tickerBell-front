import { EventColumns, EventRows } from "@/dummyData/DummyData";
import { useMemo } from "react";
import { DataTableBody } from "./DataTableBody";
import { DataTableHeader } from "./DataTableHeader";

export const DataTable = () => {
  const columns = useMemo(() => EventColumns, []);
  const rows = useMemo(() => EventRows, []);
  return (
    <div className="flex flex-col w-3/4 justify-center items-center">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <table className="min-w-full">
            {columns.map((column, key) => (
              <DataTableHeader key={key} column={column} />
            ))}
            {rows.map((row, key) => (
              <DataTableBody key={key} row={row} />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
