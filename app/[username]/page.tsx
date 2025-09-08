'use client'
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/lib/hooks/useprotected";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Links } from "@/lib/schema";
import { Social } from "@/lib/schema";
import { Theme } from "@/lib/schema";

// define a few interfaces




/*
{
'username':string,
'description':string,
'profileimg':string,
'links':[
{'id':'','linkUrl':'','linkthumbnail':'', description:''},
{'id':'','linkUrl':'','linkthumbnail':'', description:''},
{'id':'','linkUrl':'','linkthumbnail':'', description:''},
],
'social':[
{'id':'','platform':'','url':''},
{'id':'','platform':'','url':''},
],
'themes':Theme
}






*/
interface metaprops {
    username:string,
    description:string,
    profileimg:string,
    links: Links[],
    Social: Social[],
    themes:Theme[]
}




export default function Username(){
    const { session, status } = useProtectedRoute();
    const router = useRouter();
    const [usermeta,setusermeta] = useState<metaprops | null>(null);
    // how to get the parameter from the 
    const pathname = usePathname();
    const username = pathname.split('/')
    console.log("pathname ", pathname);
    console.log("Username is ", username[1])
    

    // returning the 
    useEffect(()=>{
        const fetchData = async () => {
            try {
                // console.log("The pathname is ",  pathname, '\n', username)
              const res = await fetch(`http://localhost:3000/api/users/${username[1]}`, { credentials: 'include' })
              if (!res.ok) throw new Error('Failed to load metadata! ')
              const resultantData: metaprops = await res.json()
            console.log("Data from the users/me ", resultantData);
              setusermeta(resultantData)
            } catch {
              console.error('Could not load theme')
            }
          }
          fetchData()
    },[])
  
    



    if (status === "loading") {
        return <p>Loading...</p>;
        }
        
    if (!session) {
        // router.push runs inside useEffect to avoid hook mismatch
        useEffect(() => {
            router.push("/signin");
        }, [router]);
        
        return null; // still render null here safely
     }

     return (
        <>
        <p>Welcome to the user's profile</p>
        <div>

Description is {usermeta?.description}
        </div>
        <ul className="w-100 h-100">
            {usermeta?.links?.map((i,idx) => (
                <li key={i.description}>
                    <a href={i.linkUrl} className="w-full h-full " target="__blank">
                    <img src={i.linkThumbnail} className="w-25 h-25 object-cover"/>
                    <div>
                        Description of links is {i.description}
                    </div>
                    </a>
                </li>
            ))}
        </ul>
        </>
     )
}