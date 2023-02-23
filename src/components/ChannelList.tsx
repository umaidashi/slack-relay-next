import React from "react";
import axios from "axios";
import useSWR from "swr";

const ENDPOINT = process.env.ENDPOINT_LOCAL;

export default function ChannelList() {
  console.log(ENDPOINT);
  const {
    data: channels,
    error,
    isLoading,
  } = useSWR(`${ENDPOINT}channel`, axios);
  console.log(isLoading, channels, error);
  
  return <>hogehoge{ENDPOINT}</>;
}
