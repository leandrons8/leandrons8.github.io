import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

import type { Metadata } from "next";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";

export const metadata: Metadata = {
  title: "Calculadora de barra olímpica",
  description: "Calculadora de barra olímpica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-bs-theme="dark">
      <body>
        <Navbar sticky="top" bg="body-tertiary">
          <Container>
            <NavbarBrand>
              Calculadora de barra olímpica
            </NavbarBrand>
          </Container>
        </Navbar>
        {children}
      </body>
    </html>
  );
}
