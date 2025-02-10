import React, { useRef } from "react";
import { useTable } from "react-table";
import { usePagination } from "react-table";
import { useSortBy } from "react-table";
import { useGlobalFilter } from "react-table";
import { Row, Table } from "react-bootstrap";
import CustButton from "../common/CustButton";
import Col from 'react-bootstrap/Col';
import CustomModal from "../common/CustomModal";
import IncidentForm from "../form/IncidentForm";
import GlobalFilter from "../common/GlobalFilter";
import TablePagination from "./TablePagination";


function TableComponent({ columns, data }) {
  const modalRef = useRef();
  const formRef  = useRef();
    // Use the useTable hook with sorting, pagination, and global filtering
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Only the rows for the active page
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
        data,
        initialState: { pageSize: 10 }, // Initial number of rows per page
      },
      useGlobalFilter, // Enable search filtering
      useSortBy, // Enable sorting
      usePagination // Enable pagination
    );
  
    const { globalFilter, pageIndex } = state;
  
    const handleSubmit =() => {
      formRef.current.formSubmit();
    }
    

    return (
      <>
        <Row className="align-items-center mb-3">
      {/* Title */}
      <Col xs={12} sm={8} className="mb-2 mb-sm-0">
        <h4 className="text-center text-sm-left">Leading Safety Indicators</h4>
      </Col>

      {/* Search Filter */}
      <Col xs={12} sm={6} md={2} className="mb-2 mb-md-0">
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </Col>

      {/* Modal Button */}
      <Col xs={12} sm={6} md={2} className="d-flex justify-content-center justify-content-md-end">
      <CustButton  onClkFn={() => modalRef.current.openModal()} variant="primary" className="login-with-google-btn" >Create Form</CustButton>
      <CustomModal  ref={modalRef} title=" Create a new Incident" formsubmit={handleSubmit}>
        <IncidentForm modalRef={modalRef} ref={formRef}></IncidentForm>         
      </CustomModal>
      </Col>
    </Row>

        {/* Table */}
        <Table striped hover {...getTableProps()} responsive className="mt-2">
          <thead className="thead-dark">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
  
        {/* Pagination Controls */}
        <div className="d-flex flex-row-reverse">
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
  }
  
  export default TableComponent;