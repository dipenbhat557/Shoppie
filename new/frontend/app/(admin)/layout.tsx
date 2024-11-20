import { DesktopSidebar } from "./dashboard/components/DesktopSidebar";
import { Nav } from "./dashboard/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-[#F7F7F7] min-h-screen md:grid md:grid-cols-4">
              <DesktopSidebar />
              <div className="md:col-span-3 md:p-4 p-2">
                  <div className="md:flex md:items-center md:justify-end">
                      <Nav />
                  </div>
                  {children}
              </div>
          </div>
      </body>
    </html>
  );
}
