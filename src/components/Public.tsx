import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Public = () => {
  const content = (
    <div className="flex items-center min-h-dvh p-20 justify-end">
      <section className="public w-[340px] text-justify h-auto lg:mr-40 ">
        <header className="mb-2">
          <h1>
            Welcome to <span>Mohawk Repairs!</span>
          </h1>
        </header>
        <main>
          <p>
            Duis sit amet nunc eget justo ultricies eleifend. Vestibulum commodo
            sapien eget est bibendum, ac fermentum nisi auctor. Sed nulla leo,
            sodales vel neque eu, maximus commodo metus.
          </p>
          <address className="my-5">
            Mohawk Repairs
            <br />
            431 Fooh Ave.
            <br />
            Lar City, QA 1285
            <br />
            <a href="tel:+445555555555">(444) 555-5555</a>
          </address>
          <p>Owner: Emilio Murphy</p>
        </main>
        <footer className="mt-10">
          <Link to="/login">
            <Button>Employee Login</Button>
          </Link>
        </footer>
      </section>
    </div>
  );
  return content;
};
export default Public;
