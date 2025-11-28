import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pet } from "@/types/pet";
import { Dog, Cat, CheckCircle, XCircle, MessageCircle } from "lucide-react";

interface PetModalProps {
  pet: Pet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PetModal = ({ pet, open, onOpenChange }: PetModalProps) => {
  if (!pet) return null;

  const handleWhatsAppClick = () => {
    const phoneNumber = "5586995845857";
    const message = encodeURIComponent(
      `Olá! Tenho interesse em adotar o(a) ${pet.name}. Poderia me dar mais informações?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {pet.species === "Cachorro" ? (
              <Dog className="w-6 h-6 text-primary" />
            ) : (
              <Cat className="w-6 h-6 text-primary" />
            )}
            {pet.name}
          </DialogTitle>
          <DialogDescription>
            Conheça mais sobre este adorável animal
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative overflow-hidden rounded-lg aspect-video">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Espécie</p>
              <p className="font-semibold">{pet.species}</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Idade</p>
              <p className="font-semibold">{pet.age}</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Sexo</p>
              <p className="font-semibold">{pet.sex}</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Porte</p>
              <p className="font-semibold">{pet.size}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">História</h3>
            <p className="text-muted-foreground">{pet.description}</p>
          </div>

          {/* Personality */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">Personalidade</h3>
            <div className="flex flex-wrap gap-2">
              {pet.personality.map((trait) => (
                <Badge key={trait} variant="secondary" className="text-sm">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Health Status */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">Saúde</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {pet.vaccinated ? (
                  <CheckCircle className="w-5 h-5 text-secondary" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <span className="text-sm">
                  {pet.vaccinated ? "Vacinado" : "Não vacinado"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {pet.neutered ? (
                  <CheckCircle className="w-5 h-5 text-secondary" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <span className="text-sm">
                  {pet.neutered ? "Castrado" : "Não castrado"}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          {pet.available ? (
            <>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity text-lg py-6"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Quero Adotar {pet.name}!
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Você será redirecionado para o WhatsApp para iniciar o processo de adoção
              </p>
            </>
          ) : (
            <div className="text-center py-4 px-6 bg-muted rounded-lg">
              <p className="text-lg font-semibold text-muted-foreground">
                {pet.name} já foi adotado! 🎉
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Mas temos outros amiguinhos esperando por você!
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PetModal;
