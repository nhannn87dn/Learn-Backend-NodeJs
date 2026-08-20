import { Link } from "react-router"
import SectionBlock from "./SectionBlock"

const HomeNewArticle = () => {
    //TODO: Fetch new articles from API and display them here
  return (
    <SectionBlock
      title="Tin Tức Mới"
      className="mt-10"
      extra={
        <Link
          to={`/tin-tuc`}
          className="text-blue-500 hover:underline"
        >
          View All
        </Link>
      }
    >
        <p>Danh sách tin mới</p>
    </SectionBlock>
  )
}

export default HomeNewArticle