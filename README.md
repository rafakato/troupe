#!!!!!!!!!! Work in Progress !!!!!!!!!#

[![Join the chat at https://gitter.im/rafakato/troupe](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/rafakato/troupe?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Troupe #

Troupe is a toolkit for building concurrent and distributed, message-driven applications.
You can use basic `child-process` approach or connect with an `AMQP server` like [RabbitMQ](https://www.rabbitmq.com/) or [ØMQ](http://zeromq.org/) for a better message distribution.

Inspired by [akka](http://akka.io/).

## Quick start ##

```sh
$ npm install --save troupe
```

## Main differences running using `child-process` and a `AMQP server` ##
When using the `child-process` implementation, all actors must be loaded before a message is sent to the `Troupe`, otherwise the message will be lost.

With a `AMQP server`, all messages are sent to server, and when there is a `Actor` available to receive the message it is sent. If the message is successfully processed it leaves the queue, otherwise you can specify some actions to handle the error, like send the message to another queue or ignore the error.

## Properties, Methods and Events ##
### Troupe ###
#### Troupe.instance ####
 **Returns**  
 \- troupe (Troupe): Returns the current instance of the singleton  

#### Troupe.leader ####
 Getter and setter for the `Leader` of `Troupe`  

 **Getter returns**  
 \- leader (Leader): The `Leader` of the `Troupe`  

 **Setter accepts**  
 \- leader (Leader): An object instance of `Leader`  

#### Troupe.getActor({actorName: String}) ####
 Returns a actor by it's name  

 **Arguments**  
 \- actorName (String): The name of the actor you want to fetch  

 **Returns**  
 \- actor (Actor): Returns the requested `Actor`, if not found returns `undefined`  

#### Troupe.ready({troupe: Troupe}) ####
 A function that is called whenever a `Leader` is set and connected to it agent  

 **Received parameters**  
 \- troupe (Troupe): The current instance of `Troupe`  

### Message ###
#### new Message({headers: Object, content: Object, sender: Actor}) ####
 Creates a new instance of a `Message`

 **Arguments**  
 \- headers (Object): An object containing the headers of `Message`  
 \- content (Object): The content of `Message`, regardless of the type passed, it will be converted to `String` upon send
 \- sender (Actor): A instance of an `Actor`  

 **Returns**  
 \- message (Message): A `Message` instance  

#### Message.headers ####
 Getter and setter for the header of `Message`  

 **Getter returns**  
 \- headers (Object): The headers of `Message`  

 **Setter accepts**  
 \- headers (Object): An object containing the headers of `Message`  

#### Message.content ####
 Getter and setter for the content of `Message`  

 **Getter returns**  
 \- content (Object): The content of `Message`  

 **Setter accepts**  
 \- content (Object): The content of `Message`  

#### Message.sender ####
 Getter and setter for the sender of `Message`  

 **Getter returns**  
 \- sender (Actor): The `Actor` that sent the `Message`  

 **Setter accepts**  
 \- sender (Actor): An object instance of an `Actor`   

#### Message.accept() ####
 Accept the message and remove it from queue  

#### Message.reject() ####
 Reject the message and remove it from queue  

#### Message.rehear() ####
 Reject the message and add it back to the queue  

### Leader ###
#### new Leader({agent: String}) ####
 Creates a new instance of `Leader`
 
 **Arguments**  
 \- agent (string): The agent that will manage the queue (ie: RabbitMQ)  

 **Returns**  
 \- leader (Leader): A `Leader` instance  

#### Leader.tell({actor: Actor, message: Message, sender: Actor}) ####
 Tell a `Message` to an `Actor`  
 
 **Arguments**  
 \- actor (Actor): The `Actor` that will receive the `Message`  
 \- message (Message): The `Message` you want to tell to `Actor`  
 \- sender (Actor)[optional]: The `Actor` that sent the `Message`  

 **Returns**  
 \- Nothing  

#### Leader.ask({actor: Actor, message: Message, sender: actor}) ####
 Tell a `Message` to an `Actor` and receive a promise that will be resolved with the response of `Actor`  

 **Arguments**  
 \- actor (Actor): The `Actor` that will receive the `Message`  
 \- message (Message): The `Message` you want to tell to `Actor`  
 \- sender (Actor)[optional]: The `Actor` that sent the `Message`  

 **Returns**  
 \- promise (Promise): A `Promise` that will be resolved with an `Message` response from `Actor`  

#### Leader.forward({message: Message, actor: Actor}) ####
 Forward a `Message` to another `Actor` without modifying its `headers`  

 **Arguments**  
 \- actor (Actor): The `Actor` that will receive the `Message`  
 \- message (Message): The `Message` you want to tell to `Actor`  

 **Returns**  
 \- Nothing  

### Actor ###
#### new Actor({name: String}) ####
 Creates a new instance of `Actor`.  
 When a `Actor` is instantiated it is automatically added to the current `Troupe`  

 **Arguments**  
 \- name (String): The `Actor` name  

 **Returns**  
 \- actor (Actor): An `Actor` instance  

#### Actor.messageReceived({message: Message}) ####
 A function that is called whenever the `Actor` receives a new `Message`

 **Received parameters**  
 \- message (Message): A `Message`  
