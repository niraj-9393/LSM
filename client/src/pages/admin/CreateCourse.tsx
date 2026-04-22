import { useState } from "react"
import Title from "../../components/Title"
import { Button } from "@/components/ui/button"
import { useCreateCourseMutation } from "@/store/services/courseApi"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

function CreateCourse() {
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [createCourse, { isError, isLoading }] = useCreateCourseMutation();

  const handleCreate = async () => {
    if (!title || !subTitle) {
      return toast.error("Fill all fields to create course")
    }

    try {
      const res = await createCourse({ title, subTitle }).unwrap()
      console.log(res)

      toast.success("Course created successfully ✅")

      setTitle("")
      setSubTitle("")
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong ❌")
    }
  }
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F2937] p-6">


      <Title
        title="Create New Course"
        subtitle="Add a title and subtitle to get started"
      />


      <div className="max-w-xl mx-auto mt-8 bg-[#F3F4F6] p-6 rounded-2xl shadow-sm">
        {isError && (
          <p className="text-red-500 text-sm mb-4">
            Something went wrong. Please try again.
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Course Title
          </label>
          <input
            type="text"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white"
          />
        </div>


        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Course Subtitle
          </label>
          <input
            type="text"
            placeholder="Enter course subtitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white"
          />
        </div>

        <div className="flex justify-end">
          <Button
            className="bg-[#10B981] hover:bg-[#059669] text-white px-6 disabled:opacity-60"
            onClick={() =>{
              handleCreate(),
              setTimeout(()=>{
                navigate(-1);
              },500)
            }}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Course"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse