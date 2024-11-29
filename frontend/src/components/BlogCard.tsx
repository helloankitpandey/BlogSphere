import { Link } from "react-router-dom";

interface BLogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BLogCardProps ) => {
    return (
        <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-md cursor-pointer bg-slate-50">
            <div className="flex">
                    <Avatar size="small" name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2 ">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-400 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
            {/* <div className="bg-slate-200 h-1 w-full">

            </div> */}
        </div>
        </Link>
    )
}

export function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-slate-500">

        </div>
    )
} 


export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    
    const getNames = (fullName: string) => {
        const words = fullName.split(" ");
        return words.length > 1
        ? words[0][0] + words[1][0] // First letter of first and last words
        : words[0][0]; // If there's only one word
    }

    return (
        <div className= {`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10" }`} >
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-sm text-gray-600 dark:text-gray-300`}>
                {getNames(name).toUpperCase()}
            </span>
        </div>
    )
}