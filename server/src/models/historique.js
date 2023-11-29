import mongoose from "mongoose";

const histoSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: Date.now() },
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "type",
    },
    type: {
      type: String,
      required: true,
      enum: ["User", "Departement", "Client", "Projet"],
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
).index({ "$**": "text" });

export default mongoose.model("Historique", histoSchema);
