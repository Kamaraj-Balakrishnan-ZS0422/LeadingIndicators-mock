import React, {useState, useMemo,useEffect } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { Table,Button } from "react-bootstrap";
import TablePagination from "./TablePagination";
import GlobalFilter from "../common/GlobalFilter";
import { useTranslate } from "../../context/TranslationContext";

const TableComponent = ({
  columns,
  data,
  handleSubmit,
  enableCheckboxes = false,
  enableActions = false,
  isSuccess=false,
  setSelectedOrphandata  = () => {},
  handleActionView = () =>{},
  handleActionEdit = () =>{},
  handleActionDelete = () =>{},
}) => {
  const t = useTranslate();
  const [selectedRows, setSelectedRows] = useState([]);
  const maxSelectableRows = 3;

  const handleCheckboxChange = (row) => {
    setSelectedRows((prev) => {
      const isSelected = prev.some((r) => r.id === row.id);

      // Uncheck if already selected
      if (isSelected) {
        return prev.filter((r) => r.id !== row.id);
      }

      // Add new selection
      return [...prev, row];
    });
  };

  const processedData = useMemo(() => {
    // Add selection state to data rows
    return data.map((row) => ({
      ...row,
      isSelected: selectedRows.some((r) => r.id === row.id), // Check if row is selected
      isDisabled:
        selectedRows.length >= maxSelectableRows &&
        !selectedRows.some((r) => r.id === row.id), // Custom disabled logic
    }));
  }, [data, selectedRows]);


  //update data to the parent component
  useEffect(() => {
    if (isSuccess) {
      // Reset rows only when `isSuccess` changes to true
      if (selectedRows.length > 0) {
        setSelectedRows([]);
      }
      setSelectedOrphandata([]);
    } else if (selectedRows.length > 0) {
      // Avoid unnecessary updates
      setSelectedOrphandata(selectedRows);
    }
  }, [isSuccess, selectedRows, setSelectedOrphandata]);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: processedData, // Use processed data with dynamic state
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        const updatedColumns = [...columns];

        // Add checkbox column if enabled
        if (enableCheckboxes) {
          updatedColumns.unshift({
            id: "selection",
            Header: "", // Empty header for checkboxes
            Cell: ({ row }) => (
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(row.original)}
                checked={row.original.isSelected} // Bind to dynamic state
                disabled={row.original.isDisabled} // Disable based on dynamic logic
              />
            ),
            disableSortBy: true,
          });
        }

        // Add actions column if enabled
        if (enableActions) {
          updatedColumns.push({
            id: "actions",
            Header: t("actions"),
            Cell: ({ row }) => (
              <div className="d-flex gap-3">
                <i
                  className="fa-solid fa-eye"
                  onClick={() => handleActionView(row.original)}
                ></i>
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => handleActionEdit(row.original)}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleActionDelete(row.original)}
                ></i>
              </div>
            ),
            disableSortBy: true,
          });
        }

        return updatedColumns;
      });
    }
  );

  const { globalFilter, pageIndex } = state;

  return (
    <>
      
      <div className="d-flex justify-content-end mb-2">
      { selectedRows.length > 0 && <Button variant="success" className="px-4 mx-4" onClick={handleSubmit}>Submit</Button> }
      <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <Table striped hover {...getTableProps()} className="mt-2" responsive>
        <thead className="bg-dark text-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length + (enableCheckboxes ? 1 : 0) + (enableActions ? 1 : 0)}>
                {t("nodatafound")}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <TablePagination
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
    </>
  );
};

export default TableComponent;
