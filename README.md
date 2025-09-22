# deploye
```
# Supprimer l'ancien processus si il existe
pm2 delete pirateapi 2>/dev/null

# Lancer le nouveau build
pm2 start dist/server.js --name pirateapi

# Sauvegarder PM2 pour redémarrage automatique
pm2 save
pm2 startup

pm2 list
pm2 logs pirateapi
pm2 restart pirateapi
pm2 logs pirateapi
``` 