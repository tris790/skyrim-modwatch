import styles from './App.module.css';

export default function Navigation(props) {
    console.log("Active", props.active)
    return <nav class={styles.Navigation}>
        <ul>
            <li attr:selected={props.active === "Plugins"}>
                <button onClick={() => props.navigateTo("Plugins")}>Plugins</button>
            </li>
            <li attr:selected={props.active === "Modlist"}>
                <button onClick={() => props.navigateTo("Modlist")}>Modlist</button>
            </li>
            <li attr:selected={props.active === "Skyrim"}>
                <button onClick={() => props.navigateTo("Skyrim")}>Skyrim</button>
            </li>
            <li attr:selected={props.active === "SkyrimPrefs"}>
                <button onClick={() => props.navigateTo("SkyrimPrefs")}>SkyrimPrefs</button>
            </li>
        </ul>
    </nav>
}