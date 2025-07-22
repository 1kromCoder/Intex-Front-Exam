import type { MetaType } from "./Meta"

export interface CategoryType {
      id: string,
      name_uz: string,
      name_ru: string,
      createdAt: string,
      updatedAt: string,
      _count: {
        Product: number
      }
}

export interface CategoryMetaType {
    data: CategoryType[],
    meta: MetaType
}