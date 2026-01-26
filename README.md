# w03-clicker-game

> emoji toolbox  
> 🔴🟠🟢

## Requirements checklist

🟢 Fetch upgrade data from the provided API and at least one upgrade from the API update the cookie count.  
🟠 Ensure that functions are used effectively to keep code organised and reusable.  
🟢 Implement event listeners to handle user interactions.  
🟢 Use local storage to save and restore the cookie count and relevant game information.  
🟢 Use setInterval to increment the cookie count and manage the game state each second. Managing the game state includes saving progress and updating the DOM.

### Stretch requirements

🟠 Consolidate upgrade management by managing all upgrades in a single function.  
🔴 Improve UX with animations, sound effects, or other visual effects.  
🔴 Fantastic use of README to provide important information such as a description of the project, how to deploy and other app information.  
🔴 Implement error handling using try/catch.  
🔴 Create a menu for users to adjust game options like sound effects or display preferences.

## Reflection

> tl;dr

I'll level with you, I feel like I have created a mess!  
It's not all doom-and-gloom, I've learned more on this project than any of the previous, and had some fun along the way! Make sure you're seated comfortably, because I gotta lay out where I think I misstepped at each turn.

I started with the easy stuff, got some dummy HTML in there and CSS'd it up to a rough sketch of what I wanted, layout-wise. tbh I think I abused  
Using JS event listeners is straightforward enough to make a number tick up, and after having the shortest of thinks about how games usually function I decided on two "main" functions: an initialiser to get the state of the world either from save or defaults, and a main gameloop that runs to handle updating the visuals and saving.

### Thanks to

Falling wool adapted from:
https://github.com/pajasevi/CSSnowflakes

## To improve

marisa 🐈‍⬛
