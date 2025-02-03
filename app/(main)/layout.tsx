import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <SidebarProvider>
          <div className="flex h-screen">
            <AppSidebar className="h-screen" />
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto py-6">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </SignedIn>
    </div>
  );
}
