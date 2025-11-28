import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePets } from "@/contexts/PetsContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, LogOut, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pet } from "@/types/pet";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { pets, addPet, updatePet, deletePet, toggleAvailability } = usePets();
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "Macho" as "Macho" | "Fêmea",
    size: "Médio" as "Pequeno" | "Médio" | "Grande",
    species: "Cachorro" as "Cachorro" | "Gato",
    image: "",
    description: "",
    personality: "",
    vaccinated: true,
    neutered: true,
  });

  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      sex: "Macho",
      size: "Médio",
      species: "Cachorro",
      image: "",
      description: "",
      personality: "",
      vaccinated: true,
      neutered: true,
    });
  };

  const handleAdd = () => {
    const newPet = {
      ...formData,
      personality: formData.personality.split(",").map((p) => p.trim()),
      available: true,
    };

    addPet(newPet);
    
    toast({
      title: "Animal adicionado!",
      description: `${formData.name} foi adicionado com sucesso.`,
    });

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = () => {
    if (!editingPet) return;

    const updatedData = {
      ...formData,
      personality: formData.personality.split(",").map((p) => p.trim()),
    };

    updatePet(editingPet.id, updatedData);

    toast({
      title: "Animal atualizado!",
      description: `${formData.name} foi atualizado com sucesso.`,
    });

    resetForm();
    setEditingPet(null);
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir ${name}?`)) {
      deletePet(id);
      toast({
        title: "Animal removido",
        description: `${name} foi removido do sistema.`,
      });
    }
  };

  const openEditDialog = (pet: Pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      age: pet.age,
      sex: pet.sex,
      size: pet.size,
      species: pet.species,
      image: pet.image,
      description: pet.description,
      personality: pet.personality.join(", "),
      vaccinated: pet.vaccinated,
      neutered: pet.neutered,
    });
    setIsEditDialogOpen(true);
  };

  const handleToggleAvailability = (id: string, name: string, currentStatus: boolean) => {
    toggleAvailability(id);
    toast({
      title: currentStatus ? "Animal marcado como adotado" : "Animal disponível novamente",
      description: `${name} teve seu status alterado.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Administrativo</h1>
            <p className="text-muted-foreground">Gerencie os animais disponíveis para adoção</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Animal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Animal</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Thor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="3 anos"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sex">Sexo</Label>
                    <Select value={formData.sex} onValueChange={(value: "Macho" | "Fêmea") => setFormData({ ...formData, sex: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Macho">Macho</SelectItem>
                        <SelectItem value="Fêmea">Fêmea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Porte</Label>
                    <Select value={formData.size} onValueChange={(value: "Pequeno" | "Médio" | "Grande") => setFormData({ ...formData, size: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pequeno">Pequeno</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="species">Espécie</Label>
                    <Select value={formData.species} onValueChange={(value: "Cachorro" | "Gato") => setFormData({ ...formData, species: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cachorro">Cachorro</SelectItem>
                        <SelectItem value="Gato">Gato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL da Foto</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Conte a história do animal..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personality">Personalidade (separado por vírgula)</Label>
                  <Input
                    id="personality"
                    value={formData.personality}
                    onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                    placeholder="Carinhoso, Brincalhão, Obediente"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="vaccinated"
                      checked={formData.vaccinated}
                      onChange={(e) => setFormData({ ...formData, vaccinated: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="vaccinated">Vacinado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="neutered"
                      checked={formData.neutered}
                      onChange={(e) => setFormData({ ...formData, neutered: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="neutered">Castrado</Label>
                  </div>
                </div>

                <Button onClick={handleAdd} className="w-full">
                  Adicionar Animal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Espécie</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{pet.name}</TableCell>
                  <TableCell>{pet.species}</TableCell>
                  <TableCell>{pet.age}</TableCell>
                  <TableCell>
                    {pet.available ? (
                      <Badge className="bg-secondary">Disponível</Badge>
                    ) : (
                      <Badge variant="secondary">Adotado</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAvailability(pet.id, pet.name, pet.available)}
                      >
                        {pet.available ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(pet)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(pet.id, pet.name)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Edit Dialog - Similar structure to Add Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Animal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Same form fields as Add Dialog */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nome</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Idade</Label>
                  <Input
                    id="edit-age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Sexo</Label>
                  <Select value={formData.sex} onValueChange={(value: "Macho" | "Fêmea") => setFormData({ ...formData, sex: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Macho">Macho</SelectItem>
                      <SelectItem value="Fêmea">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Porte</Label>
                  <Select value={formData.size} onValueChange={(value: "Pequeno" | "Médio" | "Grande") => setFormData({ ...formData, size: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pequeno">Pequeno</SelectItem>
                      <SelectItem value="Médio">Médio</SelectItem>
                      <SelectItem value="Grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Espécie</Label>
                  <Select value={formData.species} onValueChange={(value: "Cachorro" | "Gato") => setFormData({ ...formData, species: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cachorro">Cachorro</SelectItem>
                      <SelectItem value="Gato">Gato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL da Foto</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Personalidade</Label>
                <Input
                  value={formData.personality}
                  onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-vaccinated"
                    checked={formData.vaccinated}
                    onChange={(e) => setFormData({ ...formData, vaccinated: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="edit-vaccinated">Vacinado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-neutered"
                    checked={formData.neutered}
                    onChange={(e) => setFormData({ ...formData, neutered: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="edit-neutered">Castrado</Label>
                </div>
              </div>

              <Button onClick={handleEdit} className="w-full">
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
