import AddLinkForm from "@/components/AddLinkForm";
import LinkTable from "@/components/LinkTable";

async function fetchLinks() {
 const res = await fetch(`${process.env.BASE_URL}/api/links`, {
  cache: "no-store",
});


  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const links = await fetchLinks();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

      <AddLinkForm />

      <LinkTable links={links} />
    </div>
  );
}
