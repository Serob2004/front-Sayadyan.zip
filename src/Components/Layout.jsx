export default function Layout() {
  const { user } = useAuthStore();

  return (
    <>
      <Header user={user} />
      <Suspense fallback={<div>Loading...</div>}></Suspense>
    </>
  );
}
