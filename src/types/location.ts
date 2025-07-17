export type Country = {
  id: number;
  country: string;
};

export type Region = {
  id: number;
  region: string;
  countryId: number;
};

export type City = {
  id: number;
  city: string;
  regionId: number;
};

export type County = {
  id: number;
  county: string;
  cityId: number;
};
