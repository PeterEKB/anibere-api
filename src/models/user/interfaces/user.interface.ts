export interface User {
  id: string;
  name?: Name;
  phone?: Phone;
  username?: string;
  image?: string;
  dob?: DoB;
}
export interface Name {
  first: string;
  last: string;
  full?: string;
}
export interface Phone {
  country: number;
  areaCode: number;
  prefix: number;
  line: number;
  number: number;
}
export interface DoB {
  day: number;
  month: number;
  year: number;
}
