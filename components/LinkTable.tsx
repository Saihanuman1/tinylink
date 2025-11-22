"use client";

import Link from "next/link";

export default function LinkTable({ links }: any) {
  async function deleteLink(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Code</th>
          <th className="p-2">URL</th>
          <th className="p-2">Clicks</th>
          <th className="p-2">Last Clicked</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center p-3">
              No links found
            </td>
          </tr>
        )}

        {links.map((row: any) => (
          <tr key={row.code}>
            <td className="p-2">
              <Link
                href={`/code/${row.code}`}
                className="text-blue-600 underline"
              >
                {row.code}
              </Link>
            </td>

            <td className="p-2">{row.target_url}</td>

            <td className="p-2">{row.total_clicks}</td>

            <td className="p-2">
              {row.last_clicked
                ? new Date(row.last_clicked).toLocaleString()
                : "-"}
            </td>

            <td className="p-2">
              <button
                onClick={() => deleteLink(row.code)}
                className="text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
