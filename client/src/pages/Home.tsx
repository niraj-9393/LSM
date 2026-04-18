import Courses from "@/components/Courses"
import Title from "@/components/Title"

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <div className="w-full py-20 bg-linear-to-r from-[#10B981] via-[#059669] to-[#3B82F6] text-white text-center select-none">

        <h1 className="text-4xl font-bold mb-4">
          Find the Best Courses for You
        </h1>

        <p className="text-lg mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <div className="flex justify-center items-center max-w-xl mx-auto bg-white rounded-full overflow-hidden shadow-md">
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full px-4 py-3 text-gray-700 outline-none"
          />
          <button className="bg-[#3B82F6] text-white px-6 py-3 hover:bg-blue-600">
            Search
          </button>
        </div>

        <button className="mt-6 bg-white text-[#059669] px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100">
          Explore Courses
        </button>

      </div>

      {/* Title Section */}
      <Title 
        title="Our Popular Courses"
        subtitle="Upgrade your skills with top-rated courses from industry experts"
      />

      <Courses />

    </div>
  )
}

export default Home