pg_dump project-connect_development > project-connect_development-$(date +%F).psql
zip project-connect_development-$(date +%F).psql.zip project-connect_development-$(date +%F).psql
rm project-connect_development-$(date +%F).psql
node ./backups/backup.js project-connect_development-$(date +%F).psql.zip
