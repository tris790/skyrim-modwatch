import logo from './logo.svg';
import styles from './App.module.css';
import { createSignal, createResource, onMount, onCleanup } from "solid-js";
import Navigation from './Navigation';

import PluginsTab from './PluginsTab';
import ModlistTab from './ModlistTab';
import SkyrimTab from './SkyrimTab';
import SkyrimPrefsTab from './SkyrimPrefsTab';

import nexus_api_mods_url from "./assets/skyrim_se_mods.js?url";
import AuthorInfo from './AuthorInfo';

const binarySearchModList = (mod_list, target) => {
  let start_index = 0;
  let end_index = mod_list.length - 1;

  while (start_index <= end_index) {
    let middle_index = Math.floor((start_index + end_index) / 2);

    const mod_name = mod_list[middle_index].n.toLowerCase();
    const r = mod_name.localeCompare(target);
    if (r === 0) {
      return mod_list[middle_index];
    }
    else if (r < 0) {
      start_index = middle_index + 1
    } else {
      end_index = middle_index - 1
    }

    if (end_index - start_index <= 100) {
      for (let i = start_index; i < end_index; i++) {
        if (target.includes(mod_list[i].n.toLowerCase()))
          return mod_list[i];
      }
    }
  }

  return null;
}

const fetchAuthorInfo = async (username) =>
  (await fetch(`https://api.modwat.ch/api/user/${username}/all`)).json();

const fetchModList = async (username) => {
  const nexus_api_mods_req = import(nexus_api_mods_url);
  const modlist_api_mods_req = fetch(`https://api.modwat.ch/api/user/${username}/file/modlist`);

  const [{ default: nexus_api_mods }, modlist_api_mods_res] = await Promise.all([nexus_api_mods_req, modlist_api_mods_req])
  const modlist_api_mods = await modlist_api_mods_res.json();

  // TODO: Presort
  nexus_api_mods.sort((a, b) => a.n.toLowerCase().localeCompare(b.n.toLowerCase()));

  const time_start = window.performance.now();
  const mods = modlist_api_mods
    .map(mod => {

      const found_mod = binarySearchModList(nexus_api_mods, mod.slice(1).toLowerCase())

      return {
        name: mod,
        url: found_mod?.u ? `https://www.nexusmods.com/skyrimspecialedition/mods/${found_mod.u}` : undefined,
        category: found_mod?.c ?? "Unknown"
      }
    });

  console.log("Matching took:", window.performance.now() - time_start)
  return mods;
}

export default function App() {
  const [url, setUrl] = createSignal(window.location.hash.slice(1));
  const [info] = createResource(url, fetchAuthorInfo);
  const [mods] = createResource(url, fetchModList);

  const [selectedTab, setSelectedTab] = createSignal("Modlist");
  onMount(() => window.addEventListener("hashchange", () => setUrl(window.location.hash.slice(1))));
  onCleanup(() => window.removeEventListener("hashchange", null));

  return (
    <div class={styles.App}>
      <h1>ModWatch</h1>
      <AuthorInfo author={url()} info={info()} />
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
