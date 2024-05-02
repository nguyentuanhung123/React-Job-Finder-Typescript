import { Link } from "react-router-dom"


const Services = () => {

    const servicesList = [
        {
            title: "Service",
            desc: "Drive existing and new business for ACTEGA's Paper & Board in Asia (more than 10 mil. Euro turnover)"
        },
        {
            title: "Service",
            desc: "Drive existing and new business for ACTEGA's Paper & Board in Asia (more than 10 mil. Euro turnover)"
        },
        {
            title: "Service",
            desc: "Drive existing and new business for ACTEGA's Paper & Board in Asia (more than 10 mil. Euro turnover)"
        }
    ]

    return (
        <div className="w-full flex flex-col items-center gap-8 mt-16 mb-24 md:px-0 px-5">
            <div className="flex flex-col gap-1 text-center">
                <span className="font-semibold text-2xl text-indigo-500">Our Services</span>
                <p className="text-[15px] text-gray-600 max-w-[500px] leading-7 mx-auto">
                    Drive existing and new business for ACTEGA's Paper & Board in Asia (more than 10 mil. Euro turnover)
                </p>
                <div className="flex md:w-[65%] my-0 mx-auto w-full items-center gap-8 md:flex-row flex-col">
                    {
                        servicesList.map((service, index) => (
                            <div 
                                key={index} 
                                className="w-full bg-white hover:bg-indigo-50 transition-all duration-200 p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-3 items-start"
                            >
                                <span className="text-indigo-500 font-semibold">{service.title}</span>
                                <p className="text-[15px] text-gray-700 leading-7 text-left">{service.desc}</p>
                                <Link to="/" className="text-indigo-500 text-[15px]">Learn More</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Services