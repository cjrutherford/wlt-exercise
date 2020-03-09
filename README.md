# Exercise Project
Interview Exercise for all Williams Lea Tag candidates. The intention of this exercise is to put a candidate through various exercises in an environment similar to how things are here at Williams Lea Tag. Candidates will be judged by a few points;
 
* How the candidate codes different modules
* How the candidate organizes their code
* How closely the candidate follows instructions
* How consistent and easy the code is to read and follow

It is highly recommended that [npm and node](https://nodejs.org/en/download/) are first installed on a candidate’s machine in order to start. This project will involve using ReactJS, however the candidate decides to tackle this project is up to them. It should be known that the reviewer will most likely be using VS Code after they clone it and begin reviewing.
 
Project was created by running `npx create-react-app wlt-exercise`. When forking this repository for the first time, it is necessary to first `cd wlt-exercise` into the directory and then run `npm install` to set up the project and have it ready for development.

## npm packages used to get started

```
npm install react-router-dom --save
npm install axios --save
npm install bootstrap --save
```

### axios
We are using axios to call the API. It is familiar to the whole team and it is simple to use. You may read up a little more about the documentation for this library [here](https://www.npmjs.com/package/axios)

### bootstrap
We started the setup of this on Bootstrap, but you may omit this if you're not familiar or want to prove your front end styling chops.

# Instructions
Fork (do not clone) this repo and when you are done, supply me the GitHub URL (make sure it’s public) and I will clone that repository.

You are tasked to create two pages that consume an API that shows currency rates. Documentation for this API can be found [here](https://ratesapi.io/documentation/). This is a fairly simple API that you need to consume using Axios. How you go about consuming this API is up to you. There are three types of API endpoint styles of concern here;

```
https://api.ratesapi.io/api/latest
https://api.ratesapi.io/api/2010-1-2?base=USD
https://api.ratesapi.io/api/latest?base=USD&symbols=USD,GBP,JPY,SGD
```

The API documentation should go into further detail about how to filter specific currencies and get history based on a date. The first page has a sample call that can be used to get started. In addition, the API also returns an error message if something isn’t right with the call, styled like this:

```
{
    "error": "Symbols 'USD,GBP,JPY,SGD,VND' are invalid for date 2020-03-09."
}
```

The react app should be able to handle this and continue to work. If an error message is present, I want to see that error message displayed on screen.

In addition, use whatever npm installs you think will make this easier. You are not tied to a specific library. Depending how familiar you are with NPM installs there are some you have thought of already you wanna use. I am going to run `npm install` myself once I clone your repository.

## ListView.js
This file will first load with the `/latest` end point and display all of the counter currencies found within the `rates` object. You do not need to display anything outside of the three letter code for currency information, the API itself doesn’t actually show this, but kudos if you want to develop something to display something other than the three letter code.

Develop this page first and foremost, to allow me to choose a different base currency. Right now the default for this is EUR, but via the API I can select something like USD as my base currency.

Also this page should allow the user to filter which currencies they can see, for example, what if I want to only see EUR, USD, and JPY and ignore everything else the API returns?

I will prefer that I can select the new base currency and the table automatically updates and the same for when I filter what currencies I want to see. But I will accept needing to press a “submit” button to apply filters.

How you go about this is entirely up to you, although I recommend you start with how React handles form items which can be read up on [here](https://reactjs.org/docs/forms.html). How you want to display all of this data is also your call.

## RateHistory.js
BONUS - You do not have to develop this page and not doing so will not come with a penalty. This page will be moderately more challenging. Completing this will tell me a lot about your React abilities.

You will visit this page from the `ListView.js` file. Clicking on an item displayed there will come to here it should retain what the selected base currency was and the counter currency clicked on. This page will display a form to select a date range and use the APIs ability to get daily rates and display each day within the range selected. The trick here is that the API only allows for 1 day per call, so for the range you will need to call the API once per day, for a large date range, this could potentially cause a slowdown, so you may need to tell the user “I’m working on it” or try to display each date as they are made available, taking advantage of axios’ promise based system and as each call is made, you can add to the view.

You may want to use route params or you can use the npm install [query-string](https://www.npmjs.com/package/query-string) to help you pass information to this page.

# Conclusion

This is the section I want to hear from you. If you’ve made it this far in the documentation, congratulations. Document here what you were thinking during this exercise. Was it too hard? Too demanding? What was your React experience before this? Depending on how you perform, it’ll tell me more than a silly quiz or white board could ever tell me.

Feel free to provide any feedback but please keep it professional. Keep cursing at a minimum.