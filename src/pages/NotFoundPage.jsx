import styles from "../app.module.css";

export const NotFoundPage = () => (
    <div className={styles.container}>
        <h2>404</h2>
        <p>Page not found</p>
        <button className={styles.btn} onClick={() => window.history.back()}>{`<- Back`}</button>
    </div>
)