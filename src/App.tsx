import { Upload, CircleDot } from "lucide-react";

function App() {
  return (
    <div className="w-full h-full flex flex-wrap justify-center align-top pt-20">
      <h1 className="text-7xl h-2 font-bold text-primary">Vídeo Stream Conversor</h1>

      <div className="w-full h-[82%] flex gap-y-8 flex-wrap content-start justify-center mt-12">
        <div className="h-[74%] w-[68%] border-2 border-muted-foreground rounded-md"></div>

        <div className="flex w-[66%] justify-end gap-x-12">
          <button className="w-32 h-14 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary border-2 border-primary shadow hover:bg-primary/90 hover:text-zinc-300">
            <CircleDot size={20} className="mr-2" /> Rec
          </button>

          <button
            disabled={true}
            className="w-32 h-14 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">
            <Upload size={20} className="mr-2" /> Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
