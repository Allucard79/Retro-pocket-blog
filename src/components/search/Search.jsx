import { useContext, useState } from "react";
import { Dialog, DialogBody, Input } from "@material-tailwind/react";
import Context from "../../context/Context";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";

export default function Search() {
  const [open, setOpen] = useState(false);

  const context = useContext(Context);
  const { mode, searchKey, setSearchKey, getAllPosts } = context;

  const navigate = useNavigate();

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
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              className=" bg-[#2C3A47]"
              name="searchKey"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
          </div>
          {/* Post Card  */}
          <div className="flex justify-center flex-wrap  sm:mx-auto sm:mb-2 -mx-2  mt-4 mb-2 ">
            {getAllPosts
              .filter(obj => obj.posts.title.toLowerCase().includes(searchKey))
              .map((item, index) => {
                return (
                  <div className="p-2 sm:w-1/4 w-full " key={index}>
                    <div
                      onClick={() => navigate(`/post/${item.id}`)}
                      className="container mx-auto px-4 bg-gray-200 p-2 rounded-lg "
                    >
                      {/* Post Thumbnail  */}
                      <img
                        className="w-20 mb-2 rounded-lg"
                        src={item.thumbnail}
                        alt=""
                      />
                      {/* Post Date  */}
                      <p className="w-40 text-sm">{item.date}</p>
                      {/* Post Title  */}
                      <h1>{item.posts.title}</h1>
                    </div>
                  </div>
                );
              })}
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
