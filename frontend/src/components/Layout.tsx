import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Home, FileText, User, Users, UtensilsCrossed, School2 } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card shadow-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <School2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-clip-text text-primary">
                SSH
              </span>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/dashboard">
                <Button
                  variant={isActive('/dashboard') ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>

              <Link to="/summary">
                <Button
                  variant={isActive('/summary') ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Summary
                </Button>
              </Link>

              {user?.role === 'admin' && (
                <>
                  <Link to="/admin/users">
                    <Button
                      variant={isActive('/admin/users') ? 'default' : 'ghost'}
                      size="sm"
                      className="gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link to="/admin/generate-summary">
                    <Button
                      variant={isActive('/admin/generate-summary') ? 'default' : 'ghost'}
                      size="sm"
                      className="gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Generate
                    </Button>
                  </Link>
                </>
              )}

              {user?.role === 'manager' && (
                <Link to="/manager/create-meal">
                  <Button
                    variant={isActive('/manager/create-meal') ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <UtensilsCrossed className="h-4 w-4" />
                    Create Meal
                  </Button>
                </Link>
              )}

              <div className="flex items-center gap-2 border-l border-border pl-4">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {user?.role}
                </span>
              </div>

              <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};
