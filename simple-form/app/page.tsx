import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg text-center">
    <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
    <div className="space-y-4">
      <Link href="/fill" className="inline-block w-full px-6 py-3 bg-blue-700 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Fill Form
      </Link>
      <Link href="/response" className="inline-block w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
        View Response
      </Link>
    </div>
  </div>
  );
}
