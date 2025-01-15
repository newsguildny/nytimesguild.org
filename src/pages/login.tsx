import GoTrue from "gotrue-js";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRef, useState } from "react";

const LoginPage = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const auth = useRef<GoTrue | null>(null);
  if (!auth.current) {
    auth.current = new GoTrue({
      APIUrl: "https://gotrue-736x5ulcda-uc.a.run.app/",
      setCookie: true,
    });
  }

  const currentUser = auth.current.currentUser();

  if (!currentUser) {
    return (
      <>
        <Head>
          <title>Log in</title>
        </Head>
        <main>
          <header>
            <h2>Log in</h2>
          </header>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = formData.get("email")?.valueOf();
              const password = formData.get("password")?.valueOf();
              if (typeof email !== "string" || typeof password !== "string") {
                return;
              }
              setIsLoginLoading(true);
              await auth.current?.login(email, password, true);
              setIsLoginLoading(false);
            }}
          >
            <div>
              <label htmlFor="email">
                Email address
                <input id="email" name="email" type="text" />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password
                <input id="password" name="password" type="password" />
              </label>
            </div>
            <div>
              <button disabled={isLoginLoading} type="submit">
                Log in
              </button>
            </div>
          </form>
        </main>
      </>
    );
  }
  return null;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default LoginPage;
