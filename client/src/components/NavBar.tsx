import { School } from 'lucide-react'
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clearUser } from "../store/authSlice";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { useLogoutMutation } from '@/store/services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';

function NavBar() {
    const user = useSelector((state: RootState) => state.auth.user);
   
    const [
        logout,
        {
            isLoading: isLogoutLoading,
            isSuccess: isLogoutSuccess,
            isError: isLogoutError,
            data: logoutData,
            error: logoutError
        }
    ] = useLogoutMutation();
    useEffect(() => {
        if (isLogoutLoading) {
            toast.loading("Logging out...", { id: "logout" });
        }

        if (isLogoutSuccess) {
            toast.success(
                logoutData?.message || "Logged out successfully 👋",
                { id: "logout" }
            );
        }

        if (isLogoutError) {
            toast.error(
                (logoutError as any)?.data?.message || "Logout failed ❌",
                { id: "logout" }
            );
        }
    }, [isLogoutLoading, isLogoutSuccess, isLogoutError]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout().unwrap();
        dispatch(clearUser());
        navigate("/auth");
    };

    return (
        <div className='bg-[#ffffff] w-full h-14 flex justify-between select-none'>
            <div className='flex gap-2 items-center p-5' onClick={() => navigate("/")}>
                <div><School className="text-[#10B981] " strokeWidth={2.5} /></div>
                <div><p className=' text-[#10B981] font-bold'>E-LEARNING</p></div>
            </div>
            <div className=' flex items-center pr-4'>
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full ">
                                <Avatar>
                                    <AvatarImage src={user?.profilePicture || "https://github.com/shadcn.png"} alt="shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel >My Account</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                                <DropdownMenuItem>My Courses</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>ABOUT</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex gap-2" >
                        <Button onClick={() => navigate("/auth?mode=login")} variant={'outline'}>Login</Button>
                        <Button className="bg-[#059669]" onClick={() => navigate("/auth?mode=signup")}>Signup</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar