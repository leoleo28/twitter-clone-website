"use client";

import { SessionProvider } from "next-auth/react";

const Provider: React.FC<{ children: React.ReactNode; session?: any }> = ({
  children,
  session,
}) => <SessionProvider session={session}>{children}</SessionProvider>;

export default Provider;
