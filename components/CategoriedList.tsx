import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/MyList.module.scss";

interface Props {
  option: string;
  list: any;
  handleStatusChange: (e: any, char: string) => void;
}

const CategoriedList: React.FC<Props> = ({
  option,
  list,
  handleStatusChange,
}) => {
  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    if (option === "date") setEditStatus(false);
  });

  return (
    <div>
      {option === "status" && (
        <button
          className={styles.myList__button}
          onClick={() => setEditStatus(!editStatus)}
        >
          {editStatus ? "complete" : "edit"}
        </button>
      )}
      {Object.entries(list[option]).map((item: any) => {
        return (
          <div key={item[0]} className={styles.myList__block}>
            <div>{item[0]}</div>
            <ul className={styles.myList__list}>
              {item[1].length > 0 &&
                item[1].map(
                  (char: { character: string; id: string; status: string }) => {
                    return (
                      <li key={char.id} className={styles.myList__item}>
                        <Link href={`/kanji/${char.character}`}>
                          <a className={`${styles.myList__kanji}`}>
                            {char.character}
                          </a>
                        </Link>
                        {editStatus && (
                          <form
                            onChange={(e) =>
                              handleStatusChange(e, char.character)
                            }
                          >
                            <select name="" id="" defaultValue={char.status}>
                              <option value="low">low</option>
                              <option value="middle">middle</option>
                              <option value="high">high</option>
                            </select>
                          </form>
                        )}
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriedList;
