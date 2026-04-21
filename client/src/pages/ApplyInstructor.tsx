// pages/ApplyInstructor.tsx
import {  useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { toast } from 'sonner';
import { useBecomeInstructorMutation } from '@/store/services/authApi';
import { setUser } from '@/store/authSlice';

function ApplyInstructor() {
    const [agreed, setAgreed] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [becomeInstructor, { isLoading }] = useBecomeInstructorMutation();

    if ((user?.enrolledCourses?.length ?? 0) > 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p className="text-red-500 text-lg font-semibold">
                    ❌ You cannot become an instructor because you have enrolled courses.
                </p>
                <p className="text-orange-500 text-lg font-semibold">
                    Registor with new account then apply for it .
                </p>
                <Button onClick={() => navigate("/")}>Go Home</Button>
            </div>
        );
    }

    const handleConfirm = async () => {
        if (!agreed) return toast.error("Please agree to the terms first.");
        try {
            const res = await becomeInstructor().unwrap();
            dispatch(setUser({ ...user!, role: 'instructor' })); // update redux
            toast.success(res.message);
            navigate("/instructor/dashboard");
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-20 p-6 border rounded-xl shadow space-y-6">
            <h1 className="text-2xl font-bold text-[#10B981]">Become an Instructor</h1>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2 h-48 overflow-y-auto">
                <p className="font-semibold">Terms & Conditions</p>
                <p>1. You agree to create original, high-quality course content.</p>
                <p>2. You will not plagiarize or violate copyright laws.</p>
                <p>3. Once you become an instructor, you cannot enroll as a student.</p>
                <p>4. You are responsible for keeping your course content up to date.</p>
                <p>5. We reserve the right to remove content that violates our policies.</p>
                <p>6. Revenue sharing is subject to platform terms.</p>
                <p>7. You agree to our refund and dispute resolution policies.</p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 accent-[#10B981]"
                />
                <span className="text-sm">I have read and agree to all terms and conditions</span>
            </label>

            <Button
                className="w-full bg-[#059669]"
                disabled={!agreed || isLoading}
                onClick={handleConfirm}
            >
                {isLoading ? "Processing..." : "Confirm & Become Instructor"}
            </Button>
        </div>
    );
}

export default ApplyInstructor;