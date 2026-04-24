import Document from "./Document.model.js";
import User from "../User/User.model.js";
import mongoose from "mongoose";

export const getDocuments = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({
        message: "Invalid user credentials",
        data: {},
        success: false,
      });

    const documents = await Document.find({
      $or: [{ owner: userId }, { "collaborators.user": userId }],
    }).populate("owner", "-password");

    if (!documents)
      return res.status(404).json({
        message: "No documents found",
        data: {},
        success: false,
      });

    return res.status(200).json({
      message: "Documents retrieved successfully",
      data: documents,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error occurred!",
      data: {},
      success: false,
    });
  }
};

export const getDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const userId = req.user?._id;

    if (!documentId || !mongoose.Types.ObjectId.isValid(documentId))
      return res.status(400).json({
        message: "Invalid document ID",
        data: {},
        success: false,
      });

    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({
        message: "Invalid user credentials",
        data: {},
        success: false,
      });

    const document = await Document.findById(documentId).populate(
      "owner",
      "-password"
    );

    if (!document)
      return res.status(404).json({
        message: "Document not found",
        data: {},
        success: false,
      });

    const isOwner = document.owner._id.toString() === userId.toString();
    const isCollaborator = document.collaborators.some(
      (collab) => collab.user.toString() === userId.toString()
    );

    if (!isOwner && !isCollaborator)
      return res.status(403).json({
        message: "You don't have access to this document",
        data: {},
        success: false,
      });

    return res.status(200).json({
      message: "Document retrieved successfully",
      data: document,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error occurred!",
      data: {},
      success: false,
    });
  }
};
