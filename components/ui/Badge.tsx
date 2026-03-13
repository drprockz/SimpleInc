export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-sky-500/10 text-sky-400 text-xs font-medium px-2.5 py-1 rounded-md">
      {children}
    </span>
  )
}
