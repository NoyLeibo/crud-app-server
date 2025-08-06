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
    const newQuery: any = {};

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
      return await ProductModel.deleteMany({ _id: { $in: ids } });
    } else {
      return await ProductModel.findByIdAndDelete(ids);
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
export const productService = {
  create,
  get,
  remove,
  update,
  getProductById,
};
