import clsx from 'clsx';
import { get } from 'lodash';
import React from 'react';

function Table({ columns = [], data = [] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 ">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map(
          (item) =>
            item && (
              <tr key={item.id} classNameName="hover:bg-gray-200">
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={clsx(
                      'px-6 py-4 overflow-ellipsis',
                      column.classNameName
                    )}
                  >
                    {column.render ? (
                      column.render(get(item, column.field), item)
                    ) : (
                      <div className="text-sm text-gray-900">
                        {get(item, column.field)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}

export default Table;
