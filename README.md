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

I started with the easy stuff, got some dummy HTML in there and CSS'd it up to a rough sketch of what I wanted, layout-wise. tbh I think I abused the idea of semantic HTML to the point of unrecognisability, and I regret nothing (what's up with those buy buttons, after all?).

Using JS event listeners is straightforward enough to make a number tick up, and after having the shortest of thinks about how games usually function I decided on two "main" functions: an initialiser to get the state of the world either from save or defaults, and a main gameloop that runs to handle updating the visuals and saving. I kind of did this? I'm not really sure how to describe what I feel was underutilised in my attempt at this approach.

I kind of got the basic requirements in fairly quickly, and at this point I overcomplicated things to the point of insanity:  
I wanted to be able to sew my own additional upgrades into the existing system, thus I began my long journey of realising everything I'd done was not prepared to support multiple import feeds. I don't want to hand-wave away the problems and solutions I encountered on the way, but I think they can be summarised thusly: I do not think like JavaScript, and it turns out I do not understand "pass-by-value" programming. Fundamental whoopsie!

I probably should have written this reflection as I was working, as I'm unfortunately unclear on How I Got Here, but I managed to zip together both upgrade feeds and save them appropriately (I understand I could have also collated all the saved values into one but I got confused with it, chalk that one up to lack of experience).

Oh, I also forgot to add _any_ user feedback whatsoever, hilarious! At the last minute, I knocked together a simple toast notification display for players who are too broke to afford an upgrade and stuck it in the worst place I could: the opposite corner from where any of the user interaction actually takes place. Clever UX design, Marisa!

As always, comments in the code.

### Thanks to

Falling wool adapted from:  
https://github.com/pajasevi/CSSnowflakes

## To improve

TIME MANAGEMENT. Stop arsing about with bells, whistles, and hare-brained attempts to improve and iterate too much. Just get it on the page and deal with the consequences later.  
A little more reading on grid and flex wouldn't hurt, I would like a more intuitive knowledge of their behaviour.
I am **unbelievably** bad at using arrays and objects, as evidenced by my malappropriation of them.  
Reduce redundancy  
Reduce redundancy

marisa 🐈‍⬛
