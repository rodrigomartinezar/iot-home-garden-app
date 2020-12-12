import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Sistema de monitoreo</title>
      </Head>
      <h1>Bienvenido al sistema de monitoreo de tu jardín!</h1>
      <Button variant="contained" color="primary" href="sensorsData">
        Comienza aquí!
      </Button>
    </main>
  );
}
