import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategoriedList from "../components/CategoriedList";
import useStatusChange from "../hooks/useStatusChange";
import useUserList from "../hooks/useUserList";
import styles from "../styles/MyList.module.scss";

const MyList = () => {
  const { getUserList, userListData } = useUserList();
  const [changeStatus, { data: changeStatusData, error: changeStatusError }] =
    useStatusChange();
  const [sortOption, setSortOption] = useState("");
  const [categoriedList, setCategoriedList] = useState({
    date: {},
    status: {
      low: [],
      middle: [],
      high: [],
    },
  });

  useEffect(() => {
    if (changeStatusData) {
      getUserList();
    }
  }, [changeStatusData]);

  useEffect(() => {
    const token = localStorage.getItem("kanji-gql-token");
    if (!token) return;
    if (userListData) return;
    getUserList();
  }, []);

  useEffect(() => {
    if (!userListData) return;

    const categories = {
      date: {},
      status: {
        low: [],
        middle: [],
        high: [],
      },
    };

    userListData.user.list.forEach((item) => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const date = new Date(parseInt(item.createdAt)).toLocaleDateString(
        "en-US",
        options as any
      );
      if (!(date in categories.date)) {
        (categories.date as any)[date] = [item];
      } else {
        (categories.date as any)[date].push(item);
      }

      if (!(item.status in categories.status)) {
        (categories.status as any)[item.status] = [item];
      } else {
        (categories.status as any)[item.status].push(item);
      }
    });

    setCategoriedList(categories);
  }, [userListData]);

  const onChangeValue = (event: any) => {
    const option = event.target.value;
    if (!option) return;
    if (option !== "status" && option !== "date") return;
    setSortOption(option);
  };

  const handleStatusChange = (e: any, char: string) => {
    changeStatus({
      variables: {
        character: char,
        status: e.target.value,
      },
    });
  };

  return (
    <div className={styles.myList}>
      <div className="g-container">
        <div>
          <div>
            <h1 className={styles.myList__title}>My List</h1>
          </div>

          <div className={styles.myList__sort}>
            <div className={styles.myList__sort_text}>sort by:</div>
            <form
              className={styles.myList__sort_options}
              onChange={onChangeValue}
            >
              <div>
                <input type="radio" value="date" name="sort" /> date
              </div>
              <div>
                <input type="radio" value="status" name="sort" /> status
              </div>
            </form>
          </div>

          <div>
            {sortOption ? (
              <CategoriedList
                option={sortOption}
                list={categoriedList}
                handleStatusChange={handleStatusChange}
              />
            ) : (
              <ul className={styles.myList__list}>
                {userListData?.user.list.map((item) => {
                  return (
                    <li key={item.id} className={styles.myList__item}>
                      <Link href={`/kanji/${item.character}`}>
                        <a
                          className={`${styles.myList__kanji} is-${item.status}`}
                        >
                          {item.character}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyList;
