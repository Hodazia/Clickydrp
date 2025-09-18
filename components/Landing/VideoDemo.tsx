/*
- in this we will be adding a video from youtube, so i will record and publish the video on yt
- the youtube iframe will be added here in a big responsive layout

*/
export function VideoDemo() {
    return (
      <section id="videodemo" className="m-2">
        {/* Heading Section */}
        <div className="bg-[#fffbf0] dark:bg-black text-center py-6 transition-colors duration-300">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg md:text-2xl text-indigo-400 dark:text-indigo-500 max-w-4xl mx-auto">
              Want to see how ClickDrp works? Check out this video
            </h2>
          </div>
        </div>
{/*   

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
            <iframe 
            className="absolute inset-0 w-full h-full border-0"
            src="https://www.youtube.com/embed/jPW7Ywo2LcM?si=NwM7NiF-g2lT6irI" 
            title="YouTube video player" 
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>
        </div> */}
      </section>
    );
  }