import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Placeholder from 'react-bootstrap/Placeholder';

function TableSkeleton({ rows = 5, columns = 5 }) {
    return (
      <>
      
      <table className="table">
        <thead>
          <tr> 
            {[...Array(columns)].map((_, i) => (
              <th key={i}>
               <Placeholder animation="glow">
                     <Placeholder xs={6} />
                 </Placeholder>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex}>
                  <Placeholder animation="glow">
                     <Placeholder xs={6} />
                 </Placeholder>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </>
    );
  }

  export default TableSkeleton;