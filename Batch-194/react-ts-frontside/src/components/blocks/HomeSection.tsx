import { Link } from "react-router"

interface HomeSectionProps {
  children: React.ReactNode;
  title: string;
  viewMoreLink?: string;
}

const HomeSection = ({children, title, viewMoreLink}: HomeSectionProps) => {
  return (
    <section className="section my-5">
        <div className="container mx-auto">
            <div className="section-header flex justify-between items-center mb-4">
                <div className="section-title">
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>
                    <div className="section-extras mr-5">
                        <Link to={viewMoreLink || "#"}>View More</Link>
                    </div>
            </div>
         { children }
        </div>
    </section>
  )
}

export default HomeSection