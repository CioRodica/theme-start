# README #

***1. Install dependencies:***
* composer require drupal/components --sort-packages
* composer require drupal/crop --sort-packages
* composer require drupal/paragraphs --sort-packages

***2. Enable modules:***
* drush en paragraphs -y && drush en crop -y && drush en components -y && drush en responsive_image -y && drush config-set system.theme default kickstart -y

***3. npm task lunch from .npm folder:***
* npm install && gulp prod && gulp guide
