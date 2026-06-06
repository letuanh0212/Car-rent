export default function Table({
  columns = [],
  data = [],
  renderActions,
  emptyText = "No data found",
  className = "",
}) {
  return (
    <div
      className={[
        "overflow-x-auto rounded-2xl border border-(--color-border)",
        className,
      ].join(" ")}
    >
      <table className="w-full min-w-200 text-left">
        <thead className="bg-(--color-surface-low)">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="
                  px-4 py-4
                  text-sm font-semibold
                  text-(--color-text-muted)
                "
              >
                {column.title}
              </th>
            ))}

            {renderActions && (
              <th
                className="
                  px-4 py-4 text-right
                  text-sm font-semibold
                  text-(--color-text-muted)
                "
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-(--color-border)">
          {data.length === 0 && (
            <tr>
              <td
                colSpan={
                  renderActions
                    ? columns.length + 1
                    : columns.length
                }
                className="
                  px-4 py-10 text-center
                  text-sm text-(--color-text-muted)
                "
              >
                {emptyText}
              </td>
            </tr>
          )}

          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="
                transition
                hover:bg-(--color-surface-low)
              "
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="
                    px-4 py-4
                    text-sm
                    text-(--color-text-primary)
                  "
                >
                  {column.render
                    ? column.render(row)
                    : row[column.key]}
                </td>
              ))}

              {renderActions && (
                <td className="px-4 py-4 text-right">
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
