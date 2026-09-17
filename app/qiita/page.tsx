"use client";

import axios from "axios";
import { QiitaResponse } from "@/domain/Article";
import Image from "next/image";
import { useEffect, useState } from "react";

const Qiita = () => {
  const [qiitaItems, setQiitaItems] = useState<
    QiitaResponse[]
  >([]);

  const fetchQiitaItems = async () => {
    const response = await axios.get<QiitaResponse[]>(
      "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=20",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_API_KEY}`,
        },
      },
    );

    return response.data;
  };

  useEffect(() => {
    fetchQiitaItems().then((items) =>
      setQiitaItems(
        items.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          image:
            "https://pbs.twimg.com/card_img/2099844097943166976/KX-pfkZ4?format=jpg&name=900x900",
        })),
      ),
    );
  }, []);

  return (
    <div>
      <h1>Qiita一覧</h1>
      <ul>
        {qiitaItems.map((item) => (
          <li key={item.id}>
            <Image
              src={item.image}
              width={100}
              height={100}
              alt=""
            />
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Qiita;
