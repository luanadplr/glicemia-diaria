import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function Logo() {
  return (
    <p className="font-extrabold uppercase font-[poppins]">
      Glicemia<span className="font-normal">Diária</span>
    </p>
  );
}
