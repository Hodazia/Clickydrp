'use client'

import { useProtectedRoute } from "@/lib/hooks/useprotected"
import { useRouter } from "next/navigation";


/*
in this page there should be -
- a social button to add the social profile, like X,youtube, instagram, fb, and so on!
- a button to update your profile
    - enter ur profile image, bio, username, password, and so on!
    - a modal shall pop up to edit it so, 
    - u will need cloudinary to update ur profileimage, and get a url from it and store it in the
    DB
    - 


*/
export default function Profile() {

    const { session, status} = useProtectedRoute();
    console.log("Session is " , session);
    console.log("Status is ", status)
    const router = useRouter();

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return null; 

    return (
        <>
        <p>Welcome to the Socials page of yours! </p>
        </>
    )
}