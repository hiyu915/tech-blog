import axios from "axios";
import Image from "next/image";

type QiitaResponse = {
  id: string;
  title: string;
  url: string;
  image: string;
};

type MicrocmsContent = {
  id: string;
  title: string;
  eyecatch: {
    url: string;
  };
};

type MicrocmsResponse = {
  contents: MicrocmsContent[];
};

export default async function Home() {
  const getQiitaItems = async () => {
    const response = await axios.get<QiitaResponse[]>(
      "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=4",
      {
        headers: {
          Authorization: `Bearer ${process.env.QIITA_API_KEY}`,
        },
      },
    );

    return response.data.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      image:
        "https://pbs.twimg.com/card_img/2099844097943166976/KX-pfkZ4?format=jpg&name=900x900",
    }));
  };

  const getMicroCMSItems = async () => {
    const response = await axios.get<MicrocmsResponse>(
      "https://fz0hoh38o6.microcms.io/api/v1/blogs",
      {
        headers: {
          "X-MICROCMS-API-KEY":
            process.env.MICROCMS_API_KEY,
        },
      },
    );

    return response.data.contents.map((item) => ({
      id: item.id,
      title: item.title,
      image: item.eyecatch.url,
      url: `/blogs/${item.id}`,
    }));
  };

  const qiitaItems = await getQiitaItems();
  const microCMSItems = await getMicroCMSItems();

  return (
    <div>
      <h1>トップページ</h1>

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

      <ul>
        {microCMSItems.map((item) => (
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
}
