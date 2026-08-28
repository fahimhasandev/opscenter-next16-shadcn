import "./globals.css";

export const metadata = {
  title: "OpsCenter",
  description: "Operations workspace"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
