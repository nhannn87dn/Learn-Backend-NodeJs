import SectionHeader from "./SectionHeader";

type SectionProps = {
  title: string;
  className?: string;
  extra?: React.ReactNode;
  children?: React.ReactNode;
};
const SectionBlock = ({ title, className, extra, children }: SectionProps) => {
  return (
    <section className={className}>
        <SectionHeader title={title} extra={extra} />
      {children}
    </section>
  )
}

export default SectionBlock