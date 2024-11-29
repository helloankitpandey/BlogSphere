import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


export const Appbar = () => {
    return (
        <div className="border-b flex justify-between py-4 px-10 bg-slate-200">
            <Link to={'/blogs'} className="flex flex-col text-5xl justify-center cursor-pointer">
                Orato
            </Link>
            <div>
                <Link to={`/publish`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
                </Link>

                <Avatar
                    size="big"
                    name="A P" />
            </div>
        </div>
    )
}