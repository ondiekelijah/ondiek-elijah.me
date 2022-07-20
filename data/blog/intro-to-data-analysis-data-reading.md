---
title: Intro to Data Analysis - Data Reading
date: '2021-10-14'
tags: ['Python', 'Data analysis', 'Pandas']
draft: false
summary: 'Quickstart on reading data from different sources including files and databases.'
---

Originally posted on [Lux Tech Academy blog.](https://dev.to/luxacademy/intro-to-data-analysis-data-reading-2ncp)

With today's technology advances, data is without a doubt the most important component for institutions, organizations, and all other entities. As a result, there is an urgent need to leverage the available data to make a difference.

Data analytics focuses on processing and performing statistical analysis on existing datasets, with a focus on developing techniques to capture and organize data to uncover actionable insights for ongoing problems, as well as determining the best manner to communicate this data.

Data analysis is a type of data analytics that is used in businesses to examine data and draw conclusions. Data gathering, data cleaning, data analysis, and data intercept are the steps taken in data analysis to ensure that you comprehend what your data is trying to communicate.

> Source — [Stack Overflow](https://stackoverflow.com/a/57657369/12943692)

As an introduction to data analysis, this post will teach you how to read data that is offered in various formats such as csv, json, or even as a database file.

## Table of Contents

1. [Data from a CSV file](#reading-data-from-a-csv-file)
2. [Data in SQL flavour](#reading-data-in-sql-flavour)
3. [JSON files](#reading-data-from-json-files)

## Reading data from a CSV file

To read data from a comma-separated values (csv) file into DataFrame we use the `pandas.read_csv` function.

The [read_csv](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html) function accepts numerous parameters, the type of which depends on the nature of your dataset or your aim.
Among the most frequently used parameters, excluding the mandatory `filepath_or_buffer` include `sep,delimiter,header, index_col` e.t.c

### Read comma separated file

The sep parameter, which is short for separator, essentially tells the interpreter how to separate the data items in our CSV file.The interpreter assumes that the delimiter used is a comma by default if the sep parameter is not given.

```python
from pyforest import *
df = pd.read_csv("cereal.csv")
df.head()
```

### Read tab separated file

```python
from pyforest import *
df = pd.read_csv("cereal_tab.csv",sep='\t')
df.head()
```

### Read semicolon separated file

```python
from pyforest import *
df = pd.read_csv("cereal_semicolon.csv",sep=';')
df.head()
```

## Reading Data in SQL flavour

This section involves reading data from various SQL relational databases using pandas.

### MySQL database

```python
from pyforest import *
from sqlalchemy import create_engine

# provide a connection string/URL
db_connection_str = "mysql+mysqlconnector://mysql_username:mysql_user_password@localhost/mysql_db_name"
# produce an Engine object based on a URL
db_connection = create_engine(db_connection_str)
# read SQL query or database table into a DataFrame.
df = pd.read_sql('SELECT * FROM table_name', con=db_connection)
# return the first 5 rows of the dataframe
df.head()
```

> Source — [Stack Overflow](https://stackoverflow.com/a/37730334/12943692)

### PostgreSQL

```python
from pyforest import *
from sqlalchemy import create_engine
# produce an Engine object based on a postgresql database URL
engine = create_engine("postgresql:///psql_dbname")
# read SQL query or database table into a DataFrame.
df = pd.read_sql('select * from "user"',con=engine)
# return the first 5 rows of the dataframe
df.head()
```

### SQlite database

```python
from pyforest import *
from sqlalchemy import create_engine

# connect to a database
engine = create_engine("sqlite:///database.db")
# read database data into a pandas DataFrame
df = pd.read_sql('select * from user', engine)
# return the first 5 rows of the dataframe
df.head()
```

## Reading data from JSON files.

Reading data from a JSON file is as simple as reading data from a CSV file. The `pandas.read_json` function transforms a JSON string to a pandas object with ease. The first parameter it accepts is `path_or_bufa`, which must be a valid JSON str, path object, or file-like object. This [function](https://pandas.pydata.org/pandas-docs/version/1.1.3/reference/api/pandas.read_json.html) also has a number of other parameters that it takes.

```python
from pyforest import *
df = pd.read_json('cereal_default.json')
df.head()
```

If you enjoyed this article, please leave a comment, like it, share it, and follow me on Twitter [@dev_elie](https://twitter.com/dev_elie).

## Reference(s)

1. [analyticsvidhya](https://www.analyticsvidhya.com/blog/2021/04/delimiters-in-pandas-read_csv-function/)
2. [pandas](https://pandas.pydata.org/)
