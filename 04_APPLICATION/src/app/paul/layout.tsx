export default function PaulLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-experience="paul-personal" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
