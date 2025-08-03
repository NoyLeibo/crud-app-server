import { model, Schema, Document, ObjectId } from "mongoose";

export type ProductCategory = "Fruit" | "Vegetable" | "Field Crop";

export type ProductName =
  // Fruit:
  | "Apple"
  | "Banana"
  | "Grapes"
  // Vegetable:
  | "Cucumber"
  | "Tomato"
  | "Carrot"
  // Field Crop:
  | "Rice"
  | "Lentils"
  | "Wheat";

interface IProductModel extends Document {
  _id: ObjectId;
  name: ProductName;
  sku: number;
  description?: string;
  category: ProductCategory;
  marketingDate: Date;
  createdAt: Date;
  updatedAt: Date | null;
  removeAllImportantData: () => Partial<IProductModel>;
}

const ProductSchema = new Schema<IProductModel>(
  {
    name: { type: String, required: true, maxlength: 50, trim: true },
    sku: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Fruit", "Vegetable", "Field Crop"],
      required: true,
    },
    marketingDate: {
      type: Date,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProductSchema.methods.removeAllImportantData =
  function (): Partial<IProductModel> {
    return {
      _id: this._id,
      updatedAt: this.updatedAt,
    };
  };

const ProductModel = model<IProductModel>(
  "ProductModel",
  ProductSchema,
  "products"
);

export { ProductModel, IProductModel, ProductSchema };
