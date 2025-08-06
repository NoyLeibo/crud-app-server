import {
  IProductModel,
  ProductCategory,
  ProductModel,
  ProductName,
} from "../models/product.model";
interface CreateProductInput {
  name: ProductName;
  sku: number;
  description?: string;
  category: ProductCategory;
  marketingDate: Date;
}

interface ProductFilter {
  category: ProductCategory | null;
  name: string | null;
}

const create = async (input: CreateProductInput) => {
  try {
    const newProduct = new ProductModel(input);
    await newProduct.save();

    return newProduct;
  } catch (error: any) {
    throw new Error(error);
  }
};

const get = async (query: ProductFilter) => {
  try {
    const newQuery: any = {
      isDeleted: false,
    };

    if (query.category) newQuery.category = query.category;
    if (query.name) newQuery.name = { $regex: query.name, $options: "i" };

    if (newQuery) {
      return ProductModel.find(newQuery);
    }
    return ProductModel.find();
  } catch (error: any) {
    throw new Error(error);
  }
};

const update = async (product: Partial<IProductModel>, productId: string) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      product,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedProduct;
  } catch (error: any) {
    throw new Error(error);
  }
};

const remove = async (ids: string | string[]) => {
  try {
    if (Array.isArray(ids)) {
      return await ProductModel.updateMany(
        { _id: { $in: ids } },
        { isDeleted: true }
      );
    } else {
      return await ProductModel.findByIdAndUpdate(
        ids,
        { isDeleted: true },
        { new: true }
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const getProductById = async (
  productId: string
): Promise<IProductModel | null> => {
  try {
    return await ProductModel.findById(productId).exec();
  } catch (error: any) {
    throw new Error(error);
  }
};

const undoDelete = async (ids: string | string[]) => {
  try {
    if (Array.isArray(ids)) {
      return await ProductModel.updateMany(
        { _id: { $in: ids } },
        { isDeleted: false }
      );
    } else {
      return await ProductModel.findByIdAndUpdate(
        ids,
        { isDeleted: false },
        { new: true }
      );
    }
  } catch (error: any) {
    console.error("❌ Error in undoDelete:", error);
    throw new Error(error);
  }
};

export const productService = {
  create,
  get,
  remove,
  update,
  getProductById,
  undoDelete,
};
