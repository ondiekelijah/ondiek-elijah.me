---
title: Building a Python Web Scraper in Flask
date: '2021-09-07'
tags: ['Python', 'Flask', 'Bs4', 'Web']
draft: false
summary: 'A hands-on tutorial for building a Python web scraper with the Flask framework and Beautiful Soup.'
---

Originally posted on [Hashnode.](https://dev.to/dev_elie/building-a-python-web-scraper-in-flask-b87)

Websites currently contain a wealth of valuable information, which is consumed daily by users all around the world. These statistics are a useful asset for any subject of study or special interest. When gathering this information, you will almost definitely find yourself manually copying and pasting.

That, of course, does not sit well with you.You need a simple and more automated method for this, which is where web scraping comes in.

**So, what exactly is web scraping?** As the name implies, it is simply the automated extraction of a web page's unstructured HTML information in a specified format, structuring it, and storing it in a database or saving it as a CSV file for future consumption.

Python libraries are at the top of the list of web scraping technologies accessible today. [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) is the most popular Python web scraping library.

In this tutorial, we'll look at web scraping using Beautiful Soup and [Requests](https://docs.python-requests.org/en/master/user/quickstart/). We'll build a web scrapper app with [Flask](https://flask.palletsprojects.com/en/2.0.x/), Python's most lightweight web framework.

### How it works

- Load the application
- Provide a target URL and a tag to be fetched example _img,p, title_
- Receive a response - the requested element(s) content.
- For images, there will be a download functionality that will save the images to your downloads directory

**NB** Live preview available [here](https://scrap-the-web.herokuapp.com/)

### 1. Project setup.

For this project, I'll concentrate on backend functionality, as well as jinja templating and looping. I won't go into detail about CSS or the rest of the HTML code.Find the full project codes [here](https://github.com/Dev-Elie/Simple-Web-Crawler).

To get this project running on your local machine follow the steps [here](https://github.com/Dev-Elie/Simple-Web-Crawler#readme).

> Don't worry if you don't understand what's going on behind the scenes now that your project is up and running. Fill your coffee mug, because things are about to get interesting.

### 2. Project details.

Our primary discussion files will be as follows:

- app.py
- templates/index.html

#### app.py

As stated in the introduction, we will utilize Flask, Beautiful Soup, and request libraries. First and foremost, we'll import some functionality from Flask and Beautiful Soup into the app.py file.

We need to validate and parse the URLs we get, so we import the URL handling module for Python- [urllib](https://docs.python.org/3/library/urllib.html), as well as some other built-in libraries.

```python
from flask import (
    Flask,
    render_template,
    request,
    redirect,
    flash,
    url_for,
    current_app
)
import urllib.request
from urllib.parse import urlparse,urljoin
from bs4 import BeautifulSoup
import requests,validators,json ,uuid,pathlib,os
```

A flask instance must be created as shown below.

```python
app = Flask(__name__)
```

Next, for our first route, we'll construct a function that returns an HTML template, as seen below.

```python
@app.route("/",methods=("GET", "POST"), strict_slashes=False)
def index():
    # Actual parsing codes goes here
    return render_template("index.html")
```

To begin our scrap, we must ensure that the user has sent a Post request.

```python
if request.method == "POST":
```

Inside our function we handle the actual parsing using Beautiful Soup

```python
try:
    global requested_url,specific_element,tag

    requested_url = request.form.get('urltext')
    tag = request.form.get('specificElement')

    source = requests.get(requested_url).text
    soup = BeautifulSoup(source, "html.parser")
    specific_element = soup.find_all(tag)

    counter = len(specific_element)

    image_paths = image_handler(
        tag,
        specific_element,
        requested_url
        )

    return render_template("index.html",
        url = requested_url,
        counter=counter,
        image_paths=image_paths,
        results = specific_element
        )

except Exception as e:
    flash(e, "danger")
```

To explain the following scripts, since we'll be writing a function to accept image paths and generate a complete URL from them, the form field inputs must be available globally, so we define them as global variables.

```python
global requested_url,specific_element,tag
```

The next step is to set values to the two global variables from our form field, as seen below.

```python
 requested_url = request.form.get('urltext')
 tag = request.form.get('specificElement')
```

The following lines of code; the first line sends an HTTP request to the user-specified URL - `requested_url`. The server answers the request by delivering the raw HTML content of the webpage, which we then transform to text- `.text()` and assign to the variable `source`.

```python
source = requests.get(requested_url).text
```

We need to parse the page after we've extracted the HTML content in text format, and we'll utilize `html.parser` as our parsing library. We're merely generating a nested/tree structure of the HTML data by doing this.

```python
soup = BeautifulSoup(source, "html.parser")
```

Because we don't need the entire document, we navigate through the tree to discover the element we require. The tag that the user will enter in the form field.

```python
specific_element = soup.find_all(tag)
```

We also require a count of the results discovered. As a result, we create a variable -`counter` to record the count, as demonstrated.

```python
counter = len(specific_element)
```

As we can see, the variable `image_paths` is linked to a function called -`image_handler()`, which accepts the user-supplied URL, tag, and the specific element we extracted from the parsed page. We'll skip this function and come back to it later to see what it does.

```python
image_paths = image_handler(
    tag,
    specific_element,
    requested_url
    )
```

We pass the results of our parsing along with the return statement to make them available on the HTML template.

```python
return render_template("index.html",
    url = requested_url,
    counter=counter,
    image_paths=image_paths,
    results = specific_element
    )
```

When referencing images on websites, developers frequently use either absolute URLs or relative URLs. Absolute URLs are simple to handle, but relative routes require some processing.

Paths such as `/uploads/image.png`, for example, will be difficult to determine where they originate. So we'll create a function similar to the one we called earlier to validate our image paths.

```python
def image_handler(tag,specific_element,requested_url):
    image_paths = []
    if tag == 'img':
        images = [img['src'] for img in specific_element]
        for i in specific_element:
            image_path = i.attrs['src']
            valid_imgpath = validators.url(image_path)
            if valid_imgpath == True:
                full_path = image_path
            else:
                full_path = urljoin(requested_url, image_path)
                image_paths.append(full_path)

    return image_paths
```

The function checks if the provided `tag` is an image tag, then extracts the images' src attribute value and verifies it to see if it's an absolute path. If this is not the case, it joins the relative path to the target's base URL.

```python
https://example.com + /uploads/image.png
```

These picture paths are then saved in a list and returned when the function is revoked.

**templates/index.html**

What comes next? We must provide the scrap results to the user. We'll use jinja templating and looping in this case.

```HTML
<div class="col-md-8">
    <p><span class="badge bg-success">{{ counter }}</span> Scrap Results for <a
            href="{{ url }}"> {{ url }}</a> </p>
    <div class="bg-white shadow p-4 rounded results">
        {% if results %}
        {% for result in results %}
        <p> {{ result | join(' ') }} </p>
        {% endfor %}
        {% endif %}
        {% for path in image_paths %}
        <a href=" {{  path }} "> <img src=" {{ path }} " class="img"> </a>
        {% endfor %}
    </div>
    {% if image_paths %}
    <a href="{{url_for('downloader')}}" class="btn btn-primary m-2" id="download">Download
        Images<i class="bi bi-cloud-arrow-down-fill m-2"></i></a>
    {% endif %}
</div>
```

In the above html code fragment, we print the number of results found as well as the URL that was scraped. Take a look at the sample below.

![Count and the URL](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3i1ot9se8ckyzcxzw6fu.png)

<figcaption>Results count and the URL</figcaption>

We first verify if the results list is available below the count and the URL, and if it is, we iterate printing each. This is for the texts that were retrieved.

However, when you print the output, you will see `| join(' ')` It operates similarly to `|striptags` in that it removes all HTML tags from the variable result.

Consequently, instead of
![A](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1wm7saf9fj9qc2o80eun.png)
We'll have;
![B](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dp76mhzaqol01qo505dk.png)

We use anchor tags to enclose the pictures and pass the paths as values to the `href` and `src` properties.

```html
{% for path in image_paths %}
<a href=" {{  path }} ">
  <img src=" {{ path }} " class="img" />
</a>
{% endfor %}
```

In addition, we'd like to display the download option only if images are retrieved. So we use jinja if statements to accomplish this. See the code below.

```html
{% if image_paths %}
<a href="{{url_for('downloader')}}" class="btn btn-primary m-2" id="download">
  Download Images
  <i class="bi bi-cloud-arrow-down-fill m-2"></i>
</a>
{% endif %}
```

Last but not least,we need to download images too.

```python
@app.route("/download",methods=("GET", "POST"), strict_slashes=False)
def downloader():
    try:
        for img in image_handler(tag,specific_element,requested_url):
            image_url = img

            filename = str(uuid.uuid4())
            file_ext = pathlib.Path(image_url).suffix

            picture_filename = filename + file_ext

            downloads_path = str(pathlib.Path.home() / "Downloads")

            picture_path  = os.path.join(downloads_path, picture_filename
            )


        flash("Images saved in your Downloads directory", "success")

    except Exception as e:
        flash(e, "danger")

    return redirect(url_for('index'))
```

The `uuid` library is used by the download function above to produce unique names for the downloaded files.

```python
filename = str(uuid.uuid4())
```

then `pathlib.Path()` to strip the image extension from the image path.

```python
file_ext = pathlib.Path(image_url).suffix
```

The two are combined to generate an image name that includes an extension. The image is then embedded with the downloads directory path. This will allow us to designate where we want the images saved.

```python
picture_path  = os.path.join(downloads_path, picture_filename)
```

The line of code following handles the actual image download.

```python
urllib.request.urlretrieve(image_url, picture_path)
```

As parameters, `urllib.request.urlretrieve()` accepts the image(s) to be downloaded and the directory where it should be saved with its new name. As a result, the photos are saved in the downloads directory within the static directory.

Finally we instruct flask to run the application as a module.

```python
    if __name__ == "__main__":
        app.run(debug=True)
```

Thank you for taking the time to read this, and please leave some feedback if you found it useful.

Like, share, and leave a comment in the section below. Follow me on Twitter for further updates and tips on Flask and React development.

![Scrappy](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4euyxoqfbkrsduf4sq3v.png)
