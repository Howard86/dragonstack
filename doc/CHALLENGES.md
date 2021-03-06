# Final Course Challenges List

For any of these, I’d love to see your code on Github! Feel free to fork https://github.com/15Dkatz/dragonstack-scripts and open up a Pull Request with your contributions. This is an experimentation repo separate from the course repo, to keep that codebase consistent with the video tutorials.

## Quicker Frontend

1. ~~Display the Account Balance, Id, Username, and Log Out Button in a header that stays at the top of app across all pages.~~
2. ~~Generate action type values with a helper function. This is a level of abstraction we don’t need in the course. But perfect material for a challenge!~~
3. ~~Use `moment-js` to display the generation expiration time more prettily.~~
4. ~~Implement a cancel button in the AccountDragonRow after editing~~
5. ~~Color the input differently in AccountDragonRow when it’s disabled~~
6. ~~Stylize alert message pop ups.~~
7. Make sure the dragon cannot be public until after a sale value has been given. Use a popup with the `alert()` function. Or use an alternate kind of blocking behavior.
8. Add confirmation button to buy or mate with a dragon.

## Quicker Backend

1. Enforce a limit for how many dragons can be generated in a generation. Base it on how many dragons currently exist. Or impose a maximum number of dragons per generation.
2. Reward users with currency for logging in daily.
3. Add validations that prevent the saleValue or sireValue from being less than 0.
4. Make sure that dragons with a 0 sale or sireValue cannot be made public.
5. Generate random names for the dragon instead of ‘unnamed’.

## Advanced Frontend

1. Generate an avatar that overlays images for an actual “image” of the dragon based off the traits.
2. Implement a caching layer on the browser that prevents re-fetches if an endpoint hasn’t changed.
3. Use socket.io to implement real time updates of the public-dragons page to avoid races between user to buy dragons.

## Advanced Conceptual

- Design a currency-less system that pays siring fees with a dragon itself. Then trade dragons without cost.

## Advanced Backend

1. Extract the get and store functions of the table classes into a framework around `node-postgres` and `express`! I could help contribute if it’s open source on Github :)
2. Implement a more elegant traitLottery function. Some more randomness could represent real genetics - where you look very similar to your parents, but you have variation.
3. Rank each trait according to their statistical chances of beating the other traits in the traitLottery function.
4. Optimize storing the multiple traits within the `storeDragon` function as one query, rather than a query that is run multiple times within a loop.
5. Add an incremental api endpoint to support pagination for smaller dragon loads. This has the important benefit of not overworking the database.
6. Implement a caching layer on the backend that does not have to make new trips to the database for unchanged parts of the database (mark changes with updates).
7. Store the unique ids of a generation as a callback when the previous generation expires. This will allow you to batch up the generation ids and store them later on, rather than writing to the database with each new dragon.

## Full-stack

1. Implement unit testing (try Jest)!
2. Implement browser integration tests!
