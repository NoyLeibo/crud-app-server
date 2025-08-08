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
  isDeleted: boolean;
  removeAllImportantData: () => Partial<IProductModel>;
}

const ProductSchema = new Schema<IProductModel>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      maxlength: [50, "Product name cannot be longer than 50 characters"],
      minlength: [3, "Product name must be at least 3 characters long"],
      trim: true,
    },
    sku: {
      type: Number,
      required: [true, "SKU is required"],
      min: [0, "SKU must be a non-negative number"],
      max: [1000, "SKU cannot be greater than 1000"],
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
      validate: {
        validator: function (value: Date) {
          const today = new Date();
          const minDate = new Date();
          minDate.setDate(today.getDate() - 7);

          value.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          minDate.setHours(0, 0, 0, 0);

          return value <= minDate;
        },
        message: "Marketing date must be at least 7 days ago",
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
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
