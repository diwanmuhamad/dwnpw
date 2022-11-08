import connectMongo  from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectMongo();
  // Take user input
  const data = req.body;
  // Insert a document into the collection
  const response = db.collection("message").insertOne({
    ...data,
    createdAt: new Date(),
  });
  // Send a response
  res.status(200).json({
    data: await db.collection("message").findOne({ id: response.insertedId }),
    message: "message added successfully",
  });
}