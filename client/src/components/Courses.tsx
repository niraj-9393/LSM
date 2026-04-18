import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import CourseCard from "./CourseCard";

function Courses() {
    let isLoading = false;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10 px-25">
            
            {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                      <Card key={index} className="w-full rounded-2xl shadow-sm border border-[#F3F4F6]">
                          <CardHeader className="space-y-2">
                              <Skeleton className="h-4 w-2/3" />
                              <Skeleton className="h-4 w-1/2" />
                          </CardHeader>
                          <CardContent>
                              <Skeleton className="aspect-video w-full rounded-md" />
                          </CardContent>
                      </Card>
                  ))
                : Array.from({ length: 8 }).map((_, index) => (
                      <CourseCard key={index} />
                  ))
            }

        </div>
    )
}

export default Courses