---
title: Crafter's Almanac
type: mod
summary: Browse every item and look up its recipes and uses, in a panel that looks like the vanilla recipe book.
repo: Samurai-Lemon/crafters-almanac
icon: /Images/mods/crafters-almanac.png
category: Utility
loaders: [Fabric]
minecraft: [1.21.1]
environment: Client only
license: MIT
requires: Fabric API
requires_url: https://modrinth.com/mod/fabric-api
# Manual files (backup): add a jar here if it isn't on a GitHub Release.
# Put the jar in content/Mods/files/ and point url at /Mods/files/<name>.jar,
# or use any direct link to a .jar.
#   files:
#     - version: 0.1.0
#       minecraft: 1.21.1
#       loader: Fabric
#       url: /Mods/files/crafters-almanac-0.1.0+fabric-1.21.1.jar
#       date: 2026-11-21
#       notes: First release.
files: []
---

## About

Crafter's Almanac works like JEI or REI: browse every item in the game and look up its recipes and uses. The panel is drawn with the vanilla recipe book's own textures, so it looks like part of the game, and resource packs restyle it along with everything else.

Open your inventory or anything you make things in (a crafting table, furnace, smithing table, brewing stand or a modded machine) and the almanac sits where the recipe book goes. In chests and other storage it stays out of the way until you press **R** or **U** over an item.

## Features

- **Recipes and uses:** left-click an item for its recipes, right-click for its uses, or hover any item and press **R** or **U**.
- **Search:** type to filter, with `@modid` for a mod and `#tag` for an item tag. Items in your inventory that don't match fade out.
- **Fill the grid:** click **+** on a recipe to fill the crafting grid (shift-click for as many as you can).
- **Raw materials:** the Materials Calculator shows everything a recipe takes, down to raw materials.
- **Favorites:** star recipes. Each world and server keeps its own list.
- **Only what you can make:** a filter like the vanilla book's "Showing Craftable".
- **Inventory tools:** sort your inventory or a chest, and quick-stack into chests.
- **Item details:** hold **Alt** for food, mining speed, durability, armor comparison, compost chance and fuel time. Hold **Shift** for a quick recipe preview.
- **Modded recipes:** every recipe type gets its own tab automatically, including machines from other mods.
- **Cheat mode:** with cheats allowed, click an item to get a stack of it.

Every key can be rebound under Controls → Key Binds → Crafter's Almanac, and the settings are under **Config** in Mod Menu.

## Installing

1. Install [Fabric Loader](https://fabricmc.net/use/) for Minecraft 1.21.1.
2. Download the jar above and [Fabric API](https://modrinth.com/mod/fabric-api).
3. Put both in your `.minecraft/mods` folder.

[Mod Menu](https://modrinth.com/mod/modmenu) is optional, and adds a settings button for the almanac.

Mod and resource pack makers: see [COMPATIBILITY.md](https://github.com/Samurai-Lemon/crafters-almanac/blob/main/COMPATIBILITY.md) for station files, card frames and Developer Mode.
