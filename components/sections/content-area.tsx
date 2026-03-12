interface ContentAreaProps {
  content: string
  className?: string
}

export function ContentArea({ content, className = '' }: ContentAreaProps) {
  return (
    <section className={`bg-white py-16 md:py-24 ${className}`}>
      <div className="container">
        <div 
          className="prose max-w-none [&_table]:border-collapse [&_table]:w-full [&_table]:border [&_table]:border-gray-300 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}
