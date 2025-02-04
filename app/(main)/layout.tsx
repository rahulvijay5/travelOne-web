import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
          <div className="flex h-screen w-full relative">
              <AppSidebar className="h-screen" />
              <SidebarTrigger className="absolute top-4 left-4"/>
            <main className="w-full">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </SignedIn>
    </div>
  );
}
