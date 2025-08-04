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
    name: {
      type: String,
      required: [true, "Product name is required"],
      maxlength: [50, "Product name cannot bigger 50 char"],
      minlength: [3, "Product name cannot shorter than 3 char"],
      trim: true,
    },
    sku: {
      type: Number,
      required: [true, "SKU is required"],
      min: [0, "SKU must be a non-negative number"],
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: {
        values: ["Fruit", "Vegetable", "Field Crop"],
        message: "Category must be one of: Fruit, Vegetable, Field Crop",
      },
      required: [true, "Category is required"],
    },
    marketingDate: {
      type: Date,
      required: [true, "Marketing date is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
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
