export interface Pet {
  id: string;
  name: string;
  age: string;
  sex: "Macho" | "Fêmea";
  size: "Pequeno" | "Médio" | "Grande";
  species: "Cachorro" | "Gato";
  image: string;
  description: string;
  personality: string[];
  vaccinated: boolean;
  neutered: boolean;
  available: boolean;
}
