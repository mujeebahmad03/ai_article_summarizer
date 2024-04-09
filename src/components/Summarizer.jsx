import { Button } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";

const Summarizer = () => {
  return (
    <>
      <div className=" mt-16 w-full max-w-[32rem] flex flex-col gap-4">
        <Button fullWidth size="lg" variant="outlined">
          <Link className="block w-full" to="summarizer/url">
            URL
          </Link>
        </Button>
        <Button fullWidth size="lg" variant="outlined">
          <Link className="block w-full" to="summarizer/text">
            Text
          </Link>
        </Button>
        <Button fullWidth size="lg" variant="outlined">
          <Link className="block w-full" to="summarizer/image">
            Image
          </Link>
        </Button>
        <Button fullWidth size="lg" variant="outlined">
          <Link className="block w-full" to="summarizer/file">
            File
          </Link>
        </Button>
      </div>
      <Outlet />
    </>
  );
};

export default Summarizer;
