import Link from "next/link";

async function getStats(code: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/links/${code}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function StatsPage({
  params,
}: {
  params: { code: string };
}) {
  const code = params.code; // ✅ THIS IS CORRECT FOR NEXT 16

  const data = await getStats(code);

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Link not found</h1>
        <Link href="/" className="text-blue-600 underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stats for: {code}</h1>

      <p><strong>URL:</strong> {data.target_url}</p>
      <p><strong>Total clicks:</strong> {data.total_clicks}</p>
      <p>
        <strong>Last clicked:</strong>{" "}
        {data.last_clicked
          ? new Date(data.last_clicked).toLocaleString()
          : "Never"}
      </p>

      <Link href="/" className="text-blue-600 underline">
        Back to Dashboard
      </Link>
    </div>
  );
}
