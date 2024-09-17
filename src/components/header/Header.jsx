import { useContext } from "react";
import Context from "../../context/Context";
import Logo from "../../assets/img/preview.png";

export default function Header() {
  const context = useContext(Context);
  const { language } = context;

  return (
    <section
      style={{
        backgroundImage: `url(${Logo})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
      className="h-64 sm:h-96 relative"
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Header */}
      <div className="container mx-auto h-full flex flex-col items-center justify-center relative z-10">
        {/* Main Content */}
        <main className="h-full w-full flex items-center justify-center">
          <div className="text-center bg-black bg-opacity-70 p-6 rounded-lg">
            {/* Text */}
            <h1
              className="text-3xl sm:text-4xl text-white font-bold"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Retro Nook
            </h1>
            {/* Paragraph */}
            <p
              className="sm:text-3xl text-xl font-extralight text-white"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              {language === "pl"
                ? "Blog o zgromadzonych przez lata starych konsolach, grach i..."
                : "Check out my blog for reviews of retro gaming stuff!"}
            </p>
          </div>
        </main>
      </div>
    </section>
  );
}
