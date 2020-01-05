#!/bin/bash

export PGPASSWORD='node_password'

# define varaibles
path=./bin/sql/
dbname=dragonstackdb

# start
echo "Configuring $dbname"

# reset database
dropdb -U node_user "$dbname"
createdb -U node_user "$dbname"

# add tables
for file in "$path"table/*.sql; do
  [ -e "$file" ] || continue
  psql -U node_user "$dbname" < "$file";
done

# add others
psql -U node_user "$dbname" < "$path"relation.sql
psql -U node_user "$dbname" < "$path"account_dragon.sql

node ./bin/insertTraits.js
# end
echo "$dbname is configured"
