import { useContext, useState } from "react";
import { Dialog, DialogBody, Input } from "@material-tailwind/react";
import Context from "../../context/Context";
import { AiOutlineSearch } from "react-icons/ai";
import Picture from "../../assets/img/logo.png";

export default function Search() {
  const [open, setOpen] = useState(false);

  const context = useContext(Context);
  const { mode } = context;

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {/* Search Icon  */}
      <div onClick={handleOpen}>
        <AiOutlineSearch size={20} color="white" />
      </div>
      {/* Dialog  */}
      <Dialog
        className=" relative right-[1em] w-[25em]  md:right-0 md:w-0 lg:right-0 lg:w-0"
        open={open}
        handler={handleOpen}
        style={{
          background: mode === "light" ? "#2f3542" : "#2f3542",
          color: mode === "dark" ? "white" : "black",
        }}
      >
        {/* Dialog Body  */}
        <DialogBody>
          <div className="flex w-full   justify-center">
            {/* Input  */}
            <Input
              color="white"
              type="search"
              label="Type here..."
              className=" bg-[#2C3A47]"
              name="searchkey"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
          </div>
          {/* Post Card  */}
          <div className="flex justify-center flex-wrap  sm:mx-auto sm:mb-2 -mx-2  mt-4 mb-2 ">
            <div className="p-2 sm:w-1/4 w-full ">
              <div className=" container mx-auto px-4 bg-gray-200 p-2 rounded-lg ">
                {/* Post Thumbnail  */}
                <img className="w-20 mb-2 rounded-lg" src={Picture} alt="" />
                {/* Post Date  */}
                <p className="w-40 text-sm">{"date"}</p>
                {/* Post Title  */}
                <h1>{"title"}</h1>
              </div>
            </div>
          </div>
          {/* Heading  */}
          <div className=" text-center">
            <h1 className=" text-gray-600">Retro Pocket</h1>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
