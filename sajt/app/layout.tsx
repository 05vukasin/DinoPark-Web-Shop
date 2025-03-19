export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body suppressHydrationWarning className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
