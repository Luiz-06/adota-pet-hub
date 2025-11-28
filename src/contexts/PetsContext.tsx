import React, { createContext, useContext, useState, useEffect } from "react";
import { Pet } from "@/types/pet";
import dog1 from "@/assets/dog1.jpg";
import dog2 from "@/assets/dog2.jpg";
import dog3 from "@/assets/dog3.jpg";
import cat1 from "@/assets/cat1.jpg";
import cat2 from "@/assets/cat2.jpg";
import cat3 from "@/assets/cat3.jpg";

const initialPets: Pet[] = [
  {
    id: "1",
    name: "Thor",
    age: "3 anos",
    sex: "Macho",
    size: "Grande",
    species: "Cachorro",
    image: dog1,
    description: "Thor é um golden retriever super carinhoso e brincalhão. Adora crianças e outros animais. Está procurando um lar com espaço para correr e brincar.",
    personality: ["Carinhoso", "Brincalhão", "Obediente"],
    vaccinated: true,
    neutered: true,
    available: true,
  },
  {
    id: "2",
    name: "Luna",
    age: "2 anos",
    sex: "Fêmea",
    size: "Pequeno",
    species: "Gato",
    image: cat1,
    description: "Luna é uma gatinha tigrada muito tranquila e independente. Gosta de carinho mas também aprecia seus momentos de solidão. Perfeita para apartamentos.",
    personality: ["Tranquila", "Independente", "Carinhosa"],
    vaccinated: true,
    neutered: true,
    available: true,
  },
  {
    id: "3",
    name: "Bob",
    age: "1 ano",
    sex: "Macho",
    size: "Médio",
    species: "Cachorro",
    image: dog2,
    description: "Bob é um beagle cheio de energia e muito curioso. Adora passear e explorar novos lugares. Precisa de uma família ativa que goste de aventuras.",
    personality: ["Energético", "Curioso", "Amigável"],
    vaccinated: true,
    neutered: false,
    available: true,
  },
  {
    id: "4",
    name: "Mia",
    age: "4 anos",
    sex: "Fêmea",
    size: "Pequeno",
    species: "Gato",
    image: cat2,
    description: "Mia é uma gata elegante de olhos azuis. Muito dócil e calma, ideal para quem procura uma companheira tranquila. Se adapta bem a rotinas.",
    personality: ["Calma", "Dócil", "Elegante"],
    vaccinated: true,
    neutered: true,
    available: true,
  },
];

interface PetsContextType {
  pets: Pet[];
  addPet: (pet: Omit<Pet, "id">) => void;
  updatePet: (id: string, pet: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  toggleAvailability: (id: string) => void;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export const PetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>(() => {
    const savedPets = localStorage.getItem("adotapet-pets");
    return savedPets ? JSON.parse(savedPets) : initialPets;
  });

  useEffect(() => {
    localStorage.setItem("adotapet-pets", JSON.stringify(pets));
  }, [pets]);

  const addPet = (pet: Omit<Pet, "id">) => {
    const newPet = {
      ...pet,
      id: Date.now().toString(),
    };
    setPets([...pets, newPet]);
  };

  const updatePet = (id: string, updatedData: Partial<Pet>) => {
    setPets(pets.map((pet) => (pet.id === id ? { ...pet, ...updatedData } : pet)));
  };

  const deletePet = (id: string) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setPets(
      pets.map((pet) =>
        pet.id === id ? { ...pet, available: !pet.available } : pet
      )
    );
  };

  return (
    <PetsContext.Provider
      value={{ pets, addPet, updatePet, deletePet, toggleAvailability }}
    >
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error("usePets must be used within a PetsProvider");
  }
  return context;
};
