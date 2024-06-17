import { useContext, useEffect } from "react";
import MainContent from "../../components/mainContent/MainContent";
import Context from "../../context/Context";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import AdminPicture from "../../assets/img/admin.png";

export default function AdminDashboard() {
  const context = useContext(Context);
  const { mode, getAllPosts, deletePost, language } = context;

  const navigate = useNavigate();

  //* Logout Function
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const adminInfo = JSON.parse(localStorage.admin);
  const adminEmail = adminInfo.user.email;
  const pattern = /^[^@]+/;
  const adminName = adminEmail.match(pattern);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainContent>
      <div className="py-10">
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="right">
            <div className="flex flex-wrap justify-start items-center gap-2 mb-5">
              <img
                className=" w-10 h-10  object-cover rounded-full border-2 border-purple-600 p-1"
                src={AdminPicture}
                alt="profile"
              />{" "}
              <h1
                className="font-bold text-2xl"
                style={{ color: mode === "dark" ? "white" : "black" }}
              >
                {language === "pl" ? "Administratorzy" : "Admin Group"}
              </h1>
            </div>
            <h2
              className="font-semibold"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              {language === "pl" ? "Nazwa" : "Name"}: {adminName}
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              Email: {adminEmail}
            </h2>

            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              {language === "pl" ? "Liczba postów" : "Total Post"}:{" "}
              <span style={{ color: "red" }}>{getAllPosts.length}</span>
            </h2>
            <div className=" flex gap-2 mt-5">
              <Link to={"/addpost"}>
                <div className=" mb-2">
                  <Button
                    style={{
                      background:
                        mode === "dark"
                          ? "rgb(226, 232, 240)"
                          : "rgb(30, 41, 59)",
                      color: mode === "dark" ? "black" : "white",
                    }}
                    className="px-8 py-2"
                  >
                    {language === "pl" ? "Dodaj post" : "Add Post"}
                  </Button>
                </div>
              </Link>
              <div className="mb-2">
                <Button
                  onClick={logout}
                  style={{
                    background:
                      mode === "dark"
                        ? "rgb(226, 232, 240)"
                        : "rgb(30, 41, 59)",
                    color: mode === "dark" ? "black" : "white",
                  }}
                  className="px-8 py-2"
                >
                  {language === "pl" ? "Wyloguj" : "Logout"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Line  */}
        <hr
          className={`border-2
                 ${mode === "dark" ? "border-gray-300" : "border-gray-400"}`}
        />
        {/* Table  */}
        <div className="">
          <div className=" container mx-auto px-4 max-w-7xl my-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
              {/* table  */}
              <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                {/* thead  */}
                <thead
                  style={{
                    background: mode === "dark" ? "white" : "rgb(30, 41, 59)",
                  }}
                  className="text-xs "
                >
                  <tr>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Id
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      {language === "pl" ? "Zdjęcie" : "Thumbnail"}
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      {language === "pl" ? "Tytuł" : "Title"}
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      {language === "pl" ? "Kategoria" : "Category"}
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      {language === "pl" ? "Data" : "Date"}
                    </th>
                    <th
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      {language === "pl" ? "Akcja" : "Action"}
                    </th>
                  </tr>
                </thead>
                {/* tbody  */}
                {getAllPosts.length > 0 ? (
                  <>
                    {getAllPosts.map((item, index) => {
                      const { thumbnail, date, id } = item;
                      return (
                        <tbody key={index}>
                          <tr
                            className=" border-b-2"
                            style={{
                              background:
                                mode === "dark" ? "rgb(30, 41, 59)" : "white",
                            }}
                          >
                            {/* S.No   */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {index + 1}
                            </td>
                            {/* Post Thumbnail  */}
                            <th
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              scope="row"
                              className="px-6 py-4 font-medium "
                            >
                              {/* thumbnail  */}
                              <img
                                className="w-16 rounded-lg"
                                src={thumbnail}
                                alt="thumbnail"
                              />
                            </th>
                            {/* Post Title  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {item.posts.title}
                            </td>
                            {/* Post Category  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {item.posts.category}
                            </td>
                            {/* Post Date  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-6 py-4"
                            >
                              {date}
                            </td>
                            {/* Delete Post  */}
                            <td
                              style={{
                                color: mode === "dark" ? "white" : "black",
                              }}
                              className="px-2 py-4"
                            >
                              <button
                                onClick={() => navigate(`/editpost/${id}`)}
                                className=" px-6 py-1 mr-2 rounded-lg text-white font-bold bg-green-500"
                              >
                                {language === "pl" ? "Edytuj" : "Edit"}
                              </button>

                              <button
                                onClick={() => deletePost(id)}
                                className=" px-4 py-1 mt-1 rounded-lg text-white font-bold bg-red-500"
                              >
                                {language === "pl" ? "Usuń" : "Delete"}
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </>
                ) : (
                  <>{language === "pl" ? "Brak postów" : "Post not Found"}</>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
