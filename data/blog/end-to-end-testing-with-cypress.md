---
title: End-To-End Testing With Cypress
date: '2021-10-04'
tags: ['Node.js', 'Express.js', 'React.js', 'Cypress']
draft: false
summary: 'In this blog post, we'll be looking at end-to-end testing with Cypress. We'll see how to set up Cypress and write some tests for a simple web application. By the end, you should have a good understanding of how Cypress works and how to use it to test your own web applications.'
---

# Introduction

As a software engineer, you're probably familiar with "end-to-end tests (E2E)." These tests verify a system's functionality from start to finish. In other words, end-to-end tests check that the system under test behaves as expected from the user's perspective.

End-to-end tests are an essential part of the software development process. They can catch errors that unit tests and integration tests may miss. For example, end-to-end tests can check for user experience, data integrity, and workflow issues.

[Cypress](https://docs.cypress.io/guides/overview/why-cypress) is a popular end-to-end testing tool. Cypress is a JavaScript-based tool that makes end-to-end testing simple and easy to set up. Cypress also has some great features, like automatic waiting and screenshots.

In this article, we'll look at end-to-end testing with Cypress. We'll learn what end-to-end tests are and why they're essential. We'll also learn how to set up and run end-to-end tests with Cypress.

The following section covers some of the requirements needed to complete this tutorial.

# Prerequisites

The following are the requirements for this tutorial;

- Sound knowledge of JavaScript and [React](https://reactjs.org/).
- The latest version of [Node.js](https://nodejs.org/en/) installed.
- A clone of the [demo application](https://github.com/Dev-Elie/e2e-testing-with-Cypress) up and running (both the backend and frontend services).

# Why Use Cypress for E2E Testing?

There are many reasons to use Cypress for end-to-end testing. Cypress has several features that make it a good tool for end-to-end testing, including:

- Cypress is fast, easy to use, and reliable.
- Cypress tests run in the same environment as your application, so you can test how your application will behave in the real world.
- Its ability to run tests in parallel can save time when testing large applications.
- Its supports data-driven testing achieved through fixtures, which allows tests to be run against multiple data sets.
- Its ability to stub out network requests can help avoid flakiness in tests.
- Its built-in support for mocking and stubbing can be helpful when testing complex applications.
- Cypress has a large community of developers constantly working on improving the tool and adding new features.
- Cypress reloads in real-time.

# Setting up Cypress for E2E Testing

First, you'll need to install Cypress. You can do this with the following command:

`npm install cypress --save-dev`

The next step after installing Cypress is to open the Cypress test runner.

`npx cypress open`

The command above launches the Cypress launchpad, which serves as a guide to help you configure Cypress.

In the first step, Cypress requires that we choose a testing type; click on the E2E testing option.

![select a testing type](https://cdn.hashnode.com/res/hashnode/image/upload/v1664720043858/ektVOykAj.png)

In this step, the launchpad creates a scaffold of configuration files in your project, as shown below. Click **"Continue"**.

![configuration files](https://cdn.hashnode.com/res/hashnode/image/upload/v1664720921243/4qWOzvRbA.png)

Cypress will provide you with a list of compatible browsers based on the browsers in your system. Choose your preferred browser.

![choose a browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1664721109917/MRpMKZTlt.png)

The next step after choosing a browser is to start writing tests. Select **"Create new empty spec."**

![create a spec](https://cdn.hashnode.com/res/hashnode/image/upload/v1664721611574/YsRatnRGJ.png)

Name your spec, click **"Create spec."**

![name spec](https://cdn.hashnode.com/res/hashnode/image/upload/v1664721936860/wJ1o-Y9YB.png)

When you create the spec, the sample created spec appears in the popup as shown below. Run it.

![run spec](https://cdn.hashnode.com/res/hashnode/image/upload/v1664721952107/rSAjcDsW4.png)

You should see something like this. The sample spec visits the site "https://example.cypress.io/," and because it is reachable, the test case passes, and you can view the same site on the right tab.

![results](https://cdn.hashnode.com/res/hashnode/image/upload/v1664721970569/xjkzGVOFe.png)

In the following section, we will write tests for a contact page. We will learn to query elements, click buttons, and make assertions.

# Writing E2E Tests With Cypress

We will modify the previous spec to perform an end-to-end test on our contact page.

In this revised spec, we will:

1. Go to the contact page.
2. Complete the form
3. Submit the form
4. Assert the received response message

Update the `cypress/e2e/spec.cy.js` will the following lines of code.

```JavaScript
describe('Test contact form', () => {
  it('Visit, fill and submit form', () => {
    // Visit the page
    cy.visit('http://localhost:3000')

    // Fills out the form
    cy.get('[data-test="email"]').type("doe@gmail.com"); // Type email
    cy.get('[data-test="name"]').type("John Doe"); // Type name
    cy.get('[data-test="message"]').type("Hi, I'm John Doe"); // Type message
    cy.get('[data-test="submit"]').click(); // Click on submit button

    // Check if the success message is displayed
    cy.get('[data-test="success-message"]')
      .should("exist")
      .contains("Message sent successfully");
  })
})
```

In the above code block:

The `describe` method is used to write tests for a specific feature or set of features in your code. It is used to group related tests while the `it` method defines a test case.

In the test case, we visit the contact page on localhost:3000 using the command `cy.visit(URL)`, then query for the specific inputs using the "data-test" attribute while typing values in each. We then press the submit button and assert that we receive the exact success message.

Let's see how to run tests in the next section.

# Running E2E tests with Cypress

There are several ways to run end-to-end tests with Cypress. One way is to use the Cypress Test Runner, a graphical user interface (GUI) that lets you run tests, view results, and manage test settings. Another way is to use the Cypress Command Line Interface (CLI), which enables you to run tests from the command line or in headless mode.

Read more on the Cypress [command line](https://docs.cypress.io/guides/guides/command-line) and more ways to run tests.

We see the browser reload after we save the changes we made in the previous section to the spec.

Oops, the tests fail. Let's take a look at the raised exception.

![failed tests](https://cdn.hashnode.com/res/hashnode/image/upload/v1664727349461/bYbUttMfN.png)

Why did that happen? `(uncaught exception)TypeError: Failed to fetch`.

A `TypeError: Failed to fetch` error occurs when there is a problem fetching data from a server. This can be caused by several things, including a poor internet connection, a server that is down, or a problem with the data that is being requested.

In this case, Cypress is running in isolation and has no access to our API endpoint.

How do we fix this? Let's look at how we can debug this in the next section.

# Debugging E2E tests with Cypress

Cypress provides a command known as intercept. The intercept command allows us to stub or mock requests to your server. This is useful for tests that need to stub out specific responses from your server or for tests that need to mock particular interactions with your server.

Update the spec file with the following code.

```JavaScript
describe('Test contact form', () => {
  it('Visit, fill and submit form', () => {
    // Visit the page
    cy.visit('http://localhost:3000')

    // Intercepts the POST request
    cy.intercept('POST', 'http://localhost:3000/api/contact', {
      statusCode: 200,
      body: {
        message: 'Message sent successfully',
      },
    }).as('postMessage')

    // Fills out the form
    cy.get('[data-test="email"]').type("doe@gmail.com"); // Type email
    cy.get('[data-test="name"]').type("John Doe"); // Type name
    cy.get('[data-test="message"]').type("Hi, I'm John Doe"); // Type message
    cy.get('[data-test="submit"]').click(); // Click on submit button

    // Wait for the request to finish
    // cy.wait('@postMessage')

    // Check if the success message is displayed
    cy.get('[data-test="success-message"]')
      .should("exist")
      .contains("Message sent successfully");
  })
})
```

The intercept.

```JavaScript
cy.intercept('POST', 'http://localhost:3000/api/contact', {
  statusCode: 200,
  body: {
    message: 'Message sent successfully',
  },
}).as('postMessage')
```

This code above the cypress command **"intercept"** intercepts a `POST` request to the specified URL. The specified response status code and body are returned when the request is intercepted. The response is given the alias **"postMessage."**

Depending on several factors, we may be forced to wait for the request to be complete. To accomplish this, we must do the following before asserting the server response.

```JavaScript
cy.wait('@postMessage')
```

Now, if we return to the browser, the test has passed!

![passed tests](https://cdn.hashnode.com/res/hashnode/image/upload/v1664732143602/19DC7cMqD.png)

Voila!

# Conclusion

In this article, we learned what end-to-end testing is, why Cypress is best for end-to-end testing, how to set up Cypress for end-to-end testing, how to write end-to-end tests with Cypress, and how to run them.

Cypress is a popular tool for end-to-end testing because it is easy to set up and use. With Cypress, you can write tests in JavaScript and run them in a real browser. Cypress also provides powerful debugging tools that make finding and fixing errors in your tests easy. Thank you for reading. Until next time, keep learning.
