import { HeartPulse } from "lucide-react";

const Saude = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 md:pb-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Assistente de Saúde
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistema de triagem veterinária baseado em sintomas
          </p>
        </div>
        
        <div className="bg-muted rounded-lg p-12 text-center">
          <HeartPulse className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Funcionalidade em desenvolvimento. Em breve você terá acesso a um assistente inteligente de saúde!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Saude;
