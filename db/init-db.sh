#!/bin/bash
echo "******************************************************* \n"
echo "lift off !!! ....."
echo "******************************************************* \n"
echo "creating database gluco_trax"
psql postgres -c "CREATE USER pgadmin WITH SUPERUSER PASSWORD 'pgadmin'"
psql postgres -c "CREATE DATABASE gluco_trax"
echo "******************************************************* \n"
echo "touch down ....."
echo "COMPLETED BOOTSTRAPPING NOW SHUTTING DOWN"
echo "******************************************************* \n"
exit 0
