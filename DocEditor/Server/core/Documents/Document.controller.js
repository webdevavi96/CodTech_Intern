import Document from "./Document.model.js";
import User from "../User/User.model.js";

const getDocuments = async (req, res) => {
  const { documentId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(documentId))
    return res
      .status(400)
      .json({ message: "Invalid document Id credentials", success: false });

  const document = await Document.findOne(documentId);

  if (!document)
    return res
      .status(404)
      .json({ message: "Document not found!", data: {}, success: true });

  return res
    .status(200)
    .json({ message: "document found successfully", data: {}, success: true });
};

