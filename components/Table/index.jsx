import clsx from 'clsx';
import { get } from 'lodash';
import React from 'react';

function Table({ columns = [], data = [] }) {
  return (
    <table class="min-w-full divide-y divide-gray-200 ">
      <thead class="bg-gray-50">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {data.map(
          (item) =>
            item && (
              <tr key={item.id} className="hover:bg-gray-200">
                {columns.map((column, index) => (
                  <td key={index} class={clsx('px-6 py-4 overflow-ellipsis', column.className)}>
                    {column.render ? (
                      column.render(get(item, column.field), item)
                    ) : (
                      <div class="text-sm text-gray-900">
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
