import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Typing Machine",
  description: `Typing Machine ©${new Date().getFullYear()} Created by Solitude SSerein`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen max-h-100 h-[100%] bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-[95vh]" style={{ height: "calc(100vh - 50px)" }}>
            {children}
          </div>
          <div className="absolute bottom-0 h-[40px] w-screen p-[10px] flex justify-center">
            <p id="a" className="text-sm text-muted-foreground text-center">
              Typing Machine ©{new Date().getFullYear()} Created by Solitude Serein
            </p>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
