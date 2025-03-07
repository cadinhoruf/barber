"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center items-center py-12 min-h-screen">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-bold text-3xl">Barbearia Estilo</h1>
          <p className="text-muted-foreground">
            Faça login para agendar seu corte
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
