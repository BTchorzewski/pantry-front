export interface Item {
  id: string;
  name: string;
  createdAt: Date;
  expiration: Date;
}

export interface Pantry {
  id: string;
  name: string;
  items: Item[];
}
export interface CreatePantryResponse {
  message: string;
  pantryId?: string;
}

export interface Stats {
  fresh: number;
  expiredSoon: number;
  total: number;
  expired: number;
}

export interface ShortPantry {
  id: string;
  name: string;
  stats: Stats;
}

export interface FetchShortPantriesResponse {
  message: string;
  data: ShortPantry[];
}

export interface UpdatePantryResponse {
  message: string;
  data: Pantry;
}

export interface DeletePantryResponse {
  message: string;
}

export interface FetchPantryByIdResponse {
  message: string;
  data: Pantry;
}
