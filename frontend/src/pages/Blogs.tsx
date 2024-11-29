import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    // lets fetch all blogs from backend 
    // store it in state 
    // or store it directly
    // or store it in a context varabkes???
    // or create our own custom hook called useBlogs => I'm going to use hoooks

    const {loading, blogs}= useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return (
        <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="">
                {blogs.map (blog => 
                <BlogCard 
                id={blog.id}
                authorName={blog.author.name || "Anonynms"}
                title={blog.title}
                content={blog.content}
                publishedDate={"15/04/2025"}
                />
                )}
            </div>
        </div>
        </div>
    )
}


