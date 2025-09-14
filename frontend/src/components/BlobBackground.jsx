export default function BlobBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-[150px] top-0 left-0 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-[120px] bottom-0 right-0 animate-pulse"></div>
    </div>
  );
}
