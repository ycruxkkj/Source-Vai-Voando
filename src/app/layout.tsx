import "./globals.css";
import React from "react";

export const metadata = {
  title: "Fonte Vai-Voando",
  description: "Painel de promoções aéreas para agência",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
