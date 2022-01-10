import logo from './logo.svg';
import styles from './App.module.css';
import { createSignal, createResource } from "solid-js";
import Navigation from './Navigation';

import PluginsTab from './PluginsTab';
import ModlistTab from './ModlistTab';
import SkyrimTab from './SkyrimTab';
import SkyrimPrefsTab from './SkyrimPrefsTab';

import nexus_api_mods_url from "./assets/skyrim_se_mods.js?url";


// const fetchModList = async (username) =>
//   (await fetch(`https://api.modwat.ch/api/user/${username}/all`)).json();

const fetchModList = async (username) => {
  const nexus_api_mods_req = import(nexus_api_mods_url);
  const modlist_api_mods_req = fetch(`https://api.modwat.ch/api/user/${username}/file/modlist`);

  const [{ default: nexus_api_mods }, modlist_api_mods_res] = await Promise.all([nexus_api_mods_req, modlist_api_mods_req])
  const modlist_api_mods = await modlist_api_mods_res.json();

  const mods = modlist_api_mods
    .map((mod, index) => {
      const found_mod = nexus_api_mods.find(x => mod.includes(x.n));
      return {
        name: mod,
        url: found_mod?.u ? `https://www.nexusmods.com/skyrimspecialedition/mods/${found_mod.u}` : undefined,
        category: found_mod?.c ?? "Unknown"
      }
    });
  return mods;
}

const tabs = {
  plugins: () => <PluginsTab />,
  modlist: () => <ModlistTab />,
  skyrim: () => <Skyrim />,
  skyrimPrefsTab: () => <SkyrimPrefsTab />
};

export default function App() {
  const [mods] = createResource("Meji-Zenith", fetchModList);
  // const [mods] = createResource("TitansBane", fetchModList);

  const [selectedTab, setSelectedTab] = createSignal("Modlist");
  return (
    <div class={styles.App}>
      <h1>ModWatch</h1>
      <Navigation active={selectedTab()} navigateTo={setSelectedTab} />

      <Switch fallback={<p>wtf</p>}>
        <Match when={selectedTab() === "Plugins"} >
          <PluginsTab />
        </Match>
        <Match when={selectedTab() === "Modlist"}>
          <ModlistTab mods={mods()} />
        </Match>
        <Match when={selectedTab() === "Skyrim"}>
          <SkyrimTab />
        </Match>
        <Match when={selectedTab() === "SkyrimPrefs"}>
          <SkyrimPrefsTab />
        </Match>
      </Switch>
    </div>
  );
}
