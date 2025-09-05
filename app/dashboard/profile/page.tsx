'use client'

import { useProtectedRoute } from "@/lib/hooks/useprotected"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LucideLink , LucidePlus,LucideX} from "lucide-react";
import { toast } from "sonner";



// Define the type for a Social Link object
interface Social {
    id: string;
    platform: string;
    url: string;
  }
  
  // Define the type for the form data state
  interface FormDataState {
    platform: string;
    url: string;
  }
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

// A mapping of platform names to their respective icon components
// We'll use a generic icon from `lucide-react` to ensure compilation

export const GithubLink = () => {
    return (
        <>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#333" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
        </>
    )
}

export const InstagramLink = () => {
    return (
        <>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#c13584" }}
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
        </>
    )
}

export const FacebookLink = () => {
    return (
        <>
        
      {/* <!-- Facebook --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#1877f2" }}
        viewBox="0 0 24 24"
      >
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
        </>
    )
}

export const TwitterLink = () => {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
</svg>
        
        </>
    )
}

export const YoutubeLink = () => {
    return (
        <>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        style={{ color: "#ff0000" }}
        viewBox="0 0 24 24"
      >
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
        </>
    )
}

export const SpotifyLink = () => {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<linearGradient id="tS~Tu1dsT5kMXF2Lct~HUa_G9XXzb9XaEKX_gr1" x1="24.001" x2="24.001" y1="-4.765"
 y2="56.31" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4caf50">
    </stop><stop offset=".489" stopColor="#4aaf50">
      </stop><stop offset=".665" stopColor="#43ad50"></stop>
      <stop offset=".79" stopColor="#38aa50"></stop><stop offset=".892" stopColor="#27a550">
        </stop><stop offset=".978" stopColor="#11a050">
          </stop><stop offset="1" stopColor="#0a9e50">
            </stop></linearGradient><path fill="url(#tS~Tu1dsT5kMXF2Lct~HUa_G9XXzb9XaEKX_gr1)" d="M24.001,4c-11.077,0-20,8.923-20,20s8.923,20,20,20c11.076,0,20-8.923,20-20	S35.077,4,24.001,4z"></path><path d="M21.224,15.938c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 c-0.145,1.023-0.877,1.755-1.899,1.755c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217 c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146c-0.075,0.011-0.149,0.016-0.221,0.016 c-0.905,0-1.533-0.821-1.533-1.77c0-1.023,0.585-1.607,1.315-1.754C14.939,16.231,17.862,15.938,21.224,15.938 M20.785,22.369 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461c0,0.878-0.585,1.608-1.462,1.608 c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733 c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607 C15.523,22.808,17.716,22.369,20.785,22.369 M21.223,28.654c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314c-0.146,0.586-0.731,1.023-1.315,1.023c-0.292,0-0.585-0.145-0.877-0.292 c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146 c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314C16.4,28.945,18.739,28.654,21.223,28.654 M21.224,14.938 c-3.789,0-6.666,0.371-9.317,1.202c-1.254,0.279-2.06,1.341-2.06,2.722c0,1.553,1.112,2.77,2.533,2.77 c0.095,0,0.192-0.005,0.291-0.017c0.319-0.007,0.574-0.065,0.764-0.107c0.068-0.015,0.13-0.035,0.193-0.038h0.123l0.116-0.03 c2.219-0.554,4.763-0.847,7.358-0.847c5.073,0,10.075,1.152,13.381,3.081l0.09,0.053l0.099,0.033 c0.109,0.036,0.195,0.073,0.273,0.105c0.251,0.105,0.563,0.236,1.065,0.236c1.483,0,2.671-1.075,2.889-2.615l0.01-0.07v-0.071 c0-1.171-0.564-2.13-1.549-2.635C33.238,16.313,27.314,14.938,21.224,14.938L21.224,14.938z M20.785,21.369 c-3.291,0-5.651,0.508-7.711,1.057l-0.058,0.015l-0.055,0.022c-1.194,0.476-1.799,1.329-1.799,2.536 c0,1.357,1.104,2.461,2.462,2.461c0.371,0,0.626-0.009,1.189-0.194c1.572-0.429,3.714-0.683,5.827-0.683 c4.441,0,8.562,1.037,11.603,2.921l0.038,0.024l0.04,0.02c0.334,0.168,0.792,0.397,1.471,0.397c1.404,0,2.462-1.121,2.462-2.608 c0-0.996-0.53-1.886-1.387-2.334C31.04,22.659,26.04,21.369,20.785,21.369L20.785,21.369z M21.223,27.654 c-2.547,0-4.969,0.297-7.404,0.907c-1.096,0.27-1.78,1.145-1.78,2.284c0,1.217,0.953,2.17,2.169,2.17 c0.172,0,0.334-0.037,0.522-0.079c0.101-0.023,0.288-0.065,0.357-0.067l0.101-0.003l0.122-0.023 c2.023-0.467,3.963-0.704,5.768-0.704c3.422,0,6.635,0.812,9.291,2.35l0.025,0.015l0.026,0.013 c0.334,0.168,0.792,0.399,1.327,0.399c1.05,0,2.032-0.766,2.285-1.781l0.03-0.119v-0.123c0-1.202-0.595-1.76-1.178-2.147 l-0.022-0.014l-0.022-0.013C29.455,28.713,25.437,27.654,21.223,27.654L21.223,27.654z" opacity=".05"></path><path d="M21.224,15.938c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 c-0.145,1.023-0.877,1.755-1.899,1.755c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217 c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146c-0.075,0.011-0.149,0.016-0.221,0.016 c-0.905,0-1.533-0.821-1.533-1.77c0-1.023,0.585-1.607,1.315-1.754C14.939,16.231,17.862,15.938,21.224,15.938 M20.785,22.369 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461c0,0.878-0.585,1.608-1.462,1.608 c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733 c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607 C15.523,22.808,17.716,22.369,20.785,22.369 M21.223,28.654c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314c-0.146,0.586-0.731,1.023-1.315,1.023c-0.292,0-0.585-0.145-0.877-0.292 c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146 c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314C16.4,28.945,18.739,28.654,21.223,28.654 M21.224,15.438 c-3.747,0-6.582,0.366-9.188,1.186c-1.042,0.222-1.689,1.078-1.689,2.238c0,1.273,0.893,2.27,2.033,2.27 c0.084,0,0.169-0.005,0.257-0.016c0.28-0.004,0.506-0.055,0.689-0.096c0.119-0.027,0.222-0.05,0.299-0.05h0.061l0.06-0.015 c2.258-0.564,4.844-0.862,7.479-0.862c5.158,0,10.254,1.177,13.633,3.149l0.045,0.026l0.05,0.016 c0.123,0.041,0.221,0.082,0.309,0.119c0.231,0.097,0.47,0.197,0.871,0.197c1.247,0,2.209-0.878,2.394-2.185l0.005-0.035v-0.035 c0-0.985-0.473-1.787-1.298-2.201C33.083,16.794,27.24,15.438,21.224,15.438L21.224,15.438z M20.785,21.869 c-3.054,0-5.24,0.416-7.583,1.04l-0.029,0.008l-0.028,0.011c-0.637,0.254-1.484,0.745-1.484,2.071c0,0.943,0.75,1.961,1.962,1.961 c0.34,0,0.541-0.008,1.033-0.169c1.637-0.447,3.827-0.708,5.983-0.708c4.533,0,8.747,1.064,11.867,2.996 c0.345,0.175,0.725,0.366,1.286,0.366c1.119,0,1.962-0.906,1.962-2.108c0-0.823-0.442-1.554-1.154-1.909 C30.885,23.141,25.965,21.869,20.785,21.869L20.785,21.869z M21.223,28.154c-2.506,0-4.888,0.292-7.283,0.892 c-0.864,0.213-1.401,0.902-1.401,1.799c0,0.821,0.624,1.67,1.669,1.67c0.116,0,0.246-0.029,0.411-0.067 c0.148-0.033,0.351-0.079,0.466-0.079h0.057l0.056-0.013c2.06-0.476,4.038-0.717,5.88-0.717c3.51,0,6.809,0.836,9.542,2.417 c0.331,0.168,0.712,0.359,1.127,0.359c0.827,0,1.601-0.603,1.8-1.402l0.015-0.06v-0.061c0-1.012-0.493-1.424-0.954-1.73 C29.277,29.189,25.348,28.154,21.223,28.154L21.223,28.154z" opacity=".07"></path><path fill="#fff" d="M31.747,33.915c-0.292,0-0.585-0.145-0.877-0.292c-2.777-1.607-6.139-2.484-9.792-2.484 c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146c-0.731,0-1.169-0.586-1.169-1.17 c0-0.73,0.438-1.17,1.023-1.314c2.338-0.586,4.677-0.877,7.161-0.877c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314C32.916,33.478,32.331,33.915,31.747,33.915z M33.793,28.945c-0.438,0-0.73-0.144-1.023-0.291 c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733c-0.439,0.144-0.585,0.144-0.877,0.144 c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607c2.192-0.584,4.385-1.023,7.454-1.023 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461C35.255,28.215,34.67,28.945,33.793,28.945z M36.132,23.101 c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217c-2.631,0-5.262,0.293-7.6,0.877 c-0.293,0-0.585,0.146-1.023,0.146c-1.023,0.146-1.754-0.73-1.754-1.754c0-1.023,0.585-1.607,1.315-1.754 c2.777-0.877,5.7-1.17,9.062-1.17c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 C37.886,22.369,37.154,23.101,36.132,23.101z"></path>
</svg>
        </>
    )
}
// add a gmail too!
export const LinkedinLink = () => {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
</svg>
        </>
    )
}

export const SnapchatLink = () => {
    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
<path fill="#f8e55b" d="M69.882,81.654h-39c-6.6,0-12-5.4-12-12v-39c0-6.6,5.4-12,12-12h39c6.6,0,12,5.4,12,12v39C81.882,76.254,76.482,81.654,69.882,81.654z"></path><path fill="#1f212b" d="M69.882,82.654h-39c-7.168,0-13-5.832-13-13v-39c0-7.168,5.832-13,13-13h39c7.168,0,13,5.832,13,13v39C82.882,76.822,77.05,82.654,69.882,82.654z M30.882,19.654c-6.065,0-11,4.935-11,11v39c0,6.065,4.935,11,11,11h39c6.065,0,11-4.935,11-11v-39c0-6.065-4.935-11-11-11H30.882z"></path><path fill="#f8e55b" d="M77.382,48.154v18.663c0,5.685-4.652,10.337-10.337,10.337H33.719c-5.685,0-10.337-4.652-10.337-10.337V33.491c0-5.685,4.652-10.337,10.337-10.337h33.663"></path><path fill="#1f212b" d="M67.045,77.654H33.719c-5.976,0-10.837-4.861-10.837-10.837V33.49c0-5.976,4.861-10.837,10.837-10.837h33.663c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5H33.719c-5.424,0-9.837,4.413-9.837,9.837v33.326c0,5.424,4.413,9.837,9.837,9.837h33.326c5.424,0,9.837-4.413,9.837-9.837V48.154c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v18.663C77.882,72.792,73.021,77.654,67.045,77.654z"></path><path fill="#1f212b" d="M77.382 46.654c-.276 0-.5-.224-.5-.5v-4c0-.276.224-.5.5-.5s.5.224.5.5v4C77.882 46.43 77.658 46.654 77.382 46.654zM77.382 40.654c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C77.882 40.43 77.658 40.654 77.382 40.654z"></path><path fill="#fdfcee" d="M50.592,66.229c-0.089,0-0.177-0.003-0.265-0.007h0c-0.056,0.004-0.114,0.007-0.173,0.007c-2.052,0-3.37-0.947-4.644-1.864c-0.88-0.632-1.71-1.229-2.688-1.395c-0.477-0.08-0.952-0.121-1.411-0.121c-0.827,0-1.479,0.13-1.956,0.225c-0.289,0.058-0.539,0.107-0.729,0.107c-0.198,0-0.413-0.044-0.506-0.368c-0.081-0.281-0.14-0.553-0.196-0.817c-0.145-0.678-0.249-1.095-0.528-1.139c-3.255-0.512-4.187-1.209-4.395-1.704c-0.029-0.071-0.046-0.142-0.05-0.212c-0.011-0.19,0.122-0.358,0.307-0.389c5.004-0.838,7.248-6.041,7.341-6.262c0.003-0.006,0.005-0.012,0.008-0.018c0.306-0.631,0.366-1.18,0.179-1.629c-0.343-0.823-1.463-1.185-2.205-1.424c-0.181-0.058-0.353-0.114-0.489-0.168c-1.479-0.595-1.603-1.206-1.544-1.517c0.099-0.53,0.796-0.9,1.359-0.9c0.155,0,0.291,0.028,0.405,0.082c0.666,0.317,1.265,0.478,1.783,0.478c0.715,0,1.027-0.306,1.065-0.346c-0.018-0.345-0.041-0.704-0.064-1.076c-0.149-2.407-0.334-5.397,0.415-7.105c2.243-5.117,7-5.515,8.405-5.515c0.036,0,0.21,0,0.21,0h0.594c9.5-0.001,8.521,10.113,8.384,13.201l-0.006,0.101c-0.02,0.324-0.039,0.638-0.055,0.939c0.035,0.036,0.312,0.308,0.939,0.332h0.001c0.476-0.019,1.023-0.173,1.624-0.459c0.176-0.084,0.371-0.101,0.505-0.101c0.203,0,0.409,0.04,0.58,0.113l0.01,0.004c0.486,0.175,0.804,0.522,0.811,0.883c0.006,0.341-0.249,0.853-1.504,1.357c-0.13,0.052-0.296,0.106-0.472,0.162c-0.717,0.232-1.799,0.581-2.131,1.376c-0.181,0.434-0.123,0.963,0.173,1.574c0.003,0.006,0.006,0.012,0.008,0.018c0.09,0.213,2.257,5.241,7.095,6.052c0.179,0.03,0.306,0.192,0.296,0.376c-0.004,0.069-0.021,0.138-0.049,0.206c-0.2,0.475-1.099,1.148-4.246,1.643c-0.257,0.04-0.357,0.381-0.51,1.096c-0.056,0.26-0.112,0.516-0.19,0.784c-0.067,0.233-0.21,0.342-0.45,0.342h0.389c-0.173,0-0.418-0.031-0.729-0.093c-0.551-0.11-1.169-0.211-1.956-0.211c-0.459,0-0.934,0.041-1.412,0.121c-0.977,0.166-1.806,0.761-2.684,1.393C53.962,65.282,52.645,66.229,50.592,66.229z"></path><path fill="#1f212b" d="M50.592,66.729c-0.097,0-0.191-0.003-0.287-0.007c-0.008,0.004-0.08,0.007-0.15,0.007c-2.214,0-3.659-1.04-4.936-1.958c-0.831-0.598-1.616-1.162-2.48-1.308c-1.264-0.212-2.478-0.04-3.185,0.101c-0.315,0.062-0.587,0.117-0.827,0.117c-0.677,0-0.908-0.458-0.986-0.731c-0.085-0.292-0.146-0.576-0.205-0.851c-0.047-0.22-0.131-0.611-0.204-0.762c-2.782-0.446-4.317-1.098-4.69-1.991c-0.051-0.121-0.08-0.245-0.089-0.37c-0.023-0.454,0.288-0.844,0.724-0.917c4.715-0.79,6.874-5.753,6.964-5.964c0.259-0.538,0.315-0.947,0.186-1.259c-0.256-0.612-1.244-0.931-1.897-1.141c-0.196-0.063-0.378-0.122-0.521-0.18c-1.718-0.69-1.954-1.508-1.85-2.072c0.196-1.049,1.674-1.557,2.47-1.179c0.599,0.285,1.126,0.43,1.568,0.43c0.261,0,0.438-0.05,0.551-0.099c-0.015-0.257-0.031-0.521-0.048-0.791c-0.152-2.458-0.343-5.517,0.456-7.337c2.365-5.395,7.381-5.814,8.862-5.814h0.804h0.001c2.712,0,4.849,0.802,6.352,2.384c2.953,3.109,2.684,8.353,2.554,10.872l-0.068,1.229c0.097,0.041,0.241,0.081,0.442,0.088c0.37-0.016,0.851-0.154,1.391-0.411c0.643-0.305,1.106-0.163,1.496,0.003c0.666,0.239,1.114,0.767,1.125,1.338c0.013,0.725-0.6,1.341-1.818,1.831c-0.137,0.055-0.309,0.111-0.491,0.17c-0.643,0.208-1.594,0.514-1.836,1.097c-0.124,0.296-0.07,0.688,0.161,1.164c0.104,0.246,2.167,5.029,6.735,5.794c0.43,0.073,0.736,0.458,0.713,0.896c-0.007,0.13-0.037,0.257-0.09,0.378c-0.361,0.86-1.846,1.492-4.536,1.923c-0.069,0.155-0.152,0.543-0.19,0.721c-0.059,0.271-0.118,0.537-0.198,0.817c-0.09,0.31-0.279,0.528-0.541,0.633v0.071l-0.39-0.029c-0.13-0.017-0.275-0.042-0.438-0.074c-0.524-0.104-1.112-0.201-1.857-0.201c-0.431,0-0.878,0.039-1.329,0.114c-0.863,0.146-1.646,0.709-2.476,1.306C54.253,65.688,52.806,66.729,50.592,66.729z M50.288,65.724c0.142,0.002,0.223,0.005,0.304,0.005c1.892,0,3.087-0.86,4.354-1.771c0.927-0.667,1.801-1.295,2.894-1.481c0.508-0.085,1.011-0.128,1.496-0.128c0.832,0,1.479,0.106,2.053,0.221c0.095,0.019,0.177,0.033,0.249,0.045c0.043-0.226,0.094-0.458,0.144-0.693c0.153-0.713,0.298-1.388,0.923-1.485c2.943-0.462,3.651-1.043,3.818-1.269c-4.981-0.944-7.204-6.098-7.298-6.319c-0.358-0.74-0.42-1.407-0.181-1.979c0.419-1.008,1.634-1.4,2.438-1.659c0.171-0.056,0.321-0.104,0.439-0.151c0.945-0.38,1.193-0.735,1.19-0.884c-0.002-0.121-0.172-0.311-0.48-0.421c-0.267-0.112-0.557-0.109-0.711-0.035c-0.662,0.315-1.274,0.486-1.819,0.507c-0.812-0.03-1.211-0.375-1.315-0.48l-0.155-0.158l0.097-1.729c0.123-2.38,0.378-7.334-2.28-10.132c-1.307-1.375-3.199-2.073-5.626-2.073h-0.001h-0.804c-1.328,0-5.825,0.376-7.946,5.215c-0.701,1.599-0.52,4.523-0.374,6.873c0.023,0.373,0.046,0.734,0.063,1.081l0.012,0.214l-0.148,0.156c-0.112,0.117-0.545,0.501-1.428,0.501c-0.593,0-1.266-0.177-1.998-0.527c-0.031-0.015-0.091-0.033-0.189-0.033c-0.377,0-0.823,0.253-0.868,0.492c-0.027,0.148,0.196,0.542,1.24,0.961c0.125,0.05,0.283,0.101,0.45,0.154c0.833,0.269,2.085,0.672,2.519,1.71c0.245,0.588,0.181,1.274-0.19,2.039c-0.095,0.225-2.417,5.561-7.551,6.526c0.193,0.271,0.946,0.873,3.968,1.347c0.632,0.099,0.781,0.792,0.939,1.527c0.053,0.254,0.11,0.515,0.188,0.783c0.174,0.003,0.406-0.041,0.657-0.09c0.496-0.099,1.176-0.234,2.053-0.234c0.486,0,0.988,0.043,1.494,0.128c1.093,0.186,1.969,0.815,2.896,1.481c1.267,0.911,2.461,1.771,4.353,1.771C50.199,65.729,50.244,65.727,50.288,65.724z M62.858,61.425L62.858,61.425L62.858,61.425z"></path>
</svg>
        </>
    )
}
const platformIcons: { [key: string]: React.FC<any> } = {
    Instagram: InstagramLink,
    Facebook: FacebookLink,
    'X (Twitter)': TwitterLink,
    YouTube: YoutubeLink,
    Spotify: SpotifyLink,
    Threads: LucideLink,
    GitHub: GithubLink,
    Linkedin:LinkedinLink,
    Snapchat:SnapchatLink
  };
export default function Profile() {

    const { session, status} = useProtectedRoute();
    const [socials, setSocials] = useState<Social[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSocial, setEditingSocial] = useState<Social | null>(null);
    const [formData, setFormData] = useState<FormDataState>({
      platform: 'Instagram',
      url: '',
    });
    console.log("Session is " , session);
    console.log("Status is ", status)
    const router = useRouter();

    if (status === "loading") return <p>Loading...</p>;


  const fetchSocials = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/socials', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch social links.');
      }
      const data: Social[] = await response.json();
      setSocials(data);
    } catch (error) {
      toast.error('Could not load social links.');
    }
  };

  useEffect(() => {
    if (session) {
      fetchSocials();
    }
  }, [session]);

  const handleOpenModal = (socialToEdit: Social | null = null) => {
    if (socialToEdit) {
      setEditingSocial(socialToEdit);
      setFormData({ platform: socialToEdit.platform, url: socialToEdit.url });
    } else {
      setEditingSocial(null);
      setFormData({ platform: 'Instagram', url: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSocial(null);
    setFormData({ platform: 'Instagram', url: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!editingSocial;
    const toastId = toast.loading(
      isEditing ? 'Updating social link...' : 'Adding social link...'
    );

    try {
      const endpoint = isEditing ? `http://localhost:3000/api/socials/${editingSocial.id}` : '/api/socials';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save social link.');
      }

      const updatedSocials = isEditing
        ? socials.map((s) => (s.id === editingSocial.id ? { ...s, ...formData } : s))
        : [...socials, await response.json()];
      
      setSocials(updatedSocials);
      toast.success(
        isEditing ? 'Social link updated!' : 'Social link added!',
        { id: toastId }
      );
      handleCloseModal();
    } catch (error) {
      toast.error('Error saving social link. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    // Using a custom modal instead of alert
    // A simplified example, for a real app, this would be a UI component
    if (!window.confirm('Are you sure you want to delete this social link?')) {
      return;
    }
    const toastId = toast.loading('Deleting social link...');
    try {
      const response = await fetch(`/api/socials/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete social link.');
      }
      setSocials((prevSocials) => prevSocials.filter((s) => s.id !== id));
      toast.success('Social link deleted!', { id: toastId });
    } catch (error) {
      toast.error('Error deleting social link. Please try again.');
    }
  };

  // Handle unauthenticated state without `useRouter`
  if (!session) {
    router.push("/signin");
    toast.error("You are not authenticated, first sign in!")
  }


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Socials</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg transform transition-all hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LucidePlus size={20} />
            <span className="font-medium hidden sm:inline">Add Socials</span>
          </button>
        </div>

        {/* Socials Display Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {socials.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>No social accounts added yet. Click "Add Socials" to get started!</p>
            </div>
          ) : (
            socials.map((social) => {
              const IconComponent = platformIcons[social.platform];
              return (
                <div
                  key={social.id}
                  className="group relative flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    {IconComponent && <IconComponent size={40} className="text-gray-800" />}
                  </a>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(social.id)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete social link"
                  >
                    <LucideX size={16} />
                  </button>
                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenModal(social)}
                    className="absolute bottom-0 right-0 p-1 bg-gray-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Edit social link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add/Edit Social Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingSocial ? 'Edit Social Link' : 'Add New Social'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800">
                <LucideX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="platform"
                >
                  Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  {Object.keys(platformIcons).map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="url"
                >
                  Profile URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://www.example.com/profile"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingSocial ? 'Save Changes' : 'Add Social'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    )
}