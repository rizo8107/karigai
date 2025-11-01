import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { pocketbase } from "@/lib/pocketbase";

export default function AdminRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [adminChecked, setAdminChecked] = useState(false);
  const [isAdminState, setIsAdminState] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      if (!user) return;
      // Authorize by checking the 'admin' collection for the user's email
      try {
        if (!user.email) throw new Error("Missing user email");
        await pocketbase
          .collection("admin")
          .getFirstListItem(`admin_email="${user.email}" && isAdmin=true`);
        if (!cancelled) setIsAdminState(true);
      } catch (_e) {
        if (!cancelled) setIsAdminState(false);
      } finally {
        if (!cancelled) setAdminChecked(true);
      }
    };
    if (user && !adminChecked) void check();
    return () => { cancelled = true; };
  }, [user, adminChecked]);

  if (loading || (user && !adminChecked)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (!isAdminState) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
