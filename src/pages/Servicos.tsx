import { useState } from "react";
import { Map as MapIcon, Stethoscope, ShoppingBag, Sparkles, Trees, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Service {
  id: string;
  name: string;
  type: "clinica" | "petshop" | "spa" | "parque";
  address: string;
  phone?: string;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Clínica Veterinária PetLife",
    type: "clinica",
    address: "Av. Frei Serafim, 2000 - Centro, Teresina",
    phone: "(86) 3221-0000",
  },
  {
    id: "2",
    name: "Pet Shop Amigo Fiel",
    type: "petshop",
    address: "Rua Paissandu, 1500 - Fátima, Teresina",
    phone: "(86) 3223-1111",
  },
  {
    id: "3",
    name: "Spa & Banho Pelos & Patinhas",
    type: "spa",
    address: "Rua São Pedro, 800 - Jóquei, Teresina",
    phone: "(86) 3224-2222",
  },
  {
    id: "4",
    name: "Parque da Cidadania",
    type: "parque",
    address: "Av. Boa Esperança, 5000 - Leste, Teresina",
  },
  {
    id: "5",
    name: "Clínica Veterinária Amigo Pet",
    type: "clinica",
    address: "Rua Des. Pires de Castro, 300 - Centro, Teresina",
    phone: "(86) 3225-3333",
  },
  {
    id: "6",
    name: "Parque Potycabana",
    type: "parque",
    address: "Av. Raul Lopes, 1000 - Noivos, Teresina",
  },
  {
    id: "7",
    name: "Pet Shop Cão&Gato",
    type: "petshop",
    address: "Rua Coelho Rodrigues, 450 - Centro, Teresina",
    phone: "(86) 3226-4444",
  },
  {
    id: "8",
    name: "Spa VIP Pet",
    type: "spa",
    address: "Av. Frei Serafim, 3200 - Fátima, Teresina",
    phone: "(86) 3227-5555",
  },
];

const Servicos = () => {
  const [activeFilter, setActiveFilter] = useState<string>("todos");

  const filters = [
    { id: "todos", label: "Todos", icon: MapIcon },
    { id: "clinica", label: "Clínicas", icon: Stethoscope },
    { id: "petshop", label: "Pet Shops", icon: ShoppingBag },
    { id: "spa", label: "Spas", icon: Sparkles },
    { id: "parque", label: "Parques", icon: Trees },
  ];

  const filteredServices =
    activeFilter === "todos"
      ? mockServices
      : mockServices.filter((s) => s.type === activeFilter);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "clinica":
        return "Clínica Veterinária";
      case "petshop":
        return "Pet Shop";
      case "spa":
        return "Spa";
      case "parque":
        return "Parque";
      default:
        return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "clinica":
        return Stethoscope;
      case "petshop":
        return ShoppingBag;
      case "spa":
        return Sparkles;
      case "parque":
        return Trees;
      default:
        return MapPin;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 md:pb-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent mb-4">
            <MapIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Mapa de Serviços
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre pet shops, clínicas veterinárias, spas e parques próximos a você
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className="gap-2"
              >
                <IconComponent className="w-4 h-4" />
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Map Visualization */}
        <div className="mb-8 rounded-lg overflow-hidden border border-border bg-muted/30 relative">
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-secondary/10 to-primary/10">
            <div className="text-center space-y-4 p-8">
              <MapIcon className="w-16 h-16 mx-auto text-primary" />
              <p className="text-lg font-medium text-foreground">
                Mapa Interativo em Desenvolvimento
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Em breve você poderá visualizar todos os serviços em um mapa interativo 
                com geolocalização em tempo real
              </p>
            </div>
          </div>
          
          {/* Mock Map Pins */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin className="w-6 h-6 text-primary drop-shadow-lg" />
            </div>
            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin className="w-6 h-6 text-secondary drop-shadow-lg" />
            </div>
            <div className="absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin className="w-6 h-6 text-accent drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {filteredServices.length} {filteredServices.length === 1 ? "Serviço Encontrado" : "Serviços Encontrados"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => {
              const TypeIcon = getTypeIcon(service.type);
              return (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                        <TypeIcon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <Badge variant="secondary" className="mb-2">
                          {getTypeLabel(service.type)}
                        </Badge>
                        
                        <h3 className="font-semibold text-foreground leading-tight">
                          {service.name}
                        </h3>
                        
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{service.address}</span>
                        </div>
                        
                        {service.phone && (
                          <div className="flex items-center gap-2 text-sm text-primary font-medium pt-2">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${service.phone}`} className="hover:underline">
                              {service.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicos;
