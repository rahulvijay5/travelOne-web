import { SignInButton } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Unauthenticated</h1>
      <p>You are not authenticated.</p>
      <p>Please sign in to continue.</p>
      <SignInButton />
    </div>
  );
}