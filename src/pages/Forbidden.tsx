import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-[60vh] grid place-items-center p-8 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">403 – Forbidden</h1>
        <p className="text-muted-foreground mb-6">You don’t have permission to access this page.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white">
            Go Home
          </Link>
          <Link to="/auth/login" className="inline-flex items-center rounded-md border px-4 py-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
