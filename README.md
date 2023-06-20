Steps to make the registration work:


1) restart the mysql server `sudo service mysql restart` or `sudo systemctl restart mysql`
2) execute the javascript file `js/node/nodjs reg.js`
3) restart the nginx server `sudo service nginx restart` or `sudo systemctl restart nginx`
4) go to the registration page in your browser and register
5) if everything worked as expected, the user information will be stored in the mysql database table


P.S. registration.html and reg.js should be in the same directory (specified in the nginx server config file {in this case 'register'})
otherwise change the path to the javascript file in registration.html
