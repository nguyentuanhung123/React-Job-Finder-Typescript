/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useEffect, useState } from "react";
import { BusinessOutline, CloseCircle } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { jobs } from "../../data/jobs";

interface FiltersProps {
    onFilterChange: (filters: { contractStatus: string[]; workStatus: string[] }) => void
    savedJobs: number[];
}

const Filters = ({onFilterChange, savedJobs}: FiltersProps) => {

    const [contract, setContract] = useState<string[]>([]);
    const [work, setWork] = useState<string[]>([]);

    const navigate = useNavigate()


    /**
     * useCallback: Hook này được sử dụng để bảo đảm rằng hàm onFilterChange chỉ được tạo ra một lần 
     * và không thay đổi mỗi lần render. Điều này giúp tăng hiệu suất.
     * const memoFilterChange: Khai báo một biến không đổi có tên memoFilterChange.
     * useCallback: Đây là hook React được sử dụng cho các chức năng ghi nhớ.
     * onFilterChange: Đây là chức năng bạn muốn ghi nhớ.
     * []: Mảng phụ thuộc trống này có nghĩa là hàm đã ghi nhớ sẽ không bao giờ được tạo lại vì nó không có phần phụ thuộc. 
     * Nó tương đương với việc nói "chức năng này sẽ không bao giờ thay đổi, 
     * vì vậy hãy ghi nhớ nó một lần và sử dụng lại trong suốt vòng đời của thành phần".
     * Vì vậy, dòng const memoFilterChange = useCallback(onFilterChange, []) 
     * tạo một phiên bản được ghi nhớ của hàm onFilterChange và gán nó cho biến không đổi memoFilterChange, 
     * đảm bảo rằng nó chỉ được tạo lại nếu thành phần được kết xuất lại do thay đổi trong các phần phụ thuộc, 
     * trong số đó không có trong trường hợp này.
     */
    
    const memoFilterChange = useCallback(onFilterChange, [])


    /**
     * useEffect: Hook này được sử dụng để thực hiện các tác vụ phụ thuộc vào các biến trạng thái hoặc các props đã thay đổi. 
     * Trong đoạn mã này, mỗi khi contract hoặc work thay đổi, nó sẽ gọi hàm memoFilterChange (hàm được tạo ra từ useCallback) 
     * và truyền các giá trị của contract và work cho hàm này.
     * Hook useEffect này sẽ thực thi hàm memoFilterChange bất cứ khi nào contract, work hoặc memoFilterChange thay đổi. Hãy chia nhỏ nó ra:
     * 
     * useEffect: Đây là hook React được sử dụng để thực thi các tác dụng phụ trong các thành phần hàm.
     * 
     * () => { memoFilterChange({ ContractStatus: Contract, WorkStatus: Work }) }: 
     * Đây là hàm sẽ được thực thi dưới dạng tác dụng phụ. Nó gọi memoFilterChange với một đối tượng chứa các thuộc tính ContractStatus và WorkStatus, 
     * tương ứng được gán các giá trị của biến contract và biến work.
     * 
     * [contract, work, memoFilterChange]: Mảng phụ thuộc này chỉ định các giá trị mà khi được thay đổi sẽ kích hoạt việc thực thi hiệu ứng. 
     * Trong trường hợp này, hiệu ứng sẽ thực thi bất cứ khi nào giá trị contract, work hoặc memoFilterChange thay đổi.
     *
     * Vì vậy, bất cứ khi nào giá trị của contract, work hoặc memoFilterChange thay đổi, hàm được chuyển đến useEffect sẽ được thực thi, 
     * gọi memoFilterChange một cách hiệu quả với các giá trị được cập nhật cho contract và trạng thái work. 
     * Điều này đảm bảo rằng logic lọc được áp dụng bất cứ khi nào bất kỳ giá trị nào trong số này thay đổi.
     */
    useEffect(() => {
        memoFilterChange({ contractStatus: contract, workStatus: work })
    }, [contract, work, memoFilterChange]);


    const handleCloseFilters = () => {
        setContract([])
        setWork([])
    }

    const handleContractStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const filterValue = e.target.value;

        setContract((prev) => {
            if(isChecked) {
                return [...prev, filterValue]
            } else {
                return prev.filter((status) => status !== filterValue)
            }
        })
    }

    const handleLocationStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const filterValue = e.target.value;

        setWork((prev) => {
            if(isChecked) {
                return [...prev, filterValue]
            } else {
                return prev.filter((status) => status !== filterValue)
            }
        })
    }

    return (
        <div className="md:sticky relative md:top-10 md:w-[500px] w-full">
            <div className="w-full bg-white rounded-lg p-5 border border-gray-200">
                <div className="w-full flex items-center justify-between">
                    <span className="text-gray-800 font-semibold text-[15px]">Filter Jobs</span>
                    <CloseCircle cssClasses={"cursor-pointer"} color="#ed5a85" onClick={handleCloseFilters}/>
                </div>
                <div className="w-full flex md:flex-col flex-row justify-between gap-4 mt-5">
                    <div className="flex flex-col gap-4">
                        <span className="text-gray-800 font-semibold text-[15.5px]">Contract Status</span>
                        <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    value="Full Time"
                                    checked={contract.some((c) => c === "Full Time")} 
                                    onChange={handleContractStatusChange}
                                    className="w-[16px] h-[16px]"
                                />
                                <span className="text-gray-800 font-medium text-[15px]">Full Time</span>
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    value="Part Time"
                                    checked={contract.some((c) => c === "Part Time")} 
                                    onChange={handleContractStatusChange}
                                    className="w-[16px] h-[16px]"
                                />
                                <span className="text-gray-800 font-medium text-[15px]">Part Time</span>
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    value="Intership"
                                    checked={contract.some((c) => c === "Intership")} 
                                    onChange={handleContractStatusChange}
                                    className="w-[16px] h-[16px]"
                                />
                                <span className="text-gray-800 font-medium text-[15px]">Intership</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-gray-800 font-semibold text-[15.5px]">Location Status</span>
                        <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    value="On-Site"
                                    checked={work.some((c) => c === "On-Site")} 
                                    onChange={handleLocationStatusChange}
                                    className="w-[16px] h-[16px]"
                                />
                                <span className="text-gray-800 font-medium text-[15px]">On-Site</span>
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    value="Remote"
                                    checked={work.some((c) => c === "Remote")} 
                                    onChange={handleLocationStatusChange}
                                    className="w-[16px] h-[16px]"
                                />
                                <span className="text-gray-800 font-medium text-[15px]">Remote</span>
                            </div>
                            <div className="w-full flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    value="Hybrid"
                                    checked={work.some((c) => c === "Hybrid")} 
                                    onChange={handleLocationStatusChange}
                                    className="w-[16px] h-[16px]"
                                />
                                <span className="text-gray-800 font-medium text-[15px]">Hybrid</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white rounded-lg p-5 mt-5 border border-gray-200">
                <div className="w-full flex flex-col gap-2">
                    <span className="text-gray-800 font-semibold text-[15px]">Saved Jobs</span>
                    <div className="flex flex-col w-full gap-5">
                        {
                            !savedJobs.length && (
                                <span className="text-gray-400 text-[14px]">
                                    You don&apos;t have any saved jobs yet!
                                </span>
                            )
                        }
                        {
                            savedJobs.map((job) => {
                                const j = jobs.find((j) => j.id === job);
                                if(j) {
                                    return (
                                        <div key={job} className="text-gray-800 flex items-center justify-between w-full border-b border-gray-300 pb-3">
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="">{j.title}</span>
                                                <div className="flex items-center gap-2">
                                                    <BusinessOutline width={"18px"} height={"18px"} color={"#555"}/>
                                                    <span className="text-[14px] text-gray-600">{j.company}</span>
                                                </div>
                                            </div>
                                            <button 
                                                className="text-white font-semibold text-[15px] rounded-md bg-indigo-500" 
                                                onClick={() => navigate(`/jobs/${j.id}`)}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters