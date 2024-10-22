import { doc, getFirestore, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../../../config/firebaseConfig";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Received POST request");
  const db = getFirestore(app);

  if (req.method === "POST") {
    const data = req.body;
    console.log("Request Body:", data); // Log the received data

    try {
      await setDoc(doc(db, "Products", data.name), data);
      res.status(200).json({ message: "Product saved in Firebase" });
    } catch (error) {
      console.error("Error saving product:", error); // Log the error
      res.status(500).json({ error: "Error saving product" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
