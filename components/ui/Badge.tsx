export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-sky-100 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-md">
      {children}
    </span>
  )
}
