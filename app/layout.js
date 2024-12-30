export const metadata = {
  title: "Miniature Collection Manager",
  description: "A Project to Track Tons of Models & Learn More About CRUD Applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="rootBody">
        {children}
      </body>
    </html>
  );
}
