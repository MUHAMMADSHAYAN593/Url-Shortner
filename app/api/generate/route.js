import clientPromise from "@/app/lib/mongodb";

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { url, shorturl } = body;

    // Validate input
    if (!url || !shorturl) {
      return Response.json(
        { success: false, error: true, message: "URL and Short URL are required" },
        { status: 400 }
      );
    }

    try {
      // Try connecting to MongoDB
      const client = await clientPromise;
      const db = client.db("bitlinks");
      const collection = db.collection("url");

      // Check if short URL already exists
      const existing = await collection.findOne({ shorturl });
      if (existing) {
        return Response.json(
          { success: false, error: true, message: "Short URL already exists" },
          { status: 409 }
        );
      }

      // Insert into DB
      await collection.insertOne({
        url,
        shorturl,
        createdAt: new Date(),
      });

      return Response.json(
        { success: true, dummy: false, message: "URL generated successfully" },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("⚠️ Database not available, generating dummy URL...");

      // If DB fails → Return dummy URL
      return Response.json(
        {
          success: true,
          dummy: true,
          shorturl,
          message: "Database unavailable, generated a dummy URL",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error generating short URL:", error);
    return Response.json(
      { success: false, error: true, message: "Server error" },
      { status: 500 }
    );
  }
}
