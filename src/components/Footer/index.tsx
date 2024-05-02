import { Link, useNavigate } from "react-router-dom"

const Footer = () => {

    const navigate = useNavigate();

    const footerLinks = [
        {
            title: "About",
            path: "/"
        },
        {
            title: "Terms and Conditions",
            path: "/"
        },
        {
            title: "Newsletter",
            path: "/"
        },
        {
            title: "Services",
            path: "/"
        },
        {
            title: "Contact",
            path: "/"
        }
    ]

    return (
        <div className="w-full md:h-[60px] h-auto py-5 md:py-0 bg-white shadow-sm flex">
            <div className="flex md:flex-row flex-col md:h-[60px] h-full w-full md:gap-0 gap-5 md:px-[65px] px-[23px] md:items-center justify-between items-start">
                <div className="text-indigo-500 font-bold text-[28px] cursor-pointer md:ml-[12px]" onClick={() => navigate("/")}
                >
                    Job <span className="text-indigo-300">Finder</span>
                </div>
                <div className="flex md:flex-row flex-col md:items-center items-start md:gap-6 gap-4">
                    {
                        footerLinks.map((footerLink) => (
                            <Link
                                to={footerLink.path}
                                key={footerLink.title}
                                className="font-medium text-[15px] text-[#828ea8] transition-all duration-200 hover:text-indigo-200"
                            >
                                {
                                    footerLink.title
                                }
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Footer