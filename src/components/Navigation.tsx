import { Home, Map, HeartPulse, AlertTriangle, Shield } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Adoção" },
    { to: "/servicos", icon: Map, label: "Serviços" },
    { to: "/saude", icon: HeartPulse, label: "Saúde" },
    { to: "/denuncias", icon: AlertTriangle, label: "Denúncias" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Adota Pet
              </span>
            </div>
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  activeClassName="text-primary bg-primary/10 font-medium"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <NavLink
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-all"
              activeClassName="text-primary bg-primary/5"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
