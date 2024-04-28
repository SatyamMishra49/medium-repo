import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs &&
            blogs.map((blog, index) => (
              <div key={index}>
                <BlogCard blog={blog} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
