const SectionHeader = ({ title, extra }: { title: string; extra?: React.ReactNode }) => {
  return (
    <div className="section-header mb-4 flex items-center justify-between">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {extra && <div className="flex items-center">{extra}</div>}
    </div>
  )
}

export default SectionHeader