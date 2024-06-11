import classes from "@/app/global.module.css";
import {Container, Title} from "@mantine/core";
import Image from "next/image";
import imgSjtugRocket from "@/assets/sjtug_rocket.svg"
import imgSjtugText from "@/assets/sjtug_text.svg"
import Link from "next/link";

export const NavBar = () => (
  <Container className={classes.container} py={"md"}>
    <Link className={classes.brand} href={"/"}>
      <span className={classes.logo}>
        <Image className={classes.logoRocket} height={30} src={imgSjtugRocket} alt={"SJTUG Logo"}/>
        <Image className={classes.logoText} height={25} src={imgSjtugText} alt={"SJTUG"}/>
      </span>
      <Title order={3} className={classes.logoTitle}>软件源镜像服务</Title>
    </Link>
  </Container>
)