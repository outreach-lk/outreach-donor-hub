import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Footer } from "../app/ui/components/modules/Footer";
import { Nav } from "../app/ui/components/modules/Navigation";
import styles from "../app/ui/styles/Home.module.css";
const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <Container maxW={"full"}>
        
      </Container>
      <Footer />
    </>
  );
};

export default Home;
