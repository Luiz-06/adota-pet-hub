import { useState } from "react";
import { HeartPulse, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

interface Symptom {
  id: string;
  label: string;
  severity: "low" | "medium" | "high";
}

const symptoms: Symptom[] = [
  { id: "vomito", label: "Vômito frequente", severity: "high" },
  { id: "diarreia", label: "Diarreia", severity: "medium" },
  { id: "febre", label: "Febre / Corpo quente", severity: "high" },
  { id: "apatia", label: "Apatia / Sem energia", severity: "medium" },
  { id: "falta-apetite", label: "Falta de apetite", severity: "medium" },
  { id: "tosse", label: "Tosse persistente", severity: "medium" },
  { id: "dificuldade-respirar", label: "Dificuldade para respirar", severity: "high" },
  { id: "tremores", label: "Tremores", severity: "high" },
  { id: "coceira", label: "Coceira excessiva", severity: "low" },
  { id: "feridas", label: "Feridas ou lesões", severity: "medium" },
];

const Saude = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
    setShowResult(false);
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;
    setShowResult(true);
  };

  const getAnalysisResult = () => {
    const selected = symptoms.filter((s) => selectedSymptoms.includes(s.id));
    const hasHighSeverity = selected.some((s) => s.severity === "high");
    const mediumCount = selected.filter((s) => s.severity === "medium").length;

    if (hasHighSeverity || mediumCount >= 3) {
      return {
        level: "urgent",
        title: "Atenção Urgente Necessária",
        description:
          "Os sintomas indicam uma possível condição séria. Recomendamos procurar um veterinário imediatamente. Não espere para agendar uma consulta.",
        color: "bg-destructive/10 border-destructive",
      };
    } else if (mediumCount >= 1) {
      return {
        level: "moderate",
        title: "Consulta Veterinária Recomendada",
        description:
          "Os sintomas podem indicar um problema de saúde que precisa de atenção. Recomendamos agendar uma consulta veterinária nos próximos dias.",
        color: "bg-primary/10 border-primary",
      };
    } else {
      return {
        level: "mild",
        title: "Monitoramento Recomendado",
        description:
          "Os sintomas parecem leves, mas é importante monitorar. Se piorarem ou persistirem, consulte um veterinário.",
        color: "bg-secondary/10 border-secondary",
      };
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Assistente de Saúde Pet
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistema de triagem veterinária baseado em sintomas
          </p>
        </div>

        {/* Disclaimer */}
        <Alert className="mb-8 border-primary">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Aviso Importante</AlertTitle>
          <AlertDescription>
            Esta ferramenta não substitui uma consulta veterinária profissional. 
            É apenas informativa e deve ser usada como orientação inicial. 
            Em casos de emergência, procure um veterinário imediatamente.
          </AlertDescription>
        </Alert>

        {/* Symptoms Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Selecione os Sintomas</CardTitle>
            <CardDescription>
              Marque todos os sintomas que seu pet está apresentando
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={symptom.id}
                    checked={selectedSymptoms.includes(symptom.id)}
                    onCheckedChange={() => handleSymptomToggle(symptom.id)}
                  />
                  <label
                    htmlFor={symptom.id}
                    className="flex-1 text-sm font-medium leading-none cursor-pointer"
                  >
                    {symptom.label}
                  </label>
                  {symptom.severity === "high" && (
                    <span className="text-xs text-destructive font-semibold">
                      Grave
                    </span>
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={analyzeSymptoms}
              disabled={selectedSymptoms.length === 0}
              className="w-full mt-6"
              size="lg"
            >
              Analisar Sintomas
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Result */}
        {showResult && (
          <Card className={`border-2 ${getAnalysisResult().color}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5" />
                {getAnalysisResult().title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {getAnalysisResult().description}
              </p>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">Sintomas selecionados:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {symptoms
                    .filter((s) => selectedSymptoms.includes(s.id))
                    .map((s) => (
                      <li key={s.id} className="text-sm text-muted-foreground">
                        {s.label}
                      </li>
                    ))}
                </ul>
              </div>

              <Button
                onClick={() => navigate("/servicos")}
                className="w-full"
                variant="default"
              >
                Encontrar Veterinário Próximo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Saude;
