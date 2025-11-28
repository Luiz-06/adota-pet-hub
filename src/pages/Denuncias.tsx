import { AlertTriangle } from "lucide-react";

const Denuncias = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 md:pb-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-destructive to-primary mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Canal de Denúncias
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Denuncie casos de maus-tratos e abandono de animais de forma anônima
          </p>
        </div>
        
        <div className="bg-muted rounded-lg p-12 text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Funcionalidade em desenvolvimento. Em breve você poderá fazer denúncias de forma segura e anônima!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Denuncias;
