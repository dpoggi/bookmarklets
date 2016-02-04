// mobafire.js -- champion guide shortcut for Mobafire
//
// Copyright (C) 2015 Dan Poggi
//
// This software may be modified and distributed under the terms
// of the MIT license. See the LICENSE file for details.

(function() {
  var champName, key, champId;

  // In the event of new champions, get_champ_ids.rb will generate
  // an up-to-date version of this object.
  const champIds = {
    "aatrox": 114,
    "ahri": 89,
    "akali": 50,
    "alistar": 4,
    "amumu": 23,
    "anivia": 25,
    "annie": 1,
    "ashe": 13,
    "azir": 121,
    "bard": 124,
    "blitzcrank": 34,
    "brand": 74,
    "braum": 119,
    "caitlyn": 67,
    "cassiopeia": 66,
    "chogath": 22,
    "corki": 31,
    "darius": 98,
    "diana": 102,
    "dr mundo": 26,
    "draven": 99,
    "ekko": 125,
    "elise": 106,
    "evelynn": 19,
    "ezreal": 47,
    "fiddlesticks": 38,
    "fiora": 94,
    "fizz": 87,
    "galio": 57,
    "gangplank": 30,
    "garen": 51,
    "gnar": 120,
    "gragas": 45,
    "graves": 85,
    "hecarim": 96,
    "heimerdinger": 40,
    "illaoi": 128,
    "irelia": 64,
    "janna": 29,
    "jarvan iv": 71,
    "jax": 15,
    "jayce": 100,
    "jhin": 129,
    "jinx": 116,
    "kalista": 122,
    "karma": 69,
    "karthus": 21,
    "kassadin": 27,
    "katarina": 36,
    "kayle": 2,
    "kennen": 49,
    "khazix": 105,
    "kindred": 127,
    "kogmaw": 54,
    "leblanc": 63,
    "lee sin": 73,
    "leona": 79,
    "lissandra": 113,
    "lucian": 115,
    "lulu": 95,
    "lux": 62,
    "malphite": 35,
    "malzahar": 52,
    "maokai": 70,
    "master yi": 3,
    "miss fortune": 59,
    "mordekaiser": 46,
    "morgana": 16,
    "nami": 108,
    "nasus": 37,
    "nautilus": 93,
    "nidalee": 42,
    "nocturne": 72,
    "nunu": 12,
    "olaf": 53,
    "orianna": 77,
    "pantheon": 44,
    "poppy": 43,
    "quinn": 111,
    "rammus": 24,
    "reksai": 123,
    "renekton": 68,
    "rengar": 103,
    "riven": 83,
    "rumble": 75,
    "ryze": 5,
    "sejuani": 91,
    "shaco": 41,
    "shen": 48,
    "shyvana": 86,
    "singed": 18,
    "sion": 6,
    "sivir": 7,
    "skarner": 81,
    "sona": 60,
    "soraka": 8,
    "swain": 61,
    "syndra": 104,
    "tahm kench": 126,
    "talon": 82,
    "taric": 32,
    "teemo": 9,
    "thresh": 110,
    "tristana": 10,
    "trundle": 65,
    "tryndamere": 14,
    "twisted fate": 28,
    "twitch": 20,
    "udyr": 39,
    "urgot": 58,
    "varus": 97,
    "vayne": 76,
    "veigar": 33,
    "velkoz": 118,
    "vi": 109,
    "viktor": 90,
    "vladimir": 56,
    "volibear": 88,
    "warwick": 11,
    "wukong": 80,
    "xerath": 84,
    "xin zhao": 55,
    "yasuo": 117,
    "yorick": 78,
    "zac": 112,
    "zed": 107,
    "ziggs": 92,
    "zilean": 17,
    "zyra": 101,
  };

  function champKey(name) {
    return name.toLowerCase().replace(/[^a-z ]/g, "");
  }
  function champUrl(id) {
    return "http://www.mobafire.com/league-of-legends/browse?sort_type=score_weighted&sort_order=&champion_id=" + id + "&lane=&role=&map=&guide_type=&threshold=all&freshness=S6&author=";
  }

  // Will jump directly to top rated guides/builds, Season 6 only, for
  // a given champion. Saves 4-5 page loads depending where you're at.
  champName = prompt("Enter champion name:");
  if (champName !== null && champName !== "") {
    key = champKey(champName);
    champId = champIds[key];

    if (typeof champId !== "undefined") {
      window.location.href = champUrl(champId);
    }
  }
})();
