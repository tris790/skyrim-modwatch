import { Show, Switch } from 'solid-js';
import styles from './App.module.css';

export default function ModlistTab(props) {
    return (
        <div class={styles.Tab}>
            <h2>Modlist</h2>
            <ul>
                <For each={props.mods}>
                    {(mod, index) =>
                        <Show when={mod.name[0] !== '-' || !props.hideDisabled}>
                            <li id={`mod-${index}`}>
                                <span>{index}</span> <span className={styles["mod-category"]}>{mod.category}</span>
                                <Switch fallback={<div>{mod.name}</div>}>
                                    <Match when={mod.url} >
                                        <a href={mod.url} target="_blank" rel="noopener noreferrer">{mod.name}</a>
                                    </Match>
                                </Switch>
                            </li>
                        </Show>
                    }
                </For>
            </ul>
        </div>
    );
}
