import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

function CourseCard() {
    return (
        <div className="bg-[#FFFFFF] rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden max-w-xs border border-[#F3F4F6] select-none">
            
            {/* Course Image */}
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                    alt="course"
                    className="w-full h-40 object-cover"
                />
                
            </div>

            {/* Content */}
            <div className="p-4">

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-gray-500">By John Doe</p>
                </div>

                {/* Title */}
                <h2 className="text-[#1F2937] font-semibold text-lg leading-snug mb-2">
                    Master React in 30 Days 🚀
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-[#F3F4F6] text-[#059669]">
                        Beginner
                    </Badge>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                    <span className="text-[#10B981] font-bold text-lg">
                        ₹499
                    </span>

                    <button className="bg-[#3B82F6] text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-600">
                        Enroll
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;