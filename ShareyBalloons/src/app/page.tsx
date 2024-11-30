import Link from 'next/link';

export default function Home() {
  return (
    <main className="text-center p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Sharey Balloons</h1>
      <Link href="/upload">
        <div className="block p-4 bg-blue-500 text-white rounded">Upload Files</div>
      </Link>
    </main>
  );
}
