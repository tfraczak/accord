> # README

# **<a href="https://accord-app.herokuapp.com/#/" target="_blank">Accord</a>**
*Accord is a clone of Discord, a social communication app which allows users to connect with each other via live text, voice, or video.*

## **Technologies Employed**
* **Ruby on Rails using PostgresQL**
    * Ruby v2.5.1p57
    * Rails v5.2.3

`Ruby on Rails` is primarily used as a data API back-end for this app. It handles all of the data fetching and storage in the `PostgresQL` database. `Rails` is a *very* powerful app building tool which simplifies a lot of the complicated code for accessing, retrieving, mutating, analyzing, and/or displaying the appropriate data.

* **Websockets via ActionCable in Rails**

`ActionCable` (`ApplicationCable`) allows the use of websockets to connect to the backend API to execute basic HTML actions (such as create, update, destroy) in real-time so that a user does not have to refresh a webpage to receive new messages. `Websockets` are an API that allows real-time HTML requests for data, which is perfect for a live messaging app. Otherwise, it would just be a forum post website without them where the user would have to manually refresh the page to view new messages.

* **React/Redux**
    * React v17.0.2
    * Redux v4.1.0

These two are grouped together because they go hand-in-hand with creating a web app like <a href="https://accord-app.herokuapp.com/#/" target="_blank">Accord</a>. `Redux` allows the front-end to maintain a pseudo-database of data and access it in a much faster time compared to exchanging information with the data API back-end in rails for every request. And, it goes without saying, `React` is almost a must for any modern front-end view as it allows for a very dynamic UI/UX using JavaScript. Each also comes with a whole host of npm packages that help them interact with each other, and enhance them by themselves.

* **Webpack**

`Webpack` allows all the front-end code to be bundled into one JavaScript file for the app to run, instead of calling each code file in the `head` section of the root HTML document.

``

---

## **Feature Highlights**

### _**Join server by invitation.**_
Within the `Servers` feature, I was able to employ a "join server via invitation link" which is a URL safe generated token that can be entered in a join form within the app itself *OR* appending it to the root URL path. On the front-end, I set up my base App routes to make sure to try to first hit the UrlInvitation component if the user appends something that isn't standard to the app. If it's not a valid URL token or it's not in the database, it will render the Error404 component:

```js
<div className="app-wrapper">
        <Switch>
            <ProtectedRoute path="/channels" component={AccordAppContainer} />
            <ProtectedRoute exact path="/app" component={LoadingContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/register" component={RegisterFormContainer} />
            <Route exact path="/" component={SplashContainer}/>
            <Route exact path="/404" component={Error404} />
            <ProtectedRoute path="/" component={UrlInvitationContainer} />
            <Route component={Error404} />
        </Switch>
    </div>
```
Then I implemented a check in the component to see whether or not what was appended to the route is a valid URL token for the app which contains a simple regex that checks if the token/uri matches a particular pattern:

```js
const validUrlToken = path => {
    const pattern = /^((https?:\/\/)?(accord\.com\/))?[\w]{10}$/;
    const isValid = path.match(pattern);
    if (isValid) return isValid[0].slice(-10);
    return null;
};
```
* The "s" on https is optional
* https//: or http:// is optional, but must appear like this. It cannot be anything else other than either one though.
* accord.com/ is also optional, but must appear as accord.com/.
* And finally, the URL token on the end is an alphanumeric string of length 10, no more, no less. And this one is NOT optional, this must appear.

Implmenting this was fun, and allowed me to be creative with how the user interacts with the app.

### _**Implmenting a dynamic Chat Channel for websockets.**_
When I started the `Messages` feature, I was bouncing ideas off of the others who were also utilizing websockets. I was finally able to send data from my front-end to the back-end, but I didn't have any logic to handle the data in the back-end yet. There was some discussion about whether or not I'd have to set up another `ApplicationCable` channel to handle either a `Channel` or `Conversation` chat. I came up with a solution for addressing the distinction between my `polymorphic association` for `Messages` concerning `Channels` and `Conversations` (a.k.a. Direct Messages):
```ruby
class ChatChannel < ApplicationCable::Channel
  
  def subscribed
    chat_type = params[:type]
    @chat = chat_type.constantize.find_by(id: params[:chatId])
    stream_for @chat if @chat
  end

  def speak(data)
    @message = Message.new(data['message'])
    if @message.save
      socket = { message: camelize_keys(@message.attributes) }
      ChatChannel.broadcast_to(@chat, socket)
    end
  end

end
```

