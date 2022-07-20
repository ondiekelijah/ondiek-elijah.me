---
title: Exploring Flask-SQLAlchemy Queries
date: '2021-07-20'
tags: ['Python', 'Flask', 'Flask-SQLAlchemy']
draft: false
summary: 'A detailed tutorial on most used Flask-SQLAlchemy queries '
---

Originally posted on [Hashnode.](https://develie.hashnode.dev/exploring-flask-sqlalchemy-queries)

### Introduction

**Flask-SQLAlchemy** is a Flask extension that adds **SQLAlchemy** support to your application.
It aims to make using SQLAlchemy with Flask easier by providing useful defaults and extra helpers that make common tasks easier.

In this article, we'll look at some Flask-SQLAlchemy queries that
will help you with your next project or learning series.

Before you begin, create a test environment for the tutorial if you want to test each of the queries as you go. Otherwise, explore Flask-SQLAlchemy queries.

Setup instructions can be found [here](https://github.com/Dev-Elie/Exploring-Flask_SQLAlchemy-Queries/tree/main#readme)

![flask-sqlalchemy-title.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628888654483/22dxtr56T.png)

Now that we've set up our database with some dummy data, it's time to start running queries.
Typing python in the Linux/macOS terminal opens a python shell in which we will test our queries.

For Windows users, a Python Command-Line Interphase / Shell was installed alongside Python during installation. You can find it by typing python into the search bar.

![Blue and Purple Dots Clean Minimalism Twitch Banner.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628892670219/gvBz8WIWT.png)

### Fetching records using ` get()`

Assumingly, you have prior knowledge of SQLAlchemy or flask_sqlalchemy.
Querying the User and Post models using the `all()` method returns a list of user objects,
the list of an object is arranged by default in an ascending order based on the ids.

```python
>>> User.query.all()
# Output
[<User 'admin'>, <User 'guest'>, <User 'john'>, <User 'doe'>]

>>> Post.query.all()
# Output
[<Post 'Hello Geek 1'>, <Post 'Hello Geek 2'>, <Post 'Hello Geek 3'>, <Post 'Hello Geek 4'>]
```

#### Getting record by primary key

Apart from using the `query()` method, records can also be accessed using the `get()` method.
The get method accepts a parameter, the id and
Returns an instance based on the given primary key identifier, or `None` if not found.

```python
>>> User.query.get(1)
# Output
<User 'admin'>
# Getting a post by primary key
>>> Post.query.get(1)
# Output
<Post 'Hello Geek 1'>

```

### Handling None - `get_or_404()` and `first_or_404()`

This will raise 404 errors instead of returning None
first and `first_or_404()` are methods that fetch the first record that meets a condition whereas
the `all()` method returns all the records found in the table/model.

Often when handling queries in your views, you will at some point run into issues of
missing or None entries.

Flask-SQLAlchemy has a helper for this. Instead of `get()`, use `get_or_404()`,
and instead of `first()`, use `first_or_404()` and Instead of getting no results,
this will generate 404 errors.

```python
>>> User.query.get_or_404(1)
# Output
<User 'admin'>

>>> User.query.order_by(User.id.desc()).first_or_404()
# Output
<User 'doe'>
```

Adding a description to a 404 response.

```python
>>>  User.query.filter_by(username='admin').first_or_404(description='No data!')
# Output
<User 'admin'>
```

You can also pass a description as an argument with some message as shown

```python
>>>  User.query.filter_by(username='mike').first_or_404(description='No data!')
# Output
werkzeug.exceptions.NotFound: 404 Not Found: No data
```

### Selecting a bunch of users/record by a more complex expression - `endswith()`

When handling complex expressions you'll always need to customise your queries
to make your whole process comfy.
Using the `endswith()` method, you can run a query
on a Model column that ends with an expression or anything of your choice.

For example, here we query the User model to fetch all the users whose email host
is Gmail. You notice that out of the four records, only two that meets the criteria
are fetched.

```python
>>> User.query.filter(User.email.endswith('@gmail.com')).all()
# Output
[<User 'john'>, <User 'doe'>]
```

### Limiting users/records - `limit()`

Flask-SQLAlchemy also provides a method ` limit()` that can be used to restrict
the number of records fetched
As shown below passing 2 and 3 as parameters in the queries ` limit()` returns
2 records and 3 records respectively.

```python
>>> User.query.limit(2).all()
# Output
[<User 'admin'>, <User 'guest'>]

>>> User.query.limit(3).all()
# Output
[<User 'admin'>, <User 'guest'>, <User 'john'>]
```

![Exploring FLASK-SQLALCHEMY img 2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628891319006/bK43llTME.png)

### Query a table and get results of specific column(s) - `with_entities`

Another method `with_entities()` proves more useful. For example, when you're sending newsletter updates to your registered users, you'll only need their emails and perhaps their names(not covered),
this can be easily done as shown below.

```python
>>> User.query.with_entities(User.email).first()
# Output
('admin@example.com',)

>>> User.query.with_entities(User.email).all()
# Output
[('admin@example.com',), ('doe@gmail.com',), ('guest@example.com',), ('john@gmail.com',)]
```

The `with_entities()` method can be too used with multiple values

```
>>> User.query.with_entities(User.username,User.email).first()
# Output
('admin', 'admin@example.com')
```

### Ordering users by something - `order_by()`

When working with records of any type order is always important. Flask-SQLAlchemy makes this
easy using the `order_by()` method that accepts a parameter to be used in the ordering and the
type of order i.e ascending or descending.

```python
>>> User.query.order_by(User.id.desc()).all()
# Output
[<User 'doe'>, <User 'john'>, <User 'guest'>, <User 'admin'>]

>>> User.query.order_by(User.id.asc()).all()
# Output
[<User 'admin'>, <User 'guest'>, <User 'john'>, <User 'doe'>]
```

![Yellow Illustrated Deer Twitter Header (3).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628891721900/nEUDGfmqU.png)

### Filter by - `filter_by()`

To filter records,we use the `filter_by()` method.
To demonstrate this, let's query the Post model and filter only those posts with views equal to `40`.
This returns the two posts that have `40` views.

```python
>>> Post.query.filter_by(views=40).order_by(Post.id.desc()).all()
# Output
[<Post 'Hello Geek 4'>, <Post 'Hello Geek 3'>]
```

We can also chain the `filter_by()` and `order_by()` method with the count() to
determine the number of occurrences returned by the query.

```python
>>> Post.query.filter_by(views=40).order_by(Post.id.desc()).count()
# Output
2
```

The difference between the two filter methods is that `filter_by`
uses keyword arguments, whereas filter allows pythonic filtering arguments
like `filter(User.name=="john")`

```python
>>> Post.query.filter(Post.views > 10).order_by(Post.date_posted.desc())
# Output
[<Post 'Hello Geek 4'>, <Post 'Hello Geek 3'>, <Post 'Hello Geek 2'>]
```

### Text search

Essentially, searching through records in a database is the quickest way to access a
specific or closely related record in terms of label, term, or title.

In this section of the article, we'll perform a full database text search based on a keyword.

```python
# Import or_ from sqlalchemy,to enable us to use alternative columns for the search
from sqlalchemy import or_
```

If you're collecting data from a form field, you might prefer to use:

`keyword = request.form.get('search-query')`

```python
# Set a keyword variable with a value for our search
>>> keyword = 'holiday'
# Assign the list of results to a variable result
>>> results = Post.query.filter(or_(Post.title.ilike(f'%{keyword}%'), Post.body.ilike(f'%{keyword}%'))).all()
# Loop through the list of posts, printing the title and body for each.
>>> [print(result.title,result.body) for result in results]
# Output
Hello Geek 3 Happy holidays Geek 3
[None]
```

To explore more on SQLAlchemy also read [Getting Started with SQLAlchemy for Database Operations In Python](https://dev.to/grayhat/getting-started-with-sqlalchemy-for-database-operations-in-python-5b5p)

Codes available on my [GitHub](https://github.com/Dev-Elie/Exploring-Flask_SQLAlchemy-Queries)

### References

1. [flask-sqlalchemy - querying-records](https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/#querying-records)
2. [sqlalchemy- Query.get](https://docs.sqlalchemy.org/en/14/orm/query.html#sqlalchemy.orm.Query.get)
3. [Stackoverflow - difference-between-filter-and-filter-by-in-sqlalchemy](https://stackoverflow.com/questions/2128505/difference-between-filter-and-filter-by-in-sqlalchemy)
