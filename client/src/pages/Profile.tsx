import Title from "@/components/Title"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfileQuery, useUpdateProfileMutation } from "@/store/services/authApi"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

function Profile() {
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState<File | null>(null); 
    const [preview, setPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const { isError: isErrorProfile, isLoading: isLoadingProfile, data, refetch } = useProfileQuery();
    const [updateProfile, { isLoading: isLoadingUpdateProfile }] = useUpdateProfileMutation();

  
    if (isLoadingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-[#10B981]" />
            </div>
        );
    }

    if (isErrorProfile || !data?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Failed to fetch user profile.
            </div>
        );
    }

    const user = data.user; 

   
    const handleChangeProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const file = e.target.files?.[0];
        if (!file) return;
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    };

   
    const handleSaveChanges = async () => {
        const formData = new FormData();
        if (name) formData.append("name", name);
        if (profilePic) formData.append("profilePic", profilePic);

        try {
            await updateProfile(formData).unwrap();
            refetch()
            toast.success("Profile updated successfully!");
            setOpen(false);
            setPreview(null);
            setProfilePic(null);
        } catch (err) {
            toast.error("Failed to update profile.");
        }
    };

    return (
        <div className="bg-[#F3F4F6] min-h-screen p-6">
            <Title title="MY PROFILE" subtitle="" />

            <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* LEFT CARD */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">

                    
                    <Avatar className="h-32 w-32 border-4 border-[#10B981] shadow">
                        <AvatarImage src={preview ?? (user.profilePicture || "https://github.com/shadcn.png")} />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <h2 className="mt-4 text-xl font-bold text-[#1F2937]">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.role?.toUpperCase()}</p>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="mt-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg px-4"
                                onClick={() => setName(user.name)} // pre-fill name on open
                            >
                                Edit Profile
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-[#1F2937]">Update Profile</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4 mt-2">

                                {/* Preview */}
                                {preview && (
                                    <div className="flex justify-center">
                                        <img
                                            src={preview}
                                            className="h-20 w-20 rounded-full object-cover border-4 border-[#10B981]"
                                        />
                                    </div>
                                )}

                                <div>
                                    <Label>Profile Image</Label>
                                
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 cursor-pointer"
                                        onChange={handleChangeProfilePic}
                                    />
                                </div>

                                <div>
                                    <Label>Full Name</Label>
                                
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 focus:ring-[#10B981]"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => { setOpen(false); setPreview(null); }}
                                    >
                                        Cancel
                                    </Button>
                                 
                                    <Button
                                        className="bg-[#3B82F6] hover:bg-blue-600 text-white"
                                        onClick={handleSaveChanges}
                                        disabled={isLoadingUpdateProfile}
                                    >
                                        {isLoadingUpdateProfile
                                            ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                                            : "Save Changes"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* RIGHT CARD */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Full Name</label>
                            <input type="text" value={user.name} disabled className="border rounded-lg p-2 bg-gray-100" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Email</label>
                            <input type="email" value={user.email} disabled className="border rounded-lg p-2 bg-gray-100" />
                        </div>
                    </div>
                </div>
            </div>

            {/* COURSES */}
            <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Enrolled Courses</h3>
                <div className="text-gray-500">
                    {user.enrolledCourses?.length === 0 && "No courses enrolled yet 🚀"}
                </div>
            </div>
        </div>
    );
}

export default Profile;