import { useState } from "react";
import PetCard from "@/components/PetCard";
import PetModal from "@/components/PetModal";
import { mockPets } from "@/data/mockPets";
import { Pet } from "@/types/pet";
import { Heart } from "lucide-react";

const Index = () => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePetClick = (pet: Pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 animate-pulse">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Encontre seu novo melhor amigo
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Todos esses animais estão esperando por um lar cheio de amor e carinho. 
            Adote e transforme duas vidas!
          </p>
        </div>
      </section>

      {/* Pets Grid */}
      <section className="pb-24 md:pb-32 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPets.map((pet) => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                onClick={() => handlePetClick(pet)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <PetModal 
        pet={selectedPet} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </div>
  );
};

export default Index;
