"use client";
import {Container, Text} from "@mantine/core";
import classes from "@/app/global.module.css";

export default function Error({error}: { error: Error }) {
  return (
    <Container className={classes.container}>
      <Text c={"red"}>加载失败: {error.toString()}</Text>
    </Container>
  );
}