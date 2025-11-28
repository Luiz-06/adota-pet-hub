import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pet } from "@/types/pet";
import { Dog, Cat } from "lucide-react";

interface PetCardProps {
  pet: Pet;
  onClick: () => void;
}

const PetCard = ({ pet, onClick }: PetCardProps) => {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-hover)]"
      onClick={onClick}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          {pet.available ? (
            <Badge className="bg-secondary text-secondary-foreground shadow-md">
              Disponível
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-muted text-muted-foreground shadow-md">
              Adotado
            </Badge>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-card/90 backdrop-blur-sm">
            {pet.species === "Cachorro" ? (
              <Dog className="w-3 h-3 mr-1" />
            ) : (
              <Cat className="w-3 h-3 mr-1" />
            )}
            {pet.species}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-foreground">{pet.name}</h3>
            <p className="text-sm text-muted-foreground">
              {pet.sex} • {pet.age} • {pet.size}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {pet.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {pet.personality.slice(0, 3).map((trait) => (
            <Badge key={trait} variant="secondary" className="text-xs">
              {trait}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PetCard;
