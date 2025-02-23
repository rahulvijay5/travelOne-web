export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-white dark:bg-gray-900">{children}</div>;
}
