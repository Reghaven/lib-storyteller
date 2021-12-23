<div style="text-align: center;">
    <img src="https://user-images.githubusercontent.com/12459210/147170496-bfa3341a-c922-47cb-84f5-221f95003fa6.png">
</div>

# lib-storyteller
lib-storyteller is a library that serves as core engine to make plot based games.
It's inspiration is [Fallen London](https://www.fallenlondon.com/).

## Core Idea
Games build by storyteller follow a very simple pattern.
A *character* with his own stats interacts with *decisions*.
A *decision* is a snippet that requires specific character properties to exist and lead to a specific output.
`character + decision => result`

### Rules
- A character owns attributes and assets
- Attributes are given properties that can only rise like 'strength' or 'stealth'.
- Assets are metaphysical or physical objects the character can own.
  All stats in a game are expressed with attributes.
- Progress in a story is expressed with owning assets.
  An asset can act as counter or flag to unlock more decisions.

## Usage
TODO