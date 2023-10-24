const url =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6b24a950-f3be-42a1-8b44-0763fffda6dd/d989ila-f621c613-a003-4cb2-aa73-2659901bd96b.jpg/v1/fill/w_1600,h_900,q_75,strp/the_witcher_3___wallpaper_hd_4k_by_seiikya_d989ila-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvNmIyNGE5NTAtZjNiZS00MmExLThiNDQtMDc2M2ZmZmRhNmRkXC9kOTg5aWxhLWY2MjFjNjEzLWEwMDMtNGNiMi1hYTczLTI2NTk5MDFiZDk2Yi5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.SyHphmrLp60eYXD4eNH-mU91CJuOOxnA55aAkhVEZ6M";

export function CardVideo() {
  return (
    <div className="p-4 h-72 w-[22%] cursor-pointer">
      <div className="border-2 p-1 w-full h-[88%] border-foreground/20 rounded-xl overflow-hidden">
        <img src={url} alt="" className="w-full h-full" />
      </div>

      <div className="w-full flex justify-between pt-2 text-muted-foreground">
        <span>Id: asdawdasd</span>
        <span>Data: 24/10/2023 17:10</span>
      </div>
    </div>
  );
}
