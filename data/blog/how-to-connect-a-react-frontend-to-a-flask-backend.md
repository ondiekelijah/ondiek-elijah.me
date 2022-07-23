---
title: How to Connect a React Frontend to a Flask Back-end
date: '2021-08-31'
tags: ['Python', 'Flask', 'Flask-SQLAlchemy', 'React']
draft: false
summary: 'A step-by-step guide for connecting a JavaScript(React) frontend application to a Python(Flask) backend.'
---

Originally posted on [Dev blog](https://dev.to/dev_elie/connecting-a-react-frontend-to-a-flask-backend-h1o)

React with Flask? That's a fantastic combination.

You've most likely used Flask without a frontend framework in your projects. It is not always user friendly, regardless of how it works. For example, unless you've written some advanced JQuery form submission techniques, submitting a form will result in a page reload.

However, with React on the frontend, there is no need for a page reload upon form submission, and you may revel in the delights of automatic UI updates.

In this tutorial, I will show you how to connect to a Flask backend, collect data from it, and then display the information on the browser using React.

Also, I'll assume you're familiar with Flask and React.

## Application structure

```
**react_flask_app**
├── backend
│   ├── app.py
│   ├── database.db
│   ├── manage.py
│   ├── migrations
│   │   ├── alembic.ini
│   │   ├── env.py
│   │   ├── README
│   │   ├── script.py.mako
│   │   └── versions
│   ├── models.py
│   ├── requirements.txt
│   ├── routes.py
│   └── run
├── frontend
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── index.html
│   ├── README.md
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── Components
│       │   └── ArticleList.js
│       └── index.js
└── README.md
```

For this tutorial, setup instructions and scripts can be found on my [GitHub](https://github.com/Dev-Elie/Connecting-React-Frontend-to-a-Flask-Backend).

## Part 1.

### Setting up Flask backend

**1. app.py**

```python
# Import the required packages
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
```

We import different dependencies in the preceding lines of code to make them available for use within our file.

```python
...
db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
cors = CORS()
...
```

The code snippet above creates several application instances. Because order matters, SQLAlchemy must be initialized before Marshmallow.

```python
...
def create_app():
    """Application-factory pattern"""
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    # To use the application instances above, instantiate with an application:
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    cors.init_app(app)

    return app
```

The application factory pattern is described above. It is better to design your extensions and app factories so that the extension object is not initially connected to the application.

Any configuration, registration, or other setup required by the program will take place within the function, after which the application will be returned.

**2. manage.py**

```python
...
def deploy():
	"""Run deployment tasks."""
	from app import create_app,db
	from flask_migrate import upgrade,migrate,init,stamp
	from models import Articles

	app = create_app()
	app.app_context().push()

	# create database and tables
	db.create_all()

	# migrate database to latest revision
	stamp()
	migrate()
	upgrade()

deploy()
```

The manage.py file allows us to conduct deployment tasks, initialize the database, check for schema changes, and then migrate it to the most recent version.

**models.py**

```python
...
class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100),nullable=False)
    body = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return "<Articles %r>" % self.title

# Generate marshmallow Schemas from your models
class ArticlesShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","title", "body", "date")


article_schema = ArticlesShema()
articles_schema = ArticlesShema(many=True)
```

For serialization, the objects `article_schema` and `articles_schema` are utilized. The first serializes a single article, while the second serializes a queryset.

**routes.py**

```python
...
# Create an application instance
app = create_app()

# Define a route to fetch the available articles

@app.route("/articles", methods=["GET"], strict_slashes=False)
def articles():

	articles = Articles.query.all()
	results = articles_schema.dump(articles)

	return jsonify(results)


if __name__ == "__main__":
	app.run(debug=True)
```

In the above snippet, we design a route that will collect the data, then serialize objects by giving them to the schema's dump method, which will provide the structured result. [jsonify()](<https://r2c.dev/blog/2020/bento-check-use-jsonify-instead-of-json-dumps-in-flask/#:~:text=jsonify()%20is%20a%20helper,could%20lead%20to%20unintended%20results.>) produces a Response object with the mimetype application/json set.

## Part 2.

### Setting up React frontend

#### Fetching data from Flask

**App.js**
Connecting to a Flask backend may appear complicated, however this is not always the case. The only need is that the path to the flask api be provided. This can be accomplished by following the instructions below.

```javascript
...
  const [articles, setArticles] = useState([]);
...
  useEffect(()=>{
    fetch('http://localhost:5000/articles',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => setArticles(response))
    .catch(error => console.log(error))

  },[])
```

React hooks enable you to use state and other React features without having to construct a class.

A call to the `useEffect` hook allows us to do a DOM update after the render. In this case, we're instructing React to update the DOM with a json response from our flask api after the render.

This method is executed on every update, ensuring that the UI is always in the most recent state.

The `useState` hook, which is now set to an empty list, will be updated with fresh data from our backend; it returns a pair of values: the current state and a function that updates it.

**Components/ArticleList.js**
We now have data from our backend; the next step is to iterate through the queryset, displaying each article's title, description, and date of publication.

We'll make an `ArticleList` component out of a list of articles.This component receives props that we will pass in the next phase.

```javascript
const ArticleList = (props) => {
  return (
    <div className="mt-2">
      {/* Display the article details if article is not None */}
      {props.articles &&
        props.articles.map((article) => {
          return (
            <div key={article.id}>
              <h2 className="text-primary"> {article.title} </h2>
              <p> {article.body} </p>
              <p> {article.date} </p>
              <hr />
            </div>
          )
        })}
    </div>
  )
}

export default ArticleList
```

We also need to export the component we just constructed so that it may be imported into other components.

Returning to our App.js, we import the component we constructed and exported as seen below.

```javascript
import ArticleList from './Components/ArticleList'
```

We pass the `ArticleList` component to the DOM after making it available, as well as the `articles` - the current state effect from the `useState`, which is then consumed as props.

```javascript
return (
  <div className="App container m-4">
    <div className="row">
      <div className="text-center">
        <h1>Connecting a React Frontend to a Flask Backend.</h1>
      </div>
    </div>

    <ArticleList articles={articles} />
  </div>
)
```

We now have a complete Flask + React app that uses Flask to collect data from a SQlite database and React to render output on the browser. If you followed along as you did, you should have output similar to the one below on the browser.
![Sample output](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uak7idotg5nr635mpv5s.png)
In the introductory section of this tutorial, I've included a link to the GitHub repository.

Thank you for reading. Please like, share, and leave a comment below.

## References

1. [flask.palletsprojects](https://flask.palletsprojects.com/en/2.0.x/)
2. [reactjs.org](https://reactjs.org/)
