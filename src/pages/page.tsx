"use client";

import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Globe, Send, MapPin } from "lucide-react";

import { Header } from "@/components/layout/Header";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(3, "Sujet requis"),
  message: z.string().min(10, "Message trop court"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        reset();
      } else {
        alert("Erreur lors de l'envoi");
      }
    } catch {
      alert("Erreur réseau");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR FIXE */}
      <Header />

      {/* IMPORTANT: padding-top pour éviter que le contenu soit caché */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Contactez-nous
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
              Une question ? Un projet ? Notre équipe est disponible pour vous répondre rapidement.
            </p>
          </div>

          {/* GRID RESPONSIVE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT - INFOS */}
            <div className="bg-orange-50 p-6 sm:p-8 rounded-2xl md:rounded-3xl border space-y-6">

              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Nos coordonnées
              </h2>

              <ContactItem icon={<Mail />} title="Email">
                williamsmahan@gmail.com
              </ContactItem>

              <ContactItem icon={<Phone />} title="Téléphone">
                +225 0564295355
              </ContactItem>

              <ContactItem icon={<MapPin />} title="Localisation">
                Abidjan, Côte d'Ivoire
              </ContactItem>

              <ContactItem icon={<Globe />} title="Service">
                Disponible partout dans le monde
              </ContactItem>

            </div>

            {/* RIGHT - FORM */}
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-lg border">

              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                Envoyer un message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* responsive inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <InputField
                    label="Nom complet"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <InputField
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>

                <InputField
                  label="Sujet"
                  error={errors.subject?.message}
                  {...register("subject")}
                />

                <div>
                  <label className="block mb-2 font-medium">Message</label>
                  <textarea
                    rows={5}
                    {...register("message")}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  {loading ? "Envoi..." : "Envoyer le message"}
                  <Send size={18} />
                </button>

                {success && (
                  <p className="text-green-600 text-sm mt-2 text-center">
                    ✅ Message envoyé avec succès !
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ContactItem({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-orange-100 text-orange-500 rounded-xl shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
          {title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base">
          {children}
        </p>
      </div>
    </div>
  );
}

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, type = "text", ...props }, ref) => (
    <div>
      <label className="block mb-2 font-medium text-sm md:text-base">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        {...props}
        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm md:text-base"
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  )
);

InputField.displayName = "InputField";