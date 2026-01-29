import mongoose from "mongoose";

const restaurantTypeSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      de: { type: String, default: null },
      es: { type: String, default: null },
      fr: { type: String, default: null },
      it: { type: String, default: null },
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

restaurantTypeSchema.index({ "name.en": 1 }, { unique: true });

const restaurantType = mongoose.model("restaurantType", restaurantTypeSchema);

export default restaurantType;
