import { Download, CircleDot, Trash } from "lucide-react";
import { useState } from "react";

function App() {
  const [isRec, setIsRec] = useState(false);

  return (
    <div className="w-full h-full flex flex-wrap justify-center align-top pt-20">
      <h1 className="text-7xl font-bold text-primary">Vídeo Stream Conversor</h1>

      <div className="w-full h-[82%] flex flex-wrap content-start justify-center">
        {/* <div className="h-auto w-[68%] flex"> */}
        {/* <button
            className="ml-auto text-red-500/60 border-red-500/60 px-6 h-10 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 shadow 
          hover:bg-red-500/80 hover:text-zinc-300">
            <CircleDot size={20} className="mr-2" /> Rec
          </button> */}
        {/* </div> */}

        <div className="h-[80%] w-[68%] border-2 border-muted-foreground rounded-md mb-6 mt-2"></div>

        <div className="flex w-[67%] justify-end gap-x-6">
          <button
            disabled={true}
            className="mr-auto text-muted-foreground/80 px-6 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 shadow 
          hover:bg-red-500/80 hover:text-zinc-300">
            <Trash size={20} className="mr-2" /> Descartar
          </button>
          {/* <button className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary border-2 border-primary shadow hover:bg-primary/90 hover:text-zinc-300">
              <Upload size={20} className="mr-2" /> Upload
            </button> */}

          <button
            className="ml-auto text-red-500/60 border-red-500/60 px-6 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 shadow 
          hover:bg-red-500/80 hover:text-zinc-300">
            <CircleDot size={20} className="mr-2" /> Rec
          </button>
          <button
            disabled={true}
            className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">
            <Download size={20} className="mr-2" /> Baixar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
