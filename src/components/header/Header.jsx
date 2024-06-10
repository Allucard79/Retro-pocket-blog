import { useContext } from "react";
import Context from "../../context/Context";
import Logo from "../../assets/img/logo.png";

export default function Header() {
  const context = useContext(Context);
  const { mode, language } = context;
  return (
    <section
      style={{ background: mode === "dark" ? "rgb(30, 41, 59)" : "#30336b" }}
    >
      {/* Header  */}
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        {/* Main Content  */}
        <main>
          <div className="text-center">
            <div className="mb-2">
              {/* Image  */}
              <div className="w-13 h-28 flex justify-center mb-5">
                <img src={Logo} alt="Logo" />
              </div>
              {/* Text  */}
              <h1 className=" text-4xl text-white font-bold">Retro Pocket</h1>
            </div>
            {/* Paragraph  */}
            <p
              style={{ color: mode === "dark" ? "white" : "white" }}
              className="sm:text-3xl text-xl font-extralight sm:mx-auto "
            >
                {language === "pl" ? "Blog o zgromadzonych przez lata starych konsolach, grach i..." : "Check out my blog for reviews of retro gaming stuff !"}
              </p>
          </div>
        </main>
      </div>
    </section>
  );
}
