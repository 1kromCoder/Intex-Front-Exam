export interface ProductType {
      id: string,
      image: string,
      categoryId: string,
      price: number,
      discountedPrice: number,
      frame_ru: string,
      frame_uz: string,
      size: string,
      count: number,
      depth: number,
      status: string,
      tools_ru: string[],
      tools_uz: string,
      createdAt: string,
      updatedAt:string
      category: {
        id:string,
        name_ru: string,
        name_uz: string
      }
    }