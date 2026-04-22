import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMyCourseQuery, useTogglePublishedMutation } from "@/store/services/courseApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom"
import { toast } from "sonner";



function Courses() {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [togglePublished] = useTogglePublishedMutation();


  const { data, isLoading: isMycourseLoading } = useMyCourseQuery();
  if (isMycourseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-[#10B981]" />
      </div>
    );
  }

  const courses = data?.courses;

  console.log(data);
  const handleToggle = async (courseId: string) => {
    try {
      setUpdatingId(courseId);

      const res = await togglePublished({ courseId }).unwrap();
      console.log(res);

      toast.success("Status updated ✅");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong ❌");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937]">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Button className="bg-[#10B981] hover:bg-[#059669] text-white" onClick={() => navigate("/create_Course")}>
          Create a New Course
        </Button>
      </div>

      {/* Table Container */}

      <div className="bg-[#F3F4F6] rounded-2xl shadow-sm p-4">
        <Table>
          <TableCaption className="text-[#1F2937]/70">
            Your created courses
          </TableCaption>

          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="w-50">Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">ChangeStatus</TableHead>
              <TableHead className="text-right">Modify</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courses?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No courses found
                </TableCell>
              </TableRow>
            ) : (
              courses?.map((course) => (
                <TableRow
                  key={course._id}
                  className="border-b border-gray-200 hover:bg-white transition"
                >
                  {/* Title */}
                  <TableCell className="font-medium">
                    {course.title}
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    ₹{course.price || 0}
                  </TableCell>
                  {/* Status */}
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                ${course.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </TableCell>

                  {/* toggleBtn */}
                  <TableCell className="text-right">
                    <Button
                      className={`text-white h-8 px-4 ${course.isPublished
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-[#10B981] hover:bg-[#059669]"
                        }`}
                      disabled={updatingId === course._id}
                      onClick={() => handleToggle(course._id!)}
                    >
                      {updatingId === course._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : course.isPublished ? (
                        "Make Draft"
                      ) : (
                        "Publish"
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      className="bg-[#3B82F6] hover:bg-blue-600 text-white h-8 px-4"
                      onClick={()=>navigate(`/course-edit/${course._id}`)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Courses