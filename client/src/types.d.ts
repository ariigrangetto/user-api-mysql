export interface USERS {
  id: string | number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: HAIR;
  university: string;
  role: string;
}

export interface HAIR {
  color: string;
  type: string;
}

export type filterTypes = {
  role: FormDataEntryValue | null;
  gender: FormDataEntryValue | null;
};
