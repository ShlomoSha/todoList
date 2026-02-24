import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../api/authService";
import { userService } from "../../api/userService";
import type { IUser } from "../../types/auth.interface";
import useLocalStorage from "../useLocalStorage";

export const USER_QUERY_KEY = ["user", "me"] as const;

export const useUser = () => {
    const { getToken } = useLocalStorage()

    return useQuery({
        queryKey: USER_QUERY_KEY,
        queryFn: async () => {
            const response = await authService.getMe();
            const user = response.data.data.user;
            return {
                ...user,
                id: user._id || user.id 
            } as IUser;
        },

        enabled: !!getToken(),
        retry: false,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { addUsernameLs } = useLocalStorage();

    return useMutation({
        mutationFn: (data: { username?: string, email?: string }) => userService.updateProfile(data),
        onSuccess: (response) => {
            const updatedUser = response.data.data.user;
            queryClient.setQueryData(USER_QUERY_KEY, (oldData: any) => ({
                ...oldData,
                ...updatedUser,
                id: updatedUser._id || updatedUser.id
            }));
            
            if (updatedUser.username) {
                addUsernameLs(updatedUser.username);
            }
        }
    });
};