From the front-end, I would pass the websocket initialization with `:type` in `params` which would either be a string of `"Channel"` or `"Conversation"`. This would allow me to dynamically set a specific chat object of class type `Channel` or `Conversation` using `String#constantize`.

---
## *Code Highlights*
In addition to the two code snippets above, I'm proud of my `func_utils.js` file, which is where the above `validUrlToken` JavaScript function resides. This is a collection of functions that don't do anything other than prepare/read data for me:
```js
export const validUrlToken = path => {
    const pattern = /^((https?:\/\/)?(accord\.com\/))?[\w]{10}$/;
    const isValid = path.match(pattern);
    if (isValid) return isValid[0].slice(-10);
    return null;
};

const splitName = (name, char) => {
    let newName = name.split(char).map(word => {
        for (let i=0; i < word.length; i++) {
            if (word[i] !== " ") return word[i];
        }
    }).join("").slice(0,5);
    return newName;
}

export const serverInitials = name => {
    let newName;
    if (name.includes(" ")) {
        newName = name.split(" ").map(word => word[0]).join("");
    } else if (name.includes("-")) {
        newName = splitName(name, "-");
    } else if (name.includes("/")) {
        newName = splitName(name, "/");
    } else if (name.includes("_")) {
        newName = splitName(name, "_");
    } else {
        newName = name[0];
    }
    return newName;
};

export const convertToSnakeCase = obj => {
    const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    let newObj = {};
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    let convertedKeys = keys.map(key => camelToSnakeCase(key));
    for(let i = 0; i < keys.length; i++) { newObj[convertedKeys[i]] = values[i] }
    return newObj;
};

export const extractDateTime = dateTime => {
    let dateObject = new Date(dateTime);
    
    // find the local time
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    let time = dateObject.toLocaleTimeString('en-US', timeOptions);
    
    // find the local date
    const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
    let date = dateObject.toLocaleDateString('en-US', dateOptions);
    
    const now = new Date();
    const dateObj = new Date(date);

    // today?
    if ((now.getDate() === dateObj.getDate()) && (now.getMonth() === dateObj.getMonth()) && (now.getYear() === dateObj.getYear())) {
        return `today at ${time}`;
    }

    // yesterday?
    if ((now.getDate() - dateObj.getDate() === 1) || (now.getMonth() - dateObj.getMonth() === 1) || (now.getYear() - dateObj.getYear() === 1)) {
        return `yesterday at ${time}`;
    }

    // more than a day ago
    return date;
};
```

Two of the functions I'm excited about are `convertToSnakeCase` and `extractDateTime`. I had found a <a href="https://stackoverflow.com/questions/54246477" target="_blank">solution</a> for converting just 1 string to to snake case on StackOverflow. I made sure what I understood the code, especially the regex, before proceeding with using it myself. This is where I got the inspiration for the `validUrlToken` function. 

For `extractDateTime`, I was having a lot of trouble figuring out what the heck kind of format my back-end `DateTime` object was being converted into. I learned it's an <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank">ISO 8601</a> date format in UTC. Before that, I was trying to manually write code to extract the date and time; convert it myself to GMT-4 (New York); and calculate whether the `dateTime` passed an argument is today, yesterday, or more than a day ago. After some extensive reading of <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date" target="_blank">`Date`</a> objects in `JavaScript` on MDN, I figured out a simple, and sort of elegant, way of returning a formatted date/time string to be displayed next to my message when it's displayed in the chat.

---

### May 21, 20201
* As of this date, I have finished basic CRUD for `User Auth` and `Servers`. I am looking forward to finishing basic CRUD for `Channels` and `Messages`.
* I plan to implement a `Conversations` (Direct Messages) feature alongside a `Friends` feature.
* I'm also excited to explore the possibilty of using `ActionCable` to provide live updates about messages that were sent, a user's online status, and more.
