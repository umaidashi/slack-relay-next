import React from "react";
import useSWR from "swr";
import axios from "axios";

const ENDPOINT = process.env.ENDPOINT;

export default function Replies(props: any) {
  const { channelId, threadTs } = props;
  const {
    data: replies,
    error: replyError,
    isLoading: replyIsLoading,
  } = useSWR<any>(
    channelId && threadTs
      ? `${ENDPOINT}channel/${channelId}/${threadTs}`
      : null,
    axios
  );

  if (!replies) return <>Loading</>;
  return (
    <div>
      {replies.data.replies.map((r: any) => (
        <div key={r.ts}>{r.text}</div>
      ))}
    </div>
  );
}
