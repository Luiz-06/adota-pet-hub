import { Shield } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Área Administrativa
          </h1>
          <p className="text-lg text-muted-foreground">
            Gerenciamento de animais e sistema
          </p>
        </div>
        
        <div className="bg-muted rounded-lg p-12 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Funcionalidade em desenvolvimento. Em breve você poderá fazer login e gerenciar os animais!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
