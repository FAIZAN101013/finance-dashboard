export default function EmptyState({ message = "No data available" }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}