import Link from "next/link";
import React, { useEffect } from "react";
import useUserList from "../hooks/useUserList";

const MyList = () => {
  const { getUserList, userListData } = useUserList();

  useEffect(() => {
    const token = localStorage.getItem("kanji-gql-token");
    if (!token) return;
    getUserList();
  }, []);

  useEffect(() => {
    console.log(userListData);
  }, [userListData]);

  return (
    <div>
      <div className="g-container">
        <div>
          <div>
            <h1>My List</h1>
          </div>
          <div>
            <button>Display details</button>
          </div>
          <ul>
            {userListData?.user.list.map((item) => {
              const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const date = new Date(
                parseInt(item.createdAt)
              ).toLocaleDateString("en-US", options as any);
              return (
                <li key={item.id}>
                  <Link href={`/kanji/${item.character}`}>
                    <a className={`is-${item.status}`}>{item.character}</a>
                  </Link>
                  <div>
                    <div>
                      <div>Status</div>
                      <div>{item.status}</div>
                    </div>
                    <div>
                      <div>Added</div>
                      <div>{date}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyList;
