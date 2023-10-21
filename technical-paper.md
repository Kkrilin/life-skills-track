<h1 align='center'>SOLID Principles</h1>

## Introduction

SOLID is an acronym for the first five object-oriented design (OOD) principles by Robert C. Martin (also known as Uncle Bob).
These principles are aimed at helping software developers create more maintainable, flexible, and understandable code. 


Solid stands for:

- S -> [Single responsiblity Principle](#Single-responsiblity)
- S -> [Open closed Principle](#Open-closed)
- S -> [Liskov Substitution Principle](#Liskov-Substitution)
- S -> [Interface Segregation Principle](#Interface-Segregation)
- S -> [Dependency Inversion Principle](#Dependency-Inversion)


<a id="Single-responsiblity"></a>

### Single responsiblity Principle

This principle states that a class should have only one reason to change, meaning that a class should have only one responsibility. In other words, a class should do one thing and do it well.

 Let's illustrate the SRP with a code snippet in JavaScript:


 Suppose you have a class that manages both user authentication and sends email notifications, violating the SRP:

 ```js
 class UserAuthenticatorAndNotifier {
  constructor() {
    // Initialize user authentication and email notification
    this.userDatabase = new Map(); // Simulating a user database
  }

  authenticateUser(username, password) {
    // Code for user authentication
    if (this.userDatabase.has(username)) {
      const storedPassword = this.userDatabase.get(username);
      if (password === storedPassword) {
        console.log(`User '${username}' authenticated successfully.`);
        return true;
      }
    }
    console.log(`User authentication failed for '${username}'.`);
    return false;
  }

  sendEmailNotification(user, message) {
    // Code for sending email notifications
    console.log(`Email sent to '${user}' with message: '${message}'.`);
  }
}
 ```

 To adhere to the SRP, you should separate these responsibilities into different classes. Here's the refactored code:

 ```js
 class UserAuthenticator {
  constructor() {
    this.userDatabase = new Map(); // Simulating a user database
  }

  authenticateUser(username, password) {
    if (this.userDatabase.has(username)) {
      const storedPassword = this.userDatabase.get(username);
      if (password === storedPassword) {
        console.log(`User '${username}' authenticated successfully.`);
        return true;
      }
    }
    console.log(`User authentication failed for '${username}'.`);
    return false;
  }

}

class EmailNotifier {
  sendEmailNotification(user, message) {
    console.log(`Email sent to '${user}' with message: '${message}'.`);
  }
}
 ```

<a id="Open-closed"></a>

### Open closed Principle

The Open/Closed Principle suggests that software entities (classes, modules, functions) should be open for extension but closed for modification. This means that you should be able to add new functionality or behavior without altering existing code.

This means that a class should be extendable without modifying the class itself.


let's consider previous example what if user does not exist
for that we can modified it without modifying the class

```js
class UserAuthenticator {
  constructor() {
    this.userDatabase = new Map(); // Simulating a user database
  }

  authenticateUser(username, password) {
    if (this.userDatabase.has(username)) {
      const storedPassword = this.userDatabase.get(username);
      if (password === storedPassword) {
        console.log(`User '${username}' authenticated successfully.`);
        return true;
      }
    }
    console.log(`User authentication failed for '${username}'.`);
    return false;
  }

  registerUser(username, password) {
    if (!this.userDatabase.has(username)) {
      this.userDatabase.set(username, password);
      console.log(`User '${username}' registered successfully.`);
    } else {
      console.log(`User '${username}' already exists. Registration failed.`);
    }
  }
}

class EmailNotifier {
  sendEmailNotification(user, message) {
    console.log(`Email sent to '${user}' with message: '${message}'.`);
  }
}
```
<a id="Liskov-Substitution"></a>

### Liskov Substitution Principle

The Liskov Substitution Principle asserts that objects of a derived class should be able to replace objects of the base class without affecting the correctness of the program. In other words, subtypes must be substitutable for their base types.

Let's illustrate the Liskov Substitution Principle with a JavaScript code snippet:

Suppose you have a base class Bird and a derived class Penguin. The LSP implies that you should be able to use a Penguin object wherever you expect a Bird object, and it should behave correctly.

```js
class Bird {
  constructor(name) {
    this.name = name;
  }

  fly() {
    return `${this.name} is flying.`;
  }
}

class Penguin extends Bird {
  constructor(name) {
    super(name);
  }

  // Penguins cannot fly, so we need to override the fly method
  fly() {
    return `${this.name} cannot fly; it swims instead.`;
  }
}

// Function using a Bird object
function performFlight(bird) {
  return bird.fly();
}

const sparrow = new Bird('Sparrow');
const penguin = new Penguin('Penguin');

console.log(performFlight(sparrow)); // Outputs: "Sparrow is flying."
console.log(performFlight(penguin)); // Outputs: "Penguin cannot fly; it swims instead."
```

In this example, the Penguin class is a subclass of 'Bird', and it overrides the 'fly' method to provide a different behavior. Despite this, we can still use a 'Penguin' object in the 'performFlight' function, which expects a 'Bird'. The LSP is satisfied because the substitution does not break the program's correctness. The 'Penguin' object behaves appropriately, even though it cannot fly like other birds.

<a id="Interface-Segregation"></a>

### Interface Segregation Principle

This principle advises that clients should not be forced to depend on interfaces they do not use. It encourages the creation of smaller, more specific interfaces rather than large, monolithic ones.

Let's illustrate ISP with a JavaScript snippet:

Suppose you have an interface or a set of methods for a messaging service. Without adhering to the ISP

```js
// Violation of ISP - A single large interface

class MessagingService {
  sendMessage() {
    console.log('Message has been send')
  }

  receiveMessage() {
    consol.log('message has been recieve by user')
  }
  // Many other methods...
}
```

In this scenario, every class implementing the MessagingService interface would be required to provide implementations for all methods, even if they don't need them.

To adhere to the Interface Segregation Principle, you should break down the large interface into smaller, more focused ones.

```js
// Adhering to ISP - Smaller, specific interfaces

class MessageSender {
  sendMessage() {
    console.log('Message has been send')
    
  }
}

class MessageReceiver {
  receiveMessage() {
    consol.log('message has been recieve by user')
   
  }
}
```

<a id="Dependency-Inversion"></a>

### Dependency Inversion Principle

The Dependency Inversion Principle advocates that high-level modules should not depend on low-level modules but instead, both should depend on abstractions. It encourages the use of interfaces or abstract classes to define dependencies rather than relying on concrete implementations.

Here's an example to illustrate DIP in JavaScript:

Suppose you have a high-level module that sends notifications and a low-level module that manages the notification service. Without adhering to DIP, the high-level module might directly depend on the low-level module:

```js
// Violation of DIP
class NotificationService {
  sendEmail(message) {
    // Code for sending an email
  }
}

class NotificationManager {
  constructor() {
    this.notificationService = new NotificationService();
  }

  sendNotification(message) {
    this.notificationService.sendEmail(message);
  }
}
```

In this code, the NotificationManager directly depends on the NotificationService, violating the Dependency Inversion Principle.

To adhere to DIP,

```js
// Adhering to DIP with an abstraction
class NotificationService {
  send(message) {
    // Code for sending a notification (implementation varies)
  }
}

class EmailNotificationService extends NotificationService {
  send(message) {
    // Code for sending an email
  }
}

class SMSNotificationService extends NotificationService {
  send(message) {
    // Code for sending an SMS
  }
}

class NotificationManager {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  sendNotification(message) {
    this.notificationService.send(message);
  }
}
```

### Reference

 - [Code Snippets](https://blog.logrocket.com/dependency-inversion-principle-typescript/#:~:text=The%20dependency%20inversion%20principle%20is,affecting%20the%20high%2Dlevel%20ones.)
 - [Solid First Five Principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
 - [Solid Principles Videos](https://www.youtube.com/playlist?list=PL6n9fhu94yhXjG1w2blMXUzyDrZ_eyOme)