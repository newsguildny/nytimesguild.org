import GoTrue, { UserData } from "gotrue-js";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const UsersPage = () => {
  const [isCreateUserLoading, setIsCreateUserLoading] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const auth = useRef<GoTrue | null>(null);
  if (!auth.current) {
    auth.current = new GoTrue({
      APIUrl: "https://gotrue-736x5ulcda-uc.a.run.app/",
      setCookie: true,
    });
  }

  const currentUser = auth.current.currentUser();

  useEffect(() => {
    currentUser?.admin.listUsers("").then((response) => {
      // @ts-expect-error gotrue-js is typed incorrectly
      setUsers(response.users);
    });
  }, [currentUser]);

  if (currentUser?.role !== "admin") {
    return (
      <main>
        <p>Sorry, you don&apos;t have permission to view this page</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Administrate Users</title>
      </Head>
      <main>
        <section>
          <header>
            <h2>Create a new user</h2>
          </header>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = formData.get("email")?.valueOf();
              const password = formData.get("password")?.valueOf();
              const isAdmin = formData.get("is-admin")?.valueOf();
              if (typeof email !== "string" || typeof password !== "string") {
                return;
              }
              setIsCreateUserLoading(true);
              const newUser = await currentUser?.admin.createUser(
                email,
                password,
                {
                  role: isAdmin ? "admin" : "",
                  confirm: true,
                },
              );
              await currentUser?.admin.updateUser(newUser, {
                // eslint-disable-next-line camelcase
                app_metadata: {
                  authorization: {
                    roles: isAdmin ? ["admin", "editor"] : ["editor"],
                  },
                  roles: isAdmin ? ["admin", "editor"] : ["editor"],
                },
              });
              setIsCreateUserLoading(false);
              if (newUser) {
                setUsers([...users, newUser]);
              }
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
              <label htmlFor="is-admin">
                Admin? <input id="is-admin" name="is-admin" type="checkbox" />
              </label>
            </div>
            <div>
              <button disabled={isCreateUserLoading} type="submit">
                Create
              </button>
            </div>
          </form>
        </section>
        <section>
          <header>
            <h2>Existing users</h2>
          </header>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.email}
                {user.role === "admin" ? " (admin)" : ""}{" "}
                <button
                  type="button"
                  onClick={async () => {
                    await currentUser?.admin.deleteUser(user);
                    setUsers(users.filter(({ id }) => id !== user.id));
                  }}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default UsersPage;
