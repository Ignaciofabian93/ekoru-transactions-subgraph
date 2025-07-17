export type ProductLike = {
  id: number;
  productId: number;
  userId: string;
};

export type ProductComment = {
  id: number;
  comment: string;
  productId: number;
  userId: string;
};
