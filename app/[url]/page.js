import { redirect } from "next/navigation";
import clientPromise from "../lib/mongodb";

export default async function Page({ params }) {
  const { url } = params;

  let client;
  let dbConnected = true;

  try {
    client = await clientPromise;
  } catch (err) {
    console.error("⚠️ MongoDB not connected, using dummy mode");
    dbConnected = false;
  }

  // If DB is available → fetch the real URL
  if (dbConnected) {
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    const foundUrl = await collection.findOne({ shorturl: url });

    if (foundUrl) {
      // Redirect to actual URL
      redirect(foundUrl.url);
    } else {
      // Show not found if short URL doesn't exist
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold text-red-600">404 - Link Not Found</h1>
          <p className="mt-2 text-gray-700">This short URL doesn&apos;t exist.</p>
        </div>
      );
    }
  }

  // If DB is NOT connected → show dummy link preview
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Dummy URL Preview</h1>
      <p className="mt-4 text-gray-700">
        Database is unavailable right now, so we generated a dummy URL:
      </p>
      <p className="mt-2 text-lg font-mono text-green-600">
        {`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/${url}`}
      </p>
      <p className="mt-4 text-gray-500">
        This is only a dummy link and will not redirect anywhere.
      </p>
    </div>
  );
}
