"use client";

import { useState } from "react";

export default function AddLinkForm() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({ url, code }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }

    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-3">
        <input
          className="border p-2 w-full"
          placeholder="Long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          className="border p-2 w-full"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Link
      </button>
    </form>
  );
}
