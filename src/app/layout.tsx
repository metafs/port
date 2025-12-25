import type { Metadata } from "next";
import "@mantine/core/styles.css"; // Mantineの基本スタイル
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { Header } from "@/components/common/Header";
import { ParticleCursor } from "@/components/common/ParticleCursor";

export const metadata: Metadata = {
  title: "Your Name | Choreographer",
  description: "Portfolio of Choreographer / Artist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* Mantineのダークモード設定スクリプト */}
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body style={{ backgroundColor: "#101113" }}>
        {/* MantineProviderで全体を囲む */}
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <ParticleCursor />
          <Header />
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
