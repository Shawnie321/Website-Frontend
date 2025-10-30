export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-blue-600">Customer Survey System</h1>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Welcome! This site includes a survey feature to collect customer feedback.
        The survey is part of the website and will connect to an API backend later.
      </p>
      <div className="mt-6">
        <a href="/survey" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md">Take Survey</a>
      </div>
    </div>
  );
}
