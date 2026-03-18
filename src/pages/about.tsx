/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Layout } from "@/components/layout/Layout";
import { Shield, Zap, Globe, Users, Target, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">

          {/* HERO */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              À propos de AWARD
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Une plateforme moderne qui révolutionne la billetterie et le paiement digital en Afrique.
            </p>
          </div>

          {/* MISSION + VISION */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border dark:border-gray-700 hover:shadow-md transition">
              <Target className="text-orange-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Notre mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Simplifier l'accès aux événements et offrir une expérience de paiement rapide,
                sécurisée et accessible à tous grâce au Mobile Money.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border dark:border-gray-700 hover:shadow-md transition">
              <Rocket className="text-orange-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Notre vision</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Devenir la référence en Afrique pour la gestion d'événements et les solutions
                de paiement numérique.
              </p>
            </div>
          </div>

          {/* VALEURS */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
              Nos valeurs
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueCard icon={<Zap />} title="Rapidité" desc="Paiements instantanés et fluides." />
              <ValueCard icon={<Shield />} title="Sécurité" desc="Protection maximale des transactions." />
              <ValueCard icon={<Globe />} title="Accessibilité" desc="Disponible partout en Afrique." />
              <ValueCard icon={<Users />} title="Communauté" desc="Connecter organisateurs et participants." />
            </div>
          </div>

          {/* TIMELINE */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
              Notre évolution
            </h2>
            <div className="space-y-8">
              <TimelineItem year="2024" text="Création de AWARD et lancement du projet." />
              <TimelineItem year="2025" text="Développement de la plateforme et intégration Mobile Money." />
              <TimelineItem year="2026" text="Expansion et lancement officiel au public." />
            </div>
          </div>

          {/* TEAM */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
              Notre équipe
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              <TeamCard name="Fondateur" role="CEO & Developer" />
              <TeamCard name="Marketing" role="Communication" />
              <TeamCard name="Support" role="Service client" />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-md border dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Rejoignez l'expérience AWARD
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Découvrez les meilleurs événements et réservez en quelques secondes.
            </p>
            <a
              href="/events"
              className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#C9A227] hover:opacity-90 text-black px-6 py-3 rounded-xl transition font-semibold"
            >
              Explorer les événements
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ================= COMPONENTS ================= */

function ValueCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700 hover:shadow-md transition text-center">
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-orange-100 text-orange-500 rounded-xl">
        {icon}
      </div>
      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
    </div>
  );
}

function TimelineItem({ year, text }: any) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-20 text-orange-500 font-bold">{year}</div>
      <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 text-gray-900 dark:text-gray-100">
        {text}
      </div>
    </div>
  );
}

function TeamCard({ name, role }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700 text-center hover:shadow-md transition">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
        {name.charAt(0)}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{role}</p>
    </div>
  );
}