import { useMemo } from "react";
import { useExpanded, useTable } from "react-table";
import { convertirPorcentaje } from "../../utils/numeros";
import Icons from "../Icons";

export default function CasosTable({ data }) {
  const columnas = useMemo(
    () => [
      {
        id: "expander", // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? "" : ""}
          </span>
        ),
        Cell: ({ row }) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 0.2}rem`,
                },
              })}
            >
              {row.isExpanded ? (
                <Icons tipo="flecha-abajo" />
              ) : (
                <Icons tipo="flecha-derecha" />
              )}
            </span>
          ) : null,
      },
      {
        Header: "Departamentos",
        accessor: "nombre_original",
      },
      {
        Header: "Casos",
        accessor: "casos",
      },
      {
        Header: "Porcentaje",
        accessor: "porcentaje",
      },
    ],
    []
  );

  const datos = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        porcentaje: convertirPorcentaje(d.porcentaje),
        subRows: [
          { nombre_original: "Provincias", casos: "Casos", porcentaje: "" },
          ...d.provincias.map((p) => ({
            ...p,
            nombre_original: p.nombre,
            porcentaje: "",
          })),
        ],
      })),
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: columnas, data: datos }, useExpanded);

  return (
    <>
      <div className="table-content scrollbar">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table-content {
          margin: 2em 0;
          overflow-y: auto;
          max-height: 500px;
        }
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
          text-transform: capitalize;
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
