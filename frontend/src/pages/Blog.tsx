import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog) return <div>Loading...</div>;

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
