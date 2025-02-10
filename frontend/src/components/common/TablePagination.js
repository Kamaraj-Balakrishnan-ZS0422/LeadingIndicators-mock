import Pagination from 'react-bootstrap/Pagination';

function TablePagination({ pageIndex, pageOptions, gotoPage, canPreviousPage, canNextPage, nextPage, previousPage }) {
  return (
    <Pagination className="justify-content-center mt-1">
      <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
      <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
      
      {pageOptions.map((page, idx) => (
        <Pagination.Item
          key={idx}
          active={pageIndex === page}
          onClick={() => gotoPage(page)}
        >
          {page + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
      <Pagination.Last onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage} />
    </Pagination>
  );
}

export default TablePagination;