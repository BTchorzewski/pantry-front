export interface CreatedItemResponse {
  id: string;
  name: string;
  expiration: Date;
}
export type GetItemResponse = CreatedItemResponse;
export type UpdateItemResponse = CreatedItemResponse;
export type DeletedItemResponse = {
  message: 'The item has been deleted.';
};
