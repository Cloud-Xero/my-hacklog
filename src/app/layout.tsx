import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Universe } from "@/components/Universe";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
        <Universe>
          <main>{children}</main>
        </Universe>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
