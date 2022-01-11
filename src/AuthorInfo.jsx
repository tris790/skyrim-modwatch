import styles from './App.module.css';

export default function AuthorInfo(props) {
    return (
        <div class={styles.App}>
            <h2>{props.author}{props.info?.tag ? ` - ${props.info?.tag}` : ""}</h2>
            <h3>{props.info?.enb}</h3>
        </div >
    );
}
