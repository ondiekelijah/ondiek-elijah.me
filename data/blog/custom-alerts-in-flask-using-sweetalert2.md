---
title: Custom Alerts in Flask Using SweetAlert2
date: '2021-07-20'
tags: ['Python', 'Flask', 'Sweetalert2', 'Jinja']
draft: false
summary: 'This article describes how to use Sweetalert2 to create custom alerts in Flask Jinja templates. Learn how to display alerts in a way that users will appreciate.'
---

Originally posted on [Hashnode.](https://develie.hashnode.dev/custom-alerts-in-flask-using-sweetalert2)

#### What's the difference between an alert and a notification?

An alert is a signal (a badge, sounds, a missing mandatory field, a success/fail message) that tells the user that they should look at something. It is frequently in the context of their current task.

A notification is usually accompanied by additional information that is not always relevant to the current task. It indicates, "Hey, something out of the ordinary has occurred."

![success.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630262282742/5t5gOEev_.png)

Custom alerts in Flask have been simplified and made faster to implement in this tutorial. This workaround is also possible with Django, however it has not been tested. There is also the possibility of converting this implementation into a wrapper library to make usage even easier.

## Requirements

1. Bootstrap v5.0.x.
2. Sweetalert2 CDN link referenced.
3. Flask message flashing implemented.

## Usage

Currently, according to what I've tested, there are now two options for implementation.

### 1. As a template

To use these custom alerts as a template file;

In your templates folder create a file `"sweetalerts.html"` then copy and paste the following lines of code.

```html
<!-- Begin alerts -->
{% with messages = get_flashed_messages(with_categories=true) %} {% if messages %} {% for category,
message in messages %}

<script>
  Swal.fire({
    title: '{{ category.title() }}!',
    // success , error , warning ,info

    text: '{{ message }}',
    // Custom message flashed from your flask routes

    icon: '{{ category }}' == 'danger' ? 'error' : '{{ category }}',
    // success , error , warning ,info
  })
</script>

{% endfor %} {% endif %} {% endwith %}

<!-- End alerts -->
```

Then import the template in your HTML file as follows.

`{% include "sweetalerts.html" %}`

### 2. Inline

Alternatively,you can just copy and paste the above code snippet inside your html file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <!-- Sweet alert Js -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Hello, world!</title>
  </head>

  <body>
    <div>
      <!-- Begin alerts -->
      {% with messages = get_flashed_messages(with_categories=true) %} {% if messages %} {% for
      category, message in messages %}
      <script>
        Swal.fire({
          title: '{{ category.title() }}!',
          // success , error , warning ,info

          text: '{{ message }}',
          // Custom message flashed from your flask routes

          icon: '{{ category }}' == 'danger' ? 'error' : '{{ category }}',
          // success , error , warning ,info
        })
      </script>
      {% endfor %} {% endif %} {% endwith %}

      <!-- End alerts -->
    </div>

    {% block content%} {% content %} ...
    <!-- Bootstrap Bundle with Popper -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

An example of how to flash messages in flask is shown below.

```python
           ...
            db.session.add(newuser)
            db.session.commit()
            flash(f"Account Succesfully created", "success")
            return redirect(url_for("auth.login"))
        except InvalidRequestError:
            db.session.rollback()
            flash(f"Something went wrong!", "danger")
        except IntegrityError:
            db.session.rollback()
            flash(f"User already exists!.", "warning")
        except DataError:
            db.session.rollback()
            flash(f"Invalid Entry", "warning")
        except InterfaceError:
            db.session.rollback()
            flash(f"Error connecting to the database", "danger")
        except DatabaseError:
            db.session.rollback()
            flash(f"Error connecting to the database", "danger")
        except BuildError:
            db.session.rollback()
            flash(f"An error occured !", "danger")
   ...
```

Thanks for reading. Leave a comment,like and share.

### Reference

[What is the difference between notification and alert?](https://www.quora.com/profile/Josh-Goodwin)
