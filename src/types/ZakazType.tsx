import type { MetaType } from "./Meta";
import type { ProductType } from "./ProductType";

export interface ZakazType {
    id: string,
    name: string,
    phone: string,
    address: string,
    productId: string,
    createdAt: string,
    updatedAt: string,
    product: ProductType,
    check: boolean
}

export interface OrderType {
    data: ZakazType[],
    meta: MetaType
}