import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, LogOut, LayoutDashboard } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "stylist"
        ? "/dashboard/stylist"
        : "/dashboard";

  const links = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/discover", label: t("nav.discover") },
    { to: "/how-it-works", label: t("nav.how") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm transition-smooth relative group",
      isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
    );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight">
            Coiffure<span className="text-gold">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "DE" ? "EN" : "DE")}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang}
          </button>

          {!user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">{t("nav.login")}</Link>
              </Button>
              <Button variant="premium" size="sm" asChild>
                <Link to="/register">{t("nav.register")}</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="premium" size="sm">
                  {user.name.split(" ")[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card">
                <DropdownMenuLabel>
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={dashboardPath} className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" /> {t("nav.dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" /> {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background animate-fade-in">
          <div className="container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn("text-base py-1", isActive && "text-gold")
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={() => setLang(lang === "DE" ? "EN" : "DE")}
              className="text-sm text-muted-foreground text-left flex items-center gap-2"
            >
              <Globe className="h-4 w-4" /> {lang === "DE" ? "English" : "Deutsch"}
            </button>
            <div className="flex flex-col gap-2 pt-2">
              {!user ? (
                <>
                  <Button variant="ghost" asChild onClick={() => setOpen(false)}>
                    <Link to="/login">{t("nav.login")}</Link>
                  </Button>
                  <Button variant="premium" asChild onClick={() => setOpen(false)}>
                    <Link to="/register">{t("nav.register")}</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild onClick={() => setOpen(false)}>
                    <Link to={dashboardPath}>{t("nav.dashboard")}</Link>
                  </Button>
                  <Button
                    variant="premium"
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                  >
                    {t("nav.logout")}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
