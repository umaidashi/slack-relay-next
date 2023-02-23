import React from "react";
import axios from "axios";
import useSWR from "swr";

const ENDPOINT = process.env.ENDPOINT_LOCAL;

type GetChannelsType = {
  data: {
    channels: {
      id: string;
      name: string;
    }[];
  };
};

export default function ChannelList() {
  const { data, error, isLoading } = useSWR<GetChannelsType>(
    `${ENDPOINT}channel`,
    axios
  );

  if (!data) return <>Loading</>;
  const result = data.data.channels.sort(function (a: any, b: any) {
    return a.name < b.name ? -1 : 1; //オブジェクトの昇順ソート
  });
  return (
    <>
      {result.map((channel) => (
        <div key={channel.id}>
          <a href={`/${channel.id}`}>{channel.name}</a>
        </div>
      ))}
    </>
  );
}
