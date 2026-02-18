import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, user, isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Gestion OTP
  const [step, setStep] = useState<"login"| "otp">("login")
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  // Redirection automatique si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      if (["admin", "organizer"].includes(user.role)) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.email || !formData.password) {
      setFormError("Veuillez remplir tous les champs");
      return;
    }

    try {
      // 1️⃣ Connexion initiale avec email + password
      await login(formData.email, formData.password);

      // 2️⃣ Envoyer OTP depuis le backend
      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/send-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!res.ok) throw new Error("Impossible d'envoyer l'OTP");

      setStep("otp");
      toast({ title: "OTP envoyé", description: "Vérifiez votre email pour le code OTP." });

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Connexion échouée";
      setFormError(errorMsg);
      toast({ title: "Connexion échouée", description: errorMsg, variant: "destructive" });
    }
  };

  const handleSubmitOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "OTP invalide ou expiré");

      toast({ title: "Connexion réussie", description: "OTP validé ✅" });

      // Redirection après OTP
      if (user && ["admin", "organizer"].includes(user.role)) navigate("/admin");
      else navigate("/");

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erreur OTP";
      setOtpError(errorMsg);
      toast({ title: "Erreur OTP", description: errorMsg, variant: "destructive" });
    }
  };

  const displayError = step === "login" ? (formError || error) : otpError;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">T</span>
            </div>
            <span className="font-display font-bold text-2xl">Tikerama</span>
          </Link>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
          <h1 className="font-display font-bold text-2xl text-center mb-2">
            {step === "login" ? "Connexion" : "Vérification OTP"}
          </h1>
          <p className="text-muted-foreground text-center mb-6 text-sm">
            {step === "login" ? "Connectez-vous pour continuer" : "Entrez le code OTP envoyé à votre email"}
          </p>

          {/* Error Message */}
          {displayError && (
            <div className="bg-destructive/10 text-destructive rounded-lg p-3 mb-4 text-sm flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{displayError}</span>
            </div>
          )}

          {step === "login" ? (
            <form onSubmit={handleSubmitLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="vous@exemple.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitOTP} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">Code OTP</label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Entrez le code OTP"
                  required
                />
                {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
              </div>

              <Button type="submit" className="w-full mt-4">
                Vérifier OTP
              </Button>
            </form>
          )}

          {step === "login" && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-blue-500 hover:underline font-medium">
                S'inscrire
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
