import { useMemo } from "react";
import Table from ".";

export default function SalaSituacionalTable({ data }) {
  const columnas = useMemo(
    () => [
      {
        Header: "Departamentos",
        accessor: "departamento",
      },
      {
        Header: "C. Positivos",
        accessor: "positivos",
      },
      {
        Header: "C. Fallecidos",
        accessor: "fallecidos",
      },
      {
        Header: "P. Antígena",
        accessor: "pa",
      },
      {
        Header: "P. Molecular",
        accessor: "pcr",
      },
      {
        Header: "P. Rapidas",
        accessor: "pr",
      },
    ],
    []
  );

  return (
    <>
      <div className="table-content scrollbar">
        {data && <Table columns={columnas} data={data} />}
      </div>
      <style jsx>{`
        .table-content {
          margin: 2em 0;
          overflow-y: auto;
          max-height: 500px;
        }
      `}</style>
    </>
  );
}
