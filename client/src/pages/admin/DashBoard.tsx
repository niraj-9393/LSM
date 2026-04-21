import { useState } from "react";
import Courses from "./Courses";
import Statistics from "./Statistics";

type TabType = "courses" | "statistics";

function DashBoard() {
    const [activeTab, setActiveTab] = useState<TabType>("courses");

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-white">

            {/* Sidebar */}
            <div className="w-full md:w-56 bg-[#F3F4F6] p-4 md:p-5 flex md:flex-col gap-3 md:gap-5 border-b md:border-b-0 md:border-r shrink-0">

                <button
                    onClick={() => setActiveTab("statistics")}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-md text-white text-sm md:text-base transition ${activeTab === "statistics"
                            ? "bg-[#059669]"
                            : "bg-[#10B981] hover:bg-[#059669]"
                        }`}
                >
                    Statistics
                </button>

                <button
                    onClick={() => setActiveTab("courses")}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-md text-white text-sm md:text-base transition ${activeTab === "courses"
                            ? "bg-[#059669]"
                            : "bg-[#10B981] hover:bg-[#059669]"
                        }`}
                >
                    Course
                </button>
            </div>

            {/* Main */}
            {/* Main */}
            <div className="flex-1 flex flex-col min-h-0 border-t md:border-t-0 md:border-l border-gray-400">

                {/* Content */}
                <div className="flex-1 overflow-auto p-4 md:p-6">
                    {activeTab === "courses" ? <Courses /> : <Statistics />}
                </div>

            </div>
        </div>
    );
}

export default DashBoard;