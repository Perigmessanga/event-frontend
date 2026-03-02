// src/components/layout/AdminLayout.tsx
import { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export function AdminLayout() {
  const { user, isAuthenticated, checkAuth, hasRole } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  if (!hasRole(['admin', 'organizer'])) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="font-display font-bold text-2xl mb-4">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">
            Vous n'avez pas les droits d'accès à cette section.
          </p>
          <NavLink to="/">
            <Button>Retour à l'accueil</Button>
          </NavLink>
        </div>
      </div>
    );
  }

  // Layout Admin avec sidebar
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`
            }
          >
            Événements
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`
            }
          >
            Commandes
          </NavLink>
          <NavLink
            to="/admin/tickets"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`
            }
          >
            Tickets
          </NavLink>
          <NavLink
            to="/admin/sales"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`
            }
          >
            Ventes
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`
            }
          >
            Paramètres
          </NavLink>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Bienvenue {user.email}</h1>
        </header>

        {/* Ici s'affichent toutes les pages imbriquées via <Outlet /> */}
        <Outlet />
      </main>
    </div>
  );
}