"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Globe, Send } from "lucide-react";

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        reset();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Erreur lors de l'envoi");
      }
    } catch (err) {
      alert("Erreur lors de l'envoi du formulaire");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-19">
       <Header />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
       
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <ContactCard icon={<Mail />} title="Email">
            support@awdtech.com
          </ContactCard>

          <ContactCard icon={<Phone />} title="Cameroun">
            +237 656 849 690 <br /> +237 653 624 318
          </ContactCard>

          <ContactCard icon={<Phone />} title="Côte d'Ivoire">
            +225 27 24 3 73010 <br /> +225 27 24 3 73317
          </ContactCard>

          <ContactCard icon={<Globe />} title="Service">
            Numérique partout dans le monde
          </ContactCard>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-md border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
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
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {loading ? "Envoi..." : "Envoyer le message"}
              <Send size={18} />
            </button>

            {success && (
              <p className="text-green-600 text-sm mt-2">
                ✅ Message envoyé avec succès !
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ContactCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition">
      <div className="p-3 bg-orange-100 rounded-xl text-orange-500">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{children}</p>
      </div>
    </div>
  );
}

const InputField = ({ label, error, type = "text", ...props }: any) => (
  <div>
    <label className="block mb-2 font-medium">{label}</label>
    <input
      type={type}
      {...props}
      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
