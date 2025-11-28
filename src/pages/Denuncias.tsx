import { useState, FormEvent } from "react";
import { AlertTriangle, MapPin, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Denuncias = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    type: "",
    description: "",
    photo: null as File | null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      toast({
        title: "Denúncia recebida com sucesso!",
        description: "Nossa equipe irá analisar e tomar as providências necessárias. Obrigado por ajudar!",
      });

      // Reset form
      setFormData({
        location: "",
        type: "",
        description: "",
        photo: null,
      });

      setIsSubmitting(false);
    }, 1500);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-destructive to-primary mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Canal de Denúncias
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Denuncie casos de maus-tratos e abandono de animais de forma anônima e segura
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fazer uma Denúncia</CardTitle>
            <CardDescription>
              Todas as informações são tratadas de forma confidencial. 
              Sua identidade não será revelada.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Localização do Incidente *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Endereço, bairro ou ponto de referência"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Ocorrência *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maus-tratos">Maus-tratos</SelectItem>
                    <SelectItem value="abandono">Abandono</SelectItem>
                    <SelectItem value="animal-ferido">Animal Ferido</SelectItem>
                    <SelectItem value="criacao-irregular">
                      Criação Irregular
                    </SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Fato *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente o que você presenciou..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={5}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Quanto mais detalhes, melhor poderemos ajudar
                </p>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo">Foto (Opcional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formData.photo
                        ? formData.photo.name
                        : "Clique para fazer upload de uma foto"}
                    </span>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Se possível, anexe fotos que ajudem a documentar a situação
                </p>
              </div>

              {/* Privacy Notice */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Sua privacidade é importante:</strong> Todas as denúncias 
                  são anônimas e confidenciais. As informações serão usadas apenas 
                  para investigação e proteção dos animais.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Denúncia"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Contatos de Emergência</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Polícia Ambiental:</strong> 190
            </p>
            <p>
              <strong>Defesa Civil:</strong> 199
            </p>
            <p className="text-muted-foreground pt-2">
              Em casos de emergência imediata, entre em contato diretamente com 
              as autoridades competentes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Denuncias;
