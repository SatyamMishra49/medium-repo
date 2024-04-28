import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}
export const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={blog.author.name} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {blog.author.name}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            Click to read
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{blog.title}</div>
        <div className="text-md font-thin">
          {blog.content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(blog.content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export const Circle = () => {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
};
