import "./globals.css"

export const metadata = {
  title: "Nao Medical Translator",
  description: "Healthcare translation prototype"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
