import classes from "@/app/global.module.css";
import {Box, Container, Text} from "@mantine/core";

export const Banner = () => (
  <Container className={classes.container} my={"xxl"}>
    <Box mx={"sm"}>
      <Text fz={{base: "xl", sm: "xxl", md: "xxxl"}} fw={900}
            variant={"gradient"}>稳定、快速、现代的镜像服务。</Text>
      <Text fz={{base: "md", sm: "lg", md: "xl"}} fw={300}>托管于华东教育网骨干节点上海交通大学。</Text>
    </Box>
  </Container>
)