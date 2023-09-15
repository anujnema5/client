import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const getTimeAgo = (videoDate) => {
  const videoTime = new Date('2023-09-12T11:04:21.588Z')
  const currentTime = new Date();

  const secondsAgo = Math.floor((currentTime - videoTime) / 1000);

  if (secondsAgo < 60) {
    return "Just Now"
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minutes ago`
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600)
    return `${hoursAgo} hours ago`
  } else if (secondsAgo < 2592000) { // 30 days, approximately one month
    const daysAgo = Math.floor(secondsAgo / 86400);
    return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
  } else if (secondsAgo < 31536000) { // 365 days, approximately one year
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return monthsAgo === 1 ? "1 month ago" : `${monthsAgo} months ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
  }
  // console.log(date);
}

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`)
      setChannel(res.data)
    }

    fetchChannel()
    console.log(getTimeAgo())
  }, [video.userId])

  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.img}
          />
          <Texts>
            <Title>Test Video</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views === 0 ? "No views " : video.views} • {getTimeAgo(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
