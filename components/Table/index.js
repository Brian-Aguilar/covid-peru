import { memo } from "react";
import { useSortBy, useTable } from "react-table";
import Icons from "../Icons";

function Table({ columns, data = [] }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <Icons
                          tipo="flecha-abajo"
                          width="0.75em"
                          height="0.75em"
                        />
                      ) : (
                        <Icons
                          tipo="flecha-arriba"
                          width="0.75em"
                          height="0.75em"
                        />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, __) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{`
        table {
          display: flex;
          border-spacing: 0;
          height: auto;
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          margin: 0;
          padding: 0.5rem;
        }

        thead {
          border: 2px solid rgba(var(--rojo));
        }
        thead > tr {
          display: flex;
          flex-direction: column;
        }
        thead > tr > th {
          padding: 1em 0.75em;
          border-bottom: 2px solid rgba(var(--rojo));
        }
        thead > tr > th:last-child {
          border-bottom: 0;
        }

        tbody {
          display: flex;
          border: 2px solid rgba(var(--rojo));
          border-left: 0;
        }
        tbody > tr {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 170px;
          border-right: 2px solid rgba(var(--rojo));
        }
        tbody > tr:last-child {
          border-right: 0;
        }
        tbody > tr > td {
          padding: 1em 0.2em;
          border-bottom: 2px solid rgba(var(--rojo));
        }
        tbody > tr > td:last-child {
          border-bottom: 0;
        }

        thead > tr > th:first-child {
        }
        tbody > tr:hover {
          background: rgba(var(--rojo), 0.1);
          color: rgba(var(--negro), 0.75);
        }
        tbody > tr > td:first-child {
          text-transform: capitalize;
        }
        tbody > tr > td {
          text-align: center;
        }

        @media (min-width: 768px) {
          table {
            display: table;
            table-layout: auto;
            border: 2px solid rgba(var(--rojo));
            border-top: 0;
          }
          thead {
            display: table-header-group;
            position: sticky;
            top: 0;
            color: rgb(var(--blanco));
            background-color: rgba(var(--rojo));
          }
          thead > tr {
            display: table-row;
          }
          thead > tr > th {
            border-bottom: 0;
          }

          tbody {
            display: table-row-group;
            border: 0;
          }
          tbody > tr {
            display: table-row;
            border-bottom: 1px solid rgba(var(--rojo));
          }
          tbody > tr > td {
            border-bottom: 0;
          }
        }
      `}</style>
    </>
  );
}

export default memo(Table);
